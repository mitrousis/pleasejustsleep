//import css from './playPauseButton.scss';
import template from './playPauseButton.html';

class PlayPauseButton {
  constructor() {
    let el = document.createElement('div');
    el.innerHTML = template;

    // Left off here.
    this.template = el;
    //document.getElementsByClassName('play-pause')
    //this.template = template;
  }
}

export default PlayPauseButton;