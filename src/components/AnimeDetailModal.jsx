import './AnimeDetailModal.css'

function AnimeDetailModal({ anime, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-body">
          <div className="modal-image">
            {anime.images?.jpg?.image_url ? (
              <img src={anime.images.jpg.image_url} alt={anime.title} />
            ) : (
              <div className="image-placeholder">NO IMAGE</div>
            )}
          </div>

          <div className="modal-info">
            <h2>{anime.title}</h2>
            
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Episodes:</span>
                <span className="value">{anime.episodes || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="label">Status:</span>
                <span className="value">{anime.status || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="label">Score:</span>
                <span className="value">⭐ {anime.score || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="label">Year:</span>
                <span className="value">{anime.year || 'N/A'}</span>
              </div>
            </div>

            {anime.synopsis && (
              <div className="synopsis">
                <h4>Synopsis</h4>
                <p>{anime.synopsis}</p>
              </div>
            )}

            {anime.genres && anime.genres.length > 0 && (
              <div className="genres">
                <h4>Genres</h4>
                <div className="genre-list">
                  {anime.genres.map((genre, idx) => (
                    <span key={idx} className="genre-tag">
                      {typeof genre === 'string' ? genre : genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {anime.matchReason && (
              <div className="match-reason">
                <h4>Why You'll Love This</h4>
                <p>{anime.matchReason}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimeDetailModal
