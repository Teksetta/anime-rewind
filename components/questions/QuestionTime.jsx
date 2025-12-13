/**
 * Question: Time Commitment
 * Determines preferred anime length (episodes)
 */
export default function QuestionTime({ value, onChange }) {
  const timeOptions = [
    {
      id: 'short',
      label: 'SHORT & SWEET',
      subtitle: '1-13 episodes • Movies',
      icon: '⏱',
      color: 'vhs-green',
      episodes: '1-13',
      examples: 'Perfect for quick binges',
    },
    {
      id: 'medium',
      label: 'STANDARD LENGTH',
      subtitle: '12-26 episodes',
      icon: '⏲',
      color: 'vhs-cyan',
      episodes: '12-26',
      examples: 'Most seasonal anime',
    },
    {
      id: 'long',
      label: 'EPIC JOURNEY',
      subtitle: '26-100 episodes',
      icon: '⏰',
      color: 'vhs-yellow',
      episodes: '26-100',
      examples: 'Deeper character development',
    },
    {
      id: 'any',
      label: 'ANY LENGTH',
      subtitle: "Don't care about length",
      icon: '∞',
      color: 'vhs-purple',
      episodes: '1-1000+',
      examples: 'Show me everything!',
    },
  ]

  return (
    <div className="space-y-4">
      {timeOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`
            w-full p-6 rounded-lg border-2 transition-all duration-200
            ${
              value === option.id
                ? `border-${option.color} bg-${option.color}/15 shadow-[0_0_20px_rgba(5,217,232,0.3)]`
                : 'border-vhs-white/20 bg-vhs-black/30 hover:border-vhs-cyan/50'
            }
          `}
        >
          <div className="flex items-center space-x-4">
            {/* Icon */}
            <div className={`text-4xl flex-shrink-0 ${value === option.id ? `text-${option.color}` : 'text-vhs-white/50'}`}>
              {option.icon}
            </div>

            {/* Content */}
            <div className="text-left flex-grow">
              <div className={`font-orbitron text-lg font-bold ${value === option.id ? `text-${option.color}` : 'text-vhs-white'}`}>
                {option.label}
              </div>
              <div className="font-vhs text-sm text-vhs-white/70 mt-1">
                {option.subtitle}
              </div>
              <div className="font-vhs text-xs text-vhs-white/50 mt-2">
                {option.examples}
              </div>
            </div>

            {/* Episode counter visual */}
            <div className={`
              flex-shrink-0 px-3 py-2 rounded border
              ${value === option.id ? `border-${option.color} bg-${option.color}/20 text-${option.color}` : 'border-vhs-white/20 text-vhs-white/50'}
              font-vhs text-xs
            `}>
              {option.episodes}
            </div>

            {/* Check mark */}
            {value === option.id && (
              <div className={`text-${option.color} text-2xl animate-pulse ml-2`}>
                ►
              </div>
            )}
          </div>
        </button>
      ))}

      {/* Time estimate */}
      {value && value !== 'any' && (
        <div className="mt-6 p-4 border-l-4 border-vhs-cyan/50 bg-vhs-cyan/5">
          <p className="font-vhs text-sm text-vhs-white/80">
            ⏱ ESTIMATED VIEWING TIME:
          </p>
          <div className="font-vhs text-sm text-vhs-cyan mt-1">
            {value === 'short' && '~4-6 hours total'}
            {value === 'medium' && '~8-12 hours total'}
            {value === 'long' && '~20-50 hours total'}
          </div>
        </div>
      )}

      {/* Info tip */}
      <div className="mt-4 p-4 border-l-4 border-vhs-purple/50 bg-vhs-purple/5">
        <p className="font-vhs text-sm text-vhs-white/80">
          💡 We'll prioritize anime within your preferred episode range
        </p>
      </div>
    </div>
  )
}
