import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { store } from './redux/store';
import './icons';
import './styles/index.less';

document.onreadystatechange = () => {
  if (document.readyState !== 'interactive') {
    return;
  }

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('App')
  );
};
