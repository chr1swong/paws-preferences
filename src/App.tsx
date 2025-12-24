import { useState, useEffect } from 'react';
import { Cat } from './types';
import { fetchCats } from './api';
import { CatCard } from './components/CatCard';
import { Summary } from './components/Summary';

function App() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [likedCats, setLikedCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  useEffect(() => {
    loadCats();
  }, []);

  const loadCats = async () => {
    setIsLoading(true);
    const fetchedCats = await fetchCats(10);
    setCats(fetchedCats);
    setCurrentIndex(0);
    setLikedCats([]);
    setShowSummary(false);
    setIsLoading(false);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex >= cats.length) return;

    const currentCat = cats[currentIndex];

    if (direction === 'right') {
      setLikedCats((prev) => [...prev, currentCat]);
    }

    if (currentIndex + 1 >= cats.length) {
      // Show summary after a short delay for the animation
      setTimeout(() => {
        setShowSummary(true);
      }, 300);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    loadCats();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-2xl font-semibold text-gray-700">Loading cats...</p>
        </div>
      </div>
    );
  }

  if (showSummary) {
    return <Summary likedCats={likedCats} totalCats={cats.length} onRestart={handleRestart} />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-pink-100 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-4 pt-3 pb-1 text-center flex-shrink-0">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
          Paws&Preference
        </h1>
        <p className="text-gray-600 mt-2 text-sm font-bold">
          {currentIndex + 1} / {cats.length}
        </p>
      </header>

      {/* Card Stack */}
      <div className="flex justify-center px-4 flex-shrink-0">
        <div className="relative w-full max-w-md h-full max-h-[70vh] aspect-[3/4] mt-4">
          {cats.slice(currentIndex, currentIndex + 2).map((cat, index) => (
            <CatCard
              key={cat.id}
              cat={cat}
              onSwipe={handleSwipe}
              isTop={index === 0}
            />
          ))}
        </div>
      </div>

      {/* Swipe Instructions */}
      <div className="flex justify-between px-8 max-w-md mx-auto w-full flex-shrink-0 pb-4 pt-4">
        <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
          <span className="text-2xl">←</span>
          <span>Swipe to dislike</span>
        </div>
        <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
          <span>Swipe to like</span>
          <span className="text-2xl">→</span>
        </div>
      </div>
    </div>
  );
}

export default App;
