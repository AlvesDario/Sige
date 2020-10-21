import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import NovoContrato from './newContratc';
import './searchTable.css';
import Axios from 'axios';

const App = (props) => {
  const [contratosTable, setContratosTable] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const [searchContrato, setSearchContrato] = useState("");
  const [searchAluno, setSearchAluno] = useState("");
  const [searchEmpresa, setSearchEmpresa] = useState("");

  useEffect(() => {
    //v1/internship_contracts/contracts/
    Axios.get("https://api.fatecsige.com.br:443/v1/internship_contracts/contracts", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
      }
    })
      .then(({ data }) => {// name, ra, course_name
        console.log(data.internship_contracts)
        data.internship_contracts.map(contrato => {
          return setContratosTable(contratostable => [...contratostable, {
            NCON: contrato.id,
            aluno: contrato.intern_ra,
            empresa: contrato.company_id
          }])
        })
      });
  }, []);

  const handleTrClick = (e) => {
    window.location.href += "/" + e;
  }

  const handleSearchClick = () => {
    if (!searchAluno && !searchContrato && !searchEmpresa) {
      Axios.get("https://api.fatecsige.com.br:443/v1/internship_contracts/contracts", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
      })
        .then(({ data }) => {// name, ra, course_name
          console.log(data.internship_contracts)
          data.internship_contracts.map(contrato => {
            return setContratosTable(contratostable => [...contratostable, {
              NCON: contrato.id,
              aluno: contrato.intern_ra,
              empresa: contrato.company_id
            }])
          })
        });
    }
    if (searchAluno)
      setContratosTable(table => table.filter(contrato => contrato.aluno.includes(searchAluno)))
    if (searchContrato)
      setContratosTable(table => table.filter(contrato => contrato.NCON.includes(searchAluno)))
    if (searchEmpresa)
      setContratosTable(table => table.filter(contrato => contrato.empresa.includes(searchAluno)))
  }

  const handleAdded = () => {
    Axios.get("https://api.fatecsige.com.br:443/v1/internship_contracts/contracts", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
      }
    })
      .then(({ data }) => {// name, ra, course_name
        console.log(data.internship_contracts)
        data.internship_contracts.map(contrato => {
          return setContratosTable(contratostable => [...contratostable, {
            NCON: contrato.id,
            aluno: contrato.intern_ra,
            empresa: contrato.company_id
          }])
        })
      });
    setShowAdd(false);
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
      <Button onClick={handleSearchClick}>Pesquisar</Button>
      <Button onClick={() => setShowAdd(!showAdd)}>+</Button>
      {showAdd && <NovoContrato onAdd={handleAdded} />}
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