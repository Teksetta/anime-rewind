import { useState, useEffect } from 'react'
import VHSScene from './components/VHSScene'
import Questionnaire from './components/Questionnaire'
import Results from './components/Results'
import { getAnimeRecommendations } from './utils/jikanAPI'
import { generateRecommendations } from './utils/recommendationEngine'
import './App.css'

function App() {
  const [view, setView] = useState('splash')
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [userPreferences, setUserPreferences] = useState(null)

  const handleStartQuiz = () => {
    setView('questionnaire')
  }

  const handleQuestionnaireComplete = async (preferences) => {
    setUserPreferences(preferences)
    setLoading(true)
    setView('loading')

    try {
      const animeData = await getAnimeRecommendations()
      const recs = generateRecommendations(preferences, animeData)
      setRecommendations(recs)
      setView('results')
    } catch (error) {
      console.error('Failed to fetch recommendations:', error)
      setView('error')
    } finally {
      setLoading(false)
    }
  }

  const handleRestart = () => {
    setView('splash')
    setRecommendations([])
    setUserPreferences(null)
  }

  return (
    <div className="app-container">
      {view === 'splash' && (
        <>
          <VHSScene />
          <div className="splash-overlay">
            <div className="fbi-warning">
              <div className="fbi-content">
                <p className="fbi-text">⚠ FBI WARNING ⚠</p>
                <p className="fbi-subtext">Unauthorized use is prohibited</p>
              </div>
            </div>
          </div>
          <button className="play-button" onClick={handleStartQuiz}>
            ▶ PLAY
          </button>
        </>
      )}

      {view === 'questionnaire' && (
        <Questionnaire onComplete={handleQuestionnaireComplete} />
      )}

      {view === 'loading' && (
        <div className="loading-screen">
          <div className="loading-spinner">
            <p>🎬 LOADING RECOMMENDATIONS</p>
            <div className="spinner"></div>
          </div>
        </div>
      )}

      {view === 'results' && (
        <Results 
          recommendations={recommendations}
          preferences={userPreferences}
          onRestart={handleRestart}
        />
      )}

      {view === 'error' && (
        <div className="error-screen">
          <p>Error loading recommendations</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  )
}

export default App
