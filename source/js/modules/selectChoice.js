import Choices from "choices.js";

const selectChoice = (selector) => {
  const selects = document.querySelectorAll(selector);

  selects.forEach(select => {
    let choices = new Choices(select, {
      searchEnabled: false,
      itemSelectText: '',
      placeholderValue: '',
      classNames: {
        containerOuter: 'choices',
        containerInner: 'choices__inner',
      },
    });
    // .showDropdown(' ');

    // select.addEventListener(
    // 'showDropdown',
    // function (evt) {
    //   select.
    // }
    // );
  });

};
export default selectChoice;
