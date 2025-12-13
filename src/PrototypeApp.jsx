import { useState } from 'react'
import EnhancedVHSScene from './components/EnhancedVHSScene'
import { vhsSound } from './utils/vhsSound'

/**
 * Prototype App - Testing Enhanced 3D Vision
 * This is a proof-of-concept to demonstrate:
 * - Vortex of tapes
 * - Carousel formation
 * - Live filtering
 * - Grid wall finale
 */
function PrototypeApp() {
  const [sceneState, setSceneState] = useState('vortex')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [filteredCount, setFilteredCount] = useState(0)
  const [showUI, setShowUI] = useState(true)

  const questions = [
    { id: 1, text: 'What is your anime experience level?', filterAmount: 10 },
    { id: 2, text: 'Select your preferred genres (up to 3)', filterAmount: 8 },
    { id: 3, text: 'What mood are you in?', filterAmount: 7 },
    { id: 4, text: 'Content rating preference?', filterAmount: 5 },
    { id: 5, text: 'How much time do you have?', filterAmount: 4 },
  ]

  const handleStartCarousel = () => {
    vhsSound.playTapeInsert()
    setSceneState('carousel')
    setTimeout(() => {
      setCurrentQuestion(1)
    }, 2000) // Wait for carousel to form
  }

  const handleAnswerQuestion = () => {
    vhsSound.playFastForward()
    
    // Filter out tapes
    const newFilterCount = questions[currentQuestion - 1].filterAmount
    setFilteredCount(prev => prev + newFilterCount)
    setSceneState('filtering')

    // Move to next question
    setTimeout(() => {
      if (currentQuestion < questions.length) {
        setCurrentQuestion(prev => prev + 1)
        setSceneState('carousel') // Back to carousel state
      } else {
        // All questions answered - show grid
        setTimeout(() => {
          setSceneState('grid')
        }, 1500)
      }
    }, 1500)
  }

  const handleBack = () => {
    if (currentQuestion > 1) {
      vhsSound.playRewind()
      setCurrentQuestion(prev => prev - 1)
      // TODO: Actually return tapes to carousel
      // For now just go back to carousel state
      setSceneState('carousel')
    }
  }

  const handleReset = () => {
    vhsSound.playTapeEject()
    setSceneState('vortex')
    setCurrentQuestion(0)
    setFilteredCount(0)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-vhs-black">
      {/* Enhanced 3D Scene */}
      <EnhancedVHSScene
        currentState={sceneState}
        tapeCount={50}
        filterCount={filteredCount}
      />

      {/* VHS Effects Overlays */}
      <div className="scanlines"></div>
      <div className="crt-flicker"></div>
      <div className="noise-overlay"></div>
      <div className="vignette"></div>

      {/* UI Layer */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 10 }}>
        <div className="pointer-events-auto">
          
          {/* Initial State - Vortex */}
          {sceneState === 'vortex' && currentQuestion === 0 && (
            <div className="vhs-panel text-center space-y-6">
              <h1 className="retro-title text-4xl mb-4">
                ANIME REWIND
              </h1>
              <p className="vcr-osd text-xl">
                PROTOTYPE v2.0
              </p>
              <p className="font-vhs text-sm text-vhs-white/70 max-w-md">
                Testing: Vortex → Carousel → Filtering → Grid
              </p>
              <button
                onClick={handleStartCarousel}
                className="vcr-button text-2xl px-8 py-4"
              >
                ► BEGIN EXPERIENCE
              </button>
            </div>
          )}

          {/* Questionnaire State */}
          {currentQuestion > 0 && currentQuestion <= questions.length && sceneState !== 'grid' && (
            <div className="vhs-panel max-w-2xl space-y-6">
              {/* Question Header */}
              <div className="text-center">
                <div className="timecode mb-2">
                  {String(currentQuestion).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
                </div>
                <h2 className="font-orbitron text-2xl text-vhs-cyan chromatic-text">
                  {questions[currentQuestion - 1].text}
                </h2>
              </div>

              {/* Mock Answers */}
              <div className="space-y-3">
                <button 
                  onClick={handleAnswerQuestion}
                  className="vcr-button w-full"
                >
                  Option A (Demo)
                </button>
                <button 
                  onClick={handleAnswerQuestion}
                  className="vcr-button w-full"
                >
                  Option B (Demo)
                </button>
                <button 
                  onClick={handleAnswerQuestion}
                  className="vcr-button w-full"
                >
                  Option C (Demo)
                </button>
              </div>

              {/* Status */}
              <div className="text-center font-vhs text-sm text-vhs-yellow">
                {filteredCount} tapes filtered • ~{50 - filteredCount} remaining
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-4 border-t border-vhs-white/20">
                <button
                  onClick={handleBack}
                  disabled={currentQuestion === 1}
                  className={`vcr-button ${currentQuestion === 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                  ◄ BACK
                </button>
                <button
                  onClick={handleReset}
                  className="vcr-button"
                >
                  ⟲ RESET
                </button>
              </div>
            </div>
          )}

          {/* Grid State - Final Results */}
          {sceneState === 'grid' && (
            <div className="vhs-panel text-center space-y-6">
              <h2 className="font-orbitron text-3xl text-vhs-green chromatic-text-strong">
                YOUR RECOMMENDATIONS
              </h2>
              <p className="font-vhs text-lg text-vhs-white/80">
                ~{50 - filteredCount} tapes remaining
              </p>
              <p className="font-vhs text-sm text-vhs-cyan/80">
                Grid wall formed • Camera controls active
              </p>
              <button
                onClick={handleReset}
                className="vcr-button"
              >
                ◄ START OVER
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Debug Info */}
      <div className="fixed top-4 left-4 font-vhs text-xs text-vhs-white/50 space-y-1" style={{ zIndex: 20 }}>
        <div>State: {sceneState}</div>
        <div>Question: {currentQuestion}/{questions.length}</div>
        <div>Filtered: {filteredCount}</div>
        <div>Remaining: ~{50 - filteredCount}</div>
      </div>

      {/* Instructions */}
      <div className="fixed bottom-4 left-4 right-4 font-vhs text-xs text-vhs-cyan/70 text-center" style={{ zIndex: 20 }}>
        <div className="vhs-panel inline-block px-6 py-3">
          <p className="mb-1">🎬 PROTOTYPE CONTROLS</p>
          <p>Watch tapes fly • Answer questions • See live filtering • Grid wall finale</p>
        </div>
      </div>
    </div>
  )
}

export default PrototypeApp
