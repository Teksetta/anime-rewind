import { useState } from 'react'
import QuestionExperience from './questions/QuestionExperience'
import QuestionGenres from './questions/QuestionGenres'
import QuestionMood from './questions/QuestionMood'
import QuestionRating from './questions/QuestionRating'
import QuestionTime from './questions/QuestionTime'
import './Questionnaire.css'

function Questionnaire({ onComplete }) {
  const [step, setStep] = useState(0)
  const [preferences, setPreferences] = useState({
    experience: '',
    genres: [],
    mood: '',
    rating: '',
    time: ''
  })

  const steps = [
    { component: QuestionExperience, key: 'experience', title: 'Your Experience Level' },
    { component: QuestionGenres, key: 'genres', title: 'Favorite Genres' },
    { component: QuestionMood, key: 'mood', title: 'What\'s Your Mood?' },
    { component: QuestionRating, key: 'rating', title: 'Content Rating' },
    { component: QuestionTime, key: 'time', title: 'Time Commitment' }
  ]

  const CurrentQuestion = steps[step].component
  const currentKey = steps[step].key

  const handleAnswer = (value) => {
    setPreferences({
      ...preferences,
      [currentKey]: value
    })

    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      onComplete(preferences)
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const progress = ((step + 1) / steps.length) * 100

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-backdrop"></div>
      
      <div className="questionnaire-card">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="question-header">
          <h2>{steps[step].title}</h2>
          <p className="step-counter">{step + 1} of {steps.length}</p>
        </div>

        <div className="question-content">
          <CurrentQuestion value={preferences[currentKey]} onChange={handleAnswer} />
        </div>

        <div className="button-group">
          {step > 0 && (
            <button className="btn-secondary" onClick={handleBack}>
              ← BACK
            </button>
          )}
          <button className="btn-primary" onClick={() => {
            if (step < steps.length - 1) {
              setStep(step + 1)
            } else {
              onComplete(preferences)
            }
          }}>
            {step === steps.length - 1 ? 'FIND ANIME →' : 'NEXT →'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Questionnaire
