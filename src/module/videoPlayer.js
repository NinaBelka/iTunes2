import { addZero } from './supScript.js';

export const videoPlayerInit = () => {
  // получение элементов DOM
  const videoPlayer = document.querySelector('.video-player'),
    videoButtonPlay = document.querySelector('.video-button__play'),
    videoButtonStop = document.querySelector('.video-button__stop'),
    videoTimePassed = document.querySelector('.video-time__passed'),
    videoProgress = document.querySelector('.video-progress'),
    videoTimeTotal = document.querySelector('.video-time__total'),
    videoVolume = document.querySelector('.video-volume'),
    videoFullscreen = document.querySelector('.video-fullscreen');

  // раскрытие видео на весь экран
  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
    videoPlayer.controls = true;
  });

  videoPlayer.addEventListener('fullscreenchange', () => {
    if (document.fullscreen) {
      videoPlayer.controls = true;
    } else {
      videoPlayer.controls = false;
    }
  });

  // изменение иконки play/pause
  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  };

  // включение/пауза
  const togglePlay = event => {
    event.preventDefault();
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  };

  // включение/стоп
  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };

  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  videoButtonStop.addEventListener('click', stopPlay);

  // отображение времени
  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let minutesPassed = Math.floor(currentTime / 60) || '0';
    let secondsPassed = Math.floor(currentTime % 60) || '0';

    let minutesTotal = Math.floor(duration / 60) || '0';
    let secondsTotal = Math.floor(duration % 60) || '0';

    videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
  });

  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
  });

  // реализация громкости
  const changeValue = () => {
    const valueVolume = videoVolume.value;
    videoPlayer.volume = valueVolume / 100;
  };

  videoVolume.addEventListener('input', changeValue);
  videoPlayer.addEventListener('volumechange', () => {
    videoVolume.value = Math.round(videoPlayer.volume * 100);
  });

  changeValue();

  videoPlayerInit.stop = () => {
    videoPlayer.pause();
    toggleIcon();
  };

};