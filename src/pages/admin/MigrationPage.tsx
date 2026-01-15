import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';

// Import all sponsors
import img1 from '../../components/sections/sponsors/Casa.png';
import img2 from '../../components/sections/sponsors/Lavalleja.jpg';
import img3 from '../../components/sections/sponsors/alfajores.jpg';
import img4 from '../../components/sections/sponsors/asistencial.png';
import img5 from '../../components/sections/sponsors/atlantico.jpg';
import img6 from '../../components/sections/sponsors/casapueblo.jpg';
import img7 from '../../components/sections/sponsors/centenario.png';
import img8 from '../../components/sections/sponsors/clap.jpg';
import img9 from '../../components/sections/sponsors/club.png';
import img10 from '../../components/sections/sponsors/confiteria.png';
import img11 from '../../components/sections/sponsors/enjoy.png';
import img12 from '../../components/sections/sponsors/ferreteria.jpg';
import img13 from '../../components/sections/sponsors/garmin.jpg';
import img14 from '../../components/sections/sponsors/intendencia.png';
import img15 from '../../components/sections/sponsors/irisarri.jpg';
import img16 from '../../components/sections/sponsors/jazz.jpg';
import img17 from '../../components/sections/sponsors/laguna.png';
import img18 from '../../components/sections/sponsors/lapataia.jpg';
import img19 from '../../components/sections/sponsors/municipio.jpg';
import img20 from '../../components/sections/sponsors/museo.jpg';
import img21 from '../../components/sections/sponsors/naval.jpg';
import img22 from '../../components/sections/sponsors/nutri.jpg';
import img23 from '../../components/sections/sponsors/pbi.png';
import img24 from '../../components/sections/sponsors/rnx.png';
import img25 from '../../components/sections/sponsors/rocha.jpg';
import img26 from '../../components/sections/sponsors/talar.jpg';
import img27 from '../../components/sections/sponsors/umami.png';
import img28 from '../../components/sections/sponsors/vikinga.png';
import img29 from '../../components/sections/sponsors/viva.png';
import img30 from '../../components/sections/sponsors/werness.jpg';

// Event Assets
import caboImg from '../../components/public/cabo.jpg';
import sierraImg from '../../components/public/sierraminas.jpg';
import puntaBallenaImg from '../../components/public/puntaballena.jpg';
import ejemplo8Img from '../../components/sections/sponsors/clap.jpg';
import puntamaratonImg from '../../components/public/puntamaraton.jpg';

// PDFs
import interPdf from '../../components/public/inter.pdf';
import sierraPdf from '../../components/public/sierraminas.pdf';
import puntaBallenaPdf from '../../components/public/puntaballena.pdf';

