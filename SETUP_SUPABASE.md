# Instrucciones de Configuración - Supabase

## Paso 1: Crear archivo .env

Debes crear un archivo `.env` en la raíz del proyecto con las siguientes credenciales de Supabase:

```env
VITE_SUPABASE_URL=https://qlscaybfkvdcuytqhekz.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_Ng1ZZEI0tK-IWF9GdEeGXw_V4WWBdfh
```

**Cómo crear el archivo:**

1. Abre la terminal en la carpeta del proyecto
2. Ejecuta (en PowerShell):
   ```powershell
   New-Item -Path .env -ItemType File -Force
   ```
3. Abre el archivo `.env` y pega el contenido de arriba
4. Guarda el archivo

O simplemente crea un archivo llamado `.env` en la raíz del proyecto usando tu editor de código.

## Paso 2: Configurar las tablas en Supabase

Ve a tu panel de Supabase (https://app.supabase.com) y ejecuta el siguiente SQL en el SQL Editor:

```sql
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

-- Habilitar Row Level Security (RLS)
alter table events enable row level security;

-- Políticas de acceso
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
```

## Paso 3: Reiniciar el servidor de desarrollo

Después de crear el archivo `.env`, reinicia el servidor:

1. Detén el servidor actual (Ctrl + C)
2. Vuelve a ejecutar: `npm run dev`

## ¡Listo!

Una vez completados estos pasos, el panel de administración estará completamente conectado a Supabase y todos los datos se guardarán permanentemente en la base de datos.

Puedes probar:
- Crear eventos, anuncios y enlaces desde el panel
- Editar y eliminar elementos
- Refrescar la página para verificar que los datos persisten
