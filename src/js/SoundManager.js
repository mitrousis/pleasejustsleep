import {TweenMax, Power2, Power1, Power3, Circ, Expo, Linear} from "gsap/TweenMax";

export default class SoundManager {

  constructor(){   
    this.sourceNode    = null;
    this.isPlaying     = false;
    this.isCrossFading = false;
    this.crossFadeTime = 2;
    this.fadeTime      = 1;

    this.tracks = [
      this.createTrack(),
      this.createTrack()
    ];
    
  }

  createTrack() {
    let el = document.createElement('audio');
    el.src = "./media/brown-noise.mp3";
    el.addEventListener('timeupdate', this.onTimeUpdate.bind(this));

    return el;
  }
  // setVolume(volume = 1) {
  //   // Volume must be above 0...
  //   if(volume <= 0) volume = .0001;
  //   //this.gainNode.gain.cancelScheduledValues(this.audioContext.currentTime);
  //   this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
  // }

  // fadeTo(volume, duration = 1) {
  //   if(volume <= 0) volume = .0001;
  //   //this.gainNode.gain.cancelScheduledValues(this.audioContext.currentTime);
  //   this.gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + duration);
  // }

  togglePlayback() {
    let fadeTime = 2;

    if(this.isPlaying) {
      this.fadeTrack(this.currentTrack, 'out', this.fadeTime);
      this.isPlaying = false;

    } else {
      this.startTrack(0);
      this.fadeTrack(this.currentTrack, 'in', this.fadeTime);
      
      this.isPlaying = true;

    }
  
  }

  startTrack(trackId) {
    this.currentTrack = trackId;

    this.tracks[this.currentTrack].currentTime = 0;
    this.tracks[this.currentTrack].play();
    this.tracks[this.currentTrack].volume = 0;
  }

  onTimeUpdate(event) {
    let t = this.tracks[this.currentTrack].currentTime;
    let d = this.tracks[this.currentTrack].duration;
    
    if(this.isPlaying && !this.isCrossFading && d - t <= this.crossFadeTime){
      this.crossFade();
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
    console.log('fadeTrack', trackId, dir);

    let track        = this.tracks[trackId];
    let targVolume   = (dir === 'in') ? 1 : 0;
    let ease         = (dir === 'in') ? Power1.easeOut : Power1.easeIn;
    let completeCall = (dir === 'out') ? this.onFadeComplete.bind(this) : null;
    let stopOnFade   = (dir === 'out');

    TweenMax.to(track, time, {
      'volume' : targVolume, 
      'ease'   : ease,
      'onComplete' : completeCall,
      'onCompleteParams' : [track, stopOnFade],
      // onUpdate : this.onUpdate.bind(this),
      // onUpdateParams : [trackId]
    });
  }

  // onUpdate(trackId) {
  //   console.log("update", trackId, this.tracks[trackId].volume);
  // }

  onFadeComplete(track, stopOnFade) {
    console.log('onFadeComplete', track, stopOnFade);

    if(stopOnFade) {
      track.pause();
    }

    this.isCrossFading = false;
  }

}


SoundManager.WHITE = 'white';
SoundManager.BROWN = 'brown';