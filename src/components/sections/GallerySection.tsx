import React, { useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const shorts = [
  { id: 1, url: "https://www.youtube.com/embed/tF5IGhV_O2o?rel=0&controls=0" },
  { id: 2, url: "https://www.youtube.com/embed/_m-vPiaWdPk?rel=0&controls=0" },
  { id: 3, url: "https://www.youtube.com/embed/1bSccspJPfk?rel=0&controls=0" },
  { id: 4, url: "https://www.youtube.com/embed/6sB2gkUYbfw?rel=0&controls=0" },
  { id: 5, url: "https://www.youtube.com/embed/EDJegIFTbjs?rel=0&controls=0" }
];

const ShortsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { inView } = useInView(sectionRef, { threshold: 0.1 });

  const scroll = (dir: 'left' | 'right') => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const visibles = window.innerWidth >= 1024
      ? 3
      : window.innerWidth >= 640
        ? 2
        : 1;
    const scrollAmount = container.clientWidth / visibles;
    container.scrollBy({ left: dir === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  };

  return (
    <section
      id="shorts"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden pt-32"
    >
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-12 text-center transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          SHORTS DESTACADOS
        </h2>

        {/* Wrapper sin overflow-hidden para que botones no se recorten */}
        <div className="relative mx-auto w-[250px] sm:w-[624px] lg:w-[936px]">
          {/* Botón izquierdo (ya no se recorta) */}
          <button
            onClick={() => scroll('left')}
            className="absolute top-1/2 -translate-y-1/2 -left-12 sm:-left-8 z-10 p-2 bg-white/30 hover:bg-white/50 rounded-full"
          >
            <ChevronLeft size={24} color="black" />
          </button>

          {/* Contenedor de scroll con overflow-hidden */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-hidden scroll-smooth"
          >
            {shorts.map(short => (
              <div
                key={short.id}
                className="w-[250px] sm:w-[312px] lg:w-[312px] flex-shrink-0 rounded-xl overflow-hidden shadow-lg bg-black"
              >
                <div className="aspect-[9/16] w-full">
                  <iframe
                    className="w-full h-full"
                    src={short.url}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Botón derecho */}
          <button
            onClick={() => scroll('right')}
            className="absolute top-1/2 -translate-y-1/2 -right-12 sm:-right-8 z-10 p-2 bg-white/30 hover:bg-white/50 rounded-full"
          >
            <ChevronRight size={24} color="black" />
          </button>
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.youtube.com/@juaanvianaa/shorts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white font-medium transition-all duration-300 hover:brightness-125"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M23.498 6.186a2.997 2.997 0 0 0-2.11-2.117C19.67 3.5 12 3.5 12 3.5s-7.67 0-9.388.569A2.997 2.997 0 0 0 .5 6.186 31.768 31.768 0 0 0 0 12a31.768 31.768 0 0 0 .5 5.814 2.997 2.997 0 0 0 2.112 2.117C4.33 20.5 12 20.5 12 20.5s7.67 0 9.388-.569a2.997 2.997 0 0 0 2.11-2.117A31.768 31.768 0 0 0 24 12a31.768 31.768 0 0 0-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
            </svg>
            Ver más en YouTube
          </a>
        </div>
      </div>
    </section>
  );
};

export default ShortsSection;