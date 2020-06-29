import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import './searchTable.css';
import Axios from 'axios';

const App = () => {
  const [alunoTable, setAlunoTable] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchRA, setSearchRA] = useState("");
  const [searchCurso, setSearchCurso] = useState("");

  const handleTrClick = (e) => {
    window.location.href += "/" + e;
  }
  
  const handleSearchClick = () => {
    Axios.get(/** pega lista de alunos*/)
      .then(res => setAlunoTable(res));
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
      <p>Nenhum aluno foi encontrado</p>
    ) : (
        <table className="searchTable">
          <tbody>
            {alunoTable.map(aluno => <tr key={aluno.RA} onClick={() => handleTrClick(aluno.RA)}>
              <td>{aluno.nome}</td>
              <td>{aluno.RA}</td>
              <td>{aluno.curso}</td>
            </tr>)}
          </tbody>
        </table>
      )}
  </>);
};

export default App;