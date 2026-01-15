-- ========================================
-- SQL PARA SUPABASE - COPIAR Y PEGAR
-- ========================================

-- Tabla de Eventos
create table events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  date date not null,
  location text not null,
  description text not null,
  distance text not null,
  image_url text,
  registration_link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar Row Level Security
alter table events enable row level security;

-- Políticas de acceso para events
create policy "Permitir lectura pública" on events for select using (true);
create policy "Permitir inserción autenticada" on events for insert with check (auth.role() = 'authenticated');
create policy "Permitir actualización autenticada" on events for update using (auth.role() = 'authenticated');
create policy "Permitir eliminación autenticada" on events for delete using (auth.role() = 'authenticated');

-- Tabla de Anuncios
create table announcements (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table announcements enable row level security;

create policy "Permitir lectura pública" on announcements for select using (true);
create policy "Permitir inserción autenticada" on announcements for insert with check (auth.role() = 'authenticated');
create policy "Permitir actualización autenticada" on announcements for update using (auth.role() = 'authenticated');
create policy "Permitir eliminación autenticada" on announcements for delete using (auth.role() = 'authenticated');

-- Tabla de Enlaces
create table site_links (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  url text not null,
  type text not null check (type in ('pdf', 'external', 'social')),
  description text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table site_links enable row level security;

create policy "Permitir lectura pública" on site_links for select using (true);
create policy "Permitir inserción autenticada" on site_links for insert with check (auth.role() = 'authenticated');
create policy "Permitir actualización autenticada" on site_links for update using (auth.role() = 'authenticated');
create policy "Permitir eliminación autenticada" on site_links for delete using (auth.role() = 'authenticated');
