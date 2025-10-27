import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import ejemplo1 from "./ejemplo1.jpg";
import ejemplo2 from "./ejemplo2.jpg";
import ejemplo3 from "./ejemplo3.jpg";
import ejemplo4 from "./ejemplo4.jpg";
import ejemplo5 from "./ejemplo5.jpg";
import ejemplo6 from "./ejemplo6.jpg";
import ejemplo7 from "./ejemplo7.jpg";
import ejemplo8 from "./ejemplo8.jpg";

// --- Datos de eventos ---
const flyers = [
  {
    id: 1,
    title: "8ª Edición Travesía Internacional Laguna del Sauce",
    date: "20 de diciembre 2025",
    location: "Punta del Este",
    img: ejemplo1,
  },
  {
    id: 2,
    title: "OW Full Moon Night",
    date: "03 de enero 2026",
    location: "Punta del Este",
    img: ejemplo2,
  },
  {
    id: 3,
    title: "2ª Edición Travesía Internacional PDA 9 Playa Deportiva",
    date: "17 de enero 2026",
    location: "Punta del Este",
    img: ejemplo3,
  },
  {
    id: 4,
    title: "Travesía Isla Gorriti",
    date: "25 de enero 2026",
    location: "Punta del Este",
    img: ejemplo4,
  },
  {
    id: 5,
    title: "OW Bajo las Estrellas",
    date: "01 de febrero 2026",
    location: "Punta del Este",
    img: ejemplo5,
  },
  {
    id: 6,
    title: "4ª Edición Travesía Internacional Sierra de Minas",
    date: "21 de febrero 2026",
    location: "Minas",
    img: ejemplo6,
  },
  {
    id: 7,
    title: "5ª Edición Punta Ballena Cup",
    date: "13 de marzo 2026",
    location: "Punta Ballena",
    img: ejemplo7,
  },
  {
    id: 8,
    title: "Gala de Premiación 2026",
    date: "03 de abril 2026",
    location: "",
    img: ejemplo8,
  },
];

// --- Helpers ---
const monthNamesES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function parseSpanishDate(str) {
  const re = /^(\d{1,2})\s+de\s+([a-zA-ZñÑ]+)\s+(\d{4})$/i;
  const m = str.trim().toLowerCase().match(re);
  if (!m) return null;
  const day = Number(m[1]);
  const monthName = m[2];
  const year = Number(m[3]);
  const month = monthNamesES.indexOf(monthName);
  if (month === -1) return null;
  return new Date(year, month, day);
}

function formatMonthYear(date) {
  return `${monthNamesES[date.getMonth()].toUpperCase()} ${date.getFullYear()}`;
}

// --- Componente principal ---
export default function CalendarioEventos() {
  const [months, setMonths] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Agrupar eventos por mes
    const grouped = flyers.reduce((acc, f) => {
      const d = parseSpanishDate(f.date);
      if (!d) return acc;
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push({ ...f, _dateObj: d });
      return acc;
    }, {});
    const sortedMonths = Object.keys(grouped)
      .map((k) => new Date(Number(k.split("-")[0]), Number(k.split("-")[1])))
      .sort((a, b) => a - b);
    setMonths(sortedMonths.map((m) => ({ date: m, events: grouped[`${m.getFullYear()}-${m.getMonth()}`] })));
  }, []);

  return (
    <section className="py-12 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          CALENDARIO DE EVENTOS
        </h2>

        <div className="flex flex-col gap-12">
          {months.map(({ date, events }) => (
            <article
              key={date.toISOString()}
              className="bg-gradient-to-b from-gray-800/40 to-black/40 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl md:text-2xl font-semibold">
                  {formatMonthYear(date)}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {events.map((ev, i) => (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedEvent(ev)}
                    className="relative rounded-2xl overflow-hidden border-4 border-teal-400 cursor-pointer hover:scale-[1.02] transition-transform opacity-0 translate-y-6 animate-[fadeInUp_0.7s_ease-out_forwards]"
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      aspectRatio: "16/9",
                    }}
                  >
                    <img
                      src={ev.img}
                      alt={ev.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4">
                      <div className="flex justify-end">
                        <span className="bg-teal-400 text-black px-3 py-1 rounded text-sm font-bold">
                          {ev.date.split(" ")[0]}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{ev.title}</h4>
                        <p className="text-sm opacity-80">{ev.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fadeIn_0.3s_ease-out_forwards]">
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl animate-[scaleUp_0.4s_ease-out_forwards]">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            >
              <X size={20} />
            </button>

            <img
              src={selectedEvent.img}
              alt={selectedEvent.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-5">
              <h3 className="text-2xl font-bold mb-2">{selectedEvent.title}</h3>
              <p className="text-sm text-gray-300 mb-5">{selectedEvent.date}</p>
              {selectedEvent.location && (
                <p className="text-sm text-gray-400 mb-4">
                  {selectedEvent.location}
                </p>
              )}
              <a
                href={`https://wa.me/59899930821?text=${encodeURIComponent(
                  `Hola Diego, quiero participar del evento "${selectedEvent.title}" que se realizará el ${selectedEvent.date} en ${selectedEvent.location}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-black px-4 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                {/* Ícono de WhatsApp */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.1-.472-.149-.67.15-.198.297-.768.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.654-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.204-.242-.58-.487-.502-.67-.511l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.52-5.287c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.896a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.875 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.893c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.474-8.46Z" />
                </svg>
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* --- Animaciones personalizadas --- */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-section {
          opacity: 1 !important;
          transform: translateY(0) !important;
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
