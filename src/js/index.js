import mainCSS from '../css/main.scss';
import resetCSS from '../css/reset.css';
import PlayPauseButton from '../playPauseButton/playPauseButton';
import SoundManager from './SoundManager';
import StarBackground from './StarBackground';

// Thanks to https://github.com/zacharydenton/noise.js

const soundManager = new SoundManager();
const playPauseButton = new PlayPauseButton();
const starBackground  = new StarBackground();

document.getElementsByClassName('controls')[0].appendChild(playPauseButton.template);
playPauseButton.state = PlayPauseButton.STATE_PLAY;


document.body.addEventListener('click', (event) => {

  // If shift is down, then export a brown noise wav
  if (event.shiftKey){
    var wav = soundManager.exportWav();
    var url = window.URL.createObjectURL(new Blob([wav], {type: 'audio/wav'} ));
    var a   = document.createElement('a');
    document.body.appendChild(a);
    a.href     = url;
    a.download = 'noise.wav';
    a.style    = 'display: none';
    document.body.appendChild(a);

    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();


  } else {
    soundManager.togglePlayback();

    if(soundManager.isPlaying) {
      playPauseButton.state = PlayPauseButton.STATE_PAUSE;
    } else {
      playPauseButton.state = PlayPauseButton.STATE_PLAY;
    }

  }
});