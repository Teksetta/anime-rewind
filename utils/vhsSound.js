/**
 * VHS Sound Manager
 * Handles all retro VHS audio effects
 * Uses Web Audio API to generate authentic sounds
 */

class VHSSoundManager {
  constructor() {
    this.audioContext = null
    this.sounds = {}
    this.initialized = false
    this.enabled = true
    this.volume = 0.3
  }

  /**
   * Initialize audio context (requires user interaction)
   */
  async init() {
    if (this.initialized) return

    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.initialized = true
      console.log('VHS Sound Manager initialized')
    } catch (error) {
      console.error('Failed to initialize audio:', error)
    }
  }

  /**
   * Play VCR button click sound
   */
  playButtonClick() {
    if (!this.enabled || !this.initialized) return

    const ctx = this.audioContext
    const now = ctx.currentTime

    // Create click sound with multiple layers
    const oscillator1 = ctx.createOscillator()
    const oscillator2 = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    gainNode.connect(ctx.destination)

    // Mechanical click frequencies
    oscillator1.frequency.setValueAtTime(800, now)
    oscillator1.frequency.exponentialRampToValueAtTime(200, now + 0.05)
    
    oscillator2.frequency.setValueAtTime(1200, now)
    oscillator2.frequency.exponentialRampToValueAtTime(300, now + 0.03)

    // Volume envelope
    gainNode.gain.setValueAtTime(this.volume * 0.3, now)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

    oscillator1.start(now)
    oscillator2.start(now)
    oscillator1.stop(now + 0.1)
    oscillator2.stop(now + 0.1)
  }

  /**
   * Play tape insertion sound
   */
  playTapeInsert() {
    if (!this.enabled || !this.initialized) return

    const ctx = this.audioContext
    const now = ctx.currentTime

    // Mechanical insertion sound
    const noise = this.createNoiseBuffer(0.3)
    const noiseSource = ctx.createBufferSource()
    const filter = ctx.createBiquadFilter()
    const gainNode = ctx.createGain()

    noiseSource.buffer = noise
    noiseSource.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(ctx.destination)

    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(400, now)
    filter.frequency.linearRampToValueAtTime(200, now + 0.3)

    gainNode.gain.setValueAtTime(this.volume * 0.4, now)
    gainNode.gain.linearRampToValueAtTime(0.001, now + 0.3)

    noiseSource.start(now)
    noiseSource.stop(now + 0.3)
  }

  /**
   * Play tape eject sound
   */
  playTapeEject() {
    if (!this.enabled || !this.initialized) return

    const ctx = this.audioContext
    const now = ctx.currentTime

    // Motor whir + mechanical release
    const oscillator = ctx.createOscillator()
    const noise = this.createNoiseBuffer(0.4)
    const noiseSource = ctx.createBufferSource()
    const filter = ctx.createBiquadFilter()
    const gainNode = ctx.createGain()
    const noiseGain = ctx.createGain()

    oscillator.connect(gainNode)
    noiseSource.buffer = noise
    noiseSource.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(gainNode)
    gainNode.connect(ctx.destination)

    // Motor sound
    oscillator.frequency.setValueAtTime(120, now)
    oscillator.frequency.linearRampToValueAtTime(80, now + 0.4)

    // Mechanical noise
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(600, now)

    gainNode.gain.setValueAtTime(this.volume * 0.35, now)
    gainNode.gain.linearRampToValueAtTime(0.001, now + 0.4)

    noiseGain.gain.setValueAtTime(this.volume * 0.2, now)

    oscillator.start(now)
    noiseSource.start(now)
    oscillator.stop(now + 0.4)
    noiseSource.stop(now + 0.4)
  }

  /**
   * Play VCR startup sound
   */
  playStartup() {
    if (!this.enabled || !this.initialized) return

    const ctx = this.audioContext
    const now = ctx.currentTime

    // Power on whir
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.setValueAtTime(60, now)
    oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.5)
    oscillator.frequency.exponentialRampToValueAtTime(100, now + 1.0)

    gainNode.gain.setValueAtTime(0.001, now)
    gainNode.gain.exponentialRampToValueAtTime(this.volume * 0.4, now + 0.3)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.0)

    oscillator.start(now)
    oscillator.stop(now + 1.0)
  }

  /**
   * Play tracking/static noise (ambient)
   */
  playTracking(duration = 2) {
    if (!this.enabled || !this.initialized) return

    const ctx = this.audioContext
    const now = ctx.currentTime

    const noise = this.createNoiseBuffer(duration)
    const noiseSource = ctx.createBufferSource()
    const filter = ctx.createBiquadFilter()
    const gainNode = ctx.createGain()

    noiseSource.buffer = noise
    noiseSource.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(ctx.destination)

    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(4000, now)
    filter.Q.setValueAtTime(0.5, now)

    gainNode.gain.setValueAtTime(this.volume * 0.15, now)
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.08, now + duration * 0.5)
    gainNode.gain.linearRampToValueAtTime(0.001, now + duration)

    noiseSource.start(now)
    noiseSource.stop(now + duration)
  }

  /**
   * Play rewind sound
   */
  playRewind() {
    if (!this.enabled || !this.initialized) return

    const ctx = this.audioContext
    const now = ctx.currentTime

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.setValueAtTime(200, now)
    oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.3)

    gainNode.gain.setValueAtTime(this.volume * 0.3, now)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

    oscillator.start(now)
    oscillator.stop(now + 0.3)
  }

  /**
   * Play fast forward sound
   */
  playFastForward() {
    if (!this.enabled || !this.initialized) return

    const ctx = this.audioContext
    const now = ctx.currentTime

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.setValueAtTime(400, now)
    oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.3)

    gainNode.gain.setValueAtTime(this.volume * 0.3, now)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

    oscillator.start(now)
    oscillator.stop(now + 0.3)
  }

  /**
   * Play success/completion sound
   */
  playSuccess() {
    if (!this.enabled || !this.initialized) return

    const ctx = this.audioContext
    const now = ctx.currentTime

    // Ascending chime
    const playNote = (freq, startTime) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.frequency.setValueAtTime(freq, startTime)
      gain.gain.setValueAtTime(this.volume * 0.2, startTime)
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3)

      osc.start(startTime)
      osc.stop(startTime + 0.3)
    }

    playNote(523.25, now)        // C5
    playNote(659.25, now + 0.15) // E5
    playNote(783.99, now + 0.3)  // G5
  }

  /**
   * Create noise buffer for mechanical sounds
   */
  createNoiseBuffer(duration) {
    const bufferSize = this.audioContext.sampleRate * duration
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    return buffer
  }

  /**
   * Toggle sound on/off
   */
  toggle() {
    this.enabled = !this.enabled
    return this.enabled
  }

  /**
   * Set volume (0-1)
   */
  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol))
  }
}

// Export singleton instance
export const vhsSound = new VHSSoundManager()
