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
      
      const whatsappMessage = `¡Hola Diego! Soy ${name}. 

${subject === 'booking' ? 'Estoy interesado/a en contratar tus servicios para un evento.' : 
 subject === 'collaboration' ? 'Me gustaría explorar una posible colaboración contigo.' :
 subject === 'press' ? 'Te contacto desde medios/prensa para una posible nota.' :
 'Quería contactarte por lo siguiente:'}

${message}

Puedes responder a este mensaje o contactarme por:
📧 Email: ${email}

¡Quedo atento/a a tu respuesta!`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      window.open(`https://wa.me/59899930821?text=${encodedMessage}`, '_blank');
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-300/80 to-teal-300/70 text-white rounded-lg font-medium hover:from-teal-400 hover:to-teal-500 transition-all"
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
                <div className="p-3 bg-teal-300/20 rounded-lg text-teal-300">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Teléfono</h4>
                  <a href='https://wa.me/59899930821' className="text-gray-400">+598 99 930 821</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-teal-300/20 rounded-lg text-teal-300">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Email</h4>
                  <p className="text-gray-400">chiriffnatacion@yahoo.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-teal-300/20 rounded-lg text-teal-300">
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
                  <p className="text-gray-400">Punta del Este, Maldonado, Uruguay</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Síguenos en redes sociales</h3>
              <div className="flex space-x-6 mb-6 justify-center md:justify-start">
                {/* Instagram */}
                <a href="https://www.instagram.com/travesiasuruguay/?__pwa=1" target="_blank" rel="noopener noreferrer" className="group">
            <svg className="w-6 h-6 group-hover:text-teal-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="https://www.youtube.com/@travesiasuruguay" target="_blank" rel="noopener noreferrer" className="group">
            <svg className="w-6 h-6 group-hover:text-teal-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
          <a
            href="https://wa.me/59899930821"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            {/* Ícono de WhatsApp */}
            <svg
              className="w-6 h-6 group-hover:text-teal-200 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12a11.94 11.94 0 0 0 1.64 6L0 24l6.22-1.63A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zM12 22a9.9 9.9 0 0 1-5.06-1.38l-.36-.21-3.69.97.99-3.6-.23-.37A9.93 9.93 0 1 1 12 22zm5.15-7.47c-.28-.14-1.64-.81-1.89-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.85 1.09-.16.18-.31.2-.59.07-.28-.14-1.18-.43-2.25-1.38-.83-.74-1.38-1.65-1.55-1.93-.16-.28-.02-.43.12-.56.12-.12.28-.31.43-.47.14-.16.18-.28.28-.47.09-.18.05-.34-.02-.47-.07-.14-.61-1.47-.84-2.01-.22-.52-.44-.45-.61-.45-.16 0-.34 0-.52 0a.99.99 0 0 0-.7.33c-.24.25-.91.89-.91 2.18 0 1.28.93 2.52 1.07 2.7.14.18 1.82 2.77 4.42 3.89.62.27 1.1.43 1.47.55.62.2 1.18.17 1.62.1.5-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.06-.12-.25-.2-.53-.33z" />
            </svg>
          </a>

          <a
            href="https://www.facebook.com/travesiadelsauce"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <svg
              className="w-6 h-6 group-hover:text-teal-200 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22.675 0h-21.35C.596 0 0 .592 0 1.324v21.352C0 23.404.596 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.404 24 24 23.404 24 22.676V1.324C24 .592 23.404 0 22.675 0z" />
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
            <div className="bg-teal-100/90 rounded-xl p-8 max-w-md w-full mx-4 animate-fade-in">
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
