import { useParams } from "react-router";
import React, { useState, useContext, useEffect } from 'react';
import SideNav from '../components/sidenav';
import EmpresasTable from '../components/empresasTable';
import { Context } from '../components/Wrapper';
import Axios from "axios";

const App = () => {
  const context = useContext(Context);
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
    if (CNPJ) {
      if (!edit) {
        Axios.get("https://jsonbox.io/box_c2aba15389ee5cfa5983/empresas?q=CNPJ:" + CNPJ).then(({data}) => {
          if (data[0]?1:0) {
            Axios.put("https://jsonbox.io/box_c2aba15389ee5cfa5983/empresas/" + data[0]._id, {
              CNPJ: CNPJ,
              razao: razao,
              dataAbertura: dataAbertura,
              email: email,
              CEP: CEP,
              endereco: endereco,
              telefone: telefone,
              celular: celular,
              inicioConvenio: inicioConvenio,
              fimConvenio: fimConvenio
            })
          }
          else{
            Axios.post("https://jsonbox.io/box_c2aba15389ee5cfa5983/empresas", {
              CNPJ: CNPJ,
              razao: razao,
              dataAbertura: dataAbertura,
              email: email,
              CEP: CEP,
              endereco: endereco,
              telefone: telefone,
              celular: celular,
              inicioConvenio: inicioConvenio,
              fimConvenio: fimConvenio
            }).then(data => {
              console.log("cadastrado com sucesso")
            })
          }
        })
      }
    }
  }, [edit, CNPJ, razao, dataAbertura, email, CEP, endereco, telefone, celular, inicioConvenio, fimConvenio]);



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

  useEffect(()=>{
    context.selectLang();
  }, [context])

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
        <input type="date" value={dataAbertura} disabled={!edit} onChange={(e) => { setDataAbertura(e.target.value) }} />
        <label>Email:</label>
        <input type="email" value={email} disabled={!edit} onChange={(e) => { setEmail(e.target.value) }} />
        <label>CEP:</label>
        <input type="text" value={CEP} disabled={!edit} onChange={(e) => { setCEP(e.target.value) }} />
        <label>Endereco:</label>
        <input type="text" value={endereco} disabled={!edit} onChange={(e) => { setEndereco(e.target.value) }} />
        <label>Telefone:</label>
        <input type="tel" value={telefone} disabled={!edit} onChange={(e) => { setTelefone(e.target.value) }} />
        <label>Celular:</label>
        <input type="tel" value={celular} disabled={!edit} onChange={(e) => { setCelular(e.target.value) }} />
        <label>Inicio do Convenio:</label>
        <input type="date" value={inicioConvenio} disabled={!edit} onChange={(e) => { setinicioConvenio(e.target.value) }} />
        <label>Termino do convenio:</label>
        <input type="date" value={fimConvenio} disabled={!edit} onChange={(e) => { setFimConvenio(e.target.value) }} />
        <button onClick={() => setEdit(!edit)}>editar</button>
      </>}
      {!CNPJ && <>
        <EmpresasTable />
      </>}
    </div>
  </>);
};

export default App;