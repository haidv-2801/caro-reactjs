import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/Store';
import './index.css';
import { Provider } from 'react-redux';

//Định nghĩa prototy fomat
String.prototype.format = function () {
  var ans = this;
  for (let k in arguments) {
    ans = ans.replace('{' + k + '}', arguments[k]);
  }
  return ans;
};

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
