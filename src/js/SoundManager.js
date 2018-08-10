import {TweenMax, Sine} from "gsap/TweenMax";

export default class SoundManager {

  constructor(){   
    this.isPlaying     = false;
    this.isCrossFading = false;
    this.isFading      = false;
    this.crossFadeTime = 5;
    this.fadeTime      = 1;

    this.tracks = [
      this.createTrack(),
      this.createTrack()
    ];
    
  }

  createTrack() {
    let el = document.createElement('audio');
    el.src = './media/brown-noise.mp3';
    el.preload = 'auto';
    el.loop = true;
    el.addEventListener('timeupdate', this.onTimeUpdate.bind(this));

    return el;
  }

  togglePlayback() {
    if(this.isPlaying) {
      this.fadeTrack(this.currentTrack, 'out', this.fadeTime);
      this.isPlaying = false;

    } else {
      if(!this.isFading) {
        this.startTrack(0);
      }
      this.fadeTrack(this.currentTrack, 'in', this.fadeTime);
      
      this.isPlaying = true;
    }
  
  }

  startTrack(trackId) {
    this.currentTrack = trackId;

    this.tracks[this.currentTrack].currentTime = 0;
    this.tracks[this.currentTrack].volume      = 0;
    this.tracks[this.currentTrack].play();
  }

  onTimeUpdate(event) {
    let t = this.tracks[this.currentTrack].currentTime;
    let d = this.tracks[this.currentTrack].duration;
    
    if(this.isPlaying && !this.isCrossFading && d - t <= this.crossFadeTime){
      //this.crossFade();
      this.tracks[this.currentTrack].currentTime = 1;
    }
  }

  crossFade() {
    this.isCrossFading = true;

    this.fadeTrack(this.currentTrack, 'out', this.crossFadeTime);
    let nextTrack = (this.currentTrack === 0) ? 1 : 0;

    this.startTrack(nextTrack);
    this.fadeTrack(nextTrack, 'in', this.crossFadeTime);
  }

  /**
   * 
   * @param {*} trackId 
   * @param {*} dir 'in' or 'out'
   * @param {*} stopOnFade stops playback when fade is complete
   */
  fadeTrack(trackId, dir, time){
    console.log('start fade', trackId, dir);
    this.isFading = true;

    let track        = this.tracks[trackId];
    let targVolume   = (dir === 'in') ? 1 : 0;
    let ease         = (dir === 'in') ? Sine.easeOut : Sine.easeIn;

    TweenMax.killTweensOf(track);

    TweenMax.to(track, time, {
      'volume' : targVolume, 
      'ease'   : ease,
      'onComplete' : this.onFadeComplete.bind(this) ,
      'onCompleteParams' : [trackId, dir]
    });
  }


  onFadeComplete(trackId, dir) {
    let stopOnFade = dir === 'out';
    let track      = this.tracks[trackId];

    console.log('onFadeComplete', trackId, dir);

    if(stopOnFade) {
      track.pause();  
    }

    this.isFading      = false;
    this.isCrossFading = false;
  }

  /**
   * Used to create the raw buffer for wav export
   * @param {string} type 
   * @param {number} duration 
   */
  createNoiseBuffer(type, duration){
    let audioContext  = new (window.AudioContext || window.webkitAudioContext);
    let bufferSize    = duration * audioContext.sampleRate;
    let noiseBuffer   = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    let output        = noiseBuffer.getChannelData(0);
  
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

  exportWav(){
    let convert = require('./AudioBufferToWav');
    return new convert(this.createNoiseBuffer(SoundManager.BROWN, 20));
  }
}


SoundManager.WHITE = 'white';
SoundManager.BROWN = 'brown';