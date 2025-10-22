import { sounds, defaultPresets } from "./soundData.js"
import { SoundManager } from "./soundManager.js"
import { UI } from "./ui.js" 

class AmbientMixer{
    // Initialze dependencies and default state

    constructor() {
        
        this.soundManager = new SoundManager()
        this.ui = new UI()
        this.presetManager = null
        this.timer = null
        this.currentSoundState = {}
        this.isInitialized=false
    }

   init() {
       try {
           // Initialize UI
           this.ui.init()

           // Render sound cards using sound data
           this.ui.renderSoundCards(sounds)
           
           this.setupEventListeners()
           
            // load All sound files
            this.loadAllSound()

            
            this.isInitialized=true
            
        } catch (error) {
            console.error('Failed to initialize app:',error)
            
        }
    }
    // Setup all event listeners
    setupEventListeners(){
        // Hadle All Clicks with event delegation
        document.addEventListener('click', async(e) => {
            // check if the play button was clicked
            if (e.target.closest('.play-btn')) {
                const soundId = e.target.closest('.play-btn').dataset.sound
              await this.toggleSound(soundId)
            }
        })
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
    // Togglle individual sound
 
async toggleSound(soundId) {
    const audio = this.soundManager.audioElements.get(soundId)
    if (!audio) {
        console.error(`Sound ${soundId} not found`)
        return false
    }
    if (audio.paused) {
        // Sound is off, turn it on
        this.soundManager.setVolume(soundId, 50)
        await this.soundManager.playSound(soundId)

        this.ui.updateSoundPlayButton(soundId,true)
    } else {
        // Sound is on, shut it off
        this.soundManager.pauseSound(soundId)
        this.ui.updateSoundPlayButton(soundId,false)
    }
}
}



// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () =>
{
    const app = new AmbientMixer()
    
    app.init()

})