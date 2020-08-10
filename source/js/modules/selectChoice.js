import Choices from "choices.js";
let arrChoices = [];

const selectChoice = (form, isDestroy = false) => {

  function deleteLabelClass(node) {
    const selectWrap = node.parentNode.parentNode.parentNode;
    if (node.value == 1 && selectWrap.classList.contains('placeholder--current')) {
      selectWrap.classList.remove('placeholder--current');
    } else {
      selectWrap.classList.add('placeholder--current');
    }
  }

  if (isDestroy) {
    form.querySelectorAll('select').forEach(select => {
      deleteLabelClass(select);
    });
    arrChoices.forEach(item => {
      item.destroy();
    });
    arrChoices = [];
  }

  const selects = form.querySelectorAll('select');

  if (selects[0]) {
    selects.forEach(select => {
      let choice = new Choices(select, {
        searchEnabled: false,
        itemSelectText: '',
        placeholderValue: '',
        classNames: {
          containerOuter: 'choices',
          containerInner: 'choices__inner',
        },
      });
      arrChoices.push(choice);
      select.addEventListener('change', function (evt) {
        deleteLabelClass(evt.target);
      });

    });
  }
};

export default selectChoice;
