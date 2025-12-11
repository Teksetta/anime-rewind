function QuestionRating({ value, onChange }) {
  const ratings = [
    { id: 'g', label: 'G', desc: 'All Ages' },
    { id: 'pg', label: 'PG', desc: 'Parental Guidance' },
    { id: 'pg13', label: 'PG-13', desc: 'Some Material' },
    { id: 'r', label: 'R+', desc: 'Mature' }
  ]

  return (
    <div className="options-grid">
      {ratings.map(rating => (
        <button
          key={rating.id}
          className={`option-btn ${value === rating.id ? 'active' : ''}`}
          onClick={() => onChange(rating.id)}
        >
          <div className="option-label">{rating.label}</div>
          <div className="option-desc">{rating.desc}</div>
        </button>
      ))}
    </div>
  )
}

export default QuestionRating
