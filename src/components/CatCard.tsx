import React, { useState, useRef, useEffect } from 'react';
import { Cat } from '../types';

interface CatCardProps {
  cat: Cat;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
}

export const CatCard: React.FC<CatCardProps> = ({ cat, onSwipe, isTop }) => {
  const [startX, setStartX] = useState<number>(0);
  const [currentX, setCurrentX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset state when cat changes
    setImageLoaded(false);
    setCurrentX(0);
    setIsDragging(false);
  }, [cat.id]);

  const handleStart = (clientX: number) => {
    if (!isTop) return;
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !isTop) return;
    const diff = clientX - startX;
    setCurrentX(diff);
  };

  const handleEnd = () => {
    if (!isDragging || !isTop) return;
    setIsDragging(false);

    const threshold = 100;
    if (Math.abs(currentX) > threshold) {
      onSwipe(currentX > 0 ? 'right' : 'left');
    } else {
      setCurrentX(0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const rotation = currentX * 0.1;
  const opacity = 1 - Math.abs(currentX) / 300;

  return (
    <div
      ref={cardRef}
      className={`absolute inset-0 touch-none select-none ${isTop ? 'z-10' : 'z-0'}`}
      style={{
        transform: `translateX(${currentX}px) rotate(${rotation}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        opacity: isTop ? 1 : 0.5,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-100 to-orange-100">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
          </div>
        )}
        <img
          src={cat.imageUrl}
          alt="Cat"
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
          draggable="false"
        />
        
        {/* Swipe indicators */}
        {isDragging && (
          <>
            <div
              className="absolute top-12 right-12 text-6xl font-bold text-red-500 border-4 border-red-500 rounded-2xl px-6 py-3 rotate-12 transition-opacity"
              style={{ opacity: currentX < -50 ? 1 : 0 }}
            >
              NOPE
            </div>
            <div
              className="absolute top-12 left-12 text-6xl font-bold text-green-500 border-4 border-green-500 rounded-2xl px-6 py-3 -rotate-12 transition-opacity"
              style={{ opacity: currentX > 50 ? 1 : 0 }}
            >
              LIKE
            </div>
          </>
        )}
      </div>
    </div>
  );
};
