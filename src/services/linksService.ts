import { supabase } from '../lib/supabase';
import { SiteLinks } from '../types/admin';

export const linksService = {
    async getAll(): Promise<SiteLinks[]> {
        try {
            const { data, error } = await supabase
                .from('site_links')
                .select('*')
                .order('name', { ascending: true });

            if (error) throw error;

            return (data || []).map(link => ({
                id: link.id,
                name: link.name,
                url: link.url,
                type: link.type as 'pdf' | 'external' | 'social',
                description: link.description,
                updatedAt: link.updated_at,
            }));
        } catch (error) {
            console.error('Error fetching links:', error);
            return [];
        }
    },

    async create(link: Omit<SiteLinks, 'id' | 'updatedAt'>): Promise<SiteLinks | null> {
        try {
            const { data, error } = await supabase
                .from('site_links')
                .insert([{
                    name: link.name,
                    url: link.url,
                    type: link.type,
                    description: link.description,
                }])
                .select()
                .single();

            if (error) throw error;

            return {
                id: data.id,
                name: data.name,
                url: data.url,
                type: data.type,
                description: data.description,
                updatedAt: data.updated_at,
            };
        } catch (error) {
            console.error('Error creating link:', error);
            return null;
        }
    },

    async update(id: string, link: Partial<SiteLinks>): Promise<SiteLinks | null> {
        try {
            const updateData: any = {
                updated_at: new Date().toISOString(),
            };
            if (link.name !== undefined) updateData.name = link.name;
            if (link.url !== undefined) updateData.url = link.url;
            if (link.type !== undefined) updateData.type = link.type;
            if (link.description !== undefined) updateData.description = link.description;

            const { data, error } = await supabase
                .from('site_links')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            return {
                id: data.id,
                name: data.name,
                url: data.url,
                type: data.type,
                description: data.description,
                updatedAt: data.updated_at,
            };
        } catch (error) {
            console.error('Error updating link:', error);
            return null;
        }
    },

    async delete(id: string): Promise<boolean> {
        try {
            const { error } = await supabase
                .from('site_links')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting link:', error);
            return false;
        }
    }
};
