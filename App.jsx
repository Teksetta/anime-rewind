import { useState, useEffect } from 'react'
import VHSScene from './components/VHSScene'
import Questionnaire from './components/Questionnaire'
import Results from './components/Results'
import { generateRecommendations } from './utils/recommendationEngine'
import { vhsSound } from './utils/vhsSound'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentView, setCurrentView] = useState('intro') // 'intro', 'menu', 'questionnaire', 'results'
  const [userAnswers, setUserAnswers] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  useEffect(() => {
    // Simulate VHS tape loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Initialize sound on first user interaction
  useEffect(() => {
    const initSound = async () => {
      await vhsSound.init()
      if (soundEnabled) {
        vhsSound.playStartup()
      }
    }

    // Wait for user interaction
    const handleFirstClick = () => {
      initSound()
      document.removeEventListener('click', handleFirstClick)
    }

    document.addEventListener('click', handleFirstClick)

    return () => {
      document.removeEventListener('click', handleFirstClick)
    }
  }, [])

  // Update sound manager when toggle changes
  useEffect(() => {
    vhsSound.enabled = soundEnabled
  }, [soundEnabled])

  const handleStartQuestionnaire = () => {
    vhsSound.playTapeInsert()
    setCurrentView('questionnaire')
  }

  const handleQuestionnaireComplete = async (answers) => {
    vhsSound.playSuccess()
    setUserAnswers(answers)
    setCurrentView('results')
    setIsLoadingRecommendations(true)
    
    try {
      // Fetch recommendations based on user answers
      const recs = await generateRecommendations(answers)
      setRecommendations(recs)
      vhsSound.playSuccess()
    } catch (error) {
      console.error('Error fetching recommendations:', error)
      setRecommendations([])
    } finally {
      setIsLoadingRecommendations(false)
    }
  }

  const handleBackToMenu = () => {
    vhsSound.playTapeEject()
    setTimeout(() => {
      setCurrentView('menu')
      setRecommendations([])
      setUserAnswers(null)
    }, 300)
  }

  const toggleSound = () => {
    const newState = !soundEnabled
    setSoundEnabled(newState)
    vhsSound.playButtonClick()
  }

  // Convert recommendations to VHS tape configs for 3D scene
  const getTapeConfigs = () => {
    if (currentView === 'results' && recommendations.length > 0) {
      return recommendations.map(anime => ({
        title: anime.title,
        color: 0x2a2a2a,
        accentColor: getAccentColorHex(anime),
      }))
    }
    return [] // Empty array shows demo tapes
  }

  const getAccentColorHex = (anime) => {
    const genres = anime.genres?.map(g => g.name.toLowerCase()) || []
    
    if (genres.some(g => ['action', 'sports'].includes(g))) return 0xff2a6d
    if (genres.some(g => ['comedy', 'slice of life'].includes(g))) return 0x01ffaa
    if (genres.some(g => ['sci-fi', 'mecha'].includes(g))) return 0x05d9e8
    if (genres.some(g => ['mystery', 'psychological'].includes(g))) return 0xd62ad0
    if (genres.some(g => ['romance', 'drama'].includes(g))) return 0xff2a6d
    if (genres.some(g => ['fantasy', 'adventure'].includes(g))) return 0xf7ef8a
    
    return 0x05d9e8
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-vhs-black">
      {/* 3D VHS Scene Background */}
      <VHSScene isActive={currentView !== 'intro'} tapes={getTapeConfigs()} />
      
      {/* Sound Toggle Button */}
      <button
        onClick={toggleSound}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded border-2 border-vhs-cyan/50 bg-vhs-black/80 hover:bg-vhs-cyan/20 transition-colors font-vhs text-sm text-vhs-cyan"
        title={soundEnabled ? 'Sound: ON' : 'Sound: OFF'}
      >
        {soundEnabled ? '🔊 SOUND ON' : '🔇 SOUND OFF'}
      </button>

      {currentView === 'intro' && (
        <VHSIntro isLoaded={isLoaded} onComplete={() => setCurrentView('menu')} />
      )}

      {currentView === 'menu' && (
        <MainMenu onStartQuestionnaire={handleStartQuestionnaire} />
      )}

      {currentView === 'questionnaire' && (
        <Questionnaire onComplete={handleQuestionnaireComplete} />
      )}

      {currentView === 'results' && (
        <Results 
          recommendations={recommendations}
          onBackToMenu={handleBackToMenu}
          isLoading={isLoadingRecommendations}
        />
      )}
    </div>
  )
}

function VHSIntro({ isLoaded, onComplete }) {
  const [currentTime, setCurrentTime] = useState('00:00:00')

  useEffect(() => {
    // Update timecode
    const interval = setInterval(() => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center" style={{ zIndex: 10 }}>
      {/* VHS Warning */}
      <div className="absolute top-8 left-8 warning-text animate-blink">
        ⚠ FBI WARNING ⚠
      </div>

      {/* Timecode Display */}
      <div className="absolute top-8 right-8 timecode">
        {currentTime}
      </div>

      {/* Main Title */}
      <div className="text-center space-y-8">
        <h1 className="retro-title glitch">
          ANIME REWIND
        </h1>
        
        <p className="vcr-osd tracking-lines">
          VHS RECOMMENDATION ENGINE
        </p>

        {/* Loading Bar */}
        {!isLoaded ? (
          <div className="flex flex-col items-center space-y-4 mt-12">
            <div className="vhs-loading"></div>
            <p className="font-vhs text-xl text-vhs-cyan chromatic-text">
              LOADING TAPE...
            </p>
          </div>
        ) : (
          <div className="mt-12 space-y-6">
            <p className="font-vhs text-2xl text-vhs-green chromatic-text animate-pulse">
              ► READY TO PLAY
            </p>
            <button 
              onClick={onComplete}
              className="vcr-button"
            >
              ▶ PRESS PLAY
            </button>
          </div>
        )}
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8">
        <div className="font-vhs text-sm text-vhs-white/60">
          SP MODE • STEREO • DOLBY
        </div>
        <div className="font-vhs text-sm text-vhs-white/60">
          © 2025 ANIME REWIND
        </div>
      </div>

      {/* Tracking Indicator */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center space-y-2">
          <div className="font-retro text-xs text-vhs-cyan">TRACK</div>
          <div className="w-2 h-32 bg-gradient-to-b from-vhs-cyan via-vhs-purple to-vhs-red rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  )
}

function MainMenu({ onStartQuestionnaire }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ zIndex: 10 }}>
      <div className="vhs-panel max-w-2xl w-full mx-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="font-orbitron text-4xl font-bold chromatic-text-strong">
              MAIN MENU
            </h2>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-vhs-cyan to-transparent"></div>
          </div>

          {/* Menu Options */}
          <div className="space-y-4">
            <button 
              onClick={onStartQuestionnaire}
              className="vcr-button w-full text-left flex items-center justify-between"
            >
              <span>► START QUESTIONNAIRE</span>
              <span className="text-vhs-yellow">NEW</span>
            </button>
            
            <button className="vcr-button w-full text-left flex items-center justify-between">
              <span>◼ BROWSE COLLECTION</span>
              <span className="text-vhs-cyan">3D VIEW</span>
            </button>
            
            <button className="vcr-button w-full text-left flex items-center justify-between">
              <span>⚙ SETTINGS</span>
              <span className="text-vhs-purple">ADV</span>
            </button>
            
            <button className="vcr-button w-full text-left flex items-center justify-between">
              <span>? HELP</span>
              <span className="text-vhs-green">INFO</span>
            </button>
          </div>

          {/* Footer Info */}
          <div className="mt-8 pt-4 border-t border-vhs-cyan/30">
            <div className="flex justify-between items-center">
              <div className="font-vhs text-sm text-vhs-white/60">
                TAPE LOADED: ANIME DATABASE v1.0
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-vhs-red animate-pulse"></div>
                <span className="font-vhs text-sm text-vhs-red">REC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VHS Tape Label Style Box */}
      <div className="absolute bottom-12 right-12 tape-label max-w-xs">
        <div className="text-center">
          <div className="font-retro text-[8px] mb-1">YOUR PERFECT ANIME</div>
          <div className="h-[1px] bg-black/20 my-1"></div>
          <div className="font-vhs text-xs">BASED ON YOUR TASTE</div>
        </div>
      </div>
    </div>
  )
}

export default App
