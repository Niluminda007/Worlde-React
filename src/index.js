import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import {WordleProvider} from "./Context/WordleContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WordleProvider>
      <App />
    </WordleProvider>
  </React.StrictMode>
);

