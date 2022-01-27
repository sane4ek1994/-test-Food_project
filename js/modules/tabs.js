function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    const parentTabs = document.querySelector(tabsParentSelector),
          contentTabs = document.querySelectorAll(tabsContentSelector),
          tabs = document.querySelectorAll(tabsSelector);

    function hideTabsContent() {
    contentTabs.forEach(item => {
        item.classList.add('hide', 'fade');
        item.classList.remove('show');
    });
    tabs.forEach(item => {
        item.classList.remove(activeClass);
    });
    }

    function showTabsContent(i = 1) {
    contentTabs[i].classList.add('show', 'fade');
    contentTabs[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
    }

    hideTabsContent();
    showTabsContent();

    parentTabs.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
        tabs.forEach((item, i) => {
            if (target === item) {
                hideTabsContent();
                showTabsContent(i);
            }
        });
    }
    });
}

export default tabs;