import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import './searchTable.css';
import Axios from 'axios';

const App = (props) => {
  const [alunoTable, setAlunoTable] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchRA, setSearchRA] = useState("");
  const [searchCurso, setSearchCurso] = useState("");

  useEffect(() => {
    Axios.get("https://45.79.139.78/v1/intern_records/all", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
      }
    })
      .then(({ data }) => {// name, ra, course_name
        data.intern_records.map(intern => {
          return setAlunoTable(alunotable => [...alunotable, {
            nome: intern.name,
            RA: intern.ra,
            curso: intern.course_name
          }])
        })
      });
  }, [props])

  const handleTrClick = (e) => {
    window.location.href += "/" + e;
  }

  const handleSearchClick = () => {
    if (!searchName && !searchRA && !searchCurso) {
      Axios.get("https://45.79.139.78/v1/intern_records/all", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
      })
        .then(({ data }) => {// name, ra, course_name
          setAlunoTable([]);
          data.intern_records.map(intern => {
            return setAlunoTable(alunotable => [...alunotable, {
              nome: intern.name,
              RA: intern.ra,
              curso: intern.course_name
            }])
          })
        });
    }
    if (searchName)
      setAlunoTable(alunoTable.filter(aluno => aluno.nome.includes(searchName)))
    if (searchRA)
      setAlunoTable(alunoTable.filter(aluno => aluno.RA.includes(searchRA)))
    if (searchCurso)
      setAlunoTable(alunoTable.filter(aluno => aluno.curso.includes(searchCurso)))
  }

  return (<>
    <div className="searchForm">
      <div className="searchInputForm">
        <label><FormattedMessage id="nome_aluno" /></label>
        <input value={searchName} onChange={e => { setSearchName(e.target.value) }} />
      </div>
      <div className="searchInputForm">
        <label>RA</label>
        <input value={searchRA} onChange={e => { setSearchRA(e.target.value) }} />
      </div>
      <div className="searchInputForm">
        <label><FormattedMessage id="curso" /></label>
        <input value={searchCurso} onChange={e => { setSearchCurso(e.target.value) }} />
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