import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import './searchTable.css';
import Axios from 'axios';

const App = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchRA, setSearchRA] = useState("");
  const [searchCurso, setSearchCurso] = useState("");

  const handleTrClick = (e) => {
    window.location.href += "/" + e;
  }
  
  const handleSearchClick = () => {
    Axios.get("https://45.79.139.78/v1/management/users/pending")
      .then(res => setAlunoTable(res.data));
  }

  return (<>
    <div className="searchForm">
      <div className="searchInputForm">
        <label><FormattedMessage id="nome_aluno" /></label>
        <input value={searchName} onChange={e => {setSearchName(e.target.value)}}/>
      </div>
      <div className="searchInputForm">
        <label>RA</label>
        <input value={searchRA} onChange={e => {setSearchRA(e.target.value)}}/>
      </div>
      <div className="searchInputForm">
        <label><FormattedMessage id="curso" /></label>
        <input value={searchCurso} onChange={e => {setSearchCurso(e.target.value)}}/>
      </div>
      <button onClick={handleSearchClick}><FormattedMessage id='pesquisar' /></button>
    </div>

    {alunoTable.length === 0 ? (
      <p>Nenhum registro está pendente</p>
    ) : (
        <table className="searchTable">
          <tbody>
            {pendingUsers.map(user => <tr key={user.email} onClick={() => handleTrClick(user.email)}>
              <td>{user.nome}</td>
              <td>{user.email}</td>
            </tr>)}
          </tbody>
        </table>
      )}
  </>);
};

export default App;