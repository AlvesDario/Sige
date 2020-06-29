import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage';
import LoginPage from './pages/login';
import DataImport from './pages/dataimport';
import Aluno from './pages/alunos';
import Empresa from './pages/empresas';
import Contrato from './pages/contratos';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact={true} component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/import" component={DataImport} />
        <Route exact path="/aluno/" component={Aluno} />
        <Route path="/aluno/:RA" component={Aluno} />
        <Route exact path="/empresas/" component={Empresa}/>
        <Route path="/empresas/:CNPJ" component={Empresa} />
        <Route exact path="/contratos/" component={Contrato}/>
        <Route path="/contratos/:NCON" component={Contrato} />

      </Switch>
    </div>
  );
}

export default App;
