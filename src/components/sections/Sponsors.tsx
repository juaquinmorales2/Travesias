import React, { useEffect, useRef, useState } from "react";
import { sponsorsService } from "../../services/sponsorsService";
import { Sponsor } from "../../types/admin";

const SponsorsSection = () => {
  const sectionRef = useRef(null);
  const [showSponsors, setShowSponsors] = useState(false);
  const [sponsorsData, setSponsorsData] = useState<Sponsor[]>([]);

  useEffect(() => {
    const loadSponsors = async () => {
      const data = await sponsorsService.getAll();
      setSponsorsData(data.filter(s => s.active));
    };
    loadSponsors();
  }, []);

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
      className="relative h-[22vh] md:h-[18vh] w-full bg-white text-black 
      flex flex-col justify-center items-center overflow-hidden pb-16"
    >
      {/* Texto inicial */}
      <div
        className={`text-3xl md:pt-10 md:text-5xl font-semibold md:mb-[-30px] transition-opacity 
          duration-4000 ${showSponsors ? "opacity-0" : "opacity-100"
          }`}
      >
        Con el apoyo de
      </div>
      {/* Carrusel de sponsors */}
      <div
        className={`w-full flex justify-center items-center transition-opacity 
          duration-4000 ${showSponsors ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="scroll-container flex">
          <div className="scroll-content flex gap-12 md:gap-16 px-8 items-center">
            {sponsorsData.length > 0 && sponsorsData.concat(sponsorsData).map((sponsor, i) => (
              <div
                key={`${sponsor.id}-${i}`}
                className="flex justify-center items-center w-32 md:w-48 h-24 md:h-32"
              >
                <img
                  src={sponsor.imageUrl}
                  alt={sponsor.name}
                  className={`max-w-full max-h-full object-contain opacity-90 hover:opacity-100 
                    transition-transform duration-1000 hover:scale-110`}
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

    /* --- 🔥 Contorno NEGRO real del logo (no del contenedor) --- */
    .logo-outline {
      filter: drop-shadow(0 0 1px black) drop-shadow(0 0 3px black);
    }

    /* Opcional: borde más grueso estilo stroke */
    /* .logo-outline {
      filter: drop-shadow(0 0 2px black) drop-shadow(0 0 6px black);
    } */
  `}</style>
    </section>
  );
};

export default SponsorsSection;