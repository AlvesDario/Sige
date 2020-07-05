import React, { useState } from 'react';
import './searchTable.css';
import Axios from 'axios';
import NovoConvenio from './newEmpresa';
import { Button } from 'react-bootstrap';

const App = () => {
  const [empresaTable, setEmpresaTable] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const [searchName, setSearchName] = useState("");
  const [searchCNPJ, setSearchCNPJ] = useState("");
  const [searchConvenio, setSearchConvenio] = useState("");

  const handleTrClick = (e) => {
    window.location.href += "/" + e;
  }

  const handleSearchClick = () => {
    Axios.get("", {headers:{
      Authorization: localStorage.getItem('jwtToken')
    }})
      .then(res => console.log(res));
  }

  const handleAdded = (row) => {
    setShowAdd(false);
    setEmpresaTable([...empresaTable, row]);
  }

  return (<>
    <div className="searchForm">
      <div className="searchInputForm">
        <label>Nome da empresa</label>
        <input value={searchName} onChange={e => { setSearchName(e.target.value) }} />
      </div>
      <div className="searchInputForm">
        <label>CNPJ</label>
        <input value={searchCNPJ} onChange={e => { setSearchCNPJ(e.target.value) }} />
      </div>
      <div className="searchInputForm">
        <label>Nº convenio</label>
        <input value={searchConvenio} onChange={e => { setSearchConvenio(e.target.value) }} />
      </div>
      <Button onClick={handleSearchClick}>Pesquisar</Button>
      <Button onClick={() => setShowAdd(true)}>+</Button>
      {showAdd && <NovoConvenio onAdd={handleAdded}/>}
    </div>
    {empresaTable.length === 0 ? (
      <p>Nenhuma empresa foi encontrado</p>
    ) : (
        <table className="searchTable">
          <tbody>
            {empresaTable.map(empresa => <tr key={empresa.CNPJ} onClick={() => handleTrClick(empresa.CNPJ)}>
              <td>{empresa.nome}</td>
              <td>{empresa.CNPJ}</td>
              <td>{empresa.nConvenio}</td>
            </tr>)}
          </tbody>
        </table>
      )}
  </>);
};

export default App;