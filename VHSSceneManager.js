import * as THREE from 'three'

/**
 * VHS Scene Manager
 * Handles Three.js scene setup with retro aesthetic lighting
 */
export class VHSSceneManager {
  constructor(canvas) {
    this.canvas = canvas
    this.scene = new THREE.Scene()
    this.camera = null
    this.renderer = null
    this.clock = new THREE.Clock()
    
    this.init()
  }

  init() {
    // Setup renderer with VHS-appropriate settings
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: false, // Intentionally off for retro look
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setClearColor(0x0a0a0a, 1)

    // Setup camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.z = 5

    // Add atmospheric fog for depth
    this.scene.fog = new THREE.Fog(0x0a0a0a, 8, 20)

    // Setup lighting - VHS era dramatic lighting
    this.setupLighting()

    // Handle window resize
    window.addEventListener('resize', () => this.onResize())
  }

  setupLighting() {
    // Cyan key light (simulating VHS cyan color bleed)
    const cyanLight = new THREE.DirectionalLight(0x05d9e8, 1.5)
    cyanLight.position.set(5, 5, 5)
    this.scene.add(cyanLight)

    // Magenta fill light (opposite side for chromatic effect)
    const magentaLight = new THREE.DirectionalLight(0xff2a6d, 1.2)
    magentaLight.position.set(-5, -3, 3)
    this.scene.add(magentaLight)

    // Purple rim light from behind
    const purpleLight = new THREE.DirectionalLight(0xd62ad0, 0.8)
    purpleLight.position.set(0, 0, -5)
    this.scene.add(purpleLight)

    // Ambient light for base visibility
    const ambientLight = new THREE.AmbientLight(0x1e3799, 0.4)
    this.scene.add(ambientLight)

    // Add point light that will pulse
    this.pulseLight = new THREE.PointLight(0x01ffaa, 1, 10)
    this.pulseLight.position.set(0, 0, 3)
    this.scene.add(this.pulseLight)
  }

  update() {
    const elapsed = this.clock.getElapsedTime()
    
    // Pulse the green light for atmosphere
    this.pulseLight.intensity = 0.5 + Math.sin(elapsed * 2) * 0.3
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  dispose() {
    window.removeEventListener('resize', () => this.onResize())
    this.renderer.dispose()
  }

  addToScene(object) {
    this.scene.add(object)
  }

  removeFromScene(object) {
    this.scene.remove(object)
  }
}
