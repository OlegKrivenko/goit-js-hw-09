const ref = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let timerId = null;

ref.startBtn.addEventListener('click', () => {
  changeBodyColor();

  timerId = setInterval(() => {
    changeBodyColor();
  }, 1000);

  ref.startBtn.setAttribute('disabled', '');
  ref.stopBtn.removeAttribute('disabled');
});

ref.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  ref.startBtn.removeAttribute('disabled');
  ref.stopBtn.setAttribute('disabled', '');
});

function changeBodyColor() {
  ref.body.style.backgroundColor = `${getRandomHexColor()}`;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
