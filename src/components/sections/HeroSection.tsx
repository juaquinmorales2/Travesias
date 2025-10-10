import { useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import Hero from '../sections/hero.webm';
import HeroMobile from '../sections/Heromobile.mp4';
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
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000 ${
            inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="block font-Montserrat drop-shadow-[0_6px_15px_rgba(0,0,0,0.9)]">
            NAVEGANDO TV
          </span>
        </h1>

        <TypingEffect
          key="frase-1"
          text="   Lo nuestro no es llegar, es seguir navegando. Subite y vení a disfrutar del viaje.   "
          speed={50}
        />

        <div
          className={`flex justify-center transition-all duration-1000 delay-500 ${
            inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Aquí puedes agregar botones u otros elementos */}
        </div>

        <div className="flex space-x-6 mb-6 text-center items-center justify-center">
          <a href="https://www.instagram.com/navegando.tv/?__pwa=1" target="_blank" rel="noopener noreferrer" className="group">
            <svg className="w-6 h-6 group-hover:text-amber-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="https://www.youtube.com/@navegando-tv" target="_blank" rel="noopener noreferrer" className="group">
            <svg className="w-6 h-6 group-hover:text-amber-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
          <a href="https://open.spotify.com/show/3AOldU6JGAxswWMFIe38Ay" target="_blank" rel="noopener noreferrer" className="group">
            <svg className="w-6 h-6 group-hover:text-amber-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12s-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0 3c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm3.21 10.096c-.125.178-.385.234-.563.108-1.531-1.058-3.617-1.306-5.979-.719-.198.054-.378-.092-.432-.289-.054-.197.091-.379.288-.433 2.571-.654 4.893-.373 6.634.826.179.126.235.385.108.563l-.056.08zm.816-1.955c-.159.26-.498.342-.758.183-1.751-1.182-4.417-1.424-6.486-.734-.299.082-.609-.098-.691-.397-.082-.299.098-.61.397-.691 2.373-.784 5.322-.505 7.365.85.26.159.341.498.182.758l-.069.112zm.074-2.056c-2.102-1.251-5.598-1.365-7.678-.722-.36.102-.738-.093-.84-.453-.103-.36.092-.738.453-.84 2.447-.694 6.284-.553 8.722.828.317.188.42.597.232.914-.188.317-.597.42-.914.232l-.115-.068z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/navegandotv/" target="_blank" rel="noopener noreferrer" className="group">
            <svg className="w-6 h-6 group-hover:text-amber-200 transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z" />
            </svg>
          </a>
          <a href="https://www.tiktok.com/@navegandotv" target="_blank" rel="noopener noreferrer" className="group">
            <svg className="w-6 h-6 group-hover:text-amber-200 transition-colors" fill="currentColor" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
              <path d="M232,64a64.07,64.07,0,0,1-64-64h-40v168a24,24,0,1,1-24-24,23.79,23.79,0,0,1,8,1.39V105.6a64,64,0,1,0,56,63.89V96a104.12,104.12,0,0,0,64,22.12Z" />
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
