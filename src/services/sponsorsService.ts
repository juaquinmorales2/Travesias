import { supabase } from '../lib/supabase';
import { Sponsor } from '../types/admin';

export const sponsorsService = {
    async getAll(): Promise<Sponsor[]> {
        try {
            const { data, error } = await supabase
                .from('sponsors')
                .select('*')
                .order('order_index', { ascending: true });

            if (error) throw error;

            return (data || []).map(sponsor => ({
                id: sponsor.id,
                name: sponsor.name,
                imageUrl: sponsor.image_url,
                active: sponsor.active,
                orderIndex: sponsor.order_index,
                createdAt: sponsor.created_at,
                updatedAt: sponsor.updated_at,
            }));
        } catch (error) {
            console.error('Error fetching sponsors:', error);
            return [];
        }
    },

    async create(sponsor: Omit<Sponsor, 'id' | 'createdAt' | 'updatedAt'>): Promise<Sponsor | null> {
        try {
            const { data, error } = await supabase
                .from('sponsors')
                .insert([{
                    name: sponsor.name,
                    image_url: sponsor.imageUrl,
                    active: sponsor.active ?? true,
                    order_index: sponsor.orderIndex ?? 0,
                }])
                .select()
                .single();

            if (error) throw error;

            return {
                id: data.id,
                name: data.name,
                imageUrl: data.image_url,
                active: data.active,
                orderIndex: data.order_index,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
            };
        } catch (error) {
            console.error('Error creating sponsor:', error);
            return null;
        }
    },

    async update(id: string, sponsor: Partial<Sponsor>): Promise<Sponsor | null> {
        try {
            const updateData: any = {
                updated_at: new Date().toISOString(),
            };
            if (sponsor.name !== undefined) updateData.name = sponsor.name;
            if (sponsor.imageUrl !== undefined) updateData.image_url = sponsor.imageUrl;
            if (sponsor.active !== undefined) updateData.active = sponsor.active;
            if (sponsor.orderIndex !== undefined) updateData.order_index = sponsor.orderIndex;

            const { data, error } = await supabase
                .from('sponsors')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            return {
                id: data.id,
                name: data.name,
                imageUrl: data.image_url,
                active: data.active,
                orderIndex: data.order_index,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
            };
        } catch (error) {
            console.error('Error updating sponsor:', error);
            return null;
        }
    },

    async delete(id: string): Promise<boolean> {
        try {
            const { error } = await supabase
                .from('sponsors')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting sponsor:', error);
            return false;
        }
    },

    async uploadImage(file: File): Promise<string | null> {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `sponsors/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    }
};
