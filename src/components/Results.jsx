import { useState } from 'react'
import AnimeDetailModal from './AnimeDetailModal'
import './Results.css'

function Results({ recommendations, preferences, onRestart }) {
  const [selectedAnime, setSelectedAnime] = useState(null)

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>🎬 YOUR RECOMMENDATIONS</h1>
        <p>Based on your preferences</p>
      </div>

      <div className="recommendations-grid">
        {recommendations.map((anime, idx) => (
          <div
            key={idx}
            className="recommendation-card"
            onClick={() => setSelectedAnime(anime)}
          >
            <div className="card-image-wrapper">
              {anime.images?.jpg?.image_url ? (
                <img 
                  src={anime.images.jpg.image_url} 
                  alt={anime.title}
                  className="card-image"
                />
              ) : (
                <div className="card-image-placeholder">NO IMAGE</div>
              )}
            </div>
            <div className="card-info">
              <h3>{anime.title}</h3>
              <p className="match-score">⭐ {anime.matchScore}% Match</p>
            </div>
          </div>
        ))}
      </div>

      <div className="results-footer">
        <button className="btn-restart" onClick={onRestart}>
          ← FIND MORE ANIME
        </button>
      </div>

      {selectedAnime && (
        <AnimeDetailModal 
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
        />
      )}
    </div>
  )
}

export default Results
