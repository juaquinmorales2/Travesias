import React, { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import desenchufate from './SINFILTROS.jpg';
import cadaloco from './cadaloco.jpg';
import deportes from './hablemos.jpg';
import hector from './cocina.jpeg';

const columns = [
  {
    title: "Sin Filtros",
    background: desenchufate,
    tracks: [
      {
        id: "IQLXM24UHSw",
        url: "https://www.youtube.com/live/IQLXM24UHSw?si=hko3y6502WN-YDwT",
        title: "La empatía en el deporte"
      },
      {
        id: "EeWJdnok9FM",
        url: "https://www.youtube.com/live/EeWJdnok9FM?si=5WKA3HMpqjFdzen9",
        title: "Encontrar Equilibrio en la vida"
      },
      {
        id: "24bRPEWwQnE",
        url: "https://www.youtube.com/live/24bRPEWwQnE?si=2Z3xP6OUtNEaJMLg",
        title: "Hoy Hablamos de Sexualidad"
      },
      {
        id: "yNifIpxKukU",
        url: "https://www.youtube.com/live/yNifIpxKukU?si=0wOy4J_I-GLgftxf",
        title: "Lanzamiento Oficial"
      },
    ],
  },
  {
    title: "Hablemos de Deporte",
    background: deportes,
    tracks: [
      {
        id: "zM5ty6-A3XA",
        url: "https://www.youtube.com/watch?v=pe6X6F0zpEs",
        title: "Proximamente"
      },
      {
        id: "",
        url: "https://youtube.com",
        title: "proximamente"
      },
      {
        id: "",
        url: "https://youtube.com",
        title: "proximamente"
      },
      {
        id: "",
        url: "https://youtube.com",
        title: "proximamente"
      },
    ],
  },
  {
    title: "Cocina Simple Pero Sabrosa",
    background: hector,
    tracks: [
      {
        id: "",
        url: "https://youtube.com",
        title: "Proximamente"
      },
      {
        id: "",
        url: "https://youtube.com",
        title: "proximamente"
      },
      {
        id: "",
        url: "https://youtube.com",
        title: "proximamente"
      },
      {
        id: "",
        url: "https://youtube.com",
        title: "proximamente"
      },
    ],
  },
  {
    title: "Cada Loco con su Tema",
    background: cadaloco,
    tracks: [
      {
        id: "DDf_5Td-xeM",
        url: "https://www.youtube.com/live/DDf_5Td-xeM?si=6A0Kw7P51szf09CN",
        title: "Psicología y Salud Mental"
      },
      {
        id: "eY4GM1Nqhn0",
        url: "https://www.youtube.com/live/eY4GM1Nqhn0?si=oYUyIeWdpposVg7z",
        title: "Anecdotas de la noche"
      },
      {
        id: "4racqJXtVls",
        url: "https://www.youtube.com/live/4racqJXtVls?si=xyr22CDGFKAPtnb8",
        title: "Unpopular Opinions"
      },
      {
        id: "OL-N_X8SCyY",
        url: "https://www.youtube.com/live/OL-N_X8SCyY?si=pykeAb2c-wUM2FrV",
        title: "Primera Transmisión"
      },
    ],
  },
];

const MusicSection = () => {
  const sectionRef = useRef(null);
  const { inView } = useInView(sectionRef, { threshold: 0.1 });
  const [openTracks, setOpenTracks] = useState({});

  const toggleTrack = (colIndex, trackId) => {
    const key = `${colIndex}-${trackId}`;
    setOpenTracks(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getButtonColor = (title) => {
    switch (title) {
      case "Sin Filtros":
        return "bg-[#947e6c] hover:bg-[#947e6c]";
      case "Hablemos de Deporte":
        return "bg-[#4ef408] hover:bg-green-400";
      case "Cada Loco con su Tema":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-amber-400 hover:bg-amber-500";
    }
  };

  return (
    <section
      id="Programas"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="container mx-auto lg:px-20 px-4 mt-20 mb-10">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${inView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
              }`}
          >
            Revive Nuestros Programas
          </h2>
          <p
            className={`text-gray-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${inView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
              }`}
          >
            Mira los últimos programas, y revive todo el entretenimiento, risas y los momentos que solo te da Navegando TV.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {columns.map((column, colIndex) => {
            const bgStyle = {
              backgroundImage: `url(${column.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            };

            return (
              <div
                key={colIndex}
                className={`relative rounded-lg overflow-hidden shadow-xl transition-all duration-700 delay-${colIndex * 300} ${inView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
                  }`}
                style={bgStyle}
              >
                <div className="absolute inset-0 bg-black/70"></div>

                <div className="relative p-5 text-white">
                  <h3 className="text-2xl font-bold mb-6">{column.title}</h3>

                  {column.tracks.map((track) => {
                    const key = `${colIndex}-${track.id}`;
                    const isOpen = !!openTracks[key];

                    return (
                      <div key={track.id || track.title} className="mb-6">
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-semibold">{track.title}</h4>
                          <button
                            onClick={() => toggleTrack(colIndex, track.id)}
                            className={`${getButtonColor(column.title)} p-2 rounded-full transition-colors flex items-center justify-center`}
                            aria-label={`${isOpen ? 'Cerrar' : 'Reproducir'} ${track.title}`}
                          >
                            <Play size={18} color="white" className="ml-1" />
                          </button>
                        </div>

                        {isOpen && (
                          <div className="mt-3 aspect-w-16 text-center aspect-h-14 rounded overflow-hidden shadow-lg">
                            <iframe
                              loading="lazy"
                              className="w-full h-60"
                              src={`https://www.youtube-nocookie.com/embed/${track.id}?rel=0&showinfo=0&autoplay=1`}
                              title={track.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              key={track.id}
                            ></iframe>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div className="mt-6">
                    <a
                      href="https://www.youtube.com/@NAVEGANDO-TV"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 transition-colors text-white font-semibold px-4 py-2 rounded-full"
                    >
                      <img
                        src="https://img.icons8.com/?size=100&id=37326&format=png&color=FFFFFF"
                        className="h-8 w-8"
                        alt="YouTube icono"
                        width="32"
                        height="32"
                      />
                      Ver más en YouTube
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
