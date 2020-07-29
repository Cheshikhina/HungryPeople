const animationSections = () => {
  const sections = document.querySelectorAll('[data-section="true"]'),
    links = document.querySelectorAll('.section__photo_link');

  function animationSection(block, isShow = true) {
    if (isShow) {
      if (block.classList.contains('footer')) {
        block.classList.add('footer--animated');
      } else {
        block.classList.add('section--animated');
      }
      if (block.querySelectorAll('.info')[0]) {
        block.querySelectorAll('.info').forEach(infoBlock => {
          infoBlock.classList.add('info--animated');
        });
      }
      if (window.getComputedStyle(block).backgroundImage == 'none') {
        block.style.opacity = 1;
      } else {
        if (block.querySelector('.container')) {
          block.querySelector('.container').style.opacity = 1;
        }
      }
      if (block.querySelector('.slider_specialties__pagination')) {
        block.querySelector('.slider_specialties__pagination').classList.add('slider_specialties__pagination--animated');
      }

      if (block.querySelectorAll('.section__photo_link')[0]) {
        const photoLinks = block.querySelectorAll('.section__photo_link');
        photoLinks.forEach(link => {
          link.addEventListener('mouseover', (evt) => {
            evt.currentTarget.classList.remove('section__photo_link--animated');
          });
          link.addEventListener('mouseout', (evt) => {
            evt.currentTarget.classList.add('section__photo_link--animated');
          });
        });
      }
    } else {
      if (block.classList.contains('footer')) {
        block.classList.remove('footer--animated');
      } else if (block.classList.contains('section--animated')) {
        block.classList.remove('section--animated');
      }
      if (block.querySelectorAll('.info')[0] && block.querySelectorAll('.info')[0].classList.contains('info--animated')) {
        block.querySelectorAll('.info').forEach(infoBlock => {
          infoBlock.classList.remove('info--animated');
        });
      }
      if (window.getComputedStyle(block).backgroundImage == 'none') {
        block.style.opacity = 0;
      } else {
        if (block.querySelector('.container')) {
          block.querySelector('.container').style.opacity = 0;
        }
      }
      if (block.querySelector('.slider_specialties__pagination') && block.querySelector('.slider_specialties__pagination').classList.contains('slider_specialties__pagination--animated')) {
        block.querySelector('.slider_specialties__pagination').classList.remove('slider_specialties__pagination--animated');
      }

      links.forEach(link => {
        if (link.classList.contains('section__photo_link--animated')) {
          link.classList.remove('section__photo_link--animated');
        }
      });
    }
  }

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animationSection(entry.target);
      } else {
        animationSection(entry.target, false);
      }
    });
  }, {
    threshold: 0.3
  });

  sections.forEach(section => {
    observer.observe(section);
  });
};

export default animationSections;
