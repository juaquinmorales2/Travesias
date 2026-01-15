import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Edit, Trash2, Megaphone } from 'lucide-react';
import { Announcement } from '../../types/admin';
import { announcementsService } from '../../services/announcementsService';

const AnnouncementsPage = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
    const [formData, setFormData] = useState({
        content: '',
        date: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        loadAnnouncements();
    }, []);

    const loadAnnouncements = async () => {
        const data = await announcementsService.getAll();
        setAnnouncements(data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingAnnouncement) {
            const updated = await announcementsService.update(editingAnnouncement.id, formData);
            if (updated) {
                setAnnouncements(announcements.map(ann => ann.id === editingAnnouncement.id ? updated : ann));
            }
        } else {
            const newAnnouncement = await announcementsService.create(formData);
            if (newAnnouncement) {
                setAnnouncements([...announcements, newAnnouncement]);
            }
        }

        resetForm();
    };

    const handleEdit = (announcement: Announcement) => {
        setEditingAnnouncement(announcement);
        setFormData({
            content: announcement.content,
            date: announcement.date,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Estás seguro de eliminar este anuncio?')) {
            const success = await announcementsService.delete(id);
            if (success) {
                setAnnouncements(announcements.filter(ann => ann.id !== id));
            }
        }
    };

    const resetForm = () => {
        setFormData({
            content: '',
            date: new Date().toISOString().split('T')[0],
        });
        setEditingAnnouncement(null);
        setIsModalOpen(false);
    };

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Gestión de Anuncios</h1>
                        <p className="text-gray-400">Administra las novedades y anuncios del sitio web</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-400 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg"
                    >
                        <Plus size={20} />
                        Agregar Anuncio
                    </button>
                </div>

                {announcements.length === 0 ? (
                    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-12 text-center">
                        <Megaphone className="mx-auto text-gray-600 mb-4" size={64} />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">No hay anuncios publicados</h3>
                        <p className="text-gray-500 mb-6">Comienza agregando tu primer anuncio</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all"
                        >
                            Crear Primer Anuncio
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {announcements.map((announcement) => (
                            <div
                                key={announcement.id}
                                className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <p className="text-white mb-2">{announcement.content}</p>
                                        <span className="text-sm text-gray-500">
                                            {new Date(announcement.date).toLocaleDateString('es-UY', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(announcement)}
                                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all"
                                            title="Editar"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(announcement.id)}
                                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full">
                            <div className="border-b border-gray-800 p-6">
                                <h2 className="text-2xl font-bold text-white">
                                    {editingAnnouncement ? 'Editar Anuncio' : 'Nuevo Anuncio'}
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Fecha de Publicación *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        required
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Contenido del Anuncio *
                                    </label>
                                    <textarea
                                        name="content"
                                        required
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        rows={5}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        placeholder="Escribe el anuncio aquí..."
                                    />
                                    <p className="text-sm text-gray-500 mt-2">
                                        Este anuncio se mostrará en la sección de Novedades del sitio web
                                    </p>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-lg transition-all"
                                    >
                                        {editingAnnouncement ? 'Actualizar' : 'Publicar'} Anuncio
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AnnouncementsPage;
