import { sounds, defaultPresets } from "./soundData.js"
import { SoundManager } from "./soundManager.js"

class AmbientMixer{
    // Initialze dependencies and default state

    constructor() {
        
        this.soundManager = new SoundManager()
        this.ui = null
        this.presetManager = null
        this.timer = null
        this.currentSoundState = {}
        this.isInitialized=false
    }

   init() {
        try {
            // load All sound files
            this.loadAllSound()

            
            this.isInitialized=true
            
        } catch (error) {
            console.error('Failed to initialize app:',error)
            
        }
    }

    // Load All sounf files

    loadAllSound() {
        sounds.forEach((sound) => {
            const audioUrl = `audio/${sound.file}`
            const success = this.soundManager.loadSound(sound.id, audioUrl)
            if (!success) {
                console.log(`Could not load sound: ${sound.name} from ${audioUrl}`)
            }
        })
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () =>
{
    const app = new AmbientMixer()
    
    app.init()

    // Make app available for testing in browse
    window.app=app
})