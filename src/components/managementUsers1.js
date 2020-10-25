import React, { useState, useEffect, useContext } from 'react';
import './searchTable.css';
import { Context } from './Wrapper';


const App = () => {
  const context = useContext(Context);
  const [users, setUsers] = useState([]);

  const [error] = useState(0);

  function refreshPage() {
    window.location.reload(false);
  }

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