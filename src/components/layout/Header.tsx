import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../sections/channels4_banner-removebg-preview.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setScrollPercentage(Math.min(currentScrollY / 2, 100));

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const menuItems = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Programas', href: '#Programas' },
    { name: 'Sobre Nosotros', href: '#sobre' },
    { name: 'Shorts', href: '#shorts' },
    { name: 'Avisos', href: '#aviso' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const bgColor = `rgba(0, 0, 0, ${scrollPercentage / 100})`;

return (
  <header
    className={`fixed w-full z-50 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
      showHeader ? 'translate-y-0' : '-translate-y-full'
    }`}
    style={{
      backgroundColor: isOpen ? 'rgb(0, 0, 0)' : bgColor, // 🔥 fondo negro sólido sin transparencia
      padding: isOpen ? '1rem 0' : scrolled ? '0.75rem 0' : '1rem 0',
      boxShadow: scrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
      willChange: 'transform',
      }}
    >
      <div className="container mx-auto lg:pl-16 px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-6 w-24 md:h-8 mb-2 md:mt-3 mt-5 md:w-40 ml-2" />
        </a>

        <nav className="hidden lg:block mr-5">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-xs font-bold uppercase tracking-wider text-amber-200 hover:text-white transition"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {!isOpen && (
          <button
            className="lg:hidden text-white z-50"
            onClick={() => setIsOpen(true)}
            aria-label="Toggle Menu"
          >
            <Menu size={28} />
          </button>
        )}
      </div>

      <div
        className={`lg:hidden fixed inset-0 h-screen bg-black z-50 transition-all duration-500 ease-in-out transform ${
         isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
       }`}
      >
        <div className="flex justify-between items-center px-4 pt-6 pb-4">
          <img src={logo} alt="Logo" className="h-6 w-24 ml-4 mt-2" />
          <button onClick={() => setIsOpen(false)} className="text-white" aria-label="Close Menu">
            <X size={28} />
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto flex flex-col justify-center pt-4">
            <ul className="flex flex-col items-center space-y-6 text-center px-4">
              {menuItems.map((item) => (
                <li key={item.name} className="w-full">
                  <a
                    href={item.href}
                    className="block py-3 text-base font-semibold uppercase tracking-wide text-white hover:opacity-80 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;