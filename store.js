import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

export const themeTypes = {
  LIGHT: 'LIGHT',
  DARK: 'DARK'
}

const determineInitialTheme = () => {
  const currentHour = new Date().getHours()
  return currentHour >= 6 && currentHour < 18
    ? themeTypes.LIGHT
    : themeTypes.DARK
}

const initialState = {
  theme: determineInitialTheme()
}

const actionTypes = {
  TOGGLE_THEME: 'TOGGLE_THEME'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_THEME:
      return {
        theme:
          state.theme === themeTypes.LIGHT ? themeTypes.DARK : themeTypes.LIGHT
      }
    default:
      return state
  }
}

export const toggleTheme = () => dispatch => {
  return dispatch({ type: actionTypes.TOGGLE_THEME })
}

export const initStore = (initialState = initialState) => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
