function QuestionTime({ value, onChange }) {
  const times = [
    { id: 'short', label: '📺 Short', desc: '12-13 eps' },
    { id: 'medium', label: '📹 Medium', desc: '24+ eps' },
    { id: 'long', label: '🎞️ Long', desc: '50+ eps' },
    { id: 'ongoing', label: '∞ Ongoing', desc: 'Long series' }
  ]

  return (
    <div className="options-grid">
      {times.map(time => (
        <button
          key={time.id}
          className={`option-btn ${value === time.id ? 'active' : ''}`}
          onClick={() => onChange(time.id)}
        >
          <div className="option-label">{time.label}</div>
          <div className="option-desc">{time.desc}</div>
        </button>
      ))}
    </div>
  )
}

export default QuestionTime
