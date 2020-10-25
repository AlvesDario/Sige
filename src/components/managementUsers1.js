import React from 'react';
import './searchTable.css';


const App = () => {

  return (<>
    <div>
      <table>
        <button onClick={() => document.location.href = '/pending_access'}>Usuários Pendentes</button>
      </table>
    </div>
    <div>
      <table>
        <button onClick={() => document.location.href = '/access_management'}>Administração De Acessos</button>
      </table>
    </div>
  </>);
};

export default App;