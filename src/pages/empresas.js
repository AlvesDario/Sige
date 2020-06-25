import { useParams } from "react-router";
import React, { useState, useEffect } from 'react';
import SideNav from '../components/sidenav';
import EmpresasTable from '../components/empresasTable';
import Axios from "axios";

const App = () => {
  const [edit, setEdit] = useState(false);

  const { CNPJ } = useParams();
  const [razao, setRazao] = useState("");
  const [dataAbertura, setDataAbertura] = useState("");
  const [email, setEmail] = useState("");
  const [CEP, setCEP] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [inicioConvenio, setinicioConvenio] = useState("");
  const [fimConvenio, setFimConvenio] = useState("");

  useEffect(() => {
    Axios.get(/** pegar dados do aluno baseado no CNPJ*/).then(res => {
      setRazao(res.razao);
      setDataAbertura(res.dataAbertura);
      setEmail(res.email);
      setCEP(res.CEP);
      setEndereco(res.endereco);
      setTelefone(res.telefone);
      setCelular(res.celular);
      setinicioConvenio(res.inicioConvenio);
      setFimConvenio(res.inicioConvenio);
    })
  }, [CNPJ])

  return (<>
    <SideNav />
    <div className="content">
      <h1>Empresas conveniadas</h1>
      {CNPJ && <>
        <label>CNPJ:</label>
        <input type="text" value={CNPJ} disabled={true} />
        <label>Razão Social:</label>
        <input type="text" value={razao} disabled={!edit} onChange={(e) => { setRazao(e.target.value) }} />
        <label>Data de abertura:</label>
        <input type="text" value={dataAbertura} disabled={!edit} onChange={(e) => { setDataAbertura(e.target.value) }} />
        <label>Email:</label>
        <input type="text" value={email} disabled={!edit} onChange={(e) => { setEmail(e.target.value) }} />
        <label>CEP:</label>
        <input type="text" value={CEP} disabled={!edit} onChange={(e) => { setCEP(e.target.value) }} />
        <label>Endereco:</label>
        <input type="text" value={endereco} disabled={!edit} onChange={(e) => { setEndereco(e.target.value) }} />
        <label>Telefone:</label>
        <input type="text" value={telefone} disabled={!edit} onChange={(e) => { setTelefone(e.target.value) }} />
        <label>Celular:</label>
        <input type="text" value={celular} disabled={!edit} onChange={(e) => { setCelular(e.target.value) }} />
        <label>Inicio do Convenio:</label>
        <input type="text" value={inicioConvenio} disabled={!edit} onChange={(e) => { setinicioConvenio(e.target.value) }} />
        <label>Termino do convenio:</label>
        <input type="text" value={fimConvenio} disabled={!edit} onChange={(e) => { setFimConvenio(e.target.value) }} />
        <button onClick={() => setEdit(!edit)}>editar</button>
      </>}
      {!CNPJ && <>
        <EmpresasTable />
      </>}
    </div>
  </>);
};

export default App;