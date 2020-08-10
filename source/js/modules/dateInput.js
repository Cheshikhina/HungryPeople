import flatpickr from "flatpickr";

const dateInput = (selector) => {

  let dateItem = flatpickr(selector, {
    enableTime: false,
    dateFormat: "m-d",
    minDate: "today",
    maxDate: new Date().fp_incr(10),
  });
};

export default dateInput;
