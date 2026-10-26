import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { LanguageProvider } from './context/LanguageContext';
import { PrototypeProvider } from './context/PrototypeContext';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <PrototypeProvider>
          <App />
        </PrototypeProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
