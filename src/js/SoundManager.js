class SoundManager {

  constructor(){
    this.audioContext  = new (window.AudioContext || window.webkitAudioContext);
    
    this.gainNode      = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
  }

  createNoiseBuffer(type){
    let bufferSize    = 2 * this.audioContext.sampleRate;

    let noiseBuffer   = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    let output        = noiseBuffer.getChannelData(0);
  
    // Do the calculations
    let lastOut = 0;

    for (let i = 0; i < bufferSize; i++) {
      let randSample = Math.random() * 2 - 1;

      switch(type) {
        case SoundManager.BROWN:
          lastOut        = (lastOut + (0.02 * randSample)) / 1.02;
          output[i]      = lastOut * 3.5;

          break;

        case SoundManager.WHITE:
        default:
        
          output[i] = randSample;
          
          break;
      }
    }
      
    return noiseBuffer;
  }

  getAudioSourceNode(type){
    var source    = this.audioContext.createBufferSource();
    source.buffer = this.createNoiseBuffer(type);
    source.loop   = true;

    source.connect(this.gainNode);
    
    return source;

  }

  setVolume(volume = 1) {
    this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
  }
}

SoundManager.WHITE = 'white';
SoundManager.BROWN = 'brown';

module.exports = SoundManager;