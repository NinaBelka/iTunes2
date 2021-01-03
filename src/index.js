'use strict';

// импорт модулей

import { radioPlayerInit } from './module/radioPlayer.js';
import { musicPlayerInit } from './module/musicPlayer.js';
import { videoPlayerInit } from './module/videoPlayer.js';

// получение данных из DOM

const playerBtn = document.querySelectorAll('.player-btn'),
  playerBlock = document.querySelectorAll('.player-block'),
  temp = document.querySelector('.temp');

// открытие плейеров
const deactivationPlayer = () => {
  temp.style.display = 'none';
  playerBtn.forEach(item => item.classList.remove('active'));
  playerBlock.forEach(item => item.classList.remove('active'));
  radioPlayerInit.stop();
  videoPlayerInit.stop();
  musicPlayerInit.stop();
};

playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
  deactivationPlayer();
  btn.classList.add('active');
  playerBlock[i].classList.add('active');
}));

// вызов функций
radioPlayerInit();
musicPlayerInit();
videoPlayerInit();