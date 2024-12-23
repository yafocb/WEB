const body = document.querySelector("body");

const IMG_NUMBER = 4;

function paintImage(num) {
  const image = new Image();
  image.src = `images/${num + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();

window.addEventListener('scroll', () => {
  const scrolling = window.screenY;
  const background_img = document.querySelector('.bgImage');
  background_img.style.transform = `translateY(${scrolling * 0.5}px)`;
});
