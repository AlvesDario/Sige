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
        <AuthRoute exact path="/aluno/" component={Aluno} />
        <AuthRoute path="/aluno/:RA" component={Aluno} />
        <AuthRoute exact path="/empresas/" component={Empresa}/>
        <AuthRoute path="/empresas/:CNPJ" component={Empresa} />
        <AuthRoute exact path="/contratos/" component={Contrato}/>
        <AuthRoute path="/contratos/:NCON" component={Contrato} />

      </Switch>
    </div>
  );
}

export default App;
