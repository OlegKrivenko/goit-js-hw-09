import flatpickr from 'flatpickr';
// Дополнительный импорт стилей для календаря
import 'flatpickr/dist/flatpickr.min.css';
// это  я сам подключил для цветовой схемы календаря (зеленая)
import 'flatpickr/dist/themes/material_green.css';
// это библиотека для отображения уведомлений пользователю вместо window.alert()
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),

  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
ref.startBtn.disabled = true;
ref.startBtn.addEventListener('click', onStartBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] - currentDate >= 0) {
      ref.startBtn.disabled = false;
      Notify.success('Date has chosen!');
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr('input#datetime-picker', options);

function onStartBtn() {
  ref.startBtn.disabled = true;
  const onClickDate = new Date(ref.input.value).getTime();

  Notify.success('Timer has started!');

  timerId = setInterval(() => {
    const currentDate = new Date().getTime();
    const deltaTime = onClickDate - currentDate;
    console.log(deltaTime);
    if (deltaTime >= 0) {
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      ref.days.textContent = days;
      ref.hours.textContent = hours;
      ref.minutes.textContent = minutes;
      ref.seconds.textContent = seconds;
    } else {
      clearInterval(timerId);
      Notify.success('Timer has stopped!');
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