const sponsorsData = [
    { name: 'Casa', src: img1, file: 'Casa.png' },
    // ...
    // (Skipping middle parts)
    // ...
    // 3. Migrate Events
    logMsg('Migrando Eventos...');
const eventsData = [
    {
        title: '2ª Edición Punta Maratón Internacional PDA 9 Playa Mansa',
        date: '2026-01-17',
        location: 'Punta del Este',
        description: '2ª Edición Punta Maratón Internacional PDA 9 Playa Mansa - Una travesía internacional en las aguas de Punta del Este.',
        distance: 'Varias distancias',
        file_source: puntamaratonImg,
        file_name: 'puntamaraton.jpg',
        image_url: '',
        registration_link: 'https://docs.google.com/forms/d/e/1FAIpQLSc8E_wQIR4XdHN1DjVCs1qrQibFEspj-OSlVicAoCjgDjW0fw/viewform',
        manual_source: interPdf,
        manual_name: 'inter.pdf',
        manual_url: ''
    },
    {
        title: 'Travesía Cabo Santa María',
        date: '2026-02-15',
        location: 'La Paloma',
        description: 'Travesía Cabo Santa María - Una experiencia única nadando en las aguas de La Paloma.',
        distance: 'Varias distancias',
        file_source: caboImg,
        file_name: 'cabo.jpg',
        image_url: '',
        registration_link: '',
        manual_url: ''
    },
    {
        title: '4ª Edición Travesía Internacional Sierra de Minas',
        date: '2026-02-21',
        location: 'Minas',
        description: '4ª Edición Travesía Internacional Sierra de Minas - Evento internacional de natación en aguas abiertas.',
        distance: 'Varias distancias',
        file_source: sierraImg,
        file_name: 'sierraminas.jpg',
        image_url: '',
        registration_link: 'https://forms.gle/FvQgnCnjQ6Shw6Nw7',
        manual_source: sierraPdf,
        manual_name: 'sierraminas.pdf',
        manual_url: ''
    },
    {
        title: '5ª Edición Punta Ballena Cup',
        date: '2026-03-13',
        location: 'Punta Ballena',
        description: '5ª Edición Punta Ballena Cup - Copa de natación en aguas abiertas en Punta Ballena.',
        distance: 'Varias distancias',
        file_source: puntaBallenaImg,
        file_name: 'puntaballena.jpg',
        image_url: '',
        registration_link: 'https://forms.gle/XD4ZtYBiZk8hfYMZ9',
        manual_source: puntaBallenaPdf,
        manual_name: 'puntaballena.pdf',
        manual_url: ''
    },
    {
        title: 'Gala de Premiación 2026',
        date: '2026-04-03',
        location: 'Punta del Este',
        description: 'Gala de Premiación 2026 - Ceremonia de premiación para celebrar los logros de la temporada.',
        distance: 'N/A',
        file_source: ejemplo8Img,
        file_name: 'gala.jpg',
        image_url: '',
        registration_link: '',
        manual_url: ''
    }
];

for (const event of eventsData) {
    const { data: existingEvent } = await supabase
        .from('events')
        .select('id')
        .eq('title', event.title)
        .single();

    if (!existingEvent) {
        // Upload Image
        if (event.file_source) {
            try {
                const response = await fetch(event.file_source);
                const blob = await response.blob();
                const file = new File([blob], event.file_name, { type: blob.type });
                const fileName = `events/${event.file_name}`;

                const { error: uploadError } = await supabase.storage
                    .from('images')
                    .upload(fileName, file, { upsert: true });

                if (!uploadError) {
                    const { data: { publicUrl } } = supabase.storage
                        .from('images')
                        .getPublicUrl(fileName);
                    event.image_url = publicUrl;
                }
            } catch (e: any) {
                logMsg(`Error subiendo imagen de evento ${event.title}: ${e.message}`);
            }
        }

        // Upload Manual PDF
        if ((event as any).manual_source) {
            try {
                const response = await fetch((event as any).manual_source);
                const blob = await response.blob();
                const file = new File([blob], (event as any).manual_name, { type: blob.type });
                const fileName = `manuals/${(event as any).manual_name}`; // Using manuals/ subfolder

                const { error: uploadError } = await supabase.storage
                    .from('images') // Keeping same bucket 'images' as per instructions, but using folder
                    .upload(fileName, file, { upsert: true });

                if (!uploadError) {
                    const { data: { publicUrl } } = supabase.storage
                        .from('images')
                        .getPublicUrl(fileName);
                    event.manual_url = publicUrl;
                }
            } catch (e: any) {
                logMsg(`Error subiendo PDF de evento ${event.title}: ${e.message}`);
            }
        }

        // Remove internal fields
        const { file_source, file_name, manual_source, manual_name, ...dbEvent } = event as any;

        const { error: eventError } = await supabase
            .from('events')
            .insert([dbEvent]);

        if (eventError) logMsg(`Error creando evento ${event.title}: ${eventError.message}`);
        else logMsg(`Evento creado: ${event.title}`);
    } else {
        logMsg(`Evento ${event.title} ya existe.`);
    }
}

// 4. Migrate Modal
logMsg('Recuperando Modal Original...');
const { data: existingModal } = await supabase
    .from('modals')
    .select('id')
    .eq('title', 'Promo Inicio')
    .maybeSingle();

if (!existingModal) {
    let modalImageUrl = '';
    let modalManualUrl = '';

    // Upload Modal Image
    try {
        const response = await fetch(puntamaratonImg);
        const blob = await response.blob();
        const file = new File([blob], 'puntamaraton.jpg', { type: blob.type });
        const fileName = `modals/puntamaraton.jpg`;

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(fileName, file, { upsert: true });

        if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);
            modalImageUrl = publicUrl;
        }
    } catch (e: any) { logMsg('Error subiendo imagen modal'); }

    // Upload Modal Manual (inter.pdf)
    try {
        const response = await fetch(interPdf);
        const blob = await response.blob();
        const file = new File([blob], 'inter.pdf', { type: blob.type });
        const fileName = `modals/inter.pdf`;

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(fileName, file, { upsert: true });

        if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);
            modalManualUrl = publicUrl;
        }
    } catch (e: any) { logMsg('Error subiendo PDF modal'); }

    const modalData = {
        title: 'Promo Inicio',
        image_url: modalImageUrl,
        registration_url: 'https://docs.google.com/forms/d/e/1FAIpQLSc8E_wQIR4XdHN1DjVCs1qrQibFEspj-OSlVicAoCjgDjW0fw/viewform',
        manual_url: modalManualUrl,
        active: true,
        delay: 5 // Default delay 5 seconds
    };

    const { error: modalError } = await supabase.from('modals').insert([modalData]);
    if (modalError) logMsg(`Error creando modal: ${modalError.message}`);
    else logMsg(`Modal original restaurado.`);
} else {
    logMsg('El modal ya existe.');
}
{ name: 'Lavalleja', src: img2, file: 'Lavalleja.jpg' },
{ name: 'Alfajores', src: img3, file: 'alfajores.jpg' },
{ name: 'Asistencial', src: img4, file: 'asistencial.png' },
{ name: 'Atlantico', src: img5, file: 'atlantico.jpg' },
{ name: 'Casapueblo', src: img6, file: 'casapueblo.jpg' },
{ name: 'Centenario', src: img7, file: 'centenario.png' },
{ name: 'Clap', src: img8, file: 'clap.jpg' },
{ name: 'Club', src: img9, file: 'club.png' },
{ name: 'Confiteria', src: img10, file: 'confiteria.png' },
{ name: 'Enjoy', src: img11, file: 'enjoy.png' },
{ name: 'Ferreteria', src: img12, file: 'ferreteria.jpg' },
{ name: 'Garmin', src: img13, file: 'garmin.jpg' },
{ name: 'Intendencia', src: img14, file: 'intendencia.png' },
{ name: 'Irisarri', src: img15, file: 'irisarri.jpg' },
{ name: 'Jazz', src: img16, file: 'jazz.jpg' },
{ name: 'Laguna', src: img17, file: 'laguna.png' },
{ name: 'Lapataia', src: img18, file: 'lapataia.jpg' },
{ name: 'Municipio', src: img19, file: 'municipio.jpg' },
{ name: 'Museo', src: img20, file: 'museo.jpg' },
{ name: 'Naval', src: img21, file: 'naval.jpg' },
{ name: 'Nutri', src: img22, file: 'nutri.jpg' },
{ name: 'Pbi', src: img23, file: 'pbi.png' },
{ name: 'Rnx', src: img24, file: 'rnx.png' },
{ name: 'Rocha', src: img25, file: 'rocha.jpg' },
{ name: 'Talar', src: img26, file: 'talar.jpg' },
{ name: 'Umami', src: img27, file: 'umami.png' },
{ name: 'Vikinga', src: img28, file: 'vikinga.png' },
{ name: 'Viva', src: img29, file: 'viva.png' },
{ name: 'Werness', src: img30, file: 'werness.jpg' },
];

