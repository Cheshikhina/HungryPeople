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

    select.addEventListener('change', function (evt) {
      const selectWrap = evt.target.parentNode.parentNode.parentNode;
      if (evt.target.value == 1 && selectWrap.classList.contains('placeholder--current')) {
        selectWrap.classList.remove('placeholder--current');
      } else {
        selectWrap.classList.add('placeholder--current');
      }
    });
  });
};

export default selectChoice;
