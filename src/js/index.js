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
playPauseButton.state = 'paused';

window.main = this;

playPauseButton.template.addEventListener('click', () => {
  console.log("!");
  soundManager.togglePlayback();
});








