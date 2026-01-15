import React, { useEffect, useState } from "react";
import { modalsService, ModalData } from "../../services/modalsService";

const Modal = ({ onClose }: { onClose: () => void }) => {
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadModal = async () => {
      const data = await modalsService.getActive();
      if (data && data.active) {
        setModalData(data);
        // Apply delay
        const delayMs = (data.delay || 0) * 1000;
        setTimeout(() => {
          setIsVisible(true);
        }, delayMs);
      } else {
        onClose();
      }
    };
    loadModal();
  }, []);

  if (!modalData || !isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="relative w-auto h-[90vh] max-w-[450px] rounded-2xl overflow-hidden shadow-2xl bg-black/70 text-white flex flex-col">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-3 right-4 text-white border-2 border-black rounded-full px-[10px] leading-[14px] hover:bg-white hover:text-black transition text-3xl font-bold z-20"
        >
          ×
        </button>
        {/* Imagen */}
        <div className="w-full h-[90%] overflow-hidden flex justify-center">
          {modalData.image_url ? (
            <img
              src={modalData.image_url}
              className="h-full w-auto object-cover"
              alt={modalData.title}
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-gray-800 text-gray-400">
              Sin imagen
            </div>
          )}
        </div>
        {/* Contenido y botones */}
        <div className="flex flex-col items-center justify-center gap-5 p-6 h-[40%]">
          {/* Botones uno al lado del otro */}
          <div className="flex gap-4 w-full">
            {modalData.registration_url && (
              <a
                href={modalData.registration_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-purple-600 hover:bg-purple-700 transition rounded-xl px-4 py-2 text-white font-semibold text-lg text-center shadow-lg flex items-center justify-center gap-2"
              >
                <img
                  src="https://images.emojiterra.com/google/android-11/1024px/1f4dd.png"
                  className="w-6 h-6"
                  alt="Register"
                />
                Inscribirme
              </a>
            )}

            {modalData.manual_url && (
              <a
                href={modalData.manual_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 transition rounded-xl px-2 py-2 text-white font-semibold text-lg text-center shadow-lg flex items-center justify-center gap-2"
              >
                📘 Manual
              </a>
            )}
          </div>
          {/* Botón Más Información (WhatsApp) */}
          <a
            href="https://wa.me/59899930821"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-600 hover:bg-green-700 transition rounded-xl px-4 py-3 text-white font-semibold text-lg text-center shadow-lg flex items-center justify-center gap-3"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              className="w-7 h-7"
              alt="WhatsApp"
            />
            Más información
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;