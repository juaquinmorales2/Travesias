import { useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import Hero from '../public/Hero.mp4';
import HeroMobile from '../public/Hero.mp4';
import TypingEffect from './TypingEffect';
import Modal from './Modal';
import SocialLinks from '../common/SocialLinks';

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
        <div className="absolute bottom-0 left-0 w-full h-[15%] md:hidden bg-gradient-to-t from-black via-black/70 to-transparent z-[-1]" />

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

        <SocialLinks />

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