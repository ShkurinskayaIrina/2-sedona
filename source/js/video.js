let video = '';
const controlsBar = document.querySelector('.controls__bar');

const toggleVideoStatus = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const replayVideo = () => {
  video.currentTime = '0';
  video.play();
};

const setVolume = () => {
  video.volume = controlsBar.value;
};

const fullScreenBtnClick = () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
};

const setControlsClick = () => {
  const replayBtn = document.querySelector('.controls__replay');
  const fullScreenBtn = document.querySelector('.controls__fullscreen');

  video.addEventListener('click',toggleVideoStatus);
  replayBtn.addEventListener('click',replayVideo);
  controlsBar.addEventListener('input',setVolume);
  fullScreenBtn.addEventListener('click',fullScreenBtnClick);
};

const createVideoBlock = () => {
  const id = 'video/presentation.mp4';

  const VideoBlock = document.createElement('video');
  VideoBlock.setAttribute('allowfullscreen', '');
  VideoBlock.setAttribute('src', id);
  VideoBlock.classList.add('video__media');

  VideoBlock.play();

  return VideoBlock;
};

const setupVideo = () => {
  const videoWrapper = document.querySelector('.video__wrapper');
  const link = videoWrapper.querySelector('.video__link');

  link.addEventListener('click', () => {
    video = createVideoBlock();
    link.remove();
    videoWrapper.classList.add('video--start');
    videoWrapper.appendChild(video);

    setVolume();
    setControlsClick(video);
  });

  link.removeAttribute('href');
};

setupVideo();
