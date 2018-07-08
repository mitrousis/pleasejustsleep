import template from './playPauseButton.html';

export default class PlayPauseButton {
  constructor() {
    let el = document.createElement('div');
    el.innerHTML = template;

    this.template = el;

  }

  set state(stateName) {
    switch(stateName) {
      case 'paused':
      document.getElementsByClassName('pause-button')[0].classList.add('state-disabled');
      document.getElementsByClassName('play-button')[0].classList.remove('state-disabled');
      break;

      case 'playing':
      document.getElementsByClassName('pause-button')[0].classList.remove('state-disabled');
      document.getElementsByClassName('play-button')[0].classList.add('state-disabled');
      break;
    }
    
  }
}