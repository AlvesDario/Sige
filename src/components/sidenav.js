import React from 'react';
import './sidenav.css';

const App = () => {
  return (<>
    <div className="sidebar">
      <div className="Userbox">
        <img alt="avatar" src="https://objetivogru.com/wp-content/uploads/2016/11/fatec.jpg" className="userpic"/>
        <p className="username">FATEC - Indaiatuba</p>
        <p className="userID">admin</p>
      </div>
      <a href="/home">Inicio</a>
      <a href="/import">Importar Dados - SIGA</a>
      <a href="/aluno">Alunos</a>
      <a href="/empresas">Empresas Conveniadas</a>
      <a href="/contratos">Contratos</a>
      <a href="/dashboard">DashBoard</a>
      <a href="/config">Configuração</a>
    </div>
  </>);
};

export default App;