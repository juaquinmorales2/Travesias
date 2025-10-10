import React, { useRef, useState } from 'react';
import { Send, Phone, Mail } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { inView } = useInView(sectionRef, { threshold: 0.1 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [showModal, setShowModal] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
    
    setTimeout(() => {
      const { name, email, subject, message } = formData;
      
      const whatsappMessage = `¡Hola Navegando TV! Soy ${name}. 

${subject === 'booking' ? 'Estoy interesado/a en contratar tus servicios para un evento.' : 
 subject === 'collaboration' ? 'Me gustaría explorar una posible colaboración contigo.' :
 subject === 'press' ? 'Te contacto desde medios/prensa para una posible nota.' :
 'Quería contactarte por lo siguiente:'}

${message}

Puedes responder a este mensaje o contactarme por:
📧 Email: ${email}

¡Quedo atento/a a tu respuesta!`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      window.open(`https://wa.me/59892500713?text=${encodedMessage}`, '_blank');
      setShowModal(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };
  
  return (
    <section 
      id="contacto" 
      ref={sectionRef}
      className="py-20 bg-black relative"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 md:pt-20 transition-all duration-700 ${
              inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
            }`}
          >
            CONTACTO
          </h2>
          <p
            className={`text-gray-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
            }`}
          >
            ¿Tienes alguna pregunta o propuesta? No dudes en ponerte en contacto conmigo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div
            className={`transition-all duration-1000 ${
              inView ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h3 className="text-2xl font-bold mb-6">Envíame un mensaje</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                  Asunto
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="booking">Participacion en el programa</option>
                  <option value="collaboration">Propuesta Comercial</option>
                  <option value="press">Prensa y medios</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all"
                  placeholder="Escribe tu mensaje aquí..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-300/80 to-amber-300/70 text-white rounded-lg font-medium hover:from-amber-400 hover:to-amber-500 transition-all"
              >
                <span>Enviar mensaje</span>
                <Send size={16} />
              </button>
            </form>
          </div>
          
          <div
            className={`transition-all duration-1000 delay-300 ${
              inView ? 'opacity-100 transform-none' : 'opacity-0 translate-x-10'
            }`}
          >
            <h3 className="text-2xl font-bold mb-6">Información de contacto</h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-300/20 rounded-lg text-amber-300">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Teléfono</h4>
                  <a href='https://wa.me/59892500713' className="text-gray-400">+598 92 500 713</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-300/20 rounded-lg text-amber-300">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Email</h4>
                  <p className="text-gray-400">navegandostream@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-300/20 rounded-lg text-amber-300">
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21s9-7.5 9-11a9 9 0 10-18 0c0 3.5 9 11 9 11z"
    />
  </svg>
</div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Ubicación</h4>
                  <p className="text-gray-400">Paseo del ESte, Maldonado, Uruguay</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Síguenos en redes sociales</h3>
              <div className="flex space-x-6 mb-6 justify-center md:justify-start">
                {/* Instagram */}
                <a href="https://www.instagram.com/navegando.tv/?__pwa=1" target="_blank" rel="noopener noreferrer" className="group">
            <svg className="w-6 h-6 group-hover:text-amber-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="https://www.youtube.com/@navegando-tv" target="_blank" rel="noopener noreferrer" className="group">
            <svg className="w-6 h-6 group-hover:text-amber-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
          <a href="https://open.spotify.com/show/3AOldU6JGAxswWMFIe38Ay" target="_blank" rel="noopener noreferrer" className="group">
            <svg className="w-6 h-6 group-hover:text-amber-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12s-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0 3c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm3.21 10.096c-.125.178-.385.234-.563.108-1.531-1.058-3.617-1.306-5.979-.719-.198.054-.378-.092-.432-.289-.054-.197.091-.379.288-.433 2.571-.654 4.893-.373 6.634.826.179.126.235.385.108.563l-.056.08zm.816-1.955c-.159.26-.498.342-.758.183-1.751-1.182-4.417-1.424-6.486-.734-.299.082-.609-.098-.691-.397-.082-.299.098-.61.397-.691 2.373-.784 5.322-.505 7.365.85.26.159.341.498.182.758l-.069.112zm.074-2.056c-2.102-1.251-5.598-1.365-7.678-.722-.36.102-.738-.093-.84-.453-.103-.36.092-.738.453-.84 2.447-.694 6.284-.553 8.722.828.317.188.42.597.232.914-.188.317-.597.42-.914.232l-.115-.068z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/navegandotv/" target="_blank" rel="noopener noreferrer" className="group">
            <svg className="w-6 h-6 group-hover:text-amber-200 transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z" />
            </svg>
          </a>
          <a href="https://www.tiktok.com/@navegandotv" target="_blank" rel="noopener noreferrer" className="group">
            <svg className="w-6 h-6 group-hover:text-amber-200 transition-colors" fill="currentColor" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
              <path d="M232,64a64.07,64.07,0,0,1-64-64h-40v168a24,24,0,1,1-24-24,23.79,23.79,0,0,1,8,1.39V105.6a64,64,0,1,0,56,63.89V96a104.12,104.12,0,0,0,64,22.12Z" />
            </svg>
          </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de WhatsApp */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 transition-opacity duration-300"></div>
          
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div className="bg-amber-100/90 rounded-xl p-8 max-w-md w-full mx-4 animate-fade-in">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <svg
                    className="h-12 w-12 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white">Redirigiendo a WhatsApp</h3>
                <p className="mt-2 text-white">Preparando tu mensaje...</p>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`style
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
        `}</style>
    </section>
  );
};

export default ContactSection;
