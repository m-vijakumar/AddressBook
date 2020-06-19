import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  // <Provider store={store}>
  //   <App />
  // </Provider>,
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);