import ReactGA from 'react-ga'

export const initGA = () => {
  ReactGA.initialize('UA-109656934-1')
}

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const logOutboundLink = (label = '') => {
  if (label) {
    ReactGA.outboundLink({ label: label }, null)
  }
}
