'use client';

import { useState } from 'react';

interface VocabularyPracticeProps {
  userProgress: any;
  setUserProgress: (progress: any) => void;
}

export default function VocabularyPractice({ userProgress, setUserProgress }: VocabularyPracticeProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [masteredWords, setMasteredWords] = useState<Set<number>>(new Set());

  const categories = [
    { id: 'all', name: 'All Words', icon: '📚', count: 234 },
    { id: 'greetings', name: 'Greetings', icon: '👋', count: 24 },
    { id: 'food', name: 'Food', icon: '🍔', count: 45 },
    { id: 'travel', name: 'Travel', icon: '✈️', count: 38 },
    { id: 'numbers', name: 'Numbers', icon: '🔢', count: 20 },
    { id: 'colors', name: 'Colors', icon: '🎨', count: 12 },
  ];

  const vocabularyWords = [
    { id: 1, spanish: 'Hola', english: 'Hello', category: 'greetings', difficulty: 'easy', pronunciation: 'oh-lah' },
    { id: 2, spanish: 'Gracias', english: 'Thank you', category: 'greetings', difficulty: 'easy', pronunciation: 'grah-see-ahs' },
    { id: 3, spanish: 'Adiós', english: 'Goodbye', category: 'greetings', difficulty: 'easy', pronunciation: 'ah-dee-ohs' },
    { id: 4, spanish: 'Buenos días', english: 'Good morning', category: 'greetings', difficulty: 'medium', pronunciation: 'bweh-nohs dee-ahs' },
    { id: 5, spanish: 'Por favor', english: 'Please', category: 'greetings', difficulty: 'easy', pronunciation: 'pohr fah-vohr' },
    { id: 6, spanish: 'Agua', english: 'Water', category: 'food', difficulty: 'easy', pronunciation: 'ah-gwah' },
    { id: 7, spanish: 'Pan', english: 'Bread', category: 'food', difficulty: 'easy', pronunciation: 'pahn' },
    { id: 8, spanish: 'Manzana', english: 'Apple', category: 'food', difficulty: 'medium', pronunciation: 'mahn-sah-nah' },
    { id: 9, spanish: 'Café', english: 'Coffee', category: 'food', difficulty: 'easy', pronunciation: 'kah-feh' },
    { id: 10, spanish: 'Aeropuerto', english: 'Airport', category: 'travel', difficulty: 'hard', pronunciation: 'ah-eh-roh-pwehr-toh' },
    { id: 11, spanish: 'Hotel', english: 'Hotel', category: 'travel', difficulty: 'easy', pronunciation: 'oh-tehl' },
    { id: 12, spanish: 'Rojo', english: 'Red', category: 'colors', difficulty: 'easy', pronunciation: 'roh-hoh' },
  ];

  const filteredWords = selectedCategory === 'all'
    ? vocabularyWords
    : vocabularyWords.filter(word => word.category === selectedCategory);

  const toggleFlip = (id: number) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(id)) {
      newFlipped.delete(id);
    } else {
      newFlipped.add(id);
    }
    setFlippedCards(newFlipped);
  };

  const toggleMastered = (id: number) => {
    const newMastered = new Set(masteredWords);
    if (newMastered.has(id)) {
      newMastered.delete(id);
    } else {
      newMastered.add(id);
      setUserProgress({
        ...userProgress,
        xp: userProgress.xp + 10
      });
    }
    setMasteredWords(newMastered);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Choose Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-transparent shadow-lg'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-indigo-300'
              }`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="font-semibold text-sm">{category.name}</div>
              <div className="text-xs opacity-75">{category.count} words</div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 shadow-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-1">Vocabulary Progress</h3>
            <p className="text-purple-100">Keep practicing to master more words!</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{masteredWords.size}</div>
            <div className="text-sm text-purple-100">Words Mastered</div>
          </div>
        </div>
      </div>

      {/* Flashcards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWords.map((word) => {
          const isFlipped = flippedCards.has(word.id);
          const isMastered = masteredWords.has(word.id);

          return (
            <div
              key={word.id}
              className="relative group"
              style={{ perspective: '1000px' }}
            >
              <div
                className={`relative w-full h-64 transition-transform duration-500 cursor-pointer ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => toggleFlip(word.id)}
              >
                {/* Front of card */}
                <div
                  className={`absolute inset-0 bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between ${
                    isMastered ? 'ring-4 ring-green-400' : ''
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(word.difficulty)}`}>
                        {word.difficulty}
                      </span>
                      {isMastered && (
                        <span className="text-2xl">⭐</span>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-800 mb-4">{word.spanish}</div>
                      <div className="text-sm text-gray-500 italic">/{word.pronunciation}/</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400 mb-2">Click to reveal</div>
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 flex flex-col justify-between text-white"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white bg-opacity-20">
                        {word.category}
                      </span>
                      {isMastered && (
                        <span className="text-2xl">⭐</span>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-4">{word.english}</div>
                      <div className="text-sm opacity-75 mb-4">Translation of</div>
                      <div className="text-2xl font-semibold opacity-90">{word.spanish}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs opacity-75 mb-2">Click to flip back</div>
                  </div>
                </div>
              </div>

              {/* Mastered Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastered(word.id);
                }}
                className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full font-semibold text-sm shadow-lg transition-all z-10 ${
                  isMastered
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {isMastered ? '✓ Mastered' : 'Mark Mastered'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Practice Tips */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 shadow-lg border-2 border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="text-3xl">💡</div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Practice Tips</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Click cards to flip and see translations</li>
              <li>• Mark words as "Mastered" when you know them well</li>
              <li>• Practice difficult words more frequently</li>
              <li>• Use pronunciation guides to improve speaking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
