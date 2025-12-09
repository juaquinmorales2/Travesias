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
import ejemplo12 from "./sponsors/talar.jpg";
import ejemplo13 from "./sponsors/rocha.jpg";
import ejemplo14 from "./sponsors/atlantico.jpg";
import ejemplo15 from "./sponsors/clap.jpg";
import ejemplo16 from "./sponsors/garmin.jpg";
import ejemplo17 from "./sponsors/naval.jpg";
import ejemplo18 from "./sponsors/ferreteria.jpg";
import ejemplo19 from "./sponsors/werness.jpg";
import ejemplo20 from "./sponsors/alfajores.jpg";
import ejemplo21 from "./sponsors/jazz.jpg";
import ejemplo22 from "./sponsors/lapataia.jpg";
import ejemplo23 from "./sponsors/municipio.jpg";
import ejemplo24 from "./sponsors/nutri.jpg";
import ejemplo25 from "./sponsors/irisarri.jpg";
import ejemplo26 from "./sponsors/museo.jpg";
import ejemplo27 from "./sponsors/Casa.png";




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
    ejemplo12,
    ejemplo13,
    ejemplo14,
    ejemplo15,
    ejemplo16,
    ejemplo17,
    ejemplo18,
    ejemplo19,
    ejemplo20,
    ejemplo21,
    ejemplo22,
    ejemplo23,
    ejemplo24,
    ejemplo25,
    ejemplo26,
    ejemplo27,

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
      className="relative h-[22vh] w-full bg-white text-black flex flex-col justify-center items-center overflow-hidden pb-16"
    >
      {/* Texto inicial */}
      <div
        className={`text-3xl md:pt-10 md:text-5xl font-semibold md:mb-[-30px] transition-opacity duration-4000 ${
          showSponsors ? "opacity-0" : "opacity-100"
        }`}
      >
        Con el apoyo de
      </div>

      {/* Carrusel de sponsors */}
      <div
        className={`w-full flex justify-center items-center transition-opacity duration-4000 ${
          showSponsors ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="scroll-container flex">
          <div className="scroll-content flex gap-12 md:gap-16 px-8 items-center">
            {sponsors.concat(sponsors).map((logo, i) => (
              <div
                key={i}
                className="flex justify-center items-center w-32 md:w-48 h-24 md:h-32"
              >
                <img
                  src={logo}
                  alt={`Sponsor ${i + 1}`}
                  className="max-w-full max-h-full object-contain  opacity-90 hover:opacity-100 transition-transform duration-1000 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scroll-container {
          overflow: hidden;
          width: 100%;
        }
        .scroll-content {
          display: flex;
          white-space: nowrap;
          animation: scrollSponsors 25s linear infinite;
        }
        @keyframes scrollSponsors {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default SponsorsSection;
