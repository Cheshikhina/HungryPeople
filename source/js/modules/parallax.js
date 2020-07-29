const parallax = (selector) => {
  const header = document.querySelector(selector),
    startY = -100,
    w = document.documentElement.offsetWidth,
    h = document.documentElement.offsetHeight;

  header.addEventListener('mousemove', function (evt) {
    let posY = Math.round(evt.clientY / h * startY);
    header.style.backgroundPosition = '0px ' + posY + 'px';
  });
};

export default parallax;
