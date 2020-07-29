// const createSelect = () => {
//   const select = document.getElementsByTagName('select');
//   let liElement,
//     ulElement,
//     optionValue,
//     iElement,
//     optionText,
//     selectDropdown,
//     elementParentSpan;

//   for (let select_i = 0, len = select.length; select_i < len; select_i++) {

//     select[select_i].style.display = 'none';
//     wrapElement(document.getElementById(select[select_i].id), document.getElementById(select[select_i].id).dataset.name, document.createElement('div'), select_i);

//     for (let i = 0; i < select[select_i].options.length; i++) {
//       liElement = document.createElement('li');
//       optionValue = select[select_i].options[i].value;
//       optionText = document.createTextNode(select[select_i].options[i].text);
//       liElement.className = 'select_dropdown__list_item';
//       liElement.setAttribute('data-value', optionValue);
//       liElement.appendChild(optionText);
//       ulElement.appendChild(liElement);

//       liElement.addEventListener('click', function () {
//         displyUl(this);
//       }, false);
//     }
//   }

//   function wrapElement(el, textButton, wrapper, i) {
//     el.parentNode.insertBefore(wrapper, el);
//     wrapper.appendChild(el);

//     let buttonElement = document.createElement('button'),
//       spanElement = document.createElement('span'),
//       pElement = document.createElement('p'),
//       spanText = document.createTextNode(''),
//       pText = document.createTextNode(textButton);
//     iElement = document.createElement('i');
//     ulElement = document.createElement('ul');

//     wrapper.className = 'select_dropdown select_dropdown--' + i;
//     buttonElement.className = 'select_dropdown__button select_dropdown__button--' + i;
//     buttonElement.setAttribute('data-value', '');
//     buttonElement.setAttribute('type', 'button');
//     iElement.className = 'select_dropdown__tick';
//     ulElement.className = 'select_dropdown__list select_dropdown__list--' + i;
//     ulElement.id = 'select_dropdown__list-' + i;

//     wrapper.appendChild(buttonElement);
//     spanElement.appendChild(spanText);
//     pElement.appendChild(pText);
//     buttonElement.appendChild(spanElement);
//     buttonElement.appendChild(pElement);
//     buttonElement.appendChild(iElement);
//     wrapper.appendChild(ulElement);
//   }

//   function displyUl(element) {

//     if (element.tagName == 'BUTTON') {
//       element.classList.toggle('select_dropdown__button--active')
//       selectDropdown = element.parentNode.getElementsByTagName('ul');
//       for (let i = 0, len = selectDropdown.length; i < len; i++) {
//         selectDropdown[0].classList.toggle('select_dropdown__list--active');
//       }
//     } else if (element.tagName == 'LI') {
//       element.parentNode.parentNode.querySelector('button').classList.toggle('select_dropdown__button--active')
//       let selectId = element.parentNode.parentNode.getElementsByTagName('select')[0];
//       selectElement(selectId.id, element.getAttribute('data-value'));
//       elementParentSpan = element.parentNode.parentNode.getElementsByTagName('span');
//       element.parentNode.classList.toggle('select_dropdown__list--active');
//       elementParentSpan[0].textContent = element.textContent;
//       elementParentSpan[0].parentNode.setAttribute('data-value', element.getAttribute('data-value'));
//     }

//   }

//   function selectElement(id, valueToSelect) {
//     let element = document.getElementById(id);
//     element.value = valueToSelect;
//     element.setAttribute('selected', 'selected');
//   }
//   let buttonSelect = document.getElementsByClassName('select_dropdown__button');
//   for (let j = 0, len = buttonSelect.length; j < len; j++) {
//     buttonSelect[j].addEventListener('click', function () {
//       displyUl(this);
//     }, false);

//     // buttonSelect[j].addEventListener('focus', function () {
//     //   displyUl(this);
//     // }, false);
//   }
// };

// export default createSelect;
