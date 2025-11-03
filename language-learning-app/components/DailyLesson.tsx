'use client';

import { useState } from 'react';

interface DailyLessonProps {
  userProgress: any;
  setUserProgress: (progress: any) => void;
}

export default function DailyLesson({ userProgress, setUserProgress }: DailyLessonProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const lessons = [
    {
      type: 'translate',
      question: 'How do you say "Hello" in Spanish?',
      options: ['Hola', 'Adiós', 'Gracias', 'Buenos días'],
      correct: 0,
      emoji: '👋'
    },
    {
      type: 'translate',
      question: 'What does "Gracias" mean in English?',
      options: ['Goodbye', 'Thank you', 'Please', 'Sorry'],
      correct: 1,
      emoji: '🙏'
    },
    {
      type: 'fill',
      question: 'Complete: "Buenos ___" (Good morning)',
      options: ['días', 'noches', 'tardes', 'tiempo'],
      correct: 0,
      emoji: '☀️'
    },
    {
      type: 'listening',
      question: 'Which word means "Water"?',
      options: ['Agua', 'Fuego', 'Aire', 'Tierra'],
      correct: 0,
      emoji: '💧'
    },
    {
      type: 'grammar',
      question: 'Choose the correct verb: "Yo ___ estudiante" (I am a student)',
      options: ['soy', 'eres', 'es', 'son'],
      correct: 0,
      emoji: '📖'
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === lessons[currentQuestion].correct) {
      setScore(score + 20);
      setTimeout(() => {
        if (currentQuestion < lessons.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          // Lesson complete
          setUserProgress({
            ...userProgress,
            xp: userProgress.xp + 100,
            lessonsCompleted: userProgress.lessonsCompleted + 1
          });
        }
      }, 1500);
    }
  };

  const restartLesson = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const isComplete = currentQuestion === lessons.length - 1 && showResult && selectedAnswer === lessons[currentQuestion].correct;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-600">Lesson Progress</span>
          <span className="text-sm font-bold text-indigo-600">{currentQuestion + 1}/{lessons.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / lessons.length) * 100}%` }}
          />
        </div>
      </div>

      {!isComplete ? (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-4xl">{lessons[currentQuestion].emoji}</span>
            <div className="px-3 py-1 bg-indigo-100 rounded-full">
              <span className="text-sm font-semibold text-indigo-700 uppercase">{lessons[currentQuestion].type}</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-8">{lessons[currentQuestion].question}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === lessons[currentQuestion].correct;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`p-4 rounded-xl border-2 font-semibold text-lg transition-all ${
                    showCorrect
                      ? 'bg-green-100 border-green-500 text-green-700'
                      : showWrong
                      ? 'bg-red-100 border-red-500 text-red-700'
                      : isSelected
                      ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showCorrect && <span className="text-2xl">✓</span>}
                    {showWrong && <span className="text-2xl">✗</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && selectedAnswer !== null && (
            <div className={`mt-6 p-4 rounded-lg ${
              selectedAnswer === lessons[currentQuestion].correct
                ? 'bg-green-50 border-2 border-green-200'
                : 'bg-red-50 border-2 border-red-200'
            }`}>
              <p className={`font-semibold ${
                selectedAnswer === lessons[currentQuestion].correct ? 'text-green-700' : 'text-red-700'
              }`}>
                {selectedAnswer === lessons[currentQuestion].correct
                  ? '🎉 Correct! Great job!'
                  : `❌ Incorrect. The correct answer is "${lessons[currentQuestion].options[lessons[currentQuestion].correct]}"`}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Lesson Complete!</h2>
          <p className="text-xl text-gray-600 mb-6">You scored {score} out of 100 points</p>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <span className="text-2xl">⭐</span>
            <span className="text-xl font-bold text-yellow-600">+100 XP</span>
          </div>
          <button
            onClick={restartLesson}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Practice Again
          </button>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-2xl font-bold text-gray-800">{score}</div>
          <div className="text-sm text-gray-600">Current Score</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-gray-800">{userProgress.xp}</div>
          <div className="text-sm text-gray-600">Total XP</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-2xl font-bold text-gray-800">{userProgress.streak}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>
      </div>
    </div>
  );
}
