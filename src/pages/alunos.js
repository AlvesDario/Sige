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
    if (RA) {
      console.log(RA)
      Axios.get("https://jsonbox.io/box_828dac9abb903c98aab7/alunos?q=RA:" + RA).then(({ data }) => {
      try{
        const Aluno = Array.isArray(data) ? data[0] : [];
        setNome(Aluno.nome)
        setNascimento(Aluno.nascimento)
        setNomeMae(Aluno.nomeMae)
        setEstadoCivil(Aluno.estadoCivil)
        setCurso(Aluno.curso)
        setTurno(Aluno.turno)
        setEmail(Aluno.email)
        setEndereco(Aluno.endereco)
        setCEP(Aluno.CEP)
        setTelefone(Aluno.telefone)
        setCelular(Aluno.celular)
      }catch (err) {console.log(err)}
      });
    }
  }, [RA]);

  useEffect(() => {
    context.selectLang();
  }, [context]);

  return (<>
    <SideNav />
    <div className="content">
      <h1><FormattedMessage id="alunos" /></h1>
      {RA && <>
        <label>RA:</label>
        <input type="text" value={RA} />
        <label><FormattedMessage id="nome" /></label>
        <input type="text" value={nome} />
        <label><FormattedMessage id="nascimento" /></label>
        <input type="text" value={nascimento} />
        <label><FormattedMessage id="nome_mae" /></label>
        <input type="text" value={nomeMae} />
        <label><FormattedMessage id="estado_civil" /></label>
        <input type="text" value={estadoCivil} />
        <label><FormattedMessage id="Curso" /></label>
        <input type="text" value={curso} />
        <label><FormattedMessage id="turno" /></label>
        <input type="text" value={turno} />
        <label><FormattedMessage id="e-mail" /></label>
        <input type="text" value={email} />
        <label><FormattedMessage id="endereco" /></label>
        <input type="text" value={endereco} />
        <label><FormattedMessage id="cep" /></label>
        <input type="text" value={CEP} />
        <label><FormattedMessage id="telefone" /></label>
        <input type="text" value={telefone} />
        <label><FormattedMessage id="celular" /></label>
        <input type="text" value={celular} />
      </>}
      {!RA && <>
        <AlunoTable />
      </>}
    </div>
  </>);
};

export default App;