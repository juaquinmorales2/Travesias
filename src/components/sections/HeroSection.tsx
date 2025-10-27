import { useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import Hero from '../public/Heromaybe.mp4';
import HeroMobile from '../public/Heromaybe.mp4';
import TypingEffect from './TypingEffect';
import Modal from './Modal';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { inView } = useInView(sectionRef, { threshold: 0.1 });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-screen flex items-center justify-center overflow-x-hidden"
    >
      {/* Background videos: mobile and desktop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Mobile video (shown on screens smaller than md) */}
        <video
          autoPlay
          loop
          preload="auto"
          muted
          playsInline
          className="block md:hidden absolute top-0 left-0 w-full h-full object-cover z-[-2]"
        >
          <source src={HeroMobile} type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        {/* Desktop video (shown on md and up) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block absolute top-0 left-0 w-full h-full object-cover z-[-2]"
        >
          <source src={Hero} type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        <div className="absolute inset-0 bg-black/65 z-[-1]" />
         <div className="absolute bottom-0 left-0 w-full h-[18%] md:hidden bg-gradient-to-t from-black via-black/70 to-transparent z-[-1]" />
      
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000 ${inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
            }`}
        >
          <span className="block font-Montserrat drop-shadow-[0_6px_15px_rgba(0,0,0,0.9)]">
            TRAVESÍAS URUGUAY
          </span>
        </h1>

        <TypingEffect
          key="frase-1"
          text="   La emoción por nadar nos lleva más lejos  "
          speed={50}
        />

        <div
          className={`flex justify-center transition-all duration-1000 delay-500 ${inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
            }`}
        >
          {/* Aquí puedes agregar botones u otros elementos */}
        </div>

        <div className="flex space-x-6 mb-6 text-center items-center justify-center">
          <a href="https://www.instagram.com/travesiasuruguay/?__pwa=1" target="_blank" rel="noopener noreferrer" className="group">
            <svg className="w-6 h-6 group-hover:text-teal-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="https://www.youtube.com/@travesiasuruguay" target="_blank" rel="noopener noreferrer" className="group">
            <svg className="w-6 h-6 group-hover:text-teal-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
          <a
            href="https://wa.me/59899930821"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            {/* Ícono de WhatsApp */}
            <svg
              className="w-6 h-6 group-hover:text-teal-200 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12a11.94 11.94 0 0 0 1.64 6L0 24l6.22-1.63A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zM12 22a9.9 9.9 0 0 1-5.06-1.38l-.36-.21-3.69.97.99-3.6-.23-.37A9.93 9.93 0 1 1 12 22zm5.15-7.47c-.28-.14-1.64-.81-1.89-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.85 1.09-.16.18-.31.2-.59.07-.28-.14-1.18-.43-2.25-1.38-.83-.74-1.38-1.65-1.55-1.93-.16-.28-.02-.43.12-.56.12-.12.28-.31.43-.47.14-.16.18-.28.28-.47.09-.18.05-.34-.02-.47-.07-.14-.61-1.47-.84-2.01-.22-.52-.44-.45-.61-.45-.16 0-.34 0-.52 0a.99.99 0 0 0-.7.33c-.24.25-.91.89-.91 2.18 0 1.28.93 2.52 1.07 2.7.14.18 1.82 2.77 4.42 3.89.62.27 1.1.43 1.47.55.62.2 1.18.17 1.62.1.5-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.06-.12-.25-.2-.53-.33z" />
            </svg>
          </a>

          <a
            href="https://www.facebook.com/travesiadelsauce"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <svg
              className="w-6 h-6 group-hover:text-teal-200 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22.675 0h-21.35C.596 0 0 .592 0 1.324v21.352C0 23.404.596 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.404 24 24 23.404 24 22.676V1.324C24 .592 23.404 0 22.675 0z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 text-center animate-bounce">
        <a href="#Programas" className="text-white/80 hover:text-white transition-colors">
          <ChevronDown size={32} />
        </a>
      </div>

      {/* Aquí mostramos el modal */}
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </section>
  );
};

export default HeroSection;