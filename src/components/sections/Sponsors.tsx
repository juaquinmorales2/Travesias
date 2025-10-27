import React, { useEffect, useRef, useState } from "react";
import ejemplo1 from "./sponsors/asistencial.png";
import ejemplo2 from "./sponsors/centenario.png";
import ejemplo3 from "./sponsors/club.png";
import ejemplo4 from "./sponsors/confiteria.png";
import ejemplo5 from "./sponsors/enjoy.png";
import ejemplo6 from "./sponsors/intendencia.png";
import ejemplo7 from "./sponsors/laguna.png";
import ejemplo8 from "./sponsors/pbi.png";
import ejemplo9 from "./sponsors/rnx.png";
import ejemplo10 from "./sponsors/vikinga.png";
import ejemplo11 from "./sponsors/viva.png";

const SponsorsSection = () => {
  const sectionRef = useRef(null);
  const [showSponsors, setShowSponsors] = useState(false);

  const sponsors = [
    ejemplo1,
    ejemplo2,
    ejemplo3,
    ejemplo4,
    ejemplo5,
    ejemplo6,
    ejemplo7,
    ejemplo8,
    ejemplo9,
    ejemplo10,
    ejemplo11,
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight / 1.5;
      if (inView) setShowSponsors(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[35vh] w-full bg-black text-white flex flex-col justify-center items-center overflow-hidden md:pb-10 md:pt-[-20px]"
    >
      {/* Texto inicial */}
      <div
        className={`text-3xl md:text-5xl font-semibold mb-8 transition-opacity duration-1000 ${
          showSponsors ? "opacity-0" : "opacity-100"
        }`}
      >
        Con el apoyo de
      </div>

      {/* Carrusel de sponsors */}
      <div
        className={`w-full flex justify-center items-center transition-opacity duration-1000 ${
          showSponsors ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="animate-scrollSponsors flex gap-12 md:gap-16 px-8 items-center">
          {sponsors.concat(sponsors).map((logo, i) => (
            <div
              key={i}
              className="flex justify-center items-center w-32 md:w-48 h-24 md:h-32"
            >
              <img
                src={logo}
                alt={`Sponsor ${i + 1}`}
                className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-90 hover:opacity-100 transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollSponsors {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scrollSponsors {
          animation: scrollSponsors 25s linear infinite;
          display: flex;
          align-items: center;
          white-space: nowrap;
        }
      `}</style>
    </section>
  );
};

export default SponsorsSection;
