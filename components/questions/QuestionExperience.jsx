/**
 * Question: Experience Level
 * Determines the user's familiarity with anime
 */
export default function QuestionExperience({ value, onChange }) {
  const options = [
    {
      id: 'beginner',
      label: 'COMPLETE BEGINNER',
      subtitle: 'New to anime, show me the classics',
      icon: '►',
      color: 'vhs-green',
    },
    {
      id: 'casual',
      label: 'CASUAL VIEWER',
      subtitle: "Seen a few popular ones, what's next?",
      icon: '►►',
      color: 'vhs-cyan',
    },
    {
      id: 'experienced',
      label: 'EXPERIENCED FAN',
      subtitle: 'Looking for deeper cuts and hidden gems',
      icon: '►►►',
      color: 'vhs-purple',
    },
    {
      id: 'expert',
      label: 'OTAKU / EXPERT',
      subtitle: 'Give me the obscure and avant-garde',
      icon: '►►►►',
      color: 'vhs-red',
    },
  ]

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`
            w-full p-6 rounded-lg border-2 transition-all duration-200
            ${
              value === option.id
                ? `border-${option.color} bg-${option.color}/10 shadow-[0_0_20px_rgba(5,217,232,0.3)]`
                : 'border-vhs-white/20 bg-vhs-black/40 hover:border-vhs-cyan/50'
            }
          `}
        >
          <div className="flex items-center space-x-4">
            <div className={`text-${option.color} text-3xl font-bold flex-shrink-0`}>
              {option.icon}
            </div>
            <div className="text-left flex-grow">
              <div className={`font-orbitron text-lg font-bold ${value === option.id ? `text-${option.color}` : 'text-vhs-white'}`}>
                {option.label}
              </div>
              <div className="font-vhs text-sm text-vhs-white/70 mt-1">
                {option.subtitle}
              </div>
            </div>
            {value === option.id && (
              <div className={`text-${option.color} text-2xl animate-pulse`}>
                ✓
              </div>
            )}
          </div>
        </button>
      ))}

      {/* VHS tape label style tip */}
      <div className="mt-6 p-4 border-l-4 border-vhs-cyan/50 bg-vhs-cyan/5">
        <p className="font-vhs text-sm text-vhs-white/80">
          💡 TIP: This helps us calibrate recommendations to your experience level
        </p>
      </div>
    </div>
  )
}
