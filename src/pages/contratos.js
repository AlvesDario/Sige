import { useParams } from "react-router";
import React, { useState, useContext, useEffect } from 'react';
import SideNav from '../components/sidenav';
import ContratosTable from '../components/contratosTable';
import { Context } from '../components/Wrapper';
import Axios from "axios";

const App = () => {
  const context = useContext(Context);

  const { NCON } = useParams();
  const [RA, setRA] = useState("");
  const [alunoName, setAlunoName] = useState("");
  const [empresaID, setEmpresaID] = useState("");
  const [status, setStatus] = useState(0);
  const [razao, setRazao] = useState("");
  const [inicioContrato, setInicioContrato] = useState("");
  const [terminoContrato, setTerminoContrato] = useState("");
  // const [quiz, setQuiz] = useState({});

  useEffect(() => {
    if (NCON) {
      Axios.get("https://45.79.139.78/v1/internship_contracts/contracts/" + NCON, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
      }).then(({ data }) => {
        const { intern_ra, company_id, subcontracts,
          status } = data.internship_contract;
        console.log(data.internship_contract)
        setRA(intern_ra);
        setEmpresaID(company_id);
        setStatus(status)
        // if (quiz) {
        //   setQuiz(quiz);
        // }
        if (subcontracts.length) {
          setInicioContrato(subcontracts[0].start_date);
          setTerminoContrato(subcontracts[0].ending_date);
        }
      })
    }
  }, [NCON])

  useEffect(() => {
    if (RA) {
      Axios.get("https://45.79.139.78/v1/intern_records/records/record?intern_ra=" + RA, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
      }).then(({ data }) => {
        const { name } = data.intern_record;
        setAlunoName(name || "");
      });
    }
  }, [RA]);

  useEffect(() => {
    if (empresaID) {
      Axios.get("v1/associated_companies/companies/" + empresaID, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
      }).then(({ data }) => {
        const empresa_associada = data.associated_company;
        console.log(empresa_associada);
        // setEmpresaID(id || "");
        setRazao(empresa_associada.company_name || "");
      });
    }
  }, [empresaID])

  useEffect(() => {
    context.selectLang();
  }, [context])

  return (<>
    <SideNav />
    <div className="content">
      <h1>Contratos</h1>
      {NCON && <>
        <label>Numero do contrato:</label>
        <input type="text" value={NCON} disabled />
        <label>Status:</label>
        <input type="text" value={status === 1 ? "Em andamento" : "Encerrado"} disabled />
        <label>RA:</label>
        <input type="text" value={RA} disabled />
        <label>Nome do Aluno:</label>
        <input type="text" value={alunoName} disabled />
        <label>ID da empresa:</label>
        <input type="text" value={empresaID} disabled />
        <label>Razão Social:</label>
        <input type="text" value={razao} disabled />
        <label>Início do contrato:</label>
        <input type="text" value={inicioContrato} disabled />
        <label>Termino do Contrato:</label>
        <input type="text" value={terminoContrato} disabled />
      </>}
      {!NCON && <>
        <ContratosTable />
      </>}
    </div>
  </>);
};

export default App;