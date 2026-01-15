import { supabase } from '../lib/supabase';

export interface ModalData {
    id?: string;
    title: string;
    image_url: string;
    registration_url: string;
    manual_url: string;
    active: boolean;
    delay?: number; // seconds
}

export const modalsService = {
    async getActive(): Promise<ModalData | null> {
        try {
            const { data, error } = await supabase
                .from('modals')
                .select('*')
                .eq('active', true)
                .limit(1)
                .maybeSingle();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching modal:', error);
            return null;
        }
    },

    async update(data: ModalData): Promise<ModalData | null> {
        try {
            // Check if we have any record, if not insert, else update first found
            const { data: existing } = await supabase
                .from('modals')
                .select('id')
                .limit(1)
                .maybeSingle();

            if (existing) {
                const { data: updated, error } = await supabase
                    .from('modals')
                    .update(data)
                    .eq('id', existing.id)
                    .select()
                    .single();

                if (error) throw error;
                return updated;
            } else {
                const { data: inserted, error } = await supabase
                    .from('modals')
                    .insert([data])
                    .select()
                    .single();

                if (error) throw error;
                return inserted;
            }
        } catch (error) {
            console.error('Error updating modal:', error);
            throw error;
        }
    }
};
