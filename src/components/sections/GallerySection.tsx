import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

// Imágenes
import ejemplo1 from "../public/laguna.png";
import ejemplo2 from "../public/cabo.jpg";
import ejemplo3 from "../public/puntamaraton.jpg";
import ejemplo6 from "../public/sierraminas.jpg";
import ejemplo7 from "../public/puntaballena.jpg";
import ejemplo8 from "./ejemplo8.jpg";

// PDFs (asegúrate de que existan en /manuals/)
import LagunaPDF from "../public/laguna.pdf";
import PDA9PDF from "../public/inter.pdf";
import MinasPDF from "../public/sierraminas.pdf";
import BallenaPDF from "../public/puntaballena.pdf";

// --- Datos de eventos ---
const flyers = [
  {
    id: 1,
    title: "8ª Edición Travesía Internacional Laguna del Sauce",
    date: "20 de diciembre 2025",
    location: "Punta del Este",
    img: ejemplo1,
    inscripcion: "https://forms.gle/inscripcionLaguna",
    manual: LagunaPDF,
  },
  {
    id: 3,
    title: "2ª Edición Travesía Internacional PDA 9 Playa Deportiva",
    date: "17 de enero 2026",
    location: "Punta del Este",
    img: ejemplo3,
    inscripcion: "https://forms.gle/inscripcionPDA9",
    manual: PDA9PDF,
  },
  {
    id: 5,
    title: "Travesía Cabo Santa María",
    date: "15 de febrero 2026",
    location: "La Paloma",
    img: ejemplo2,
    inscripcion: "https://forms.gle/inscripcionCabo",
  },
  {
    id: 6,
    title: "4ª Edición Travesía Internacional Sierra de Minas",
    date: "21 de febrero 2026",
    location: "Minas",
    img: ejemplo6,
    inscripcion: "https://forms.gle/inscripcionMinas",
    manual: MinasPDF,
  },
  {
    id: 7,
    title: "5ª Edición Punta Ballena Cup",
    date: "13 de marzo 2026",
    location: "Punta Ballena",
    img: ejemplo7,
    inscripcion: "https://forms.gle/inscripcionBallena",
    manual: BallenaPDF,
  },
  {
    id: 8,
    title: "Gala de Premiación 2026",
    date: "03 de abril 2026",
    location: "",
    img: ejemplo8,
    inscripcion: "https://forms.gle/inscripcionGala",
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
                    }}
                  >
                    <img
                      src={ev.img}
                      alt={ev.title}
                      className="w-full h-auto object-contain"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4">
                      <div className="flex justify-end">
                        <span className="bg-teal-400 text-black px-3 py-1 rounded text-sm font-bold">
                          {ev.date.split(" ")[0]}
                        </span>
                      </div>
                      <div><h4
  className="font-bold text-3xl"
  style={{
    color: "white",
    textShadow: `
      -1px -1px 0 #000,  
       1px -1px 0 #000,
      -1px  1px 0 #000,
       1px  1px 0 #000
    `
  }}
>
  {ev.title}
</h4>


                        <p className="text-sm opacity-80"style={{
    color: "white",
    textShadow: `
      -1px -1px 0 #000,  
       1px -1px 0 #000,
      -1px  1px 0 #000,
       1px  1px 0 #000
    `
  }}>{ev.location}</p>
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
    <div className="relative bg-gray-900 rounded-2xl overflow-hidden max-w-lg w-full max-h-[120vh] shadow-2xl animate-[scaleUp_0.4s_ease-out_forwards] flex flex-col">
      <button
        onClick={() => setSelectedEvent(null)}
        className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
      >
        <X size={20} />
      </button>

      <div className="overflow-y-auto p-5 flex-1 flex flex-col gap-4">
        <img
          src={selectedEvent.img}
          alt={selectedEvent.title}
          className="w-full h-auto max-h-64 object-contain mx-auto"
        />

        <h3 className="text-2xl font-bold">{selectedEvent.title}</h3>
        <p className="text-sm text-gray-300">{selectedEvent.date}</p>
        {selectedEvent.location && (
          <p className="text-sm text-gray-400">{selectedEvent.location}</p>
        )}

        {/* BOTONES */}
        <div className="flex flex-col items-center justify-center gap-4 mt-4">
          <div className="flex gap-4 w-full">
            <a
              href={selectedEvent.inscripcion}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-purple-600 hover:bg-purple-700 transition rounded-xl px-4 py-2 text-white font-semibold text-lg text-center shadow-lg flex items-center justify-center gap-2"
            >
              <img
                src="https://images.emojiterra.com/google/android-11/1024px/1f4dd.png"
                className="w-6 h-6"
                alt="Google Forms"
              />
              Inscribirme
            </a>

            <a
              href={selectedEvent.manual}
              download={`Manual-${selectedEvent.title}.pdf`}
              className="flex-1 bg-blue-600 hover:bg-blue-700 transition rounded-xl px-2 py-2 text-white font-semibold text-lg text-center shadow-lg flex items-center justify-center gap-2"
            >
              📘 Manual
            </a>
          </div>

          <a
            href={`https://wa.me/59899930821?text=${encodeURIComponent(
              `Hola, quiero más información sobre el evento "${selectedEvent.title}" del ${selectedEvent.date}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-600 hover:bg-green-700 transition rounded-xl px-4 py-3 text-white font-semibold text-lg text-center shadow-lg flex items-center justify-center gap-3"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              className="w-7 h-7"
              alt="WhatsApp"
            />
            Más información
          </a>
        </div>
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
      `}</style>
    </section>
  );
}
