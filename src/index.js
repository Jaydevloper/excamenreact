import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.scss';
import App from './App';
import {BrowserRouter } from "react-router-dom";
import { AuthProvider } from './components/context/auoth-context';
import { Provider } from 'react-redux/es/exports';
import store from './store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


