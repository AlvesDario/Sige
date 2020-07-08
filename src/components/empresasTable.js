import React, { useState, useEffect } from 'react';
import './searchTable.css';
import Axios from 'axios';
import NovoConvenio from './newEmpresa';
import { Button } from 'react-bootstrap';

const App = (props) => {
  const [empresaTable, setEmpresaTable] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const [searchName, setSearchName] = useState("");
  const [searchCNPJ, setSearchCNPJ] = useState("");
  const [searchConvenio, setSearchConvenio] = useState("");

  useEffect(() => {
    //v1/associated_companies/companies/
    Axios.get("https://45.79.139.78/v1/associated_companies/companies", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
      }
    })
      .then(({ data }) => {// name, ra, course_name
        data.associated_companies.map(empresa => {
          return setEmpresaTable(empresatable => [...empresatable, {
            nome: empresa.company_name,
            CNPJ: empresa.cnpj,
            nConvenio: empresa.id
          }])
        })
      });
  }, []);

  const handleTrClick = (e) => {
    window.location.href += "/" + e;
  }

  const handleSearchClick = () => {
    if (!searchName && !searchCNPJ && !searchConvenio) {
      Axios.get("https://45.79.139.78/v1/associated_companies/companies", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
      })
        .then(({ data }) => {
          setEmpresaTable([]);
          data.associated_companies.map(empresa => {
            return setEmpresaTable(empresatable => [...empresatable, {
              nome: empresa.company_name,
              CNPJ: empresa.cnpj,
              nConvenio: empresa.id
            }])
          })
        });
    }
    if (searchName)
      setEmpresaTable(table => table.filter(empresa => empresa.nome.includes(searchName)))
    if (searchCNPJ)
      setEmpresaTable(table => table.filter(empresa => empresa.CNPJ.includes(searchCNPJ)))
    if (searchConvenio)
      setEmpresaTable(table => table.filter(empresa => empresa.nConvenio.includes(searchConvenio)))
  }

  const handleAdded = () => {
    Axios.get("https://45.79.139.78/v1/associated_companies/companies", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
      }
    })
      .then(({ data }) => {
        setEmpresaTable([]);
        data.associated_companies.map(empresa => {
          return setEmpresaTable(empresatable => [...empresatable, {
            nome: empresa.company_name,
            CNPJ: empresa.cnpj,
            nConvenio: empresa.id
          }])
        })
      });
    setShowAdd(false);
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
      <Button onClick={() => setShowAdd(!showAdd)}>+</Button>
      {showAdd && <NovoConvenio onAdd={handleAdded} />}
    </div>
    {empresaTable.length === 0 ? (
      <p>Nenhuma empresa foi encontrado</p>
    ) : (
        <table className="searchTable">
          <tbody>
            {empresaTable.map(empresa => <tr key={empresa.CNPJ} onClick={() => handleTrClick(empresa.nConvenio)}>
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