import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Calendar, Megaphone, Link, TrendingUp } from 'lucide-react';
import { eventsService } from '../../services/eventsService';
import { announcementsService } from '../../services/announcementsService';
import { linksService } from '../../services/linksService';

const DashboardPage = () => {
    const [stats, setStats] = useState({
        events: 0,
        announcements: 0,
        links: 0,
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        const [events, announcements, links] = await Promise.all([
            eventsService.getAll(),
            announcementsService.getAll(),
            linksService.getAll(),
        ]);

        setStats({
            events: events.length,
            announcements: announcements.length,
            links: links.length,
        });
    };

    const statCards = [
        {
            title: 'Eventos Activos',
            value: stats.events,
            icon: Calendar,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-500/20',
            borderColor: 'border-blue-500/30',
        },
        {
            title: 'Anuncios Publicados',
            value: stats.announcements,
            icon: Megaphone,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-500/20',
            borderColor: 'border-purple-500/30',
        },
        {
            title: 'Enlaces Configurados',
            value: stats.links,
            icon: Link,
            color: 'from-teal-500 to-teal-600',
            bgColor: 'bg-teal-500/20',
            borderColor: 'border-teal-500/30',
        },
    ];

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-gray-400">Bienvenido al panel de administración de Travesías Uruguay</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {statCards.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.title}
                                className={`${stat.bgColor} border ${stat.borderColor} rounded-xl p-6 backdrop-blur-sm`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg`}>
                                        <Icon className="text-white" size={24} />
                                    </div>
                                    <TrendingUp className="text-gray-500" size={20} />
                                </div>
                                <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
                                <p className="text-3xl font-bold text-white">{stat.value}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Acciones Rápidas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a
                            href="/admin/events"
                            className="flex items-center gap-3 p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg transition-all group"
                        >
                            <Calendar className="text-blue-400 group-hover:scale-110 transition-transform" size={24} />
                            <div>
                                <h3 className="font-medium text-white">Agregar Evento</h3>
                                <p className="text-sm text-gray-400">Crear nuevo evento deportivo</p>
                            </div>
                        </a>

                        <a
                            href="/admin/announcements"
                            className="flex items-center gap-3 p-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg transition-all group"
                        >
                            <Megaphone className="text-purple-400 group-hover:scale-110 transition-transform" size={24} />
                            <div>
                                <h3 className="font-medium text-white">Publicar Anuncio</h3>
                                <p className="text-sm text-gray-400">Compartir novedades</p>
                            </div>
                        </a>

                        <a
                            href="/admin/links"
                            className="flex items-center gap-3 p-4 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20 rounded-lg transition-all group"
                        >
                            <Link className="text-teal-400 group-hover:scale-110 transition-transform" size={24} />
                            <div>
                                <h3 className="font-medium text-white">Gestionar Enlaces</h3>
                                <p className="text-sm text-gray-400">Actualizar PDFs y URLs</p>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/20 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-2">Estado de Conexión</h2>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                        <span className="text-yellow-400 font-medium">Modo Local (Sin Supabase)</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Los datos actualmente se almacenan de forma local. Una vez que se configure Supabase,
                        todos los cambios se sincronizarán automáticamente con la base de datos.
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DashboardPage;
