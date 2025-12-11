function QuestionExperience({ value, onChange }) {
  const options = [
    { id: 'beginner', label: '🌱 Beginner', desc: 'New to anime' },
    { id: 'casual', label: '👤 Casual', desc: 'Watch sometimes' },
    { id: 'enthusiast', label: '❤️ Enthusiast', desc: 'Regular watcher' },
    { id: 'hardcore', label: '🔥 Hardcore', desc: 'Anime fanatic' }
  ]

  return (
    <div className="options-grid">
      {options.map(option => (
        <button
          key={option.id}
          className={`option-btn ${value === option.id ? 'active' : ''}`}
          onClick={() => onChange(option.id)}
        >
          <div className="option-label">{option.label}</div>
          <div className="option-desc">{option.desc}</div>
        </button>
      ))}
    </div>
  )
}

export default QuestionExperience