const MigrationPage = () => {
    const [log, setLog] = useState<string[]>([]);
    const [migrating, setMigrating] = useState(false);

    const logMsg = (msg: string) => setLog(prev => [...prev, msg]);

    const handleMigration = async () => {
        setMigrating(true);
        setLog([]);
        logMsg('Iniciando migración...');

        try {
            // 1. Migrate Announcements
            logMsg('Migrando Anuncios...');
            const { data: existingAnn } = await supabase
                .from('announcements')
                .select('id')
                .eq('content', "Link de fotos próximamente aqui...")
                .single();

            if (!existingAnn) {
                const { error: annError } = await supabase
                    .from('announcements')
                    .insert([{
                        content: "Link de fotos próximamente aqui...",
                        date: "2025-12-08"
                    }]);
                if (annError) logMsg(`Error en anuncios: ${annError.message}`);
                else logMsg('Anuncios migrados correctamente.');
            } else {
                logMsg('Anuncio ya existe, saltando.');
            }

            // 2. Migrate Sponsors
            logMsg('Migrando Sponsors...');

            for (let i = 0; i < sponsorsData.length; i++) {
                const sponsor = sponsorsData[i];
                logMsg(`Procesando ${sponsor.name}...`);

                try {
                    // Check if sponsor already exists
                    const { data: existingSponsor } = await supabase
                        .from('sponsors')
                        .select('id')
                        .eq('name', sponsor.name)
                        .single();

                    if (existingSponsor) {
                        logMsg(`${sponsor.name} ya existe, saltando.`);
                        continue;
                    }

                    // Fetch blob from local import
                    const response = await fetch(sponsor.src);
                    const blob = await response.blob();
                    const file = new File([blob], sponsor.file, { type: blob.type });

                    const fileName = `sponsors/${sponsor.file}`;

                    // Upload to Storage
                    const { error: uploadError } = await supabase.storage
                        .from('images')
                        .upload(fileName, file, { upsert: true });

                    if (uploadError) {
                        logMsg(`Error subiendo imagen ${sponsor.name}: ${uploadError.message}`);
                        // Continue anyway if image exists or error, we might still reference it
                    }

                    // Get Public URL
                    const { data: { publicUrl } } = supabase.storage
                        .from('images')
                        .getPublicUrl(fileName);

                    // Insert DB Record
                    const { error: dbError } = await supabase
                        .from('sponsors')
                        .insert([{
                            name: sponsor.name,
                            image_url: publicUrl,
                            active: true,
                            order_index: i
                        }]);

                    if (dbError) {
                        logMsg(`Error guardando datos ${sponsor.name}: ${dbError.message}`);
                    } else {
                        logMsg(`OK: ${sponsor.name}`);
                    }

                } catch (e: any) {
                    logMsg(`Error inesperado en ${sponsor.name}: ${e.message}`);
                }
            }

            // 3. Migrate Events
            logMsg('Migrando Eventos...');
            const eventsData = [
                {
                    title: '2ª Edición Punta Maratón Internacional PDA 9 Playa Mansa',
                    date: '2026-01-17', // Converted to YYYY-MM-DD
                    location: 'Punta del Este',
                    description: '2ª Edición Punta Maratón Internacional PDA 9 Playa Mansa - Una travesía internacional en las aguas de Punta del Este.',
                    distance: 'Varias distancias',
                    file_source: puntamaratonImg,
                    file_name: 'puntamaraton.jpg',
                    image_url: '',
                    registration_link: 'https://docs.google.com/forms/d/e/1FAIpQLSc8E_wQIR4XdHN1DjVCs1qrQibFEspj-OSlVicAoCjgDjW0fw/viewform',
                    manual_url: ''
                },
                {
                    title: 'Travesía Cabo Santa María',
                    date: '2026-02-15',
                    location: 'La Paloma',
                    description: 'Travesía Cabo Santa María - Una experiencia única nadando en las aguas de La Paloma.',
                    distance: 'Varias distancias',
                    file_source: caboImg,
                    file_name: 'cabo.jpg',
                    image_url: '',
                    registration_link: '',
                    manual_url: ''
                },
                {
                    title: '4ª Edición Travesía Internacional Sierra de Minas',
                    date: '2026-02-21',
                    location: 'Minas',
                    description: '4ª Edición Travesía Internacional Sierra de Minas - Evento internacional de natación en aguas abiertas.',
                    distance: 'Varias distancias',
                    file_source: sierraImg,
                    file_name: 'sierraminas.jpg',
                    image_url: '',
                    registration_link: 'https://forms.gle/FvQgnCnjQ6Shw6Nw7',
                    manual_url: ''
                },
                {
                    title: '5ª Edición Punta Ballena Cup',
                    date: '2026-03-13',
                    location: 'Punta Ballena',
                    description: '5ª Edición Punta Ballena Cup - Copa de natación en aguas abiertas en Punta Ballena.',
                    distance: 'Varias distancias',
                    file_source: puntaBallenaImg,
                    file_name: 'puntaballena.jpg',
                    image_url: '',
                    registration_link: 'https://forms.gle/XD4ZtYBiZk8hfYMZ9',
                    manual_url: ''
                },
                {
                    title: 'Gala de Premiación 2026',
                    date: '2026-04-03',
                    location: 'Punta del Este',
                    description: 'Gala de Premiación 2026 - Ceremonia de premiación para celebrar los logros de la temporada.',
                    distance: 'N/A',
                    file_source: ejemplo8Img,
                    file_name: 'gala.jpg',
                    image_url: '',
                    registration_link: '',
                    manual_url: ''
                }
            ];

            for (const event of eventsData) {
                const { data: existingEvent } = await supabase
                    .from('events')
                    .select('id')
                    .eq('title', event.title)
                    .single();

                if (!existingEvent) {
                    // Upload Image
                    if (event.file_source) {
                        try {
                            const response = await fetch(event.file_source);
                            const blob = await response.blob();
                            const file = new File([blob], event.file_name, { type: blob.type });
                            const fileName = `events/${event.file_name}`;

                            const { error: uploadError } = await supabase.storage
                                .from('images')
                                .upload(fileName, file, { upsert: true });

                            if (!uploadError) {
                                const { data: { publicUrl } } = supabase.storage
                                    .from('images')
                                    .getPublicUrl(fileName);
                                event.image_url = publicUrl;
                            }
                        } catch (e: any) {
                            logMsg(`Error subiendo imagen de evento ${event.title}: ${e.message}`);
                        }
                    }

                    // Remove internal fields
                    const { file_source, file_name, ...dbEvent } = event as any;

                    const { error: eventError } = await supabase
                        .from('events')
                        .insert([dbEvent]);

                    if (eventError) logMsg(`Error creando evento ${event.title}: ${eventError.message}`);
                    else logMsg(`Evento creado: ${event.title}`);
                } else {
                    logMsg(`Evento ${event.title} ya existe.`);
                }
            }

            logMsg('Migración completada.');

        } catch (error: any) {
            logMsg(`Error general: ${error.message}`);
        } finally {
            setMigrating(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-6">Migración de Datos</h1>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-6">
                    <p className="text-gray-300 mb-4">
                        Esta herramienta migrará los datos "harcoded" (imágenes locales, textos fijos) a Supabase.
                        Asegúrate de haber ejecutado el script SQL de configuración antes de continuar.
                    </p>
                    <button
                        onClick={handleMigration}
                        disabled={migrating}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold disabled:opacity-50"
                    >
                        {migrating ? 'Migrando...' : 'Iniciar Migración'}
                    </button>
                </div>

                <div className="bg-black/50 p-4 rounded-xl border border-gray-800 font-mono text-sm text-green-400 h-96 overflow-y-auto">
                    {log.map((line, i) => (
                        <div key={i}>{line}</div>
                    ))}
                    {log.length === 0 && <span className="text-gray-500">Esperando inicio...</span>}
                </div>
            </div>
        </AdminLayout>
    );
};

export default MigrationPage;
