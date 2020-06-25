import { useParams } from "react-router";
import React, { useState, useEffect } from 'react';
import SideNav from '../components/sidenav';
import EmpresasTable from '../components/contratosTable';
import Axios from "axios";

const App = () => {
  const [edit, setEdit] = useState(false);

  const { NCON } = useParams();
  const [RA, setRA] = useState("");
  const [alunoName, setAlunoName] = useState("");
  const [CNPJ, setCNPJ] = useState("");
  const [razao, setRazao] = useState("");
  const [inicioContrato, setInicioContrato] = useState("");
  const [terminoContrato, setTerminoContrato] = useState("");
  const [bolsaAuxilio, setBolsaAuxilio] = useState("");

  useEffect(() => {
    Axios.get(/** pegar dados do aluno baseado no CNPJ*/).then(res => {
      setRA(res.RA);
      setAlunoName(res.alunoName);
      setCNPJ(res.CNPJ);
      setRazao(res.razao);
      setInicioContrato(res.inicioContrato);
      setTerminoContrato(res.terminoContrato);
      setBolsaAuxilio(res.bolsaAuxilio);
    })
  }, [NCON])

  return (<>
    <SideNav />
    <div className="content">
      <h1>Contratos</h1>
      {NCON && <>
        <label>RA:</label>
        <input type="text" value={RA} disabled={!edit} onChange={(e) => { setRA(e.target.value) }} />
        <label>Nome do Aluno:</label>
        <input type="text" value={alunoName} disabled={!edit} onChange={(e) => { setAlunoName(e.target.value) }} />
        <label>CNPJ:</label>
        <input type="text" value={CNPJ} disabled={true} />
        <label>Razão Social:</label>
        <input type="text" value={razao} disabled={!edit} onChange={(e) => { setRazao(e.target.value) }} />
        <label>Início do contrato:</label>
        <input type="text" value={inicioContrato} disabled={!edit} onChange={(e) => { setInicioContrato(e.target.value) }} />
        <label>Termino do Contrato:</label>
        <input type="text" value={terminoContrato} disabled={!edit} onChange={(e) => { setTerminoContrato(e.target.value) }} />
        <label>Bolsa Auxilio:</label>
        <input type="text" value={bolsaAuxilio} disabled={!edit} onChange={(e) => { setBolsaAuxilio(e.target.value) }} />
        <button onClick={() => setEdit(!edit)}>editar</button>
      </>}
      {!CNPJ && <>
        <EmpresasTable />
      </>}
    </div>
  </>);
};

export default App;