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
      Axios.get("https://api.fatecsige.com.br:443/v1/intern_records/records/record?intern_ra=" + RA, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
      }).then(({ data }) => {
        const { name, birth_date, mother_name, spouse_name,
          course_name, email, residential_address, residential_city,
          residential_neighbourhood, residential_cep, residential_phone_number, phone_number } = data.intern_record;
        setNome(name || "");
        setNascimento(birth_date || "");
        setNomeMae(mother_name || "");
        setEstadoCivil(spouse_name ? "casado" : "solteiro");
        setCurso(course_name || "");
        setTurno("Noturno")
        setEmail(email || "");
        setEndereco((residential_address + ", " + residential_neighbourhood + ", " + residential_city) || "");
        setCEP(residential_cep || "");
        setTelefone(residential_phone_number || "");
        setCelular(phone_number || "");
      });
    }
  }, [RA]);

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
        <input type="text" value={nome} disabled />
        <label><FormattedMessage id="nascimento" /></label>
        <input type="text" value={nascimento} disabled />
        <label><FormattedMessage id="nome_mae" /></label>
        <input type="text" value={nomeMae} disabled />
        <label><FormattedMessage id="estado_civil" /></label>
        <input type="text" value={estadoCivil} disabled />
        <label><FormattedMessage id="Curso" /></label>
        <input type="text" value={curso} disabled />
        <label><FormattedMessage id="turno" /></label>
        <input type="text" value={turno} disabled />
        <label><FormattedMessage id="e-mail" /></label>
        <input type="text" value={email} disabled />
        <label><FormattedMessage id="endereco" /></label>
        <input type="text" value={endereco} disabled />
        <label><FormattedMessage id="cep" /></label>
        <input type="text" value={CEP} disabled />
        <label><FormattedMessage id="telefone" /></label>
        <input type="text" value={telefone} disabled />
        <label><FormattedMessage id="celular" /></label>
        <input type="text" value={celular} disabled />
      </>}
      {!RA && <>
        <AlunoTable />
      </>}
    </div>
  </>);
};

export default App;