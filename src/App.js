import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage';
import LoginPage from './pages/login';
import DataImport from './pages/dataimport';
import Aluno from './pages/alunos';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact={true} component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/import" component={DataImport} />
        <Route exact path="/aluno/" component={Aluno} />
        <Route path="/aluno/:RA" component={Aluno} />
      </Switch>
    </div>
  );
}

export default App;
