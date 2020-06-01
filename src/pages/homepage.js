import React from 'react';
import SideNav from '../components/sidenav';
import './homepage.css';

const App = () => {
  return (<>
    <SideNav />
    <div className="content">
      <h1>Bem-vindo ao Sistema Integrado de Gestão de Estágio</h1>
      <img className="banner" alt="img1" src="http://www.fatecid.com.br/site/wp-content/uploads/2020/03/corona01-1.jpg" />
    </div>
  </>);
};

export default App;