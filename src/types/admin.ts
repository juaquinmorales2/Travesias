// Data types for Supabase integration

export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
    distance: string;
    imageUrl?: string;
    registrationLink?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Announcement {
    id: string;
    content: string;
    date: string;
    createdAt: string;
    updatedAt: string;
}

export interface SiteLinks {
    id: string;
    name: string;
    url: string;
    type: 'pdf' | 'external' | 'social';
    description?: string;
    updatedAt: string;
}

export interface VideoLink {
    id: string;
    title: string;
    youtubeUrl: string;
    section: 'hero' | 'announcements';
    order: number;
    createdAt: string;
}
