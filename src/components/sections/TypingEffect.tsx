import React, { useEffect, useState } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");

    const type = () => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index < text.length) {
        setTimeout(type, speed);
      }
    };

    const timeout = setTimeout(type, speed);

    return () => clearTimeout(timeout);
  }, [text, speed]);

  return (
    <p className="font-semibold text-center mt-[-10px] mb-10 md:text-lg text-sm text-amber-200 drop-shadow-[0_2px_5px_rgba(0,0,0,1)]">
      {displayedText}
    </p>
  );
};

export default TypingEffect;
