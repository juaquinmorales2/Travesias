import React, { useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import navegando from './navegaaa.jpg';
import sinFiltros from './FILTRO.jpg';
import cadaLoco from './cadalocooo.jpg';
import deportes from './hablemoss.jpg';
import paseo from './paseo.png';
import Kimbo from './kimbo.png';
import China from './china.png';
import BTL from './lau-removebg-preview.png';
import luaga from './luaga-removebg-preview.png';
import centaura from './centauro-removebg-preview.png';
import hector from './hector.jpeg';
import ruta from './ruta73.png';
import lolo from './lolo.png';
import santa from './santa.png';
import Soluciones from './soluciones.jpg';

const sections = [
  {
    title: 'SOBRE NAVEGANDO TV',
    image: navegando,
    borderColor: 'border-amber-200',
    titleColor: 'text-amber-200',
    text: [
      'Navegando TV es un programa de streaming que te invita a descubrir nuevas perspectivas...',
      'Desde entrevistas exclusivas y coberturas en vivo, hasta segmentos culturales...',
      'Nuestro objetivo es construir un puente entre el entretenimiento y la información...',
      'Gracias por ser parte de esta experiencia y acompañarnos en cada emisión.',
    ],
    sponsors: [paseo, Kimbo, China],
  },
  {
    title: 'SIN FILTROS',
    image: sinFiltros,
    borderColor: 'border-[#815416]',
    titleColor: 'text-[#8a6b49]',
    text: [
      'Sin Filtros es un espacio donde la verdad se dice sin rodeos...',
      'Aquí no hay máscaras: hablamos con franqueza...',
      'El respeto por todas las voces es clave...',
      'Sin Filtros es para quienes buscan profundidad y transparencia.',
    ],
    sponsors: [paseo, Kimbo, China],
  },
  {
    title: 'CADA LOCO CON SU TEMA',
    image: cadaLoco,
    borderColor: 'border-red-500',
    titleColor: 'text-red-500',
    text: [
      'Nos autodiagnosticamos por redes y ahora tenemos un micrófono.',
      'Cinco personalidades completamente distintas, una mesa y cero filtros.',
      'Flor, Abigail, Gonza, Abril y Damián te invitan a sumarte a este delirio llamado',
      'Cada loco con su tema.',
    ],
    sponsors: [paseo, Kimbo, China, Soluciones],
  },
  {
    title: 'HABLEMOS DE DEPORTES',
    image: deportes,
    borderColor: 'border-[#4ef408]',
    titleColor: 'text-[#4ef408]',
    text: [
      'Con Gastón Beraldo como conductor,',
      'En el programa nos caracterizamos por mostrar el trabajo de todos los',
      'deportistas del departamento, en absolutamente todas las disciplinas.',
      'Te invitamos a conocer las disciplinas mas olvidadas del medio...',
    ],
    sponsors: [paseo, Kimbo, China, BTL, luaga, centaura],
  },
  {
    title: 'COCINA SIMPLE PERO SABROSA',
    image: hector,
    borderColor: 'border-yellow-300',
    titleColor: 'text-yellow-300',
    text: [
      'Un chef, una cocina, y el sabor como protagonista.',
      'Recetas fáciles, técnicas claras y cero complicaciones.',
      'En vivo, sin vueltas y con mucho gusto.',
      'Esto es Cocina simple pero sabrosa.',
    ],
    sponsors: [paseo, Kimbo, China, ruta, lolo, santa],
  },
];

const AboutSection = () => {
  return (
    <section
      id="sobre"
      className="py-20 bg-gradient-to-b from-gray-900 to-black md:pt-[120px]"
    >
      <div className="container mx-auto px-4 md:px-10 space-y-32">
        {sections.map((section, index) => {
          const sectionRef = useRef(null);
          const { inView } = useInView(sectionRef, { threshold: 0.2 });
          const isImageLeft = index % 2 === 0;

          // Divide sponsors en filas de hasta 3
          const sponsorRows = [];
          for (let i = 0; i < section.sponsors.length; i += 3) {
            sponsorRows.push(section.sponsors.slice(i, i + 3));
          }

          return (
            <div
              key={index}
              ref={sectionRef}
              className={`flex flex-col lg:flex-row ${
                !isImageLeft ? 'lg:flex-row-reverse' : ''
              } gap-12 items-center`}
            >
              {/* Imagen */}
              <div
                className={`lg:w-1/2 transition-all duration-1000 ${
                  inView
                    ? 'opacity-100 translate-x-0'
                    : isImageLeft
                    ? '-translate-x-10 opacity-0'
                    : 'translate-x-10 opacity-0'
                }`}
              >
                <div className="relative">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="rounded-lg shadow-2xl max-w-full h-auto"
                  />
                  <div
                    className={`absolute inset-0 ${section.borderColor} border-2 rounded-lg transform translate-x-4 translate-y-4 -z-10`}
                  ></div>
                </div>
              </div>

              {/* Texto */}
              <div
                className={`lg:w-1/2 transition-all duration-1000 delay-300 ${
                  inView
                    ? 'opacity-100 translate-x-0'
                    : isImageLeft
                    ? 'translate-x-10 opacity-0'
                    : '-translate-x-10 opacity-0'
                }`}
              >
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-6 ${section.titleColor}`}
                >
                  {section.title}
                </h2>

                <div className="space-y-4 text-gray-300">
                  {section.text.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {/* Sponsors */}
                <div className="mt-8">
                  <h3 className={`text-xl font-semibold ${section.titleColor} mb-8`}>
                    Con el apoyo de:
                  </h3>
                  {sponsorRows.map((row, rowIdx) => (
                    <div key={rowIdx} className="flex items-center space-x-6 mb-6">
                      {row.map((sponsor, sIdx) => {
                        const isKimbo = sponsor.toLowerCase().includes('kimbo');
                        const isChina = sponsor.toLowerCase().includes('china');
                        const isBTL = sponsor.toLowerCase().includes('lau');
                        const isSoluciones = sponsor.toLowerCase().includes('soluciones');
                        return (
                          <img
  key={sIdx}
  src={sponsor}
  alt={`Sponsor ${sIdx}`}
  className={`
    object-contain
    ${isKimbo ? 'h-20 md:h-28' : 'h-12 md:h-24'}
    ${isSoluciones ? 'h-10 md:h-12 ml-3' : 'h-12 md:h-24'}
    ${isChina ? 'mb-5' : ''}
    ${isBTL ? 'ml-3 md:mr-12 mr-8' : ''}
    ${
      sponsor.includes('santa')
        ? 'h-16 md:h-24 md:ml-9'
        : sponsor.includes('ruta73')
        ? 'h-14 md:h-28 md:ml-1 '
        : sponsor.includes('lolo')
        ? 'h-32 md:h-40'
        : ''
    }
  `}
/>

                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutSection;
