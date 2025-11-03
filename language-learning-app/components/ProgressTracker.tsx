'use client';

interface ProgressTrackerProps {
  userProgress: any;
}

export default function ProgressTracker({ userProgress }: ProgressTrackerProps) {
  const achievements = [
    { id: 1, name: 'First Steps', icon: '👶', description: 'Complete your first lesson', unlocked: true },
    { id: 2, name: 'Week Warrior', icon: '🔥', description: 'Maintain a 7-day streak', unlocked: true },
    { id: 3, name: 'Word Master', icon: '📚', description: 'Learn 200 words', unlocked: true },
    { id: 4, name: 'Level Up', icon: '⬆️', description: 'Reach level 5', unlocked: true },
    { id: 5, name: 'Month Champion', icon: '🏆', description: 'Maintain a 30-day streak', unlocked: false },
    { id: 6, name: 'Polyglot', icon: '🌍', description: 'Learn 1000 words', unlocked: false },
  ];

  const weeklyActivity = [
    { day: 'Mon', xp: 120, completed: true },
    { day: 'Tue', xp: 150, completed: true },
    { day: 'Wed', xp: 90, completed: true },
    { day: 'Thu', xp: 180, completed: true },
    { day: 'Fri', xp: 110, completed: true },
    { day: 'Sat', xp: 140, completed: true },
    { day: 'Sun', xp: 100, completed: true },
  ];

  const maxXp = Math.max(...weeklyActivity.map(d => d.xp));

  const skills = [
    { name: 'Vocabulary', level: 8, progress: 75, color: 'from-blue-500 to-cyan-500' },
    { name: 'Grammar', level: 6, progress: 60, color: 'from-purple-500 to-pink-500' },
    { name: 'Listening', level: 5, progress: 45, color: 'from-green-500 to-emerald-500' },
    { name: 'Speaking', level: 4, progress: 30, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-8 shadow-lg text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-1">Level {userProgress.level}</h2>
            <p className="text-indigo-100">Keep learning to level up!</p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-4xl font-bold">
            {userProgress.level}
          </div>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>{userProgress.xp} XP</span>
            <span>{userProgress.xpToNextLevel} XP</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-4 overflow-hidden">
            <div
              className="bg-white h-4 rounded-full transition-all duration-500"
              style={{ width: `${(userProgress.xp / userProgress.xpToNextLevel) * 100}%` }}
            />
          </div>
        </div>
        <p className="text-sm text-indigo-100">{userProgress.xpToNextLevel - userProgress.xp} XP to next level</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="text-4xl mb-2">📖</div>
          <div className="text-3xl font-bold text-gray-800">{userProgress.lessonsCompleted}</div>
          <div className="text-sm text-gray-600">Lessons</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="text-4xl mb-2">💬</div>
          <div className="text-3xl font-bold text-gray-800">{userProgress.totalWords}</div>
          <div className="text-sm text-gray-600">Words Learned</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="text-4xl mb-2">🔥</div>
          <div className="text-3xl font-bold text-gray-800">{userProgress.streak}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="text-4xl mb-2">⭐</div>
          <div className="text-3xl font-bold text-gray-800">{userProgress.xp}</div>
          <div className="text-sm text-gray-600">Total XP</div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Weekly Activity</h3>
        <div className="flex items-end justify-between space-x-2 h-48">
          {weeklyActivity.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-end justify-center flex-1 mb-2">
                <div
                  className={`w-full rounded-t-lg transition-all ${
                    day.completed
                      ? 'bg-gradient-to-t from-indigo-500 to-purple-600'
                      : 'bg-gray-200'
                  }`}
                  style={{ height: `${(day.xp / maxXp) * 100}%` }}
                />
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-gray-600 mb-1">{day.day}</div>
                <div className="text-xs font-bold text-indigo-600">{day.xp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Breakdown */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Skills Breakdown</h3>
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">{skill.name}</span>
                  <span className="text-sm text-gray-500">Level {skill.level}</span>
                </div>
                <span className="text-sm font-bold text-gray-600">{skill.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${skill.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300'
                  : 'bg-gray-50 border-gray-200 opacity-50'
              }`}
            >
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <h4 className="font-bold text-gray-800 mb-1">{achievement.name}</h4>
              <p className="text-xs text-gray-600">{achievement.description}</p>
              {achievement.unlocked && (
                <div className="mt-2 text-xs font-semibold text-green-600">✓ Unlocked</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
