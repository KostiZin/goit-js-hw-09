import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btn = document.querySelector('button');
const timePicker = document.querySelector('#datetime-picker');
const daysLeft = document.querySelector('[data-days]');
const hoursLeft = document.querySelector('[data-hours]');
const minutesLeft = document.querySelector('[data-minutes]');
const secondsLeft = document.querySelector('[data-seconds]');
const timerEl = document.querySelector('.timer');

// just design =======
btn.style.color = 'white';
btn.style.backgroundColor = '#f59c90';
btn.style.height = '35px';
btn.style.width = '60px';
btn.style.borderRadius = '5px';

timePicker.style.height = '35px';
timePicker.style.fontSize = '16px';

daysLeft.style.fontSize = '30px';
hoursLeft.style.fontSize = '30px';
minutesLeft.style.fontSize = '30px';
secondsLeft.style.fontSize = '30px';

timerEl.style.display = 'flex';
timerEl.style.gap = '20px';

// =============

let KEY = 'chosen-time';
let currentTime = new Date().getTime();

const options = {
  position: 'auto',
  enableTime: true,
  time_24hr: true,
  weekNumbers: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(timePicker, options);
btn.disabled = true;

timePicker.addEventListener('input', handlePickTime);

function handlePickTime(evt) {
  let timeEvtValue = new Date(evt.target.value).getTime();

  if (timeEvtValue < currentTime) {
    btn.style.backgroundColor = '#f59c90';
    return Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    btn.disabled = false;
    btn.style.backgroundColor = '#206910';
    localStorage.setItem(KEY, JSON.stringify(timeEvtValue));
  }
}

btn.addEventListener('click', timeInterval);

function timeInterval() {
  let countdown = setInterval(function () {
    let chosenTime = JSON.parse(localStorage.getItem(KEY));
    let separatedTime = new Date().getTime();
    const difference = chosenTime - separatedTime;
    console.log(difference);
    const newTime = convertMs(difference);

    const { days, hours, minutes, seconds } = newTime;

    daysLeft.textContent = days;
    hoursLeft.textContent = hours;
    minutesLeft.textContent = minutes;
    secondsLeft.textContent = seconds;

    // Код нижче працює, але виглядає якось дивно. Але я не знайшов як його вдосконалити

    daysLeft.textContent = addLeadingZero(daysLeft.textContent);
    hoursLeft.textContent = addLeadingZero(hoursLeft.textContent);
    minutesLeft.textContent = addLeadingZero(minutesLeft.textContent);
    secondsLeft.textContent = addLeadingZero(secondsLeft.textContent);

    // --------------------------------

    btn.disabled = true;
    btn.style.backgroundColor = '#f59c90';

    if (difference < 1000) {
      clearInterval(countdown);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
