import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
require("flatpickr/dist/themes/airbnb.css");

let intervalId = null;

const refs = {
    input: document.querySelector("#datetime-picker"),
    btn: document.querySelector("[data-start]"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
};

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] <= new Date())  {
          Notiflix.Notify.failure('Please choose a date in the future');
          refs.btn.disabled = true;
          updateTimerValue({days: 0, hours: 0, minutes: 0, seconds: 0})
      } else {
      refs.btn.disabled = false;
    }
  },
};

let deadline = flatpickr(refs.input, options);


function startTimer() {
    intervalId = setInterval(() => {
    const deadlineElem = deadline.selectedDates[0];
    const today = new Date();
    const delta = deadlineElem - today;
        if (delta < 0) {
            clearInterval(intervalId);
      return;
        }
        const timerValue = convertMs(delta);
        updateTimerValue(timerValue);
        refs.btn.disabled = true;
    }, 500)
};

refs.btn.addEventListener("click", () => {
    setInterval(startTimer, 1000);
})

function addLeadingZero(value) {
   return String(value).padStart(2, '0');
 }

 function updateTimerValue(value) {
   refs.days.textContent = addLeadingZero(value.days);
   refs.hours.textContent = addLeadingZero(value.hours);
   refs.minutes.textContent = addLeadingZero(value.minutes);
   refs.seconds.textContent = addLeadingZero(value.seconds);
 }