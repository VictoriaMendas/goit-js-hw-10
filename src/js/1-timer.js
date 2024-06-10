import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const timerContainer = document.querySelector('.timer');

btnStart.disabled = true;

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      return window.alert('Please choose a date in the future');
    }
    btnStart.disabled = false;
    userSelectedDate = selectedDates[0];
  },
};
flatpickr(input, options);

btnStart.addEventListener('click', onClick);

function onClick(e) {
  btnStart.disabled = true;
  input.disabled = true;
  const intervalId = setInterval(() => {
    const currentDate = Date.now();
    const different = userSelectedDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(different);
    timerContainer.querySelector('[data-days]').textContent =
      addLeadingZero(days);
    timerContainer.querySelector('[data-hours]').textContent =
      addLeadingZero(hours);
    timerContainer.querySelector('[data-minutes').textContent =
      addLeadingZero(minutes);
    timerContainer.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);

    if (different < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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
