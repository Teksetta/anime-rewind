/**
 * Question: Content Rating Preference
 * Determines appropriate maturity level for recommendations
 */
export default function QuestionRating({ value, onChange }) {
  const ratings = [
    {
      id: 'g',
      label: 'G - ALL AGES',
      subtitle: 'Family-friendly, suitable for everyone',
      badge: 'G',
      color: 'vhs-green',
      description: 'Nothing objectionable',
    },
    {
      id: 'pg',
      label: 'PG - CHILDREN',
      subtitle: 'Mild themes, suitable for kids',
      badge: 'PG',
      color: 'vhs-cyan',
      description: 'Some mild content',
    },
    {
      id: 'pg13',
      label: 'PG-13 - TEENS',
      subtitle: 'Moderate themes, some violence',
      badge: 'PG-13',
      color: 'vhs-yellow',
      description: 'Teenagers and up',
    },
    {
      id: 'r',
      label: 'R-17+ - MATURE',
      subtitle: 'Strong violence, adult themes',
      badge: 'R-17+',
      color: 'vhs-red',
      description: 'Adult content, mature themes',
    },
  ]

  return (
    <div className="space-y-4">
      {ratings.map((rating) => (
        <button
          key={rating.id}
          onClick={() => onChange(rating.id)}
          className={`
            w-full p-6 rounded-lg border-2 transition-all duration-200
            ${
              value === rating.id
                ? `border-${rating.color} bg-${rating.color}/15 shadow-[0_0_20px_rgba(5,217,232,0.3)]`
                : 'border-vhs-white/20 bg-vhs-black/30 hover:border-vhs-cyan/50'
            }
          `}
        >
          <div className="flex items-start space-x-4">
            {/* Rating Badge */}
            <div className={`
              flex-shrink-0 w-16 h-16 rounded border-2 border-${rating.color}
              flex items-center justify-center font-retro text-xs
              ${value === rating.id ? `bg-${rating.color}/20 text-${rating.color}` : 'bg-vhs-black text-vhs-white/50'}
            `}>
              {rating.badge}
            </div>

            {/* Content */}
            <div className="text-left flex-grow">
              <div className={`font-orbitron text-lg font-bold ${value === rating.id ? `text-${rating.color}` : 'text-vhs-white'}`}>
                {rating.label}
              </div>
              <div className="font-vhs text-sm text-vhs-white/70 mt-1">
                {rating.subtitle}
              </div>
              <div className="font-vhs text-xs text-vhs-white/50 mt-2">
                {rating.description}
              </div>
            </div>

            {/* Check mark */}
            {value === rating.id && (
              <div className={`text-${rating.color} text-2xl animate-pulse`}>
                ✓
              </div>
            )}
          </div>
        </button>
      ))}

      {/* Warning message for mature content */}
      {value === 'r' && (
        <div className="mt-6 p-4 border-l-4 border-vhs-red/50 bg-vhs-red/5">
          <p className="font-vhs text-sm text-vhs-red">
            ⚠ WARNING: May include graphic violence, sexual content, or disturbing themes
          </p>
        </div>
      )}

      {/* Info tip */}
      <div className="mt-6 p-4 border-l-4 border-vhs-cyan/50 bg-vhs-cyan/5">
        <p className="font-vhs text-sm text-vhs-white/80">
          💡 This filters recommendations based on MAL content ratings
        </p>
      </div>
    </div>
  )
}
