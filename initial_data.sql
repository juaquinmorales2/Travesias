-- ============================================
-- Travesías Uruguay - Initial Data Migration
-- ============================================
-- This script inserts the initial data from the hardcoded events
-- Run this AFTER database_setup.sql

-- ============================================
-- INSERT INITIAL EVENTS
-- ============================================

INSERT INTO events (title, date, location, description, distance, image_url, registration_link, manual_url) VALUES
(
    '2ª Edición Punta Maratón Internacional PDA 9 Playa Mansa',
    '17 de enero 2026',
    'Punta del Este',
    '2ª Edición Punta Maratón Internacional PDA 9 Playa Mansa - Una travesía internacional en las aguas de Punta del Este.',
    'Varias distancias',
    '/cabo.jpg',
    'https://docs.google.com/forms/d/e/1FAIpQLSc8E_wQIR4XdHN1DjVCs1qrQibFEspj-OSlVicAoCjgDjW0fw/viewform',
    '/inter.pdf'
),
(
    'Travesía Cabo Santa María',
    '15 de febrero 2026',
    'La Paloma',
    'Travesía Cabo Santa María - Una experiencia única nadando en las aguas de La Paloma.',
    'Varias distancias',
    '/cabo.jpg',
    NULL,
    NULL
),
(
    '4ª Edición Travesía Internacional Sierra de Minas',
    '21 de febrero 2026',
    'Minas',
    '4ª Edición Travesía Internacional Sierra de Minas - Evento internacional de natación en aguas abiertas.',
    'Varias distancias',
    '/sierraminas.jpg',
    'https://forms.gle/FvQgnCnjQ6Shw6Nw7',
    '/sierraminas.pdf'
),
(
    '5ª Edición Punta Ballena Cup',
    '13 de marzo 2026',
    'Punta Ballena',
    '5ª Edición Punta Ballena Cup - Copa de natación en aguas abiertas en Punta Ballena.',
    'Varias distancias',
    '/puntaballena.jpg',
    'https://forms.gle/XD4ZtYBiZk8hfYMZ9',
    '/puntaballena.pdf'
),
(
    'Gala de Premiación 2026',
    '03 de abril 2026',
    'Punta del Este',
    'Gala de Premiación 2026 - Ceremonia de premiación para celebrar los logros de la temporada.',
    'N/A',
    '/ejemplo8.jpg',
    NULL,
    NULL
);

-- ============================================
-- VERIFY INSERTION
-- ============================================
-- You can run this to verify the data was inserted correctly:
-- SELECT * FROM events ORDER BY date;
