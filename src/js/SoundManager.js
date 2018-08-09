export default class SoundManager {

  constructor(){
    this.audioContext  = new (window.AudioContext || window.webkitAudioContext);
    this.gainNode      = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);

    this.noiseBuffers = {};
    this.sourceNode   = null;
    this.isPlaying    = false;

    // For debugging
    global.mgr = this;
  }

  createNoiseBuffer(type){
    // Don't recreate these 
    if(this.noiseBuffers[type]) return this.noiseBuffers[type];

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
    
    this.noiseBuffers[type] = noiseBuffer;
    return noiseBuffer;
  }

  createAudioSourceNode(type){
    var source    = this.audioContext.createBufferSource();
    source.buffer = this.createNoiseBuffer(type);
    source.loop   = true;

    source.connect(this.gainNode);
    
    return source;
  }

  setVolume(volume = 1) {
    // Volume must be above 0...
    if(volume <= 0) volume = .0001;
    //this.gainNode.gain.cancelScheduledValues(this.audioContext.currentTime);
    this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
  }

  fadeTo(volume, duration = 1) {
    if(volume <= 0) volume = .0001;
    //this.gainNode.gain.cancelScheduledValues(this.audioContext.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + duration);
  }

  togglePlayback() {
    let fadeTime = 2;

    console.log('toggle playback');

    if(this.isPlaying) {
      // Stop at fade time
      this.sourceNode.stop(this.audioContext.currentTime + fadeTime);
      this.fadeTo(0, fadeTime);
      this.isPlaying = false;

    } else {

      if(!this.sourceNode){
        this.sourceNode = this.createAudioSourceNode(SoundManager.BROWN);
        this.sourceNode.start();
        this.sourceNode.onended = this.onAudioEnd.bind(this);

        this.setVolume(0);
        this.isPlaying = true;
      }
      
      this.fadeTo(1, fadeTime);
    }
  
  }

  onAudioEnd() {
    this.sourceNode = null;
    console.log('audio end');
  }

  getWav(){
    let convert = require('./AudioBufferToWav');
    return new convert(this.createNoiseBuffer(SoundManager.BROWN));
  }

}


SoundManager.WHITE = 'white';
SoundManager.BROWN = 'brown';