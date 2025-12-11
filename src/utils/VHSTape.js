import * as THREE from 'three'

export class VHSTape {
  constructor() {
    this.mesh = new THREE.Group()
    this.createTapeBody()
    this.createReels()
    this.createLabel()
  }

  createTapeBody() {
    const bodyGeometry = new THREE.BoxGeometry(3, 2, 0.5)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.7,
      roughness: 0.2
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    this.mesh.add(body)
  }

  createReels() {
    const reelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32)
    const reelMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      metalness: 0.9,
      roughness: 0.1
    })

    const reelPositions = [-1.2, 1.2]
    reelPositions.forEach(x => {
      const reel = new THREE.Mesh(reelGeometry, reelMaterial)
      reel.rotation.y = Math.PI / 2
      reel.position.x = x
      this.mesh.add(reel)
    })
  }

  createLabel() {
    const labelGeometry = new THREE.PlaneGeometry(2.8, 1.8)
    const canvas = document.createElement('canvas')
    canvas.width = 280
    canvas.height = 180

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ff006e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.fillStyle = '#00ff88'
    ctx.font = 'bold 24px Courier New'
    ctx.textAlign = 'center'
    ctx.fillText('ANIME', canvas.width / 2, 60)
    ctx.fillText('REWIND', canvas.width / 2, 100)
    
    ctx.font = '12px Courier New'
    ctx.fillStyle = '#00d9ff'
    ctx.fillText('VHS • 1995', canvas.width / 2, 140)

    const texture = new THREE.CanvasTexture(canvas)
    const labelMaterial = new THREE.MeshBasicMaterial({ map: texture })
    const label = new THREE.Mesh(labelGeometry, labelMaterial)
    label.position.z = 0.26
    this.mesh.add(label)
  }
}
