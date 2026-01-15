import { supabase } from '../lib/supabase';
import { Event } from '../types/admin';

export const eventsService = {
    async getAll(): Promise<Event[]> {
        try {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;

            // Transform snake_case to camelCase
            return (data || []).map(event => ({
                id: event.id,
                title: event.title,
                date: event.date,
                location: event.location,
                description: event.description,
                distance: event.distance,
                imageUrl: event.image_url,
                registrationLink: event.registration_link,
                manualUrl: event.manual_url,
                createdAt: event.created_at,
                updatedAt: event.updated_at,
            }));
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    },

    async create(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event | null> {
        try {
            const { data, error } = await supabase
                .from('events')
                .insert([{
                    title: event.title,
                    date: event.date,
                    location: event.location,
                    description: event.description,
                    distance: event.distance,
                    image_url: event.imageUrl,
                    registration_link: event.registrationLink,
                    manual_url: event.manualUrl,
                }])
                .select()
                .single();

            if (error) throw error;

            return {
                id: data.id,
                title: data.title,
                date: data.date,
                location: data.location,
                description: data.description,
                distance: data.distance,
                imageUrl: data.image_url,
                registrationLink: data.registration_link,
                manualUrl: data.manual_url,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
            };
        } catch (error) {
            console.error('Error creating event:', error);
            return null;
        }
    },

    async update(id: string, event: Partial<Event>): Promise<Event | null> {
        try {
            const updateData: any = {};
            if (event.title !== undefined) updateData.title = event.title;
            if (event.date !== undefined) updateData.date = event.date;
            if (event.location !== undefined) updateData.location = event.location;
            if (event.description !== undefined) updateData.description = event.description;
            if (event.distance !== undefined) updateData.distance = event.distance;
            if (event.imageUrl !== undefined) updateData.image_url = event.imageUrl;
            if (event.registrationLink !== undefined) updateData.registration_link = event.registrationLink;
            if (event.manualUrl !== undefined) updateData.manual_url = event.manualUrl;
            updateData.updated_at = new Date().toISOString();

            const { data, error } = await supabase
                .from('events')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            return {
                id: data.id,
                title: data.title,
                date: data.date,
                location: data.location,
                description: data.description,
                distance: data.distance,
                imageUrl: data.image_url,
                registrationLink: data.registration_link,
                manualUrl: data.manual_url,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
            };
        } catch (error) {
            console.error('Error updating event:', error);
            return null;
        }
    },

    async delete(id: string): Promise<boolean> {
        try {
            const { error } = await supabase
                .from('events')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting event:', error);
            return false;
        }
    }
};
