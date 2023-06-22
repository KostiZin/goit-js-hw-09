import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btn = document.querySelector('button');
const timePicker = document.querySelector('#datetime-picker');
// flatpickr(timePicker, {});
console.log(btn);
btn.disabled = true;

// let currentDate = new Date();
// console.log(currentDate);

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
  let timeNew = new Date(evt.target.value);
  console.log(timeNew.getTime());
  let timeNew2 = new Date();
  console.log(timeNew2.getTime());

  if (!timeNew.getTime() < timeNew2.getTime()) {
  }
  return alert('Please choose a date in the future');
  //   } else {
  //     btn.disabled = true;
  //   }
}
