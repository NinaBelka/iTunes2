export const radioPlayerInit = () => {

  // получение элементов DOM
  const radio = document.querySelector('.radio'),
    radioCoverImg = document.querySelector('.radio-cover__img'),
    radioHeaderBig = document.querySelector('.radio-header__big'),
    radioNavigation = document.querySelector('.radio-navigation'),
    radioItem = document.querySelectorAll('.radio-item'),
    radioStop = document.querySelector('.radio-stop'),
    radioVolume = document.querySelector('.radio-volume'),
    radioMute = document.querySelector('.radio-mute');

  const audio = new Audio();
  audio.type = 'audio/aac';

  radioStop.disabled = true;

  // изменение иконки stop/play
  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove('play');
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radio.classList.add('play');
      radioStop.classList.add('fa-stop');
      radioStop.classList.remove('fa-play');
    }
  };

  // выделение цветом работающей радиостанции
  const selectItem = elem => {
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
  }

  // выбор радио-станции
  radioNavigation.addEventListener('change', event => {
    const target = event.target;
    const parent = target.closest('.radio-item');
    selectItem(parent);

    const title = parent.querySelector('.radio-name').textContent;
    radioHeaderBig.textContent = title;

    const urlImg = parent.querySelector('.radio-img').src;
    radioCoverImg.src = urlImg;

    radioStop.disabled = false;
    audio.src = target.dataset.radioStantion;
    audio.play();
    changeIconPlay();
  });

  // реализация stop/play
  radioStop.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();
  });

  // реализация громкости звука

  radioVolume.addEventListener('input', () => {
    audio.volume = radioVolume.value / 100;
    audio.muted = false;
  });

  radioMute.addEventListener('click', () => {
    audio.muted = !audio.muted
  });

  radioVolume.value = audio.volume * 100;

  radioPlayerInit.stop = () => {
    audio.pause();
    changeIconPlay();
  };
};