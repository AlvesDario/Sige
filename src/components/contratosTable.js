import React, { useState } from 'react';
import './searchTable.css';
import Axios from 'axios';

const App = () => {
  const [contratosTable, setContratosTable] = useState([]);

  const [searchContrato, setSearchContrato] = useState("");
  const [searchAluno, setSearchAluno] = useState("");
  const [searchEmpresa, setSearchEmpresa] = useState("");

  const handleTrClick = (e) => {
    window.location.href += "/" + e;
  }

  const handleSearchClick = () => {
    Axios.get(/** pega lista de alunos*/)
      .then(res => setContratosTable(res));
    // setContratosTable([{NCON: '1234', aluno: 'joao', empresa: 'mc donald'}, {NCON: '4321', aluno: 'maria', empresa: 'BK'}]) exemplo
  }

  return (<>
    <div className="searchForm">
      <div className="searchInputForm">
        <label>Nº do contrato</label>
        <input value={searchContrato} onChange={e => { setSearchContrato(e.target.value) }} />
      </div>
      <div className="searchInputForm">
        <label>Nome do Aluno</label>
        <input value={searchAluno} onChange={e => { setSearchAluno(e.target.value) }} />
      </div>
      <div className="searchInputForm">
        <label>Empresa</label>
        <input value={searchEmpresa} onChange={e => { setSearchEmpresa(e.target.value) }} />
      </div>
      <button onClick={handleSearchClick}>Pesquisar</button>
    </div>

    {contratosTable.length === 0 ? (
      <p>Nenhum contrato foi encontrado</p>
    ) : (
        <table className="searchTable">
          <tbody>
            {contratosTable.map(contrato => <tr key={contrato.NCON} onClick={() => handleTrClick(contrato.NCON)}>
              <td>{contrato.NCON}</td>
              <td>{contrato.aluno}</td>
              <td>{contrato.empresa}</td>
            </tr>)}
          </tbody>
        </table>
      )}
  </>);
};

export default App;