import mainCSS from '../css/main.css';
import resetCSS from '../css/reset.css';


// Thanks to https://github.com/zacharydenton/noise.js

const SoundManager = require('../js/SoundManager');
const soundManager = new SoundManager();

soundManager.getAudioSourceNode(SoundManager.BROWN).start();
soundManager.setVolume(1);



