import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import './App.css';
import HomePage from './pages/homepage';
import LoginPage from './pages/login';
import DataImport from './pages/dataimport';
import Aluno from './pages/alunos';
import Empresa from './pages/empresas';
import Contrato from './pages/contratos';
import RememberPage from './pages/remember';
import RecuperaPage from './pages/recupera';
import CadastroPage from './pages/cadastro';
import Configuracao from './pages/configuracao';
import ResetPassword from './pages/reset_password';
import PendingUsers from './pages/pendingUsers';

const checkAuth = () => {
  const token = localStorage.getItem('jwtToken');
  if (!token ){
    return false;
  }
  try {
    decode(token)
    return true;
  } catch (err) {
    return false;
  }
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
        <Redirect to={'/'} />
      )
  )}

  />
)

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact={true} component={LoginPage} />
        <Route path="/cadastro" component={CadastroPage} />
        <Route path="/remember" component={RememberPage} />
        <Route path="/recupera" component={RecuperaPage} />
        <AuthRoute path="/home" component={HomePage} />
        <AuthRoute path="/import" component={DataImport} />
        <Route exact path="/aluno/" component={Aluno} />
        <Route path="/aluno/:RA" component={Aluno} />
        <Route exact path="/empresas/" component={Empresa}/>
        <Route path="/empresas/:CNPJ" component={Empresa} />
        <Route exact path="/contratos/" component={Contrato}/>
        <Route path="/contratos/:NCON" component={Contrato} />
        <Route exact path="/configuracao/" component={Configuracao} />
        <Route path="/configuracao/reset_password" component={ResetPassword} />
        <Route path="/configuracao/pending_access" component={PendingUsers} />
      </Switch>
    </div>
  );
}

export default App;
