import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { VHSTape } from '../utils/VHSTape'

/**
 * Enhanced VHS Scene - Immersive 3D Experience
 * States: vortex → carousel → filtering → grid
 */
export default function EnhancedVHSScene({ 
  onSceneReady,
  currentState = 'vortex', // 'vortex', 'carousel', 'filtering', 'grid'
  tapeCount = 50,
  filterCount = 0, // How many tapes to filter out
}) {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const tapesRef = useRef([])
  const animationFrameRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  // Initialize scene
  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x0a0a0a, 15, 40)
    sceneRef.current = scene

    // Camera setup - positioned at center of vortex
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 0) // At the eye of the storm
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x0a0a0a, 1)
    rendererRef.current = renderer

    // Lighting
    setupLighting(scene)

    // Create tapes in vortex formation
    createVortexTapes(scene, tapeCount)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation loop
    const animate = () => {
      // Update tape animations
      tapesRef.current.forEach((tapeData) => {
        tapeData.tape.animateSpools(0.03)
        tapeData.tape.pulseGlow(0.05, Date.now() * 0.001)
        
        // Vortex rotation
        if (tapeData.state === 'vortex') {
          tapeData.tape.group.rotation.y += tapeData.rotationSpeed
        }
      })

      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    setIsReady(true)
    if (onSceneReady) onSceneReady()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      tapesRef.current.forEach(({ tape }) => tape.dispose())
      renderer.dispose()
    }
  }, [])

  // Handle state transitions
  useEffect(() => {
    if (!isReady) return

    switch (currentState) {
      case 'vortex':
        // Already in vortex state
        break
      case 'carousel':
        transitionToCarousel()
        break
      case 'filtering':
        filterOutTapes(filterCount)
        break
      case 'grid':
        transitionToGrid()
        break
    }
  }, [currentState, filterCount, isReady])

  // Setup dramatic VHS lighting
  function setupLighting(scene) {
    const cyanLight = new THREE.DirectionalLight(0x05d9e8, 1.5)
    cyanLight.position.set(10, 10, 10)
    scene.add(cyanLight)

    const magentaLight = new THREE.DirectionalLight(0xff2a6d, 1.2)
    magentaLight.position.set(-10, -5, 5)
    scene.add(magentaLight)

    const purpleLight = new THREE.DirectionalLight(0xd62ad0, 0.8)
    purpleLight.position.set(0, 0, -10)
    scene.add(purpleLight)

    const ambientLight = new THREE.AmbientLight(0x1e3799, 0.4)
    scene.add(ambientLight)
  }

  // Create tapes in vortex formation
  function createVortexTapes(scene, count) {
    const accentColors = [0xff2a6d, 0x05d9e8, 0xd62ad0, 0xf7ef8a, 0x01ffaa, 0x1e3799]
    
    for (let i = 0; i < count; i++) {
      const tape = new VHSTape({
        title: `TAPE ${String(i + 1).padStart(3, '0')}`,
        color: 0x2a2a2a,
        accentColor: accentColors[i % accentColors.length],
      })

      // Position in vortex (cylindrical spiral)
      const angle = (i / count) * Math.PI * 4 // Multiple rotations
      const radius = 15 + Math.random() * 10 // Varying distances
      const height = (i / count) * 20 - 10 // Vertical spread
      
      const x = Math.cos(angle) * radius
      const y = height + (Math.random() - 0.5) * 5
      const z = Math.sin(angle) * radius

      tape.group.position.set(x, y, z)
      
      // Random rotation
      tape.group.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )

      scene.add(tape.getGroup())

      // Store tape data
      tapesRef.current.push({
        tape,
        state: 'vortex',
        vortexPosition: { x, y, z },
        vortexRotation: { 
          x: tape.group.rotation.x, 
          y: tape.group.rotation.y, 
          z: tape.group.rotation.z 
        },
        rotationSpeed: 0.001 + Math.random() * 0.002,
        orbitSpeed: 0.0005 + Math.random() * 0.001,
      })
    }
  }

  // Transition: Vortex → Carousel
  function transitionToCarousel() {
    const rowCount = 4 // 4 rows in carousel
    const tapesPerRow = Math.ceil(tapesRef.current.length / rowCount)
    const carouselRadius = 8
    const rowHeight = 3

    tapesRef.current.forEach((tapeData, index) => {
      const row = Math.floor(index / tapesPerRow)
      const posInRow = index % tapesPerRow
      const angleInRow = (posInRow / tapesPerRow) * Math.PI * 2

      // Calculate carousel position
      const x = Math.cos(angleInRow) * carouselRadius
      const y = row * rowHeight - (rowCount * rowHeight) / 2
      const z = Math.sin(angleInRow) * carouselRadius

      // Animate tape flying to carousel
      gsap.to(tapeData.tape.group.position, {
        x, y, z,
        duration: 1.5,
        ease: 'power2.inOut',
        delay: Math.random() * 0.5, // Stagger arrivals
      })

      // Rotate to face outward
      const lookAngle = Math.atan2(z, x)
      gsap.to(tapeData.tape.group.rotation, {
        x: 0,
        y: lookAngle + Math.PI / 2,
        z: 0,
        duration: 1.5,
        ease: 'power2.inOut',
      })

      // Store carousel data
      tapeData.state = 'carousel'
      tapeData.carouselPosition = { x, y, z }
      tapeData.carouselRow = row
      tapeData.carouselAngle = angleInRow
    })

    // Start carousel rotation after formation
    setTimeout(() => {
      startCarouselRotation()
    }, 2000)
  }

  // Rotate carousel rows at different speeds
  function startCarouselRotation() {
    const rowSpeeds = [0.001, 0.0015, 0.002, 0.0012] // Different speeds per row

    const rotateCarousel = () => {
      tapesRef.current.forEach((tapeData) => {
        if (tapeData.state === 'carousel') {
          const speed = rowSpeeds[tapeData.carouselRow] || 0.001
          tapeData.carouselAngle += speed

          const carouselRadius = 8
          const x = Math.cos(tapeData.carouselAngle) * carouselRadius
          const z = Math.sin(tapeData.carouselAngle) * carouselRadius

          tapeData.tape.group.position.x = x
          tapeData.tape.group.position.z = z

          // Face outward
          tapeData.tape.group.rotation.y = tapeData.carouselAngle + Math.PI / 2
        }
      })

      if (tapesRef.current.some(t => t.state === 'carousel')) {
        requestAnimationFrame(rotateCarousel)
      }
    }

    rotateCarousel()
  }

  // Filter out random tapes (they fly away)
  function filterOutTapes(count) {
    const carouselTapes = tapesRef.current.filter(t => t.state === 'carousel')
    const tapesToRemove = carouselTapes.slice(0, count)

    tapesToRemove.forEach((tapeData) => {
      // Random direction away from center
      const angle = Math.random() * Math.PI * 2
      const distance = 30 + Math.random() * 20
      const x = Math.cos(angle) * distance
      const y = (Math.random() - 0.5) * 20
      const z = Math.sin(angle) * distance

      // Violently eject
      gsap.to(tapeData.tape.group.position, {
        x, y, z,
        duration: 1.2,
        ease: 'power2.out',
      })

      // Tumble as it flies
      gsap.to(tapeData.tape.group.rotation, {
        x: Math.random() * Math.PI * 4,
        y: Math.random() * Math.PI * 4,
        z: Math.random() * Math.PI * 4,
        duration: 1.2,
        ease: 'power1.out',
      })

      tapeData.state = 'filtered'
      tapeData.filteredPosition = { x, y, z }
    })
  }

  // Transition: Carousel → Grid Wall
  function transitionToGrid() {
    const gridTapes = tapesRef.current.filter(t => t.state === 'carousel')
    const cols = Math.ceil(Math.sqrt(gridTapes.length))
    const rows = Math.ceil(gridTapes.length / cols)
    const spacing = 2.5

    gridTapes.forEach((tapeData, index) => {
      const col = index % cols
      const row = Math.floor(index / cols)

      const x = (col - cols / 2) * spacing
      const y = (row - rows / 2) * spacing
      const z = -10 // Wall distance from camera

      // Fly to grid position
      gsap.to(tapeData.tape.group.position, {
        x, y, z,
        duration: 1.5,
        ease: 'power2.inOut',
        delay: index * 0.05, // Cascading effect
      })

      // Face camera
      gsap.to(tapeData.tape.group.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        ease: 'power2.inOut',
      })

      tapeData.state = 'grid'
      tapeData.gridPosition = { x, y, z }
    })
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}
