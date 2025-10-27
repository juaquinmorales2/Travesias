import React, { useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import navegando from './seba.png';
import sinFiltros from './Diego.png';

const sections = [
  {
    title: 'PABLO SEBASTIAN OLIVERA VELAZQUEZ',
    image: navegando,
    borderColor: 'border-teal-200',
    titleColor: 'text-teal-200',
    text: [
      'Director General de Travesias Uruguay',
      'Licenciado en Educación Física y Guardavidas.',
      'Profesor del Campus de Maldonado 2018 - 2025',
      'Entrenador Natacion Master.',
      'Profesor cátedra natación, entrenamiento específico y gestión de eventos deportivos,  2013 - 2025.',
      'Integrante de la Comisión de Aguas Abiertas de la Federación Uruguaya de Natación 2025.',
    ],
  },
  {
    title: 'DIEGO MARTIN CHIRIFF RODRIGUEZ',
    image: sinFiltros,
    borderColor: 'border-teal-200',
    titleColor: 'text-teal-200',
    text: [
      'Director Área Técnica de Travesías Uruguay',
      'Licenciado en Educación Física, Guardavidas y Técnico de Natación.',
      'Entrenador del Campus de Maldonado 2003 - 2025.',
      'Profesor cátedra natación, entrenamiento y evaluación 2006 - 2019.',
      'Técnico de selecciones uruguayas en Natación y Aguas Abiertas 2007 - 2025.',
      'Técnico Juegos Olímpicos 2021.',
    ],
  },
];

const AboutSection = () => {
  const titleRef = useRef(null);
  const { inView: titleInView } = useInView(titleRef, { threshold: 0.3 });

  return (
    <section
      id="sobre"
      className="py-20 bg-gradient-to-b from-gray-900 to-black md:pt-[120px]"
    >
      <div className="container mx-auto px-4 md:px-10 space-y-32">
        {/* Título principal */}
        <div ref={titleRef}>
          <h2
            className={`text-4xl md:text-5xl font-bold mb-12 text-center text-white tracking-wide transition-all duration-700 ${
              titleInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            EL EQUIPO
          </h2>
        </div>

        {/* Secciones de cada miembro */}
        {sections.map((section, index) => {
          const sectionRef = useRef(null);
          const { inView } = useInView(sectionRef, { threshold: 0.2 });
          const isImageLeft = index % 2 === 0;

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
                className={`lg:w-1/2 flex justify-center transition-all duration-1000 ${
                  inView
                    ? 'opacity-100 translate-x-0'
                    : isImageLeft
                    ? '-translate-x-10 opacity-0'
                    : 'translate-x-10 opacity-0'
                }`}
              >
                <div className="relative w-[380px] h-[480px] md:w-[420px] md:h-[520px]">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="rounded-lg shadow-2xl w-full h-full object-cover object-center"
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
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutSection;
