import React, { useState, useContext, useEffect } from 'react';
import './sidenav.css';
import { Context } from '../components/Wrapper';

import { FormattedMessage } from 'react-intl';

const App = () => {

  const context = useContext(Context);

  const [email, setEmail] = useState("");

  useEffect(()=>{
    context.selectLang();
    setEmail(localStorage.getItem('email'))
  }, [context])

  return (<>
    <div className="sidebar">
      <div className="Userbox">
        <img alt="avatar" src="https://objetivogru.com/wp-content/uploads/2016/11/fatec.jpg" className="userpic"/>
        <input type='text' className="username" value={email} disabled={true}></input>
        <p className="userID">Admin</p>
      </div>
      <a href="/home"><FormattedMessage id='inicio' /></a>
      <a href="/import"><FormattedMessage id='importar_dados' /></a>
      <a href="/aluno"><FormattedMessage id='alunos' /></a>
      <a href="/empresas"><FormattedMessage id='empresas_conveniadas' /></a>
      <a href="/contratos"><FormattedMessage id='contratos' /></a>
      <a href="/dashboard"><FormattedMessage id='dashboard' /></a>
      <a href="/configuracao"><FormattedMessage id='configuracao' /></a>
    </div>
  </>);
};

export default App;