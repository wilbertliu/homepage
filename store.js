export const themeTypes = {
  LIGHT: 'LIGHT',
  DARK: 'DARK'
}

export const determineInitialTheme = () => {
  const currentHour = new Date().getHours()
  return currentHour >= 6 && currentHour < 18
    ? themeTypes.LIGHT
    : themeTypes.DARK
}

const actionTypes = {
  TOGGLE_THEME: 'TOGGLE_THEME',
  RESET_THEME: 'RESET_THEME'
}
