import selectChoice from './selectChoice';
import dateInput from './dateInput';

const form = () => {

  const forms = document.querySelectorAll('form[method="POST"]'),
    inputs = document.querySelectorAll('form[method="POST"] input, form[method="POST"] select, form[method="POST"] textarea');

  const URL = 'http://httpbin.org/post';

  function createTextPlaceholder(input) {
    const regexpName = /^[A-Za-zА-Яа-яЁё]{2}[A-Za-zА-Яа-яЁё\s]*/g,
      regexpPhone = /\+7\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/g,
      regexpMail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/g;
    let message = false;

    if (!input.value.length || !input.value) {
      message = 'This entry is required';
    } else {
      switch (input.name) {
        case 'name':
          if (input.value.trim() === '') {
            message = 'Enter your name without spaces before';
          } else if (!input.value.match(regexpName)) {
            message = 'This entry must be at least 2 characters';
          }
          break;
        case 'phone':
          if (!input.value.match(regexpPhone)) {
            message = 'Enter the correct phone number';
          }
          break;
        case 'email':
          if (!input.value.match(regexpMail)) {
            message = 'Enter the correct email';
          }
          break;
        case 'people':
          if (input.value === '1') {
            message = 'This entry is required';
          }
          break;
        case 'time':
          if (input.value === '1') {
            message = 'This entry is required';
          }
          break;
        default:
          message = false;
      }
    }
    return message;
  }

  function removeFormMessage(node) {
    let span = node.parentNode.parentNode.querySelector('.message');
    span.classList.add('delete');
    setTimeout(function () {
      span.remove();
    }, 300);
  }

  function createSpan(node, message, isFormSpend = false) {
    if (isFormSpend && node.parentNode.querySelector('span.message') || !isFormSpend && node.parentNode.querySelector('span')) {
      return;
    }
    let span = document.createElement('span');
    span.textContent = message;

    node.parentNode.appendChild(span);


    if (isFormSpend) {
      span.classList.add('message');

      setTimeout(function () {
        removeFormMessage(node);
      }, 2000);

      if (isFormSpend === 'error') {
        span.classList.add('error');
      } else {
        node.reset();
        if (closeModal) {
          setTimeout(function () {
            closeModal();
          }, 2100);
        }
      }
    }
  }

  function removePlaceholder(evt) {
    if (evt.target.parentNode.querySelector('span')) {
      evt.target.parentNode.querySelector('span').style.opacity = '0';
      setTimeout(function () {
        if (evt.target.parentNode.querySelector('span')) {
          evt.target.parentNode.querySelector('span').remove();
        }
      }, 300);
    }
  }

  function checkForm(formCuttent) {
    let inputsCuttent = formCuttent.querySelectorAll('input, textarea, select');
    let flag = false;
    inputsCuttent.forEach(input => {
      if (createTextPlaceholder(input)) {
        createSpan(input, createTextPlaceholder(input));
        flag = true;
      }
    });
    return flag;
  }

  function submitForm(evt) {
    evt.preventDefault();
    if (checkForm(evt.target)) {
      return;
    }

    const data = new FormData(evt.target);

    var xhr = new XMLHttpRequest();
    xhr.onloadstart = function (event) {
      xhr.responseType = "json";
    };
    xhr.open('POST', URL);
    xhr.send(data);

    xhr.addEventListener('load', function (e) {
      var target = e.target;

      try {
        if (target.status === 200) {
          if (evt.target.querySelectorAll('.choices')[0]) {
            selectChoice(evt.target, true);
          }
          evt.target.reset();
          resetForm(evt.target);
          createSpan(evt.target, 'Data sent successfully', true);
        } else if (target.response.message) {
          createSpan(evt.target, target.response.message, 'error');
        } else {
          createSpan(evt.target, 'Internal server error', 'error');
        }

      } catch (err) {
        createSpan(evt.target, err, 'error');
      }
    });

    xhr.addEventListener('error', function () {
      createSpan(evt.target, 'Connection error', 'error');
    });
  }

  function resetForm(form) {
    const placeholders = form.querySelectorAll('.placeholder--current'),
      selectsWrap = form.querySelectorAll('.choices');

    if (placeholders[0]) {
      placeholders.forEach(placeholder => {
        placeholder.classList.remove('placeholder--current');
      });
    }

    if (selectsWrap[0]) {
      selectsWrap.forEach(selectWrap => {
        let select = selectWrap.querySelector('select'),
          selectItem = selectWrap.querySelector('.choices__item');

        select.value = ' ';
        select.querySelector('option').setAttribute('value', '1');
        selectItem.textContent = ' ';
        selectItem.setAttribute('data-value', '1');
      });
    }
  }

  forms.forEach(item => {
    item.addEventListener('submit', submitForm);
    if (item.querySelectorAll('select')[0]) {
      selectChoice(item);
    }
    if (item.querySelector('[type="date"]')) {
      dateInput(item.querySelector('[type="date"]'));
    }
  });

  inputs.forEach(input => {
    input.removeAttribute('required');
    if (input.name === 'email') {
      input.setAttribute('type', 'text');
    }
    input.addEventListener('input', removePlaceholder);
    input.addEventListener('change', removePlaceholder);
  });

};

export default form;
