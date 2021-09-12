import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store, persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import Phonebook from './Phonebook';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Phonebook />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

