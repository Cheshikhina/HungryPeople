const search = () => {
  const searchBox = document.querySelector('.header__middle_search'),
    searchInput = document.querySelector('.header__middle_search input'),
    searchForm = document.querySelector('.header__middle_search form'),
    searchButton = document.querySelector('.header__middle_search [type="submit"]');

  function saveValue() {
    if (searchInput.value.trim()) {
      localStorage.setItem('search', searchInput.value);
      searchInput.value = '';
    }
    searchInput.blur();
  }

  function removeSearchClass() {
    searchBox.classList.remove('header__middle_search--js');
    document.removeEventListener('mousedown', clickDocumentHandler);
  }

  function submitSearchForm(evt) {
    evt.preventDefault();
    saveValue();
    removeSearchClass();
  }

  function addSearchClass(evt) {
    if (evt.target === searchButton || evt.target === searchForm) {
      return;
    }
    if (!searchBox.classList.contains('header__middle_search--js')) {
      searchBox.classList.add('header__middle_search--js');
    }

    document.addEventListener('mousedown', clickDocumentHandler);
  }

  function clickDocumentHandler(evt) {
    if (evt.target === searchButton) {
      saveValue();
      removeSearchClass();
    } else if (evt.target !== searchBox && evt.target !== searchBox.children && evt.target !== searchBox.children.children) {
      removeSearchClass();
    }
  }

  searchBox.addEventListener('click', addSearchClass);
  searchInput.addEventListener('focus', addSearchClass);
  searchForm.addEventListener('submit', submitSearchForm);
};

export default search;
