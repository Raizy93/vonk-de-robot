-- ============================================================
-- VONK DE ROBOT — Supabase-databaseschema
--
-- EENMALIG UITVOEREN:
-- 1. Ga in je Supabase-project naar "SQL Editor"
-- 2. Plak dit hele bestand en klik op "Run"
--
-- Wat dit aanmaakt:
-- - tabel "klassen"    : klassen van leerkrachten (+ open werelden)
-- - tabel "leerlingen" : leerlingen met inloggegevens en voortgang
-- - RLS-regels         : leerkrachten zien alléén hun eigen klassen
-- - RPC-functies       : veilige login/opslag voor leerlingen
--                        (zonder dat leerlingen een Supabase-account
--                         nodig hebben)
-- ============================================================


-- ------------------------------------------------------------
-- 1. TABELLEN
-- ------------------------------------------------------------

create table if not exists public.klassen (
  id            uuid primary key default gen_random_uuid(),
  leerkracht_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  naam          text not null,
  -- Welke van de 6 werelden staan open voor deze klas?
  -- Standaard alleen Wereld 1.
  open_werelden boolean[] not null default '{true,false,false,false,false,false}',
  aangemaakt    timestamptz not null default now()
);

-- Klasnamen moeten uniek zijn (hoofdletterongevoelig),
-- want leerlingen loggen in met alleen de klasnaam.
create unique index if not exists klassen_naam_uniek
  on public.klassen (lower(naam));

create table if not exists public.leerlingen (
  id              uuid primary key default gen_random_uuid(),
  klas_id         uuid not null references public.klassen(id) on delete cascade,
  naam            text not null,
  -- Oefenwachtwoord, gegenereerd door het dashboard.
  -- Bewust leesbaar voor de leerkracht (uitdelen/printen);
  -- dit zijn géén echte accountwachtwoorden.
  wachtwoord      text not null,
  -- Complete spelvoortgang als JSON (sterren, sleutels, skins,
  -- vraagstatistieken) — de game leest en schrijft dit blok.
  voortgang       jsonb not null default '{}'::jsonb,
  laatst_gespeeld timestamptz,
  aangemaakt      timestamptz not null default now(),
  unique (klas_id, naam)
);


-- ------------------------------------------------------------
-- 2. ROW LEVEL SECURITY
--    Leerkrachten (ingelogd via Supabase Auth) mogen alleen
--    hun EIGEN klassen en leerlingen zien en beheren.
--    Anonieme bezoekers (de game) kunnen NIET rechtstreeks in
--    de tabellen — alleen via de RPC-functies hieronder.
-- ------------------------------------------------------------

alter table public.klassen    enable row level security;
alter table public.leerlingen enable row level security;

drop policy if exists "leerkracht beheert eigen klassen" on public.klassen;
create policy "leerkracht beheert eigen klassen"
  on public.klassen for all to authenticated
  using (leerkracht_id = auth.uid())
  with check (leerkracht_id = auth.uid());

drop policy if exists "leerkracht beheert eigen leerlingen" on public.leerlingen;
create policy "leerkracht beheert eigen leerlingen"
  on public.leerlingen for all to authenticated
  using (exists (select 1 from public.klassen k
                 where k.id = klas_id and k.leerkracht_id = auth.uid()))
  with check (exists (select 1 from public.klassen k
                      where k.id = klas_id and k.leerkracht_id = auth.uid()));


-- ------------------------------------------------------------
-- 3. RPC-FUNCTIES VOOR DE GAME (leerling-login)
--    "security definer" = de functie mag in de tabellen kijken,
--    ook al mag de aanroeper (anon) dat zelf niet. Zo lekt er
--    nooit meer data dan precies wat de functie teruggeeft.
-- ------------------------------------------------------------

-- 3a. Namenlijst van een klas (voor het "klik op je naam"-scherm).
--     Geeft alléén namen terug — geen wachtwoorden of voortgang.
create or replace function public.klas_login_namen(p_klas text)
returns table (naam text)
language sql
security definer
set search_path = public
as $$
  select l.naam
  from leerlingen l
  join klassen k on k.id = l.klas_id
  where lower(k.naam) = lower(trim(p_klas))
  order by l.naam;
$$;

-- 3b. Leerling logt in: klasnaam + naam + wachtwoord.
--     Wachtwoordcontrole is hoofdletterongevoelig en negeert
--     spaties aan de randen (kindvriendelijk).
create or replace function public.leerling_login(
  p_klas text, p_naam text, p_wachtwoord text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
begin
  select l.id, l.voortgang, k.open_werelden, k.naam as klasnaam
    into r
  from leerlingen l
  join klassen k on k.id = l.klas_id
  where lower(k.naam) = lower(trim(p_klas))
    and l.naam = trim(p_naam)
    and lower(l.wachtwoord) = lower(trim(p_wachtwoord));

  if r.id is null then
    return jsonb_build_object('ok', false);
  end if;

  return jsonb_build_object(
    'ok', true,
    'leerling_id',   r.id,
    'klasnaam',      r.klasnaam,
    'voortgang',     r.voortgang,
    'open_werelden', to_jsonb(r.open_werelden)
  );
end;
$$;

-- 3c. Voortgang opslaan (de game roept dit automatisch aan).
--     Het wachtwoord dient hier als bewijs dat het echt deze
--     leerling is — zonder klopt de update niet.
create or replace function public.leerling_bewaar(
  p_leerling_id uuid, p_wachtwoord text, p_voortgang jsonb)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  update leerlingen
     set voortgang = p_voortgang,
         laatst_gespeeld = now()
   where id = p_leerling_id
     and lower(wachtwoord) = lower(trim(p_wachtwoord));
  return found;
end;
$$;

-- De game (anon) en het dashboard (authenticated) mogen deze
-- functies aanroepen:
grant execute on function public.klas_login_namen(text)                to anon, authenticated;
grant execute on function public.leerling_login(text, text, text)      to anon, authenticated;
grant execute on function public.leerling_bewaar(uuid, text, jsonb)    to anon, authenticated;

-- Klaar! Vul nu je project-URL en anon-key in js/supabase-config.js in.
