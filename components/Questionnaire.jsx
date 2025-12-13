import { useState } from 'react'
import { vhsSound } from '../utils/vhsSound'
import QuestionExperience from './questions/QuestionExperience'
import QuestionGenres from './questions/QuestionGenres'
import QuestionMood from './questions/QuestionMood'
import QuestionRating from './questions/QuestionRating'
import QuestionTime from './questions/QuestionTime'

/**
 * VHS-themed Questionnaire Component
 * Multi-step form for gathering anime preferences
 */
export default function Questionnaire({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({
    experience: null,
    genres: [],
    mood: null,
    rating: null,
    timeCommitment: null,
  })

  const questions = [
    {
      id: 'experience',
      component: QuestionExperience,
      title: 'EXPERIENCE LEVEL',
    },
    {
      id: 'genres',
      component: QuestionGenres,
      title: 'PREFERRED GENRES',
    },
    {
      id: 'mood',
      component: QuestionMood,
      title: 'CURRENT MOOD',
    },
    {
      id: 'rating',
      component: QuestionRating,
      title: 'CONTENT RATING',
    },
    {
      id: 'timeCommitment',
      component: QuestionTime,
      title: 'VIEWING TIME',
    },
  ]

  const currentQuestion = questions[currentStep]
  const QuestionComponent = currentQuestion.component
  const progress = ((currentStep + 1) / questions.length) * 100
  const isLastStep = currentStep === questions.length - 1

  const handleAnswer = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const handleNext = () => {
    vhsSound.playFastForward()
    if (isLastStep) {
      // Complete questionnaire
      onComplete(answers)
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      vhsSound.playRewind()
      setCurrentStep((prev) => prev - 1)
    }
  }

  const canProceed = () => {
    const answer = answers[currentQuestion.id]
    if (currentQuestion.id === 'genres') {
      return answer && answer.length > 0
    }
    return answer !== null && answer !== undefined
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ zIndex: 10 }}>
      <div className="vhs-panel max-w-3xl w-full mx-8">
        {/* VCR Counter Display */}
        <div className="flex justify-between items-center mb-6">
          <div className="timecode">
            {String(currentStep + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
          </div>
          <div className="font-vhs text-sm text-vhs-white/60 flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-vhs-red animate-pulse"></div>
            <span>RECORDING</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-1 bg-vhs-black rounded-full overflow-hidden border border-vhs-cyan/30">
            <div 
              className="h-full bg-gradient-to-r from-vhs-cyan via-vhs-purple to-vhs-red transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Title */}
        <div className="text-center mb-8">
          <h2 className="font-orbitron text-3xl font-bold chromatic-text-strong mb-2">
            {currentQuestion.title}
          </h2>
          <div className="h-[2px] w-32 mx-auto bg-gradient-to-r from-transparent via-vhs-cyan to-transparent"></div>
        </div>

        {/* Question Content */}
        <div className="mb-8">
          <QuestionComponent
            value={answers[currentQuestion.id]}
            onChange={handleAnswer}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`vcr-button ${currentStep === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            ◄ REWIND
          </button>

          <div className="font-vhs text-sm text-vhs-yellow">
            {canProceed() ? '✓ READY' : '⚠ SELECT OPTION'}
          </div>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`vcr-button ${!canProceed() ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            {isLastStep ? '● STOP ►' : 'FORWARD ►'}
          </button>
        </div>

        {/* Tape Counter Visual */}
        <div className="mt-6 flex justify-center space-x-1">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-12 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'bg-vhs-cyan shadow-[0_0_10px_rgba(5,217,232,0.5)]'
                  : index < currentStep
                  ? 'bg-vhs-purple'
                  : 'bg-vhs-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
