import { supabase } from '../lib/supabase';
import { Announcement } from '../types/admin';

export const announcementsService = {
    async getAll(): Promise<Announcement[]> {
        try {
            const { data, error } = await supabase
                .from('announcements')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;

            return (data || []).map(announcement => ({
                id: announcement.id,
                content: announcement.content,
                date: announcement.date,
                createdAt: announcement.created_at,
                updatedAt: announcement.updated_at,
            }));
        } catch (error) {
            console.error('Error fetching announcements:', error);
            return [];
        }
    },

    async create(announcement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>): Promise<Announcement | null> {
        try {
            const { data, error } = await supabase
                .from('announcements')
                .insert([{
                    content: announcement.content,
                    date: announcement.date,
                }])
                .select()
                .single();

            if (error) throw error;

            return {
                id: data.id,
                content: data.content,
                date: data.date,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
            };
        } catch (error) {
            console.error('Error creating announcement:', error);
            return null;
        }
    },

    async update(id: string, announcement: Partial<Announcement>): Promise<Announcement | null> {
        try {
            const updateData: any = {
                updated_at: new Date().toISOString(),
            };
            if (announcement.content !== undefined) updateData.content = announcement.content;
            if (announcement.date !== undefined) updateData.date = announcement.date;

            const { data, error } = await supabase
                .from('announcements')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            return {
                id: data.id,
                content: data.content,
                date: data.date,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
            };
        } catch (error) {
            console.error('Error updating announcement:', error);
            return null;
        }
    },

    async delete(id: string): Promise<boolean> {
        try {
            const { error } = await supabase
                .from('announcements')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting announcement:', error);
            return false;
        }
    }
};
