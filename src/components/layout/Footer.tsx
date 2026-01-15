import React from 'react';
import { Mail } from 'lucide-react';
import SocialLinks from '../common/SocialLinks';
import vos from "../sections/vos.jpg";
import logo from '../sections/logow.png';

const Footer = () => {
  return (
    <footer className="bg-black/90 text-gray-300 py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <div className="flex items-center gap-2 text-xl font-bold mb-4">
              <img src={logo} className="h-14" alt="Logo Viana" />
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              ¨El movimiento es una medicina para crear el cambio físico, mental y emocional¨
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#hero" className="hover:text-teal-300 transition-colors">Inicio</a></li>
              <li><a href="#info" className="hover:text-teal-300 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#sobre" className="hover:text-teal-300 transition-colors">Equipo</a></li>
              <li><a href="#flyers" className="hover:text-teal-300 transition-colors">Calendario</a></li>
              <li><a href="#avisos" className="hover:text-teal-300 transition-colors">Avisos</a></li>
              <li><a href="#contacto" className="hover:text-teal-300 transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <div className="flex space-x-6 mb-6 justify-center md:justify-start">
              <SocialLinks />
            </div>

            <div className="flex items-center gap-2 text-sm mt-4 justify-center md:justify-start">
              <Mail size={16} />
              <a href="mailto:chiriffnatacion@yahoo.com" className="hover:text-teal-300 transition-colors">
                chiriffnatacion@yahoo.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-sm text-gray-400 flex justify-center">
          <div className="flex items-center space-x-4 ml-3">
            <img
              src={vos}
              alt="VOS Marketing Logo"
              className="w-14 h-14 object-cover rounded-full shadow-lg border border-gray-700"
            />
            <p>
              © {new Date().getFullYear()} <span className="font-semibold text-white">VOS Marketing S.A.</span> Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
