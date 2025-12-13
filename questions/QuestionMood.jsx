/**
 * Question: Current Mood
 * Helps determine the emotional tone of recommendations
 */
export default function QuestionMood({ value, onChange }) {
  const moods = [
    {
      id: 'excited',
      label: 'PUMPED UP',
      subtitle: 'High energy, action-packed excitement',
      emoji: '🔥',
      color: 'vhs-red',
    },
    {
      id: 'relaxed',
      label: 'CHILL & RELAXED',
      subtitle: 'Easy-going, comfortable viewing',
      emoji: '😌',
      color: 'vhs-green',
    },
    {
      id: 'thoughtful',
      label: 'CONTEMPLATIVE',
      subtitle: 'Deep, thought-provoking content',
      emoji: '🤔',
      color: 'vhs-purple',
    },
    {
      id: 'emotional',
      label: 'READY TO FEEL',
      subtitle: 'Emotional journeys and heartfelt stories',
      emoji: '💙',
      color: 'vhs-cyan',
    },
    {
      id: 'adventurous',
      label: 'ADVENTUROUS',
      subtitle: 'New worlds and epic journeys',
      emoji: '🗺️',
      color: 'vhs-yellow',
    },
    {
      id: 'dark',
      label: 'DARK & INTENSE',
      subtitle: 'Psychological thrillers and dark themes',
      emoji: '🌑',
      color: 'vhs-purple',
    },
  ]

  return (
    <div className="space-y-3">
      {moods.map((mood) => (
        <button
          key={mood.id}
          onClick={() => onChange(mood.id)}
          className={`
            w-full p-5 rounded-lg border-2 transition-all duration-200
            ${
              value === mood.id
                ? `border-${mood.color} bg-${mood.color}/15 shadow-[0_0_20px_rgba(5,217,232,0.3)]`
                : 'border-vhs-white/20 bg-vhs-black/30 hover:border-vhs-cyan/50'
            }
          `}
        >
          <div className="flex items-center space-x-4">
            <div className="text-4xl flex-shrink-0">
              {mood.emoji}
            </div>
            <div className="text-left flex-grow">
              <div className={`font-orbitron text-lg font-bold ${value === mood.id ? `text-${mood.color}` : 'text-vhs-white'}`}>
                {mood.label}
              </div>
              <div className="font-vhs text-sm text-vhs-white/70 mt-1">
                {mood.subtitle}
              </div>
            </div>
            {value === mood.id && (
              <div className={`text-${mood.color} text-2xl animate-pulse`}>
                ●
              </div>
            )}
          </div>
        </button>
      ))}

      {/* Mood indicator visualization */}
      {value && (
        <div className="mt-6 p-4 border-l-4 border-vhs-cyan/50 bg-vhs-cyan/5">
          <p className="font-vhs text-sm text-vhs-white/80">
            💡 We'll match this vibe in our recommendations
          </p>
        </div>
      )}
    </div>
  )
}
