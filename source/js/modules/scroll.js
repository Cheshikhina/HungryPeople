const scroll = () => {
  const links = document.querySelectorAll('[data-anchor]');

  links.forEach(link => {
    link.addEventListener('click', function (evt) {
      evt.preventDefault();
      let blockID = evt.target.getAttribute('href').substr(1);

      document.querySelector('#' + blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
};

export default scroll;
