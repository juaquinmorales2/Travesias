import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { modalsService, ModalData } from '../../services/modalsService';
import { supabase } from '../../lib/supabase';
import { Save, Upload, Eye, EyeOff } from 'lucide-react';

const ModalsPage = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ModalData>({
        title: 'Promo Inicio',
        image_url: '',
        registration_url: '',
        manual_url: '',
        active: true
    });
    const [previewImage, setPreviewImage] = useState<string>('');

    useEffect(() => {
        loadModal();
    }, []);

    const loadModal = async () => {
        setLoading(true);
        const data = await modalsService.getActive();
        if (data) {
            setFormData(data);
            setPreviewImage(data.image_url);
        }
        setLoading(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const fileName = `modals/${Date.now()}-${file.name}`;
            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(fileName);

            setFormData(prev => ({ ...prev, image_url: publicUrl }));
            setPreviewImage(publicUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error al subir la imagen');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await modalsService.update(formData);
            alert('Configuración del modal guardada correctamente');
        } catch (error) {
            console.error('Error saving modal:', error);
            alert('Error al guardar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Gestionar Modal de Inicio</h1>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Estado Activo */}
                        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                            <div>
                                <h3 className="text-lg font-medium text-white">Estado del Modal</h3>
                                <p className="text-gray-400 text-sm">Activa o desactiva el modal en la página de inicio</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, active: !prev.active }))}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${formData.active
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                        : 'bg-red-500/20 text-red-400 border border-red-500/50'
                                    }`}
                            >
                                {formData.active ? <><Eye size={18} /> Visible</> : <><EyeOff size={18} /> Oculto</>}
                            </button>
                        </div>

                        {/* Imagen */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Imagen del Modal</label>
                            <div className="flex items-start gap-6">
                                <div className="w-48 h-64 bg-gray-700 rounded-lg overflow-hidden border-2 border-dashed border-gray-600 flex items-center justify-center relative group">
                                    {previewImage ? (
                                        <img src={previewImage} alt="Preview" className="w-full h-full object-contain bg-gray-900" />
                                    ) : (
                                        <div className="text-gray-500 text-center p-4">
                                            <Upload className="mx-auto mb-2" />
                                            <span className="text-xs">Subir imagen</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium pointer-events-none">
                                        Cambiar Imagen
                                    </div>
                                </div>
                                <div className="flex-1 text-sm text-gray-400">
                                    <p className="mb-2">Sube una imagen vertical para mejor visualización en móviles y escritorio.</p>
                                    <p>Formato recomendado: JPG, PNG, WEBP.</p>
                                </div>
                            </div>
                        </div>

                        {/* Enlaces */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Link de Inscripción</label>
                                <input
                                    type="url"
                                    value={formData.registration_url}
                                    onChange={e => setFormData(prev => ({ ...prev, registration_url: e.target.value }))}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 outline-none"
                                    placeholder="https://docs.google.com/forms/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Link del Manual (PDF/Drive)</label>
                                <input
                                    type="url"
                                    value={formData.manual_url}
                                    onChange={e => setFormData(prev => ({ ...prev, manual_url: e.target.value }))}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 outline-none"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-4 border-t border-gray-700 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
                            >
                                <Save size={18} />
                                {loading ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ModalsPage;
