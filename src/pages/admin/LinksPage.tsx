import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Edit, Trash2, Link as LinkIcon, ExternalLink, FileText } from 'lucide-react';
import { SiteLinks } from '../../types/admin';
import { linksService } from '../../services/linksService';

const LinksPage = () => {
    const [links, setLinks] = useState<SiteLinks[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLink, setEditingLink] = useState<SiteLinks | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        type: 'external' as 'pdf' | 'external' | 'social',
        description: '',
    });

    useEffect(() => {
        loadLinks();
    }, []);

    const loadLinks = async () => {
        const data = await linksService.getAll();
        setLinks(data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingLink) {
            const updated = await linksService.update(editingLink.id, formData);
            if (updated) {
                setLinks(links.map(link => link.id === editingLink.id ? updated : link));
            }
        } else {
            const newLink = await linksService.create(formData);
            if (newLink) {
                setLinks([...links, newLink]);
            }
        }

        resetForm();
    };

    const handleEdit = (link: SiteLinks) => {
        setEditingLink(link);
        setFormData({
            name: link.name,
            url: link.url,
            type: link.type,
            description: link.description || '',
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Estás seguro de eliminar este enlace?')) {
            const success = await linksService.delete(id);
            if (success) {
                setLinks(links.filter(link => link.id !== id));
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            url: '',
            type: 'external',
            description: '',
        });
        setEditingLink(null);
        setIsModalOpen(false);
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'pdf':
                return <FileText size={18} />;
            case 'social':
                return <LinkIcon size={18} />;
            default:
                return <ExternalLink size={18} />;
        }
    };

    const getTypeBadge = (type: string) => {
        const styles = {
            pdf: 'bg-red-500/20 text-red-300 border-red-500/30',
            social: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
            external: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        };
        const labels = {
            pdf: 'PDF',
            social: 'Red Social',
            external: 'Enlace Externo',
        };
        return (
            <span className={`px-2 py-1 text-xs border rounded ${styles[type as keyof typeof styles]}`}>
                {labels[type as keyof typeof labels]}
            </span>
        );
    };

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Gestión de Enlaces y PDFs</h1>
                        <p className="text-gray-400">Administra los enlaces, PDFs y redes sociales del sitio</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold rounded-lg hover:from-teal-500 hover:to-teal-600 transition-all shadow-lg"
                    >
                        <Plus size={20} />
                        Agregar Enlace
                    </button>
                </div>

                {links.length === 0 ? (
                    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-12 text-center">
                        <LinkIcon className="mx-auto text-gray-600 mb-4" size={64} />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">No hay enlaces configurados</h3>
                        <p className="text-gray-500 mb-6">Comienza agregando enlaces a PDFs, redes sociales o sitios externos</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-3 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 rounded-lg transition-all"
                        >
                            Crear Primer Enlace
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {links.map((link) => (
                            <div
                                key={link.id}
                                className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 hover:border-teal-500/50 transition-all"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="p-3 bg-teal-500/20 rounded-lg text-teal-300">
                                            {getTypeIcon(link.type)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="text-lg font-semibold text-white">{link.name}</h3>
                                                {getTypeBadge(link.type)}
                                            </div>
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-teal-400 hover:text-teal-300 text-sm flex items-center gap-1 mb-2"
                                            >
                                                {link.url}
                                                <ExternalLink size={14} />
                                            </a>
                                            {link.description && (
                                                <p className="text-gray-400 text-sm">{link.description}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(link)}
                                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all"
                                            title="Editar"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(link.id)}
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
                                    {editingLink ? 'Editar Enlace' : 'Nuevo Enlace'}
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Nombre del Enlace *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        placeholder="ej. Reglamento de Competición"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Tipo de Enlace *
                                    </label>
                                    <select
                                        name="type"
                                        required
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    >
                                        <option value="external">Enlace Externo</option>
                                        <option value="pdf">Documento PDF</option>
                                        <option value="social">Red Social</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        URL *
                                    </label>
                                    <input
                                        type="url"
                                        name="url"
                                        required
                                        value={formData.url}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        placeholder="https://ejemplo.com/documento.pdf"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Descripción (Opcional)
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        placeholder="Descripción breve del enlace..."
                                    />
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
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white font-semibold rounded-lg transition-all"
                                    >
                                        {editingLink ? 'Actualizar' : 'Crear'} Enlace
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

export default LinksPage;
