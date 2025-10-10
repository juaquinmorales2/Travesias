import React, { useState } from 'react';
import { X } from 'lucide-react';

const FloatingLivePlayer = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[320px] h-[180px] bg-black rounded-lg shadow-lg overflow-hidden">
      <div className="flex justify-end p-1 bg-black/70">
        <button onClick={() => setIsVisible(false)} className="text-white hover:text-red-400">
          <X size={18} />
        </button>
      </div>
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/live/4BNRi67vRvg?si=fmqFo5BzwSi2gVeC"
        title="Navegando TV en Vivo"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default FloatingLivePlayer;