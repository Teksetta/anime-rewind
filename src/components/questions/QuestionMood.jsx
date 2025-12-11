function QuestionMood({ value, onChange }) {
  const moods = [
    { id: 'relaxed', label: '😌 Relaxed', desc: 'Easy watching' },
    { id: 'intense', label: '⚡ Intense', desc: 'Action packed' },
    { id: 'emotional', label: '💔 Emotional', desc: 'Deep feels' },
    { id: 'comedic', label: '😂 Comedic', desc: 'Laughs & fun' }
  ]

  return (
    <div className="options-grid">
      {moods.map(mood => (
        <button
          key={mood.id}
          className={`option-btn ${value === mood.id ? 'active' : ''}`}
          onClick={() => onChange(mood.id)}
        >
          <div className="option-label">{mood.label}</div>
          <div className="option-desc">{mood.desc}</div>
        </button>
      ))}
    </div>
  )
}

export default QuestionMood
