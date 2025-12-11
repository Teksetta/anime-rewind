import * as THREE from 'three'
import { VHSTape } from './VHSTape'

export class VHSSceneManager {
  constructor(container) {
    this.container = container
    this.width = window.innerWidth
    this.height = window.innerHeight

    // Scene setup
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    this.renderer.setSize(this.width, this.height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.container.appendChild(this.renderer.domElement)

    this.camera.position.z = 5

    // Create VHS tapes
    this.tapes = []
    this.createTapes()

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 0.8)
    light.position.set(5, 5, 5)
    this.scene.add(light)

    const ambientLight = new THREE.AmbientLight(0x00ff88, 0.3)
    this.scene.add(ambientLight)

    this.animationId = null
  }

  createTapes() {
    const tapePositions = [
      { x: -2, y: 1, z: 0 },
      { x: 0, y: 0, z: -1 },
      { x: 2, y: -1, z: 0 }
    ]

    tapePositions.forEach(pos => {
      const tape = new VHSTape()
      tape.mesh.position.set(pos.x, pos.y, pos.z)
      tape.mesh.rotation.x = Math.random() * Math.PI
      tape.mesh.rotation.y = Math.random() * Math.PI
      this.scene.add(tape.mesh)
      this.tapes.push(tape)
    })
  }

  animate = () => {
    this.animationId = requestAnimationFrame(this.animate)

    // Animate tapes
    this.tapes.forEach((tape, idx) => {
      tape.mesh.rotation.x += 0.005 + idx * 0.001
      tape.mesh.rotation.y += 0.008 - idx * 0.002
      tape.mesh.position.y += Math.sin(Date.now() * 0.0005 + idx) * 0.001
    })

    this.renderer.render(this.scene, this.camera)
  }

  resize = () => {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.width, this.height)
  }

  dispose = () => {
    if (this.animationId) cancelAnimationFrame(this.animationId)
    this.renderer.dispose()
    this.container.removeChild(this.renderer.domElement)
  }
}
