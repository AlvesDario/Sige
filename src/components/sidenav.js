import React, { useState, useContext, useEffect } from 'react';
import './sidenav.css';
import { Context } from '../components/Wrapper';
import Roles from '../utils/roles';
import { FormattedMessage } from 'react-intl';
import Axios from 'axios';

const App = () => {

  const context = useContext(Context);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  function clearLocalStorage(){
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("email");
  }


  function getRoleUser() {
    Axios.get("https://45.79.139.78/v1/auth/user", {
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
      }
    }).then(res => {
      if (res.status === 200) {
          setRole(res.data.user.role);
      }
    }).catch(() => {
    })
  }

  useEffect(()=>{
    context.selectLang();
    setEmail(localStorage.getItem('email'))
    getRoleUser()
    context.selectLang();
  }, [context])

  return (<>
    <div className="sidebar">
      <div className="Userbox">
        <img alt="avatar" src="https://objetivogru.com/wp-content/uploads/2016/11/fatec.jpg" className="userpic"/>
        <p>
          <img alt="" src={require('../img/email_img.png')} width="20px" />   {email}
        </p>
        <p>{Roles[role]}</p>
      </div>
      <a href="/home"><FormattedMessage id='inicio' /></a>
      <a href="/import"><FormattedMessage id='importar_dados' /></a>
      <a href="/aluno"><FormattedMessage id='alunos' /></a>
      <a href="/empresas"><FormattedMessage id='empresas_conveniadas' /></a>
      <a href="/contratos"><FormattedMessage id='contratos' /></a>
      <a href="/dashboard"><FormattedMessage id='dashboard' /></a>
      <a href="/configuracao"><FormattedMessage id='configuracao' /></a>
      <a href="/pending_access"><FormattedMessage id='usuarios_pendentes' /></a>
      <a href="/access_management"><FormattedMessage id='adm_acessos' /></a>
      <a href="/logout" onClick={() => clearLocalStorage()}><FormattedMessage id='sair' /></a>
    </div>
  </>);
};

export default App;