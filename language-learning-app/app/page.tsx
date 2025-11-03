'use client';

import { useState, useEffect } from 'react';
import DailyLesson from '@/components/DailyLesson';
import ProgressTracker from '@/components/ProgressTracker';
import VocabularyPractice from '@/components/VocabularyPractice';

export default function Home() {
  const [activeTab, setActiveTab] = useState('lesson');
  const [userProgress, setUserProgress] = useState({
    level: 5,
    xp: 450,
    xpToNextLevel: 500,
    streak: 7,
    totalWords: 234,
    lessonsCompleted: 12
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">🌍</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                LingoMaster
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-orange-100 px-3 py-1 rounded-full">
                <span className="text-xl">🔥</span>
                <span className="font-bold text-orange-600">{userProgress.streak} day streak</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                {userProgress.level}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-2 bg-white rounded-xl p-2 shadow-md">
          <button
            onClick={() => setActiveTab('lesson')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'lesson'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📚 Daily Lesson
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'progress'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📊 Progress
          </button>
          <button
            onClick={() => setActiveTab('vocabulary')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'vocabulary'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            💬 Vocabulary
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'lesson' && <DailyLesson userProgress={userProgress} setUserProgress={setUserProgress} />}
        {activeTab === 'progress' && <ProgressTracker userProgress={userProgress} />}
        {activeTab === 'vocabulary' && <VocabularyPractice userProgress={userProgress} setUserProgress={setUserProgress} />}
      </div>
    </main>
  );
}
