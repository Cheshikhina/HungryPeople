import flatpickr from "flatpickr";

const dateInput = (selector) => {
  const date = document.querySelector(selector);

  flatpickr(date, {
    enableTime: false,
    dateFormat: "m-d",
    minDate: "today",
    maxDate: new Date().fp_incr(10),
  });

};
export default dateInput;
