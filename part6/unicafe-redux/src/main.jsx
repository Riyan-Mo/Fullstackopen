import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createStore } from 'redux'
import reducer from './reducer'
import { Provider } from 'react'

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(
  <Provider store={store}>
  <App />
  </Provider>
  )
}

renderApp()
store.subscribe(renderApp)
