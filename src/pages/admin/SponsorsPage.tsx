import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Edit, Trash2, Image as ImageIcon, Upload } from 'lucide-react';
import { Sponsor } from '../../types/admin';
import { sponsorsService } from '../../services/sponsorsService';

const SponsorsPage = () => {
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        active: true,
        orderIndex: 0,
    });

    useEffect(() => {
        loadSponsors();
    }, []);

    const loadSponsors = async () => {
        const data = await sponsorsService.getAll();
        setSponsors(data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setUploading(true);
        try {
            const publicUrl = await sponsorsService.uploadImage(file);
            if (publicUrl) {
                setFormData(prev => ({ ...prev, imageUrl: publicUrl }));
            } else {
                alert('Error al subir la imagen. Por favor intenta de nuevo.');
            }
        } catch (error) {
            console.error(error);
            alert('Error al subir la imagen.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingSponsor) {
            const updated = await sponsorsService.update(editingSponsor.id, formData);
            if (updated) {
                setSponsors(sponsors.map(s => s.id === editingSponsor.id ? updated : s));
            }
        } else {
            const newSponsor = await sponsorsService.create(formData);
            if (newSponsor) {
                setSponsors([...sponsors, newSponsor]);
            }
        }

        resetForm();
    };

    const handleEdit = (sponsor: Sponsor) => {
        setEditingSponsor(sponsor);
        setFormData({
            name: sponsor.name,
            imageUrl: sponsor.imageUrl,
            active: sponsor.active,
            orderIndex: sponsor.orderIndex,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Estás seguro de eliminar este sponsor?')) {
            const success = await sponsorsService.delete(id);
            if (success) {
                setSponsors(sponsors.filter(s => s.id !== id));
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            imageUrl: '',
            active: true,
            orderIndex: sponsors.length,
        });
        setEditingSponsor(null);
        setIsModalOpen(false);
    };

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Gestión de Sponsors</h1>
                        <p className="text-gray-400">Administra los logos de los sponsors que aparecen en el sitio</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg"
                    >
                        <Plus size={20} />
                        Agregar Sponsor
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {sponsors.map((sponsor) => (
                        <div
                            key={sponsor.id}
                            className={`bg-white rounded-xl p-4 transition-all relative group ${!sponsor.active ? 'opacity-50' : ''
                                }`}
                        >
                            <div className="aspect-video flex items-center justify-center mb-3">
                                <img
                                    src={sponsor.imageUrl}
                                    alt={sponsor.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-gray-900 truncate" title={sponsor.name}>
                                    {sponsor.name}
                                </p>
                            </div>

                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2 backdrop-blur-sm">
                                <button
                                    onClick={() => handleEdit(sponsor)}
                                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(sponsor.id)}
                                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-lg w-full">
                            <div className="border-b border-gray-800 p-6">
                                <h2 className="text-2xl font-bold text-white">
                                    {editingSponsor ? 'Editar Sponsor' : 'Nuevo Sponsor'}
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Nombre *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="Ej. Intendencia de Maldonado"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Logo *
                                    </label>

                                    <div className="flex gap-4 items-start">
                                        {formData.imageUrl && (
                                            <div className="w-24 h-16 bg-white rounded-lg flex items-center justify-center p-2">
                                                <img
                                                    src={formData.imageUrl}
                                                    alt="Preview"
                                                    className="max-w-full max-h-full object-contain"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                                                <div className="flex flex-col items-center justify-center">
                                                    {uploading ? (
                                                        <span className="text-sm text-gray-400">Subiendo...</span>
                                                    ) : (
                                                        <div className="flex items-center gap-2 text-gray-400">
                                                            <Upload size={16} />
                                                            <span className="text-sm">Subir imagen</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    disabled={uploading}
                                                />
                                            </label>
                                            <input
                                                type="text"
                                                name="imageUrl"
                                                value={formData.imageUrl}
                                                onChange={handleInputChange}
                                                placeholder="O pega una URL directa"
                                                className="w-full mt-2 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Orden
                                        </label>
                                        <input
                                            type="number"
                                            name="orderIndex"
                                            value={formData.orderIndex}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                    </div>
                                    <div className="flex items-center h-full pt-6">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="active"
                                                checked={formData.active}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-yellow-500 focus:ring-yellow-500"
                                            />
                                            <span className="text-gray-300">Activo</span>
                                        </label>
                                    </div>
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
                                        disabled={uploading}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                                    >
                                        {editingSponsor ? 'Actualizar' : 'Guardar'} Sponsor
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

export default SponsorsPage;
