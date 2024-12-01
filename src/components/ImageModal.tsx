/* eslint-disable react-hooks/exhaustive-deps */  
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function ImageModal({ src, alt, onClose }: ImageModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.9;
      let width = img.width;
      let height = img.height;

      // Calculate aspect ratio
      const ratio = width / height;

      // Adjust dimensions to fit screen while maintaining aspect ratio
      if (width > maxWidth) {
        width = maxWidth;
        height = width / ratio;
      }
      if (height > maxHeight) {
        height = maxHeight;
        width = height * ratio;
      }

      setDimensions({ width, height });
    };
  }, [src]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/80 p-4 modal-overlay cursor-default ${isClosing ? 'closing' : ''}`}
      onClick={handleClose}
    >
      <div
        className={`relative modal-content ${isClosing ? 'closing' : ''}`}
        style={{ width: dimensions.width, height: dimensions.height }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
