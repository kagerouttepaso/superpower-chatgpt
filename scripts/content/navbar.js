/* global modelSwitcher, dropdown, addDropdownEventListener, languageList, writingStyleList, toneList, addModelSwitcherEventListener, pluginsDropdown, addPluginsDropdownEventListener */
function addNavbar() {
  const existingNavbar = document.querySelector('#gptx-nav-wrapper');
  if (existingNavbar) existingNavbar.remove();
  const existingSyncBanner = document.querySelector('#sync-nav-wrapper');
  if (existingSyncBanner) existingSyncBanner.remove();
  const navWrapper = document.createElement('div');
  navWrapper.id = 'gptx-nav-wrapper';
  navWrapper.className = 'w-full z-10 bg-transparent transition-all relative top-0';
  navWrapper.style = 'height: 56px;';
  const navbar = document.createElement('div');
  navbar.id = 'gptx-navbar';
  navbar.className = 'w-full flex items-center justify-between border-b h-14 border-black/10 bg-gray-50 px-3 py-1 text-gray-500 dark:border-gray-900/50 dark:bg-gray-700 dark:text-gray-300 shadow-md';

  chrome.storage.local.get(['settings', 'models', 'account', 'unofficialModels', 'customModels'], (result) => {
    const {
      models, settings, unofficialModels, customModels,
    } = result;
    const {
      selectedModel, selectedLanguage, selectedTone, selectedWritingStyle, autoHideTopNav, navOpen,
    } = settings;
    const allModels = [...models, ...unofficialModels, ...customModels];
    // const planName = account?.account_plan?.subscription_plan || 'chatgptfreeplan';
    // const isPaid = account?.account_plan?.is_paid_subscription_active || false;
    // const features = account?.features || [];
    // Add model switcher
    if (!selectedModel) {
      // eslint-disable-next-line prefer-destructuring
      settings.selectedModel = allModels[0];
      chrome.storage.local.set({ settings });
    } else if (!allModels.map((m) => m.slug).includes(settings.selectedModel.slug)) {
      // eslint-disable-next-line prefer-destructuring
      settings.selectedModel = allModels[0];
      chrome.storage.local.set({ settings });
    }
    const leftSection = document.createElement('div');
    leftSection.style = 'display:flex;z-index:1000;margin-right:auto;';
    const modelSwitcherWrapper = document.createElement('div');
    modelSwitcherWrapper.style = 'position:relative;width:200px;z-index:1000';
    const idPrefix = 'navbar';
    modelSwitcherWrapper.id = `model-switcher-wrapper-${idPrefix}`;
    modelSwitcherWrapper.innerHTML = modelSwitcher(allModels, settings.selectedModel, idPrefix, customModels);
    leftSection.appendChild(modelSwitcherWrapper);

    // Add plugins dropdown
    // const pluginsDropdownWrapper = document.createElement('div');
    // pluginsDropdownWrapper.style = 'position:relative;width:200px;margin-left:8px;z-index:1000;display:none';
    // if (settings.selectedModel.slug.includes('plugins')) {
    //   pluginsDropdownWrapper.style.display = 'block';
    // }
    // pluginsDropdownWrapper.id = `plugins-dropdown-wrapper-${idPrefix}`;
    // pluginsDropdownWrapper.innerHTML = pluginsDropdown(allModels, settings.selectedModel, idPrefix, customModels);
    // leftSection.appendChild(pluginsDropdownWrapper);

    navbar.appendChild(leftSection);
    addModelSwitcherEventListener(idPrefix);
    // addPluginsDropdownEventListener(idPrefix);

    const rightSection = document.createElement('div');
    rightSection.style = 'display:flex;z-index:1000;margin-left:auto;';

    // Add writing style selector
    const toneSelectorWrapper = document.createElement('div');
    toneSelectorWrapper.style = 'position:relative;width:150px;margin-left:8px;';
    toneSelectorWrapper.innerHTML = dropdown('Tone', toneList, selectedTone, 'right');
    rightSection.appendChild(toneSelectorWrapper);

    // Add tone selector
    const writingStyleSelectorWrapper = document.createElement('div');
    writingStyleSelectorWrapper.style = 'position:relative;width:150px;margin-left:8px;';
    writingStyleSelectorWrapper.innerHTML = dropdown('Writing-Style', writingStyleList, selectedWritingStyle, 'right');
    rightSection.appendChild(writingStyleSelectorWrapper);

    // Add language selector
    const languageSelectorWrapper = document.createElement('div');
    languageSelectorWrapper.style = 'position:relative;width:150px;margin-left:8px;';
    languageSelectorWrapper.innerHTML = dropdown('Language', languageList, selectedLanguage, 'right');
    rightSection.appendChild(languageSelectorWrapper);

    navbar.appendChild(rightSection);
    addDropdownEventListener('Tone', toneList);
    addDropdownEventListener('Writing-Style', writingStyleList);
    addDropdownEventListener('Language', languageList);

    if (autoHideTopNav) {
      navWrapper.style.top = '-56px';
      navWrapper.style.position = 'absolute';
      navWrapper.style.height = '112px';
      navWrapper.style.paddingRight = navOpen ? '260px' : '0px';
    }
    navWrapper.addEventListener('mouseover', () => {
      chrome.storage.local.get(['settings'], (res) => {
        if (res.settings.autoHideTopNav) {
          navWrapper.style.paddingRight = res.settings.navOpen ? '260px' : '0px';
          navWrapper.style.top = '0px';
        }
      });
    });
    navWrapper.addEventListener('mouseout', () => {
      chrome.storage.local.get(['settings'], (res) => {
        if (res.settings.autoHideTopNav) {
          navWrapper.style.top = '-56px';
        }
      });
    });
  });

  const main = document.querySelector('main');

  navWrapper.appendChild(navbar);
  main.parentNode.insertBefore(navWrapper, main);
}

// eslint-disable-next-line no-unused-vars
function initializeNavbar() {
  addNavbar();
}
