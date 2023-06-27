const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timerId = null;
// --- Just for design --- //
setBtn();
function setBtn() {
  btnStart.style =
    'color:white;background-color:#0c5922;height:60px;width:60px';
  btnStop.style = 'color:white;background-color:#a34958;height:60px;width:60px';
  btnStop.disabled = true;
}
// --- Just for design --- //

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

btnStart.addEventListener('click', handleChangeColor);
btnStop.addEventListener('click', handleStopColorChange);

function handleChangeColor(evt) {
  timerId = setInterval(() => {
    body.style.background = getRandomHexColor();
  }, 1000);

  if ((evt.target.disabled = true)) {
    btnStop.disabled = false;
    btnStart.style.backgroundColor = '#62a675';
    btnStop.style.backgroundColor = '#b5142f';
  }
}

function handleStopColorChange() {
  clearInterval(timerId);
  btnStart.disabled = false;
  setBtn();
}
