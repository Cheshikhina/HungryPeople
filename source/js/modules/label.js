const label = () => {
  const wrapLabels = document.querySelectorAll('.placeholder'),
    arrFields = ['input', 'textarea', 'select'];

  function getField(block) {
    let el;
    arrFields.forEach(field => {
      if (block.querySelector(field)) {
        el = block.querySelector(field);
      }
    });
    return el;
  }

  function checkValue(evt) {
    let input = evt.target,
      wrapBlock = input.parentNode;
    console.log(input);
    console.log(wrapBlock);
    if (input.value.trim() != '') {
      if (!wrapBlock.classList.contains('placeholder--current')) {
        wrapBlock.classList.add('placeholder--current');
      }
    } else {
      if (wrapBlock.classList.contains('placeholder--current')) {
        wrapBlock.classList.remove('placeholder--current');
      }
    }
  }

  wrapLabels.forEach(wrapLabel => {
    getField(wrapLabel).addEventListener('blur', checkValue);
  });
  // if (document.querySelectorAll('.placeholder')[0]) {

  // }
};

export default label;
