import { useEffect, useRef } from 'react'
import { VHSSceneManager } from '../utils/VHSSceneManager'

function VHSScene() {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    sceneRef.current = new VHSSceneManager(containerRef.current)
    sceneRef.current.animate()

    const handleResize = () => {
      sceneRef.current?.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      sceneRef.current?.dispose()
    }
  }, [])

  return <div ref={containerRef} className="vhs-scene-container" />
}

export default VHSScene
