import { useParams } from "react-router";
import React, { useState, useContext, useEffect } from 'react';
import SideNav from '../components/sidenav';
import AlunoTable from '../components/alunoTable';
import { Context } from '../components/Wrapper';
import { FormattedMessage } from 'react-intl';
import Axios from "axios";

const App = () => {
  const context = useContext(Context);
  const { RA } = useParams();
  const [edit, setEdit] = useState(false);
  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [nomeMae, setNomeMae] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [curso, setCurso] = useState("");
  const [turno, setTurno] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [CEP, setCEP] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");

  useEffect(() => {
    if (!edit) {
      Axios.get("https://jsonbox.io/box_c2aba15389ee5cfa5983/alunos?q=RA:" + RA).then(({data}) => {
        if (data[0]?1:0) {
          Axios.put("https://jsonbox.io/box_c2aba15389ee5cfa5983/alunos/" + data[0]._id, {
            RA: RA,
            nome: nome,
            nascimento: nascimento,
            nomeMae: nomeMae,
            estadoCivil: estadoCivil,
            curso: curso,
            turno: turno,
            email: email,
            endereco: endereco,
            CEP: CEP,
            telefone: telefone,
            celular: celular
          })
        }
        else{
          Axios.post("https://jsonbox.io/box_c2aba15389ee5cfa5983/alunos", {
            RA: RA,
            nome: nome,
            nascimento: nascimento,
            nomeMae: nomeMae,
            estadoCivil: estadoCivil,
            curso: curso,
            turno: turno,
            email: email,
            endereco: endereco,
            CEP: CEP,
            telefone: telefone,
            celular: celular
          }).then(data => {
            console.log("cadastrado com sucesso")
          })
        }
      })
      
    }
  }, [edit]);

  useEffect(() => {
    context.selectLang();
  }, [context])

  return (<>
    <SideNav />
    <div className="content">
      <h1><FormattedMessage id="alunos" /></h1>
      {RA && <>
        <label>RA:</label>
        <input type="text" value={RA} disabled={true} />
        <label><FormattedMessage id="nome" /></label>
        <input type="text" value={nome} disabled={!edit} onChange={(e) => { setNome(e.target.value) }} />
        <label><FormattedMessage id="nascimento" /></label>
        <input type="text" value={nascimento} disabled={!edit} onChange={(e) => { setNascimento(e.target.value) }} />
        <label><FormattedMessage id="nome_mae" /></label>
        <input type="text" value={nomeMae} disabled={!edit} onChange={(e) => { setNomeMae(e.target.value) }} />
        <label><FormattedMessage id="estado_civil" /></label>
        <input type="text" value={estadoCivil} disabled={!edit} onChange={(e) => { setEstadoCivil(e.target.value) }} />
        <label><FormattedMessage id="Curso" /></label>
        <input type="text" value={curso} disabled={!edit} onChange={(e) => { setCurso(e.target.value) }} />
        <label><FormattedMessage id="turno" /></label>
        <input type="text" value={turno} disabled={!edit} onChange={(e) => { setTurno(e.target.value) }} />
        <label><FormattedMessage id="e-mail" /></label>
        <input type="text" value={email} disabled={!edit} onChange={(e) => { setEmail(e.target.value) }} />
        <label><FormattedMessage id="endereco" /></label>
        <input type="text" value={endereco} disabled={!edit} onChange={(e) => { setEndereco(e.target.value) }} />
        <label><FormattedMessage id="cep" /></label>
        <input type="text" value={CEP} disabled={!edit} onChange={(e) => { setCEP(e.target.value) }} />
        <label><FormattedMessage id="telefone" /></label>
        <input type="text" value={telefone} disabled={!edit} onChange={(e) => { setTelefone(e.target.value) }} />
        <label><FormattedMessage id="celular" /></label>
        <input type="text" value={celular} disabled={!edit} onChange={(e) => { setCelular(e.target.value) }} />
        <button onClick={() => setEdit(!edit)}><FormattedMessage id="editar" /></button>
      </>}
      {!RA && <>
        <AlunoTable />
      </>}
    </div>
  </>);
};

export default App;