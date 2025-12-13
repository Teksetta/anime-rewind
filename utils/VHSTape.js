import * as THREE from 'three'

/**
 * VHS Tape 3D Model
 * Creates a realistic VHS tape with label, spools, and retro materials
 */
export class VHSTape {
  constructor(options = {}) {
    this.title = options.title || 'UNTITLED'
    this.color = options.color || 0x2a2a2a
    this.labelColor = options.labelColor || 0xf4f4f4
    this.accentColor = options.accentColor || 0x05d9e8
    
    this.group = new THREE.Group()
    this.createTape()
  }

  createTape() {
    // VHS tape dimensions (roughly to scale)
    const tapeWidth = 1.8
    const tapeHeight = 1.0
    const tapeDepth = 0.2

    // Main tape body (black plastic case)
    const bodyGeometry = new THREE.BoxGeometry(tapeWidth, tapeHeight, tapeDepth)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: this.color,
      roughness: 0.4,
      metalness: 0.2,
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    this.group.add(body)

    // Label on top
    this.createLabel(tapeWidth, tapeHeight, tapeDepth)

    // Tape spools (visible through window)
    this.createSpools(tapeWidth, tapeHeight, tapeDepth)

    // Window where you see the tape
    this.createWindow(tapeWidth, tapeHeight, tapeDepth)

    // Edge highlights
    this.createEdgeHighlights(tapeWidth, tapeHeight, tapeDepth)

    // Add glow effect
    this.addGlow()
  }

  createLabel(width, height, depth) {
    // Label geometry (slightly raised from surface)
    const labelWidth = width * 0.8
    const labelHeight = height * 0.6
    const labelGeometry = new THREE.PlaneGeometry(labelWidth, labelHeight)
    
    // Create canvas texture for label
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    
    // Label background
    ctx.fillStyle = '#f4f4f4'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Add border
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 4
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)
    
    // Add title
    ctx.fillStyle = '#333'
    ctx.font = 'bold 32px "Press Start 2P", monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    
    // Word wrap the title
    const words = this.title.split(' ')
    let line = ''
    let y = 40
    const maxWidth = canvas.width - 60
    
    words.forEach((word) => {
      const testLine = line + word + ' '
      const metrics = ctx.measureText(testLine)
      
      if (metrics.width > maxWidth && line !== '') {
        ctx.fillText(line.trim(), canvas.width / 2, y)
        line = word + ' '
        y += 40
      } else {
        line = testLine
      }
    })
    ctx.fillText(line.trim(), canvas.width / 2, y)
    
    // Add decorative lines
    ctx.strokeStyle = '#666'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(30, canvas.height - 40)
    ctx.lineTo(canvas.width - 30, canvas.height - 40)
    ctx.stroke()
    
    // Add "SP" indicator
    ctx.fillStyle = '#ff2a6d'
    ctx.font = 'bold 20px "VT323", monospace'
    ctx.textAlign = 'right'
    ctx.fillText('SP', canvas.width - 30, canvas.height - 60)
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    
    const labelMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    })
    
    const label = new THREE.Mesh(labelGeometry, labelMaterial)
    label.position.z = depth / 2 + 0.01
    this.group.add(label)
  }

  createSpools(width, height, depth) {
    // Left spool
    const spoolGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 16)
    const spoolMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.8,
      metalness: 0.3,
    })
    
    const leftSpool = new THREE.Mesh(spoolGeometry, spoolMaterial)
    leftSpool.rotation.z = Math.PI / 2
    leftSpool.position.set(-width * 0.25, -height * 0.15, 0)
    this.group.add(leftSpool)
    
    // Right spool
    const rightSpool = new THREE.Mesh(spoolGeometry, spoolMaterial)
    rightSpool.rotation.z = Math.PI / 2
    rightSpool.position.set(width * 0.25, -height * 0.15, 0)
    this.group.add(rightSpool)
    
    // Store spools for animation
    this.leftSpool = leftSpool
    this.rightSpool = rightSpool
  }

  createWindow(width, height, depth) {
    // Transparent window where tape is visible
    const windowGeometry = new THREE.PlaneGeometry(width * 0.6, height * 0.25)
    const windowMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.3,
    })
    
    const window = new THREE.Mesh(windowGeometry, windowMaterial)
    window.position.set(0, -height * 0.15, depth / 2 + 0.005)
    this.group.add(window)
  }

  createEdgeHighlights(width, height, depth) {
    // Add subtle edge lighting for that VHS sheen
    const edgeGeometry = new THREE.EdgesGeometry(
      new THREE.BoxGeometry(width, height, depth)
    )
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: this.accentColor,
      transparent: true,
      opacity: 0.3,
    })
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial)
    this.group.add(edges)
  }

  addGlow() {
    // Subtle glow effect around the tape
    const glowGeometry = new THREE.PlaneGeometry(2.2, 1.3)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: this.accentColor,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
    })
    
    const glow = new THREE.Mesh(glowGeometry, glowMaterial)
    glow.position.z = -0.15
    this.group.add(glow)
    
    this.glowMesh = glow
  }

  // Animation method to rotate spools
  animateSpools(speed = 0.1) {
    if (this.leftSpool && this.rightSpool) {
      this.leftSpool.rotation.y += speed
      this.rightSpool.rotation.y -= speed
    }
  }

  // Pulse glow effect
  pulseGlow(intensity = 0.1, time = 0) {
    if (this.glowMesh) {
      this.glowMesh.material.opacity = 0.05 + Math.sin(time) * intensity
    }
  }

  getGroup() {
    return this.group
  }

  dispose() {
    this.group.traverse((child) => {
      if (child.geometry) child.geometry.dispose()
      if (child.material) {
        if (child.material.map) child.material.map.dispose()
        child.material.dispose()
      }
    })
  }
}
