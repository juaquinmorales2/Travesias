import React, { useState, useEffect, useRef } from "react";
import mision from "./mision.jpg";
import propuesta from "./premio.jpg";
import introduccion from "./intro.jpg";
import sobreNosotros from "./nosotros.jpg";

const sections = [
  {
    title: "INTRODUCCIÓN",
    image: introduccion,
    content: `Travesías Uruguay es una empresa dedicada a la organización de eventos deportivos de natación en aguas abiertas. Integrada por los Licenciados Pablo Olivera y Diego Chiriff, fundada en el 2018, la empresa ha crecido y consolidado su presencia en el calendario deportivo de nuestro país así como en Sudamérica. Comenzamos con un único evento y, con conocimiento, profesionalismo y dedicación, hoy celebramos 8 años de permanencia reafirmando nuestro compromiso con el deporte y la comunidad.
   `,},
  {
    title: "SOBRE NOSOTROS",
    image: sobreNosotros,
    content: `Travesías Uruguay es la organización líder en el mercado nacional y una referencia internacional en la creación de eventos de natación en aguas abiertas. Nos enfocamos en el diseño de experiencias únicas que celebran la conexión del ser humano con la naturaleza. No vendemos carreras; creamos momentos de superación, camaradería y aventura en los escenarios acuáticos más icónicos de Uruguay. Nuestros eventos fusionan lo deportivo, lo cultural y lo turístico para brindar una propuesta única.`,
  },
  {
    title: "MISIÓN Y VALORES",
    image: mision,
    content: `MISIÓN
Ser el principal referente en eventos de natación en aguas abiertas en Uruguay y la región del Cono Sur, reconocidos por trascender la competencia para ofrecer experiencias transformadoras. Buscamos inspirar a una comunidad global a través de la pasión por el deporte y el profundo respeto por el medio ambiente.

VALORES
Diseñar, producir y ejecutar eventos de natación en aguas abiertas de primer nivel internacional que ofrezcan a cada participante una experiencia de vida. Priorizamos la seguridad, la emoción y la sostenibilidad, creando un legado de momentos inolvidables y un impacto positivo en las comunidades.`,
  },
  {
    title: "PROPUESTAS DEPORTIVAS",
    image: propuesta,
    content: `En nuestros eventos los espectadores disfrutan de una vista privilegiada del circuito trazado, creando una experiencia íntima, permitiendo presenciar el esfuerzo de los nadadores y la estrategia de la competencia a lo largo de todo el recorrido.

CARRERA ELITE: Carreras de 5km. Octavo año consecutivo la Federación Uruguaya de Natación nos elige para recibir a los mejores nadadores de Uruguay y del mundo, en clasificatorios a Sudamericanos, Copas del Mundo y Mundiales de Aguas Abiertas. También somos sede de la Primera Etapa del Circuito Sudamericano de Natación en Aguas Abiertas. Edades de 14 a 25 años.

CARRERA MASTER: Carreras de 3km. Somos el campeonato más grande del país, contando con nadadores destacados del Campeonato Nacional Master de Aguas Abiertas. Edades desde los 20 años en adelante.

CARRERA SPRINT: Carreras de 1km. Distancia accesible a todos los niveles, ideal para iniciarse en la natación en aguas abiertas.

DISCAPACIDAD: Pioneros en verdadera inclusión. Competidores con cualquier discapacidad participan en las mismas carreras y reciben su propia premiación.

CARRERA KIDS: Carreras de 400 metros. Los más pequeños acompañados por la familia dan sus primeras brazadas en un entorno natural y mágico.

GALA DE PREMIACIÓN: Nuestra “Triple Corona” premia a los deportistas destacados de la temporada en una gala nocturna con glamour y recuerdos inolvidables.`,
  },
];

const InfoScrollSection = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<boolean[]>(new Array(sections.length).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleSections((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <section className="w-full bg-black text-white">
      {sections.map((sec, index) => (
        <div
          key={index}
          ref={(el) => (sectionRefs.current[index] = el)}
          data-index={index}
          className={`relative min-h-[50vh] flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-1000 ease-out ${
            visibleSections[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105 hover:scale-110"
            style={{ backgroundImage: `url(${sec.image})` }}
          ></div>

          <div className="absolute inset-0 bg-black/70"></div>

          <div className="relative z-10 px-8 md:px-20 lg:px-32">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
              {sec.title}
            </h2>
            <button
              onClick={() => setSelected(index)}
              className="text-white bg-white/20 hover:bg-white/30 backdrop-blur-md transition px-8 py-3 rounded-full text-lg font-medium"
            >
              Leer más <span className="ml-2 text-2xl font-bold">+</span>
            </button>
          </div>
        </div>
      ))}

      {selected !== null && (
  <div
    className="fixed inset-0 flex items-center justify-center px-6 z-50 bg-black/80 backdrop-blur-sm"
    onClick={() => setSelected(null)}
  >
    {/* Fondo fijo del modal */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${sections[selected].image})` }}
    ></div>
    {/* Overlay oscuro fijo */}
    <div className="absolute inset-0 bg-black/70"></div>

    {/* Contenido scrollable */}
    <div
      className="relative z-10 w-full max-w-2xl p-10 rounded-2xl overflow-y-auto max-h-[90vh]"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-3 right-4 text-3xl font-bold text-white hover:text-teal-400"
        onClick={() => setSelected(null)}
      >
        ×
      </button>
      <h2 className="text-4xl font-semibold mb-6">{sections[selected].title}</h2>
      <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
        {sections[selected].content}
      </p>
    </div>
  </div>
)}
    </section>
  );
};

export default InfoScrollSection;
