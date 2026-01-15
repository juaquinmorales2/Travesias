import { useEffect, useState } from 'react';
import { linksService } from '../../services/linksService';
import { SiteLinks } from '../../types/admin';

// Icon SVGs
const Icons = {
    instagram: (className: string) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
    ),
    facebook: (className: string) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.675 0h-21.35C.596 0 0 .592 0 1.324v21.352C0 23.404.596 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.404 24 24 23.404 24 22.676V1.324C24 .592 23.404 0 22.675 0z" />
        </svg>
    ),
    youtube: (className: string) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
    ),
    whatsapp: (className: string) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12a11.94 11.94 0 0 0 1.64 6L0 24l6.22-1.63A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zM12 22a9.9 9.9 0 0 1-5.06-1.38l-.36-.21-3.69.97.99-3.6-.23-.37A9.93 9.93 0 1 1 12 22zm5.15-7.47c-.28-.14-1.64-.81-1.89-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.85 1.09-.16.18-.31.2-.59.07-.28-.14-1.18-.43-2.25-1.38-.83-.74-1.38-1.65-1.55-1.93-.16-.28-.02-.43.12-.56.12-.12.28-.31.43-.47.14-.16.18-.28.28-.47.09-.18.05-.34-.02-.47-.07-.14-.61-1.47-.84-2.01-.22-.52-.44-.45-.61-.45-.16 0-.34 0-.52 0a.99.99 0 0 0-.7.33c-.24.25-.91.89-.91 2.18 0 1.28.93 2.52 1.07 2.7.14.18 1.82 2.77 4.42 3.89.62.27 1.1.43 1.47.55.62.2 1.18.17 1.62.1.5-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.06-.12-.25-.2-.53-.33z" />
        </svg>
    ),
    tiktok: (className: string) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.88-2.91 6.31-1.36 1.09-3.42 1.56-5.2 1.12-1.78-.44-3.21-1.77-3.95-3.41-.75-1.64-.63-3.66.32-5.18 1.81-2.9 5.38-3.96 8.35-2.25v4.55c-1.04-.68-2.55-1.67-3.65-.6-1.09 1.06-.75 2.89.26 3.82 1 .93 2.92.83 3.84-.07.9-.88 1.25-2.18 1.25-3.47V2.55c-1.62.01-3.26-.06-4.88.02.01-1.29-.07-2.55.54-3.8z" transform="translate(1.5, 0.5) scale(0.9)" />
        </svg>
    ),
    default: (className: string) => (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
    )
};

const getIconForUrl = (url: string) => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('instagram')) return Icons.instagram;
    if (lowerUrl.includes('facebook')) return Icons.facebook;
    if (lowerUrl.includes('youtube')) return Icons.youtube;
    if (lowerUrl.includes('wa.me') || lowerUrl.includes('whatsapp')) return Icons.whatsapp;
    if (lowerUrl.includes('tiktok')) return Icons.tiktok;
    return Icons.default;
};

// Default hardcoded links (to ensure they are always visible even if DB is empty)
const DEFAULT_LINKS = [
    { id: 'def-insta', name: 'Instagram', url: 'https://www.instagram.com/travesiasuruguay/?__pwa=1' },
    { id: 'def-yt', name: 'YouTube', url: 'https://www.youtube.com/@travesiasuruguay' },
    { id: 'def-wa', name: 'WhatsApp', url: 'https://wa.me/59899930821' },
    { id: 'def-fb', name: 'Facebook', url: 'https://www.facebook.com/travesiadelsauce' }
];

const SocialLinks = () => {
    const [dbLinks, setDbLinks] = useState<SiteLinks[]>([]);

    useEffect(() => {
        const fetchLinks = async () => {
            // Only fetch, don't migrate logic here to avoid side effects
            try {
                const allLinks = await linksService.getAll();
                setDbLinks(allLinks.filter(l => l.type === 'social'));
            } catch (e) {
                console.error("Error fetching social links", e);
            }
        };
        fetchLinks();
    }, []);

    // Merge default links with DB links (avoiding duplicates if URL matches)
    // If a DB link has the same URL as a default link, we favour the DB link (allows editing name/desc)
    // AND we also include any NEW DB links.

    // Normalize URL for comparison
    const normalize = (u: string) => u.toLowerCase().trim();

    const mergedLinks = [...DEFAULT_LINKS];

    // Add DB links if they are not already in defaults
    dbLinks.forEach(dbLink => {
        const isDuplicate = mergedLinks.some(def => normalize(def.url) === normalize(dbLink.url));
        if (!isDuplicate) {
            // Add as new entry
            mergedLinks.push(dbLink);
        } else {
            // Optional: Upgrade default to DB version (if we wanted to support editing defaults)
            // But visually they are just icons, so it doesn't matter much.
        }
    });

    return (
        <div className="flex space-x-6 mb-6 text-center items-center justify-center">
            {mergedLinks.map(link => {
                const Icon = getIconForUrl(link.url);
                return (
                    <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                        title={link.name}
                    >
                        {Icon("w-6 h-6 group-hover:text-teal-200 transition-colors")}
                    </a>
                );
            })}
        </div>
    );
};

export default SocialLinks;
