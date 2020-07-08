import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Wrapper from './components/Wrapper';

ReactDOM.render(
  <Wrapper>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </Wrapper>,
  document.getElementById('root')
);
