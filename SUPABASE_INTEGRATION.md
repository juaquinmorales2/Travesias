# Supabase Integration Guide for Travesias Uruguay Admin Panel

## Database Schema

Create the following tables in your Supabase database:

### Events Table
```sql
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

-- Enable Row Level Security
alter table events enable row level security;

-- Create policy to allow public reads
create policy "Allow public read access" on events for select using (true);

-- Create policy to allow authenticated inserts/updates/deletes
create policy "Allow authenticated insert" on events for insert with check (auth.role() = 'authenticated');
create policy "Allow authenticated update" on events for update using (auth.role() = 'authenticated');
create policy "Allow authenticated delete" on events for delete using (auth.role() = 'authenticated');
```

### Announcements Table
```sql
create table announcements (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table announcements enable row level security;

create policy "Allow public read access" on announcements for select using (true);
create policy "Allow authenticated insert" on announcements for insert with check (auth.role() = 'authenticated');
create policy "Allow authenticated update" on announcements for update using (auth.role() = 'authenticated');
create policy "Allow authenticated delete" on announcements for delete using (auth.role() = 'authenticated');
```

### Site Links Table
```sql
create table site_links (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  url text not null,
  type text not null check (type in ('pdf', 'external', 'social')),
  description text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table site_links enable row level security;

create policy "Allow public read access" on site_links for select using (true);
create policy "Allow authenticated insert" on site_links for insert with check (auth.role() = 'authenticated');
create policy "Allow authenticated update" on site_links for update using (auth.role() = 'authenticated');
create policy "Allow authenticated delete" on site_links for delete using (auth.role() = 'authenticated');
```

## Installation Steps

1. **Install Supabase Client**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Create Supabase Configuration File**
   Create `src/lib/supabase.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js'

   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

3. **Create Environment Variables**
   Create `.env` file in the project root:
   ```
   VITE_SUPABASE_URL=your-supabase-url-here
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
   ```

4. **Set Up Authentication in Supabase**
   - Go to your Supabase dashboard
   - Navigate to Authentication > Users
   - Create a user with email and password for admin access

5. **Update AuthContext to use Supabase Auth** (Optional - for proper authentication)
   Replace the hardcoded login with Supabase authentication if needed

## Integration Code Examples

### Events Service (src/services/eventsService.ts)
```typescript
import { supabase } from '../lib/supabase';
import { Event } from '../types/admin';

export const eventsService = {
  async getAll(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async create(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, event: Partial<Event>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .update(event)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
```

### Announcements Service (src/services/announcementsService.ts)
```typescript
import { supabase } from '../lib/supabase';
import { Announcement } from '../types/admin';

export const announcementsService = {
  async getAll(): Promise<Announcement[]> {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async create(announcement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>): Promise<Announcement> {
    const { data, error } = await supabase
      .from('announcements')
      .insert([announcement])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, announcement: Partial<Announcement>): Promise<Announcement> {
    const { data, error } = await supabase
      .from('announcements')
      .update(announcement)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
```

### Links Service (src/services/linksService.ts)
```typescript
import { supabase } from '../lib/supabase';
import { SiteLinks } from '../types/admin';

export const linksService = {
  async getAll(): Promise<SiteLinks[]> {
    const { data, error } = await supabase
      .from('site_links')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async create(link: Omit<SiteLinks, 'id' | 'updatedAt'>): Promise<SiteLinks> {
    const { data, error } = await supabase
      .from('site_links')
      .insert([link])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, link: Partial<SiteLinks>): Promise<SiteLinks> {
    const { data, error } = await supabase
      .from('site_links')
      .update(link)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('site_links')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
```

## Migration Instructions

1. Run the SQL scripts above in your Supabase SQL Editor
2. Install the Supabase package
3. Create the environment variables
4. Create the service files as shown above
5. Update each admin page to use the services instead of local state:

**Example for EventsPage.tsx:**
```typescript
// At the top
import { eventsService } from '../../services/eventsService';

// In useEffect
useEffect(() => {
  eventsService.getAll()
    .then(data => setEvents(data))
    .catch(err => console.error('Error loading events:', err));
}, []);

// In handleSubmit
if (editingEvent) {
  await eventsService.update(editingEvent.id, formData);
} else {
  await eventsService.create(formData);
}
await eventsService.getAll().then(data => setEvents(data));

// In handleDelete
await eventsService.delete(id);
await eventsService.getAll().then(data => setEvents(data));
```

## Testing

After setup, test the following:
1. Login with admin credentials
2. Create, update, and delete events
3. Create, update, and delete announcements
4. Create, update, and delete links
5. Verify data persists after page refresh
6. Check that public pages can read the data

## Notes

- All TODO comments in the code indicate where Supabase calls should be integrated
- The current implementation uses local state for development/testing
- Once Supabase is connected, data will persist across sessions
- Consider setting up Supabase Storage for event images
