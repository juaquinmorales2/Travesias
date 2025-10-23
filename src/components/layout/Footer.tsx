import React from 'react';
import { Mail } from 'lucide-react';
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
              <li><a href="#sobre" className="hover:text-teal-300 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#aviso" className="hover:text-teal-300 transition-colors">Avisos</a></li>
              <li><a href="#contacto" className="hover:text-teal-300 transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <div className="flex space-x-6 mb-6 justify-center md:justify-start">
              <a href="https://www.instagram.com/navegando.tv/?__pwa=1" target="_blank" rel="noopener noreferrer" className="group">
            <svg className="w-6 h-6 group-hover:text-teal-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="https://www.youtube.com/@navegando-tv" target="_blank" rel="noopener noreferrer" className="group">
            <svg className="w-6 h-6 group-hover:text-teal-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
            </div>

            <div className="flex items-center gap-2 text-sm mt-4 justify-center md:justify-start">
              <Mail size={16} />
              <a href="mailto:navegandostream@gmail.com" className="hover:text-teal-300 transition-colors">
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
