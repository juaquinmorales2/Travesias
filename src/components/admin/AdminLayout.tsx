import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Custom Premium Icons
const Icons = {
    Dashboard: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect x="3" y="3" width="7" height="9" rx="1" />
            <rect x="14" y="3" width="7" height="5" rx="1" />
            <rect x="14" y="12" width="7" height="9" rx="1" />
            <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
    ),
    Events: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
            <path d="M16 14h.01" />
            <path d="M8 18h.01" />
            <path d="M12 18h.01" />
            <path d="M16 18h.01" />
        </svg>
    ),
    Announcements: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M8 10h8" />
            <path d="M8 14h4" />
        </svg>
    ),
    Links: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    ),
    Sponsors: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
        </svg>
    ),
    Modal: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <rect x="7" y="7" width="10" height="10" rx="1" />
            <line x1="12" y1="12" x2="12" y2="12" />
        </svg>
    ),
    Migration: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
    ),
    Home: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    Logout: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    )
};

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const menuItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: Icons.Dashboard },
        { path: '/admin/events', label: 'Eventos', icon: Icons.Events },
        { path: '/admin/announcements', label: 'Anuncios', icon: Icons.Announcements },
        { path: '/admin/links', label: 'Enlaces y PDFs', icon: Icons.Links },
        { path: '/admin/sponsors', label: 'Sponsors', icon: Icons.Sponsors },
        { path: '/admin/modals', label: 'Pop-up Inicio', icon: Icons.Modal },
        { path: '/admin/migrate', label: 'Migración', icon: Icons.Migration },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* Top Navigation */}
            <nav className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-bold text-white tracking-wider">TRAVESÍAS <span className="text-teal-400">URUGUAY</span></h1>
                            <span className="bg-gray-800 text-teal-300 text-xs px-2 py-0.5 rounded border border-gray-700">Admin</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors hover:bg-white/5 rounded-full"
                            >
                                <Icons.Home className="w-4 h-4" />
                                <span>Ver Sitio Web</span>
                            </a>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-full transition-all border border-red-500/20"
                            >
                                <Icons.Logout className="w-4 h-4" />
                                <span>Salir</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-900/60 border-r border-gray-800 min-h-[calc(100vh-4rem)] sticky top-16 hidden md:block backdrop-blur-sm">
                    <div className="p-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 pl-2">Menú Principal</p>
                        <nav className="space-y-1">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group duration-200 ${isActive
                                            ? 'bg-teal-500/10 text-teal-300 border border-teal-500/20 shadow-[0_0_15px_-3px_rgba(20,184,166,0.2)]'
                                            : 'text-gray-400 hover:bg-gray-800/50 hover:text-white border border-transparent'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-teal-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                                        <span className={`font-medium ${isActive ? 'text-white' : ''}`}>{item.label}</span>
                                        {isActive && (
                                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
