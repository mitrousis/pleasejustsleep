import mainCSS from '../css/main.scss';
import resetCSS from '../css/reset.css';
import PlayPauseButton from '../playPauseButton/playPauseButton';


// Thanks to https://github.com/zacharydenton/noise.js

const SoundManager = require('../js/SoundManager');
const soundManager = new SoundManager();

const playPauseButton = new PlayPauseButton();

document.getElementsByClassName('controls')[0].appendChild(playPauseButton.template);

// soundManager.getAudioSourceNode(SoundManager.BROWN).start();
// soundManager.setVolume(0);
// soundManager.fadeTo(1, 5);




