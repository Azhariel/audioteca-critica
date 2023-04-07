// import React from 'react'
const MagicScriptTag = () => {
  //   const codeToRunOnClient = `(function() {

  // function getInitialColorMode() {
  //   const persistedColorPreference = window.localStorage.getItem('theme');
  //   const hasPersistedPreference = typeof persistedColorPreference === 'string';
  //   if (hasPersistedPreference) {
  //     return persistedColorPreference;
  //   }
  //   const mql = window.matchMedia('(prefers-color-scheme: dark)');
  //   const hasMediaQueryPreference = typeof mql.matches === 'boolean';
  //   if (hasMediaQueryPreference) {
  //     return mql.matches ? 'dark' : 'light';
  //   }
  //   return 'light';
  // }
  // const colorMode = getInitialColorMode();
  //   const root = document.documentElement;

  //   root.style.setProperty('--initial-color-mode', colorMode);
  // })()`

  const codeToRunOnClient = `(function() {
  // Update the current theme to either 'light' or 'dark'
  function setTheme(theme) {
    window.__theme = theme;
    // TODO: do other logic to update theme here
    console.log('Theme updated:', theme);

    if (theme === 'dark') {
      document.documentElement.className = 'dark';
    } else {
      document.documentElement.className = '';
    }
  };

  // Save the user's explicit theme preference.
  // We're attaching this to window so we can access it anywhere.
  // We'll need it later in this post.
  window.__setPreferredTheme = function(theme) {
    setTheme(theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  };

  // Is there a Saved Theme Preference in localStorage?
  let preferredTheme;
  try {
    preferredTheme = localStorage.getItem('theme');
  } catch (e) {}

  // Is there an Operating System Preference?
  let darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // PICK THE INITIAL THEME
  // 1. Use the theme from localStorage, if any
  // 2. Use the OS theme, if any
  // 3. Default to light
  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
})();`
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />
}

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<MagicScriptTag key={'scripptt'} />)
}
