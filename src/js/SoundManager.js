export default class SoundManager {

  constructor(){
    this.audioContext  = new (window.AudioContext || window.webkitAudioContext);

    this.gainNode      = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);

    // setInterval(() => {
    //   console.log(this.gainNode.gain.value);
    //   console.log(this.audioContext.currentTime);
    // }, 500)
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
    // Volume must be above 0...
    if(volume <= 0) volume = .0001;
    this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
  }

  fadeTo(volume, duration = 1) {
    this.gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + duration);
  }

}

SoundManager.WHITE = 'white';
SoundManager.BROWN = 'brown';