import ReactDOM from 'react-dom/client'
import { anecdoteFilter } from './reducers/anecdoteFilterReducer';
import { Provider } from 'react-redux'
import store from './reducers/store';
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

renderApp()
store.subscribe(renderApp)
store.dispatch(anecdoteFilter(" "));