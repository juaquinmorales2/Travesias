import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Edit, Trash2, Calendar, MapPin, Info } from 'lucide-react';
import { Event } from '../../types/admin';
import { eventsService } from '../../services/eventsService';

const EventsPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        location: '',
        description: '',
        distance: '',
        imageUrl: '',
        registrationLink: '',
    });

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        const data = await eventsService.getAll();
        setEvents(data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingEvent) {
            // Update existing event
            const updated = await eventsService.update(editingEvent.id, formData);
            if (updated) {
                setEvents(events.map(ev => ev.id === editingEvent.id ? updated : ev));
            }
        } else {
            // Create new event
            const newEvent = await eventsService.create(formData);
            if (newEvent) {
                setEvents([...events, newEvent]);
            }
        }

        resetForm();
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            date: event.date,
            location: event.location,
            description: event.description,
            distance: event.distance,
            imageUrl: event.imageUrl || '',
            registrationLink: event.registrationLink || '',
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Estás seguro de eliminar este evento?')) {
            const success = await eventsService.delete(id);
            if (success) {
                setEvents(events.filter(ev => ev.id !== id));
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            date: '',
            location: '',
            description: '',
            distance: '',
            imageUrl: '',
            registrationLink: '',
        });
        setEditingEvent(null);
        setIsModalOpen(false);
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Gestión de Eventos</h1>
                        <p className="text-gray-400">Administra los eventos deportivos de natación</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold rounded-lg hover:from-teal-500 hover:to-teal-600 transition-all shadow-lg"
                    >
                        <Plus size={20} />
                        Agregar Evento
                    </button>
                </div>

                {/* Events List */}
                {events.length === 0 ? (
                    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-12 text-center">
                        <Calendar className="mx-auto text-gray-600 mb-4" size={64} />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">No hay eventos registrados</h3>
                        <p className="text-gray-500 mb-6">Comienza agregando tu primer evento deportivo</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-3 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 rounded-lg transition-all"
                        >
                            Crear Primer Evento
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden hover:border-teal-500/50 transition-all"
                            >
                                {event.imageUrl && (
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-white mb-3">{event.title}</h3>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <Calendar size={16} />
                                            <span>{new Date(event.date).toLocaleDateString('es-UY')}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <MapPin size={16} />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <Info size={16} />
                                            <span>{event.distance}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(event)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all"
                                        >
                                            <Edit size={16} />
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event.id)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all"
                                        >
                                            <Trash2 size={16} />
                                            Eliminar
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
                        <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 z-10">
                                <h2 className="text-2xl font-bold text-white">
                                    {editingEvent ? 'Editar Evento' : 'Nuevo Evento'}
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Título del Evento *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        placeholder="ej. Travesía del Sauce 2025"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Fecha *
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            required
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Distancia *
                                        </label>
                                        <input
                                            type="text"
                                            name="distance"
                                            required
                                            value={formData.distance}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                                            placeholder="ej. 3km, 5km"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Ubicación *
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        required
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        placeholder="ej. Punta del Este, Maldonado"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Descripción *
                                    </label>
                                    <textarea
                                        name="description"
                                        required
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        placeholder="Descripción detallada del evento..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        URL de Imagen
                                    </label>
                                    <input
                                        type="url"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Enlace de Inscripción
                                    </label>
                                    <input
                                        type="url"
                                        name="registrationLink"
                                        value={formData.registrationLink}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        placeholder="https://inscripciones.com"
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
                                        {editingEvent ? 'Actualizar' : 'Crear'} Evento
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

export default EventsPage;
