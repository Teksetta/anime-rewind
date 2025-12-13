import { useState } from 'react'
import AnimeDetailModal from './AnimeDetailModal'

/**
 * Results View Component
 * Displays recommended anime as interactive elements with details
 */
export default function Results({ recommendations, onBackToMenu, isLoading }) {
  const [selectedAnime, setSelectedAnime] = useState(null)

  if (isLoading) {
    return (
      <div className="relative w-full h-full flex items-center justify-center" style={{ zIndex: 10 }}>
        <div className="vhs-panel max-w-2xl w-full mx-8">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="font-orbitron text-4xl font-bold chromatic-text-strong animate-pulse">
                ANALYZING...
              </h2>
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-vhs-cyan to-transparent"></div>
            </div>

            <div className="space-y-4">
              <div className="vhs-loading mx-auto"></div>
              
              <div className="space-y-2 text-center">
                <p className="font-vhs text-xl text-vhs-cyan chromatic-text">
                  SEARCHING DATABASE...
                </p>
                <p className="font-vhs text-sm text-vhs-white/60">
                  Processing your preferences
                </p>
                <p className="font-vhs text-sm text-vhs-white/60">
                  Analyzing thousands of titles
                </p>
                <p className="font-vhs text-sm text-vhs-white/60">
                  Calculating compatibility scores
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="relative w-full h-full flex items-center justify-center" style={{ zIndex: 10 }}>
        <div className="vhs-panel max-w-2xl w-full mx-8">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="font-orbitron text-4xl font-bold text-vhs-red">
                ERROR
              </h2>
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-vhs-red to-transparent"></div>
            </div>

            <p className="font-vhs text-lg text-center text-vhs-white/80">
              Unable to fetch recommendations. Please try again.
            </p>

            <button 
              onClick={onBackToMenu}
              className="vcr-button w-full"
            >
              ◄ BACK TO MENU
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative w-full h-full flex items-center justify-center overflow-y-auto" style={{ zIndex: 10 }}>
        <div className="max-w-7xl w-full mx-8 my-8">
          {/* Header */}
          <div className="vhs-panel mb-6">
            <div className="text-center space-y-2">
              <h2 className="font-orbitron text-3xl font-bold chromatic-text-strong">
                YOUR RECOMMENDATIONS
              </h2>
              <p className="font-vhs text-sm text-vhs-cyan">
                {recommendations.length} TAPES LOADED • CLICK TO VIEW DETAILS
              </p>
            </div>
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {recommendations.map((anime, index) => (
              <AnimeCard
                key={anime.mal_id}
                anime={anime}
                index={index}
                onClick={() => setSelectedAnime(anime)}
              />
            ))}
          </div>

          {/* Back Button */}
          <div className="vhs-panel">
            <button 
              onClick={onBackToMenu}
              className="vcr-button w-full"
            >
              ◄ BACK TO MENU
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAnime && (
        <AnimeDetailModal
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
        />
      )}
    </>
  )
}

function AnimeCard({ anime, index, onClick }) {
  const [imageError, setImageError] = useState(false)
  
  // Determine tape color based on genres
  const getAccentColor = () => {
    const genres = anime.genres?.map(g => g.name.toLowerCase()) || []
    
    if (genres.some(g => ['action', 'sports'].includes(g))) return 'vhs-red'
    if (genres.some(g => ['comedy', 'slice of life'].includes(g))) return 'vhs-green'
    if (genres.some(g => ['sci-fi', 'mecha'].includes(g))) return 'vhs-cyan'
    if (genres.some(g => ['mystery', 'psychological'].includes(g))) return 'vhs-purple'
    if (genres.some(g => ['romance', 'drama'].includes(g))) return 'vhs-red'
    if (genres.some(g => ['fantasy', 'adventure'].includes(g))) return 'vhs-yellow'
    
    return 'vhs-cyan'
  }

  const accentColor = getAccentColor()

  return (
    <button
      onClick={onClick}
      className={`
        group relative overflow-hidden rounded-lg 
        border-2 border-${accentColor}/30 bg-vhs-black/80
        hover:border-${accentColor} hover:bg-${accentColor}/10
        transition-all duration-300
        hover:shadow-[0_0_30px_rgba(5,217,232,0.4)]
        hover:scale-105
      `}
    >
      {/* Rank Badge */}
      <div className={`absolute top-2 left-2 z-10 w-8 h-8 rounded-full bg-${accentColor} flex items-center justify-center font-retro text-xs text-vhs-black font-bold`}>
        #{index + 1}
      </div>

      {/* Score Badge */}
      <div className="absolute top-2 right-2 z-10 px-2 py-1 rounded bg-vhs-black/80 border border-vhs-yellow/50 font-vhs text-xs text-vhs-yellow">
        ★ {anime.score?.toFixed(1) || 'N/A'}
      </div>

      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-vhs-black">
        {!imageError ? (
          <img
            src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
            alt={anime.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="font-retro text-xs text-vhs-white/50">NO IMAGE</div>
          </div>
        )}
        
        {/* VHS Scanline overlay on image */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,rgba(0,0,0,0.1)_1px,transparent_1px,transparent_2px)] pointer-events-none"></div>
      </div>

      {/* Info */}
      <div className="p-4 text-left space-y-2">
        {/* Title */}
        <h3 className={`font-orbitron text-sm font-bold text-${accentColor} line-clamp-2 group-hover:text-vhs-white transition-colors`}>
          {anime.title}
        </h3>

        {/* Genres */}
        <div className="flex flex-wrap gap-1">
          {anime.genres?.slice(0, 3).map(genre => (
            <span
              key={genre.mal_id}
              className="px-2 py-0.5 rounded text-[8px] font-retro bg-vhs-white/10 text-vhs-white/70"
            >
              {genre.name.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Episodes */}
        <div className="font-vhs text-xs text-vhs-white/60">
          {anime.episodes ? `${anime.episodes} EP` : anime.type || 'UNKNOWN'} • {anime.year || '????'}
        </div>

        {/* Explanation */}
        {anime.explanation && (
          <p className="font-vhs text-xs text-vhs-cyan/80 line-clamp-2 pt-2 border-t border-vhs-white/10">
            💡 {anime.explanation}
          </p>
        )}

        {/* Click indicator */}
        <div className={`text-center pt-2 font-vhs text-xs text-${accentColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
          ► CLICK FOR DETAILS
        </div>
      </div>
    </button>
  )
}
