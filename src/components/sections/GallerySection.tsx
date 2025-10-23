import React, { useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ejemplo1 from "./ejemplo1.jpg";
import ejemplo2 from "./ejemplo2.jpg";
import ejemplo3 from "./ejemplo3.jpg";
import ejemplo4 from "./ejemplo4.jpg";
import ejemplo5 from "./ejemplo5.jpg";
import ejemplo6 from "./ejemplo6.jpg";
import ejemplo7 from "./ejemplo7.jpg";
import ejemplo8 from "./ejemplo8.jpg";


const flyers = [
  {
    id: 1,
    title: "8ª Edición Travesía Internacional Laguna del Sauce",
    date: "20 de diciembre 2025",
    location: "Punta del Este",
    img: ejemplo1, // agua/lago
  },
  {
    id: 2,
    title: "OW Full Moon Night",
    date: "03 de enero 2025",
    location: "Punta del Este",
    img: ejemplo2, // luna
  },
  {
    id: 3,
    title: "2ª Edición Travesía Internacional PDA 9 Playa Deportiva",
    date: "17 de enero 2025",
    location: "Punta del Este",
    img: ejemplo3,
  },
  {
    id: 4,
    title: "Travesía Isla Gorriti",
    date: "25 de enero 2025",
    location: "Punta del Este",
    img: ejemplo4,
  },
  {
    id: 5,
    title: "OW Bajo las Estrellas",
    date: "01 de febrero 2026",
    location: "Punta del Este",
    img: ejemplo5, // estrellas
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

const FlyersSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { inView } = useInView(sectionRef, { threshold: 0.1 });

  const [currentIndex, setCurrentIndex] = useState(0);

  const scroll = (dir: "left" | "right") => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const visibles =
      window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const scrollAmount = container.clientWidth / visibles;

    let newIndex;
    if (dir === "right") {
      newIndex = currentIndex + 1 >= flyers.length ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex - 1 < 0 ? flyers.length - 1 : currentIndex - 1;
    }

    setCurrentIndex(newIndex);
    container.scrollTo({
      left: newIndex * scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="flyers"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden pt-32"
    >
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-12 text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          CALENDARIO DE EVENTOS
        </h2>

        {/* Carrusel */}
        <div className="relative mx-auto w-[250px] sm:w-[624px] lg:w-[936px]">
          {/* Flecha izquierda */}
          <button
            onClick={() => scroll("left")}
            className="absolute top-1/2 -translate-y-1/2 -left-12 sm:-left-8 z-10 p-2 bg-white/30 hover:bg-white/50 rounded-full"
          >
            <ChevronLeft size={24} color="black" />
          </button>

          {/* Contenedor scroll */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-hidden scroll-smooth"
          >
            {flyers.map((flyer) => (
              <a
                key={flyer.id}
                href={`https://wa.me/59899930821?text=${encodeURIComponent(
                  `Buenas Diego, quiero participar del evento "${flyer.title}" que se realizará el ${flyer.date} en ${flyer.location}. ¿Podrías brindarme más información? ¡Gracias!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[250px] sm:w-[312px] lg:w-[312px] flex-shrink-0 rounded-xl overflow-hidden shadow-lg bg-black relative group"
              >
                <img
                  src={flyer.img}
                  alt={`Evento ${flyer.title}`}
                  className="w-full aspect-[9/16] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/70 p-4 text-white text-center">
                  <h3 className="font-semibold text-lg">{flyer.title}</h3>
                  <p className="text-sm opacity-90">{flyer.date}</p>
                  {flyer.location && (
                    <p className="text-sm opacity-80">{flyer.location}</p>
                  )}
                </div>
              </a>
            ))}
          </div>

          {/* Flecha derecha */}
          <button
            onClick={() => scroll("right")}
            className="absolute top-1/2 -translate-y-1/2 -right-12 sm:-right-8 z-10 p-2 bg-white/30 hover:bg-white/50 rounded-full"
          >
            <ChevronRight size={24} color="black" />
          </button>
        </div>

        {/* Botón general de WhatsApp */}
        <div className="mt-12 text-center">
          <a
            href="https://wa.me/59899930821?text=Buenas%20Diego,%20quiero%20más%20información%20sobre%20los%20eventos%20del%20calendario."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#25D366] text-white font-medium text-lg transition-all duration-300 hover:brightness-110"
          >
           <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 48 48"
            >
              <path
                fill="#fff"
                d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
              ></path>
              <path
                fill="#40c351"
                d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
              ></path>
              <path
                fill="#fff"
                fillRule="evenodd"
                d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                clipRule="evenodd"
              ></path>
            </svg>
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default FlyersSection;
