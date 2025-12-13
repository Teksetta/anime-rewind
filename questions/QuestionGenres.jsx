/**
 * Question: Preferred Genres
 * Multi-select (up to 3 genres)
 */
export default function QuestionGenres({ value = [], onChange }) {
  const genres = [
    { id: 'action', label: 'ACTION', icon: '⚔', color: 'vhs-red' },
    { id: 'adventure', label: 'ADVENTURE', icon: '🗺', color: 'vhs-yellow' },
    { id: 'comedy', label: 'COMEDY', icon: '😄', color: 'vhs-green' },
    { id: 'drama', label: 'DRAMA', icon: '🎭', color: 'vhs-purple' },
    { id: 'fantasy', label: 'FANTASY', icon: '✨', color: 'vhs-cyan' },
    { id: 'horror', label: 'HORROR', icon: '👻', color: 'vhs-red' },
    { id: 'mystery', label: 'MYSTERY', icon: '🔍', color: 'vhs-purple' },
    { id: 'psychological', label: 'PSYCHOLOGICAL', icon: '🧠', color: 'vhs-cyan' },
    { id: 'romance', label: 'ROMANCE', icon: '💕', color: 'vhs-red' },
    { id: 'sci-fi', label: 'SCI-FI', icon: '🚀', color: 'vhs-cyan' },
    { id: 'slice-of-life', label: 'SLICE OF LIFE', icon: '🌸', color: 'vhs-yellow' },
    { id: 'sports', label: 'SPORTS', icon: '⚽', color: 'vhs-green' },
  ]

  const maxSelections = 3
  const isSelected = (genreId) => value.includes(genreId)
  const canSelect = value.length < maxSelections

  const toggleGenre = (genreId) => {
    if (isSelected(genreId)) {
      // Remove genre
      onChange(value.filter((id) => id !== genreId))
    } else if (canSelect) {
      // Add genre
      onChange([...value, genreId])
    }
  }

  return (
    <div>
      {/* Selection Counter */}
      <div className="mb-6 text-center">
        <div className="font-vhs text-xl text-vhs-cyan chromatic-text">
          SELECTED: {value.length} / {maxSelections}
        </div>
        <div className="font-vhs text-sm text-vhs-white/60 mt-1">
          {value.length === 0 && 'Select up to 3 genres'}
          {value.length > 0 && value.length < maxSelections && `Select ${maxSelections - value.length} more`}
          {value.length === maxSelections && '✓ Maximum reached'}
        </div>
      </div>

      {/* Genre Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {genres.map((genre) => {
          const selected = isSelected(genre.id)
          const disabled = !selected && !canSelect

          return (
            <button
              key={genre.id}
              onClick={() => toggleGenre(genre.id)}
              disabled={disabled}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-200
                ${
                  selected
                    ? `border-${genre.color} bg-${genre.color}/20 shadow-[0_0_15px_rgba(5,217,232,0.4)]`
                    : disabled
                    ? 'border-vhs-white/10 bg-vhs-black/20 opacity-30 cursor-not-allowed'
                    : 'border-vhs-white/30 bg-vhs-black/40 hover:border-vhs-cyan/70 hover:bg-vhs-cyan/10'
                }
              `}
            >
              {/* Selection indicator */}
              {selected && (
                <div className={`absolute top-1 right-1 w-6 h-6 rounded-full bg-${genre.color} flex items-center justify-center text-vhs-black text-xs font-bold`}>
                  {value.indexOf(genre.id) + 1}
                </div>
              )}

              <div className="text-center">
                <div className="text-3xl mb-2">{genre.icon}</div>
                <div className={`font-retro text-[8px] ${selected ? `text-${genre.color}` : 'text-vhs-white'}`}>
                  {genre.label}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected genres display */}
      {value.length > 0 && (
        <div className="mt-6 p-4 border border-vhs-cyan/30 bg-vhs-cyan/5 rounded">
          <div className="font-vhs text-sm text-vhs-white/80 mb-2">
            YOUR SELECTION:
          </div>
          <div className="flex flex-wrap gap-2">
            {value.map((genreId) => {
              const genre = genres.find((g) => g.id === genreId)
              return (
                <div
                  key={genreId}
                  className={`px-3 py-1 rounded border border-${genre.color} bg-${genre.color}/10 font-vhs text-sm text-${genre.color} flex items-center space-x-2`}
                >
                  <span>{genre.icon}</span>
                  <span>{genre.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
