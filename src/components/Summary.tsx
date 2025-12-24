import React from 'react';
import { Cat } from '../types';

interface SummaryProps {
  likedCats: Cat[];
  totalCats: number;
  onRestart: () => void;
}

export const Summary: React.FC<SummaryProps> = ({ likedCats, totalCats, onRestart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-pink-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            🐾 Results
          </h1>
          <p className="text-2xl text-gray-600">
            You liked <span className="font-bold text-orange-500">{likedCats.length}</span> out of{' '}
            <span className="font-bold">{totalCats}</span> cats!
          </p>
        </div>

        {likedCats.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {likedCats.map((cat) => (
              <div
                key={cat.id}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white"
              >
                <img
                  src={cat.imageUrl}
                  alt="Liked cat"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-3xl text-gray-500 mb-4">😿</p>
            <p className="text-xl text-gray-600">You didn't like any cats!</p>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};
