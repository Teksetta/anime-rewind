import { useEffect } from 'react'

/**
 * Anime Detail Modal
 * Full-screen VHS-style modal showing complete anime information
 */
export default function AnimeDetailModal({ anime, onClose }) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    
    // Close on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  // Determine streaming platforms (mock data - would need external API)
  const getStreamingPlatforms = () => {
    // This is simplified - in production would integrate with streaming APIs
    const platforms = []
    const score = anime.score || 0
    
    if (score > 8.0) platforms.push({ name: 'Crunchyroll', color: 'vhs-red' })
    if (score > 7.5) platforms.push({ name: 'Funimation', color: 'vhs-purple' })
    if (anime.genres?.some(g => g.name === 'Action')) platforms.push({ name: 'Netflix', color: 'vhs-red' })
    
    return platforms
  }

  const streamingPlatforms = getStreamingPlatforms()

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-vhs-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="vhs-panel max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-vhs-red/20 border-2 border-vhs-red hover:bg-vhs-red/40 transition-colors flex items-center justify-center font-bold text-vhs-red"
        >
          ✕
        </button>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Poster */}
            <div className="flex-shrink-0 w-full md:w-64">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border-2 border-vhs-cyan/50 shadow-[0_0_20px_rgba(5,217,232,0.3)]">
                <img
                  src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
                  alt={anime.title}
                  className="w-full h-full object-cover"
                />
                {/* VHS tracking effect */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15)_0px,rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none"></div>
              </div>

              {/* Score Display */}
              <div className="mt-4 p-4 bg-vhs-yellow/10 border border-vhs-yellow/30 rounded text-center">
                <div className="font-retro text-xs text-vhs-white/60 mb-1">MAL SCORE</div>
                <div className="font-orbitron text-3xl font-bold text-vhs-yellow">
                  {anime.score?.toFixed(2) || 'N/A'}
                </div>
                <div className="font-vhs text-xs text-vhs-white/60 mt-1">
                  ★★★★★
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-grow space-y-4">
              {/* Title */}
              <div>
                <h2 className="font-orbitron text-3xl font-bold chromatic-text-strong mb-2">
                  {anime.title}
                </h2>
                {anime.title_english && anime.title_english !== anime.title && (
                  <p className="font-vhs text-sm text-vhs-white/70">
                    {anime.title_english}
                  </p>
                )}
                {anime.title_japanese && (
                  <p className="font-vhs text-sm text-vhs-white/50">
                    {anime.title_japanese}
                  </p>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard label="TYPE" value={anime.type || 'Unknown'} />
                <StatCard label="EPISODES" value={anime.episodes || '?'} />
                <StatCard label="STATUS" value={anime.status || 'Unknown'} />
                <StatCard label="YEAR" value={anime.year || anime.aired?.prop?.from?.year || '?'} />
              </div>

              {/* Genres */}
              <div>
                <div className="font-retro text-xs text-vhs-cyan mb-2">GENRES</div>
                <div className="flex flex-wrap gap-2">
                  {anime.genres?.map(genre => (
                    <span
                      key={genre.mal_id}
                      className="px-3 py-1 rounded border border-vhs-purple/50 bg-vhs-purple/10 font-vhs text-sm text-vhs-purple"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Streaming Platforms */}
              {streamingPlatforms.length > 0 && (
                <div>
                  <div className="font-retro text-xs text-vhs-cyan mb-2">WATCH ON</div>
                  <div className="flex flex-wrap gap-2">
                    {streamingPlatforms.map((platform, idx) => (
                      <div
                        key={idx}
                        className={`px-4 py-2 rounded border-2 border-${platform.color} bg-${platform.color}/20 font-vhs text-sm text-${platform.color} flex items-center space-x-2`}
                      >
                        <span>►</span>
                        <span>{platform.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-vhs-cyan to-transparent"></div>

          {/* Synopsis */}
          <div>
            <div className="font-retro text-xs text-vhs-cyan mb-3 flex items-center space-x-2">
              <span>SYNOPSIS</span>
              <div className="h-[1px] flex-grow bg-vhs-cyan/30"></div>
            </div>
            <p className="font-vhs text-sm text-vhs-white/80 leading-relaxed">
              {anime.synopsis || 'No synopsis available.'}
            </p>
          </div>

          {/* Why Recommended */}
          {anime.explanation && (
            <div className="p-4 border-l-4 border-vhs-green/50 bg-vhs-green/5">
              <div className="font-retro text-xs text-vhs-green mb-2">WHY WE RECOMMEND THIS</div>
              <p className="font-vhs text-sm text-vhs-white/80">
                {anime.explanation}
              </p>
            </div>
          )}

          {/* Additional Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <InfoCard 
              label="RATING" 
              value={anime.rating || 'Unknown'} 
              icon="🔞"
            />
            <InfoCard 
              label="POPULARITY" 
              value={anime.popularity ? `#${anime.popularity}` : 'N/A'} 
              icon="📊"
            />
            <InfoCard 
              label="MEMBERS" 
              value={anime.members ? formatNumber(anime.members) : 'N/A'} 
              icon="👥"
            />
            <InfoCard 
              label="FAVORITES" 
              value={anime.favorites ? formatNumber(anime.favorites) : 'N/A'} 
              icon="❤️"
            />
          </div>

          {/* Studios */}
          {anime.studios && anime.studios.length > 0 && (
            <div>
              <div className="font-retro text-xs text-vhs-cyan mb-2">STUDIO</div>
              <div className="flex flex-wrap gap-2">
                {anime.studios.map(studio => (
                  <span
                    key={studio.mal_id}
                    className="px-3 py-1 rounded border border-vhs-white/30 bg-vhs-white/5 font-vhs text-sm text-vhs-white/70"
                  >
                    {studio.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="vcr-button flex-1"
            >
              ◄ BACK TO RESULTS
            </button>
            {anime.url && (
              <a
                href={anime.url}
                target="_blank"
                rel="noopener noreferrer"
                className="vcr-button flex-1 text-center"
              >
                VIEW ON MAL →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="p-3 bg-vhs-black/40 border border-vhs-white/20 rounded text-center">
      <div className="font-retro text-[8px] text-vhs-white/60 mb-1">{label}</div>
      <div className="font-vhs text-lg text-vhs-cyan">{value}</div>
    </div>
  )
}

function InfoCard({ label, value, icon }) {
  return (
    <div className="p-3 bg-vhs-black/40 border border-vhs-white/20 rounded">
      <div className="font-retro text-[8px] text-vhs-white/60 mb-1">{label}</div>
      <div className="font-vhs text-sm text-vhs-white flex items-center space-x-2">
        <span>{icon}</span>
        <span>{value}</span>
      </div>
    </div>
  )
}

function formatNumber(num) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}
