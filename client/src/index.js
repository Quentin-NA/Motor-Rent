import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import reducer from './reducer/Reducer';
import {createStore} from "redux";



const store = createStore(reducer);
store.subscribe(() => {
	//à chaque changement du state, on enregistre sa nouvelle version dans le storage
	sessionStorage.setItem("basket", JSON.stringify(store.getState()));
});
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store} >
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

