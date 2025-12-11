function QuestionGenres({ value, onChange }) {
  const genres = [
    'Action', 'Comedy', 'Drama', 'Fantasy', 'Horror',
    'Romance', 'Sci-Fi', 'Slice of Life', 'Supernatural', 'Thriller'
  ]

  const toggleGenre = (genre) => {
    let newGenres = Array.isArray(value) ? [...value] : []
    if (newGenres.includes(genre)) {
      newGenres = newGenres.filter(g => g !== genre)
    } else if (newGenres.length < 3) {
      newGenres.push(genre)
    }
    onChange(newGenres)
  }

  const selectedCount = Array.isArray(value) ? value.length : 0

  return (
    <div>
      <p style={{ marginBottom: '15px', color: '#00d9ff' }}>
        Select up to 3 genres ({selectedCount}/3)
      </p>
      <div className="options-grid">
        {genres.map(genre => (
          <button
            key={genre}
            className={`genre-btn ${Array.isArray(value) && value.includes(genre) ? 'active' : ''}`}
            onClick={() => toggleGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuestionGenres
