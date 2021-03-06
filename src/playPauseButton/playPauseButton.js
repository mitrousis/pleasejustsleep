import template from './playPauseButton.html';

export default class PlayPauseButton {
  constructor() {
    let el = document.createElement('div');
    el.innerHTML = template;
    el.id = 'play-pause-button';

    this.template = el;

  }

  set state(stateName) {
    switch(stateName) {
      case PlayPauseButton.STATE_PLAY:
      document.getElementsByClassName('pause-button')[0].classList.add('state-disabled');
      document.getElementsByClassName('play-button')[0].classList.remove('state-disabled');
      break;

      case PlayPauseButton.STATE_PAUSE:
      document.getElementsByClassName('pause-button')[0].classList.remove('state-disabled');
      document.getElementsByClassName('play-button')[0].classList.add('state-disabled');
      break;
    }
    
  }
}

PlayPauseButton.STATE_PLAY   = 'play';
PlayPauseButton.STATE_PAUSE  = 'pause';