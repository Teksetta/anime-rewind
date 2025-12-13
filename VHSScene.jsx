import { useEffect, useRef } from 'react'
import { VHSSceneManager } from '../utils/VHSSceneManager'
import { VHSTape } from '../utils/VHSTape'

/**
 * VHS 3D Scene Component
 * Manages Three.js canvas and floating VHS tapes
 */
export default function VHSScene({ tapes = [], isActive = true }) {
  const canvasRef = useRef(null)
  const sceneManagerRef = useRef(null)
  const tapesRef = useRef([])
  const animationFrameRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize scene
    const sceneManager = new VHSSceneManager(canvasRef.current)
    sceneManagerRef.current = sceneManager

    // Animation loop
    const animate = () => {
      sceneManager.update()
      
      // Animate all tapes
      tapesRef.current.forEach((tapeData, index) => {
        const { tapeObject, initialPosition, speed } = tapeData
        const time = Date.now() * 0.001
        
        // Floating animation
        tapeObject.group.position.y = 
          initialPosition.y + Math.sin(time * speed + index) * 0.3
        
        // Gentle rotation
        tapeObject.group.rotation.y += 0.005
        tapeObject.group.rotation.x = Math.sin(time * 0.5 + index) * 0.1
        
        // Animate tape spools
        tapeObject.animateSpools(0.05)
        
        // Pulse glow
        tapeObject.pulseGlow(0.05, time * 2 + index)
      })
      
      sceneManager.render()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      // Dispose of all tapes
      tapesRef.current.forEach(({ tapeObject }) => {
        tapeObject.dispose()
      })
      
      sceneManager.dispose()
    }
  }, [])

  // Handle tape changes
  useEffect(() => {
    if (!sceneManagerRef.current) return

    // Clear existing tapes
    tapesRef.current.forEach(({ tapeObject }) => {
      sceneManagerRef.current.removeFromScene(tapeObject.getGroup())
      tapeObject.dispose()
    })
    tapesRef.current = []

    // Add new tapes
    if (tapes.length > 0) {
      tapes.forEach((tapeConfig, index) => {
        const tape = new VHSTape({
          title: tapeConfig.title,
          color: tapeConfig.color || 0x2a2a2a,
          accentColor: tapeConfig.accentColor || 0x05d9e8,
        })

        // Position tapes in a floating grid
        const columns = 3
        const spacing = 2.5
        const row = Math.floor(index / columns)
        const col = index % columns
        
        const x = (col - 1) * spacing
        const y = (row - 0.5) * -spacing
        const z = -2 + (index % 3) * -1

        tape.group.position.set(x, y, z)
        
        // Random rotation for variety
        tape.group.rotation.set(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.1
        )

        sceneManagerRef.current.addToScene(tape.getGroup())

        tapesRef.current.push({
          tapeObject: tape,
          initialPosition: { x, y, z },
          speed: 0.5 + Math.random() * 0.5,
        })
      })
    } else {
      // Create demo tapes if none provided
      createDemoTapes()
    }
  }, [tapes])

  const createDemoTapes = () => {
    if (!sceneManagerRef.current) return

    const demoTapes = [
      { title: 'COWBOY BEBOP', color: 0x2a1a1a, accentColor: 0xff2a6d },
      { title: 'NEON GENESIS EVANGELION', color: 0x1a1a2a, accentColor: 0xd62ad0 },
      { title: 'AKIRA', color: 0x2a2a1a, accentColor: 0xf7ef8a },
      { title: 'GHOST IN THE SHELL', color: 0x1a2a2a, accentColor: 0x05d9e8 },
      { title: 'SERIAL EXPERIMENTS LAIN', color: 0x2a1a2a, accentColor: 0x01ffaa },
      { title: 'PERFECT BLUE', color: 0x1a1a1a, accentColor: 0x1e3799 },
    ]

    demoTapes.forEach((config, index) => {
      const tape = new VHSTape(config)

      // Arrange in floating grid
      const columns = 3
      const spacing = 2.5
      const row = Math.floor(index / columns)
      const col = index % columns
      
      const x = (col - 1) * spacing
      const y = (row - 0.5) * -spacing
      const z = -2 + (index % 3) * -1

      tape.group.position.set(x, y, z)
      
      // Slight random rotation
      tape.group.rotation.set(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.1
      )

      sceneManagerRef.current.addToScene(tape.getGroup())

      tapesRef.current.push({
        tapeObject: tape,
        initialPosition: { x, y, z },
        speed: 0.5 + Math.random() * 0.5,
      })
    })
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ 
        opacity: isActive ? 1 : 0,
        transition: 'opacity 1s ease',
        zIndex: 0,
      }}
    />
  )
}
