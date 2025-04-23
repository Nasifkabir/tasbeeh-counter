// Audio feedback utility
class AudioFeedbackManager {
    private audioContext: AudioContext | null = null
    private sounds: Record<string, AudioBuffer> = {}
    private enabled = true
    private audioLoaded = false
  
    constructor() {
      // Initialize audio context on user interaction
      if (typeof window !== "undefined") {
        const enableAudio = () => {
          if (!this.audioContext) {
            try {
              this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
              this.loadSounds().catch((err) => {
                console.warn("Audio files could not be loaded, using fallback sounds:", err)
                this.createFallbackSounds()
              })
            } catch (error) {
              console.warn("Web Audio API not supported:", error)
            }
          }
  
          // Remove event listeners once audio is enabled
          document.removeEventListener("click", enableAudio)
          document.removeEventListener("touchstart", enableAudio)
        }
  
        document.addEventListener("click", enableAudio)
        document.addEventListener("touchstart", enableAudio)
      }
    }
  
    private async loadSounds() {
      try {
        // Since we don't have actual audio files in this environment,
        // we'll create simple sounds programmatically instead
        this.createFallbackSounds()
        this.audioLoaded = true
      } catch (error) {
        console.error("Failed to create audio:", error)
        throw error
      }
    }
  
    // Create simple sounds programmatically instead of loading files
    private createFallbackSounds() {
      if (!this.audioContext) return
  
      try {
        // Create a short "click" sound
        const clickBuffer = this.audioContext.createBuffer(1, 1000, 44100)
        const clickData = clickBuffer.getChannelData(0)
        for (let i = 0; i < clickData.length; i++) {
          // Create a quick decay click sound
          clickData[i] = i < 50 ? 0.5 * Math.sin(i * 0.2) * (1 - i / 50) : 0
        }
        this.sounds.click = clickBuffer
  
        // Create a longer "complete" sound
        const completeBuffer = this.audioContext.createBuffer(1, 8000, 44100)
        const completeData = completeBuffer.getChannelData(0)
        for (let i = 0; i < completeData.length; i++) {
          // Create a two-tone success sound
          const progress = i / completeData.length
          completeData[i] = 0.5 * Math.sin(i * 0.03) * Math.sin(i * 0.02) * (1 - progress)
        }
        this.sounds.complete = completeBuffer
  
        this.audioLoaded = true
      } catch (error) {
        console.error("Failed to create fallback sounds:", error)
        // We'll continue without audio
      }
    }
  
    public setEnabled(enabled: boolean) {
      this.enabled = enabled
    }
  
    public playSound(sound: "click" | "complete") {
      if (!this.enabled || !this.audioContext || !this.sounds[sound]) {
        // If audio isn't available, we could use vibration as a fallback on mobile
        if (navigator.vibrate && sound === "click") {
          navigator.vibrate(10) // Short vibration for click
        } else if (navigator.vibrate && sound === "complete") {
          navigator.vibrate([50, 30, 50]) // Pattern for completion
        }
        return
      }
  
      try {
        const source = this.audioContext.createBufferSource()
        source.buffer = this.sounds[sound]
        source.connect(this.audioContext.destination)
        source.start(0)
      } catch (error) {
        console.warn("Error playing sound:", error)
        // Fallback to vibration if available
        if (navigator.vibrate) {
          navigator.vibrate(sound === "click" ? 10 : [50, 30, 50])
        }
      }
    }
  
    public isAudioAvailable() {
      return this.audioContext !== null && this.audioLoaded
    }
  }
  
  export const audioManager = new AudioFeedbackManager()
  