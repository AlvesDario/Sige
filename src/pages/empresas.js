import { useParams } from "react-router";
import React, { useState, useContext, useEffect } from 'react';
import SideNav from '../components/sidenav';
import EmpresasTable from '../components/empresasTable';
import { Context } from '../components/Wrapper';
import Axios from "axios";

const App = () => {
  const context = useContext(Context);

  const { NCON } = useParams();
  const [CNPJ, setCNPJ] = useState("");
  const [razao, setRazao] = useState("");
  const [dataAbertura, setDataAbertura] = useState("");
  const [email, setEmail] = useState("");
  const [CEP, setCEP] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [inicioConvenio, setinicioConvenio] = useState("");
  const [fimConvenio, setFimConvenio] = useState("");

  useEffect(() => {
    if (NCON) {
      Axios.get("https://api.fatecsige.com.br:443/v1/associated_companies/companies/" + NCON, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
      }).then(({ data }) => {
        const { cnpj, company_name, opening_date,
          contact_email, zip_code, address, contact_phone,
          associated_since, associated_until } = data.associated_company;
        setCNPJ(cnpj || "");
        setRazao(company_name || "");
        setDataAbertura(opening_date || "");
        setEmail(contact_email || "");
        setCEP(zip_code || "");
        setEndereco(address || "");
        setTelefone(contact_phone || "");
        setinicioConvenio(associated_since || "");
        setFimConvenio(associated_until || "");
      });
    }
  }, [NCON]);

  useEffect(() => {
    context.selectLang();
  }, [context])

  return (<>
    <SideNav />
    <div className="content">
      <h1>Empresas conveniadas</h1>
      {NCON && <>
        <label>Numero do convenio:</label>
        <input type="text" value={NCON} disabled />
        <label>CNPJ:</label>
        <input type="text" value={CNPJ} disabled />
        <label>Razão Social:</label>
        <input type="text" value={razao} disabled />
        <label>Data de abertura:</label>
        <input type="date" value={dataAbertura} disabled />
        <label>Email:</label>
        <input type="email" value={email} disabled />
        <label>CEP:</label>
        <input type="text" value={CEP} disabled />
        <label>Endereco:</label>
        <input type="text" value={endereco} disabled />
        <label>Telefone:</label>
        <input type="tel" value={telefone} disabled />
        <label>Inicio do Convenio:</label>
        <input type="date" value={inicioConvenio} disabled />
        <label>Termino do convenio:</label>
        <input type="date" value={fimConvenio} disabled />
      </>}
      {!NCON && <>
        <EmpresasTable />
      </>}
    </div>
  </>);
};

export default App;