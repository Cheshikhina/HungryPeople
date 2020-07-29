const tab = (tabName, activeEl = 0) => {
  const tabs = document.querySelectorAll(`[data-tabs=${tabName}]`),
    contents = document.querySelectorAll(`[data-content=${tabName}]`),
    tabClass = tabs[0].getAttribute('class').split(' ')[0] + '--active',
    contentClass = contents[0].getAttribute('class').split(' ')[0] + '--active';

  function showActiveTab(index = false) {
    tabs.forEach(tab => {
      if (tab.classList.contains(tabClass)) {
        tab.classList.remove(tabClass);
      }
    });
    contents.forEach(content => {
      if (content.classList.contains(contentClass)) {
        content.classList.remove(contentClass);
      }
    });
    if (index == false) {
      tabs[activeEl].classList.add(tabClass);
      contents[activeEl].classList.add(contentClass);
    } else {
      tabs[index].classList.add(tabClass);
      contents[index].classList.add(contentClass);
    }
  }

  function clickHandlerTabs(evt) {
    let clickEl = 0;
    evt.preventDefault();
    for (let i = 0; i < tabs.length; i++) {
      if (evt.target == tabs[i]) {
        clickEl = i;
      }
    }
    showActiveTab(clickEl);
  }

  showActiveTab();

  tabs.forEach(tab => {
    tab.addEventListener('click', clickHandlerTabs);
  });
};

export default tab;
