import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
    return alert('Please choose a date in the future');
  } else {
    btn.disabled = false;
    localStorage.setItem(KEY, JSON.stringify(timeEvtValue));
  }

  // console.log(convertMs(currentTime));

  // if (days: 0 || ) {
  //   clearInterval(x);
  // document.getElementById("demo").innerHTML = "EXPIRED";
}

// console.log(localStorage);

// let zeroTime = convertMs(chosenTime);

// let now = setInterval(repeat, 1000);

// btn.addEventListener('click', handleCountdown);
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

    const { days, hours, minutes, seconds } = newTime;

    daysLeft.textContent = days;
    hoursLeft.textContent = hours;
    minutesLeft.textContent = minutes;
    secondsLeft.textContent = seconds;

    if (difference < 1000) {
      clearInterval(x);
    }
  }, 1000);
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
