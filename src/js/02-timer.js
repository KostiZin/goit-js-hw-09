import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btn = document.querySelector('button');
const timePicker = document.querySelector('#datetime-picker');
const daysLeft = document.querySelector('[data-days]');
const hoursLeft = document.querySelector('[data-hours]');
const minutesLeft = document.querySelector('[data-minutes]');
const secondsLeft = document.querySelector('[data-seconds]');

// console.log(btn);
btn.disabled = true;
let KEY = 'chosen-time';
let currentTime = new Date().getTime();
// let timeEvtValue;
// console.log(timeEvtValue);

const options = {
  position: 'auto',
  //   minDate: new Date(),
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

timePicker.addEventListener('input', handlePickTime);

function handlePickTime(evt) {
  let timeEvtValue = new Date(evt.target.value).getTime();

  if (timeEvtValue < currentTime) {
    btn.disabled = true;
    return Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    btn.disabled = false;
    localStorage.setItem(KEY, JSON.stringify(timeEvtValue));
  }
}

btn.addEventListener('click', timeInterval);

// function handleCountdown() {
//   let chosenTime = JSON.parse(localStorage.getItem(KEY));

//   const difference = chosenTime - currentTime;

//   const newTime = convertMs(difference);
//   // console.log(newTime);

//   const { days, hours, minutes, seconds } = newTime;

//   daysLeft.textContent = days;
//   hoursLeft.textContent = hours;
//   minutesLeft.textContent = minutes;
//   secondsLeft.textContent = seconds;

//   if (difference < 0) {
//     clearInterval(now);
//   }
// }

function timeInterval() {
  let x = setInterval(function () {
    let chosenTime = JSON.parse(localStorage.getItem(KEY));
    let separatedTime = new Date().getTime();
    const difference = chosenTime - separatedTime;
    console.log(difference);
    const newTime = convertMs(difference);
    // console.log(newTime);
    // newTime.padStart(2, '0');

    const { days, hours, minutes, seconds } = newTime;

    daysLeft.textContent = days;
    hoursLeft.textContent = hours;
    minutesLeft.textContent = minutes;
    secondsLeft.textContent = seconds;

    // let newDays = daysLeft.textContent;
    // newDays = days;

    daysLeft.textContent = addLeadingZero(daysLeft.textContent);
    hoursLeft.textContent = addLeadingZero(hoursLeft.textContent);
    minutesLeft.textContent = addLeadingZero(minutesLeft.textContent);
    secondsLeft.textContent = addLeadingZero(secondsLeft.textContent);

    btn.disabled = true;

    if (difference < 1000) {
      clearInterval(x);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

// FUNCTION< DONT LOOK

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
