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


playPauseButton.template.addEventListener('click', () => {

  // var wav = soundManager.getWav();
  // var blob = new window.Blob([ new DataView(wav) ], {
  //   type: 'audio/wav'
  // })

  // console.log(blob);

  // var url = window.URL.createObjectURL(blob)

  // console.log(url)
  soundManager.togglePlayback();

  if(soundManager.isPlaying) {
    playPauseButton.state = PlayPauseButton.STATE_PAUSE;
  } else {
    playPauseButton.state = PlayPauseButton.STATE_PLAY;
  }
});








