import React, { useState } from 'react';
import Axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const App = (props) => {
  const [CNPJ, setCNPJ] = useState("");
  const [razao, setRazao] = useState("");
  const [dataAbertura, setDataAbertura] = useState("");
  const [email, setEmail] = useState("");
  const [CEP, setCEP] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [contato, setContato] = useState("");
  const [inicioConvenio, setinicioConvenio] = useState("");
  const [fimConvenio, setFimConvenio] = useState("");
  const [show, setShow] = React.useState(false);

  const checkCNPJ = () => {
    if (CNPJ) {
      setShow(true);
    }
    else { setShow(false) }
  };

  const handleAdd = () => {
    Axios.post("https://45.79.139.78/v1/associated_companies/companies", {
      new_company_data: {
        address: endereco,
        associated_since: inicioConvenio,
        associated_until: fimConvenio,
        cnpj: CNPJ,
        company_name: razao,
        contact_email: email,
        contact_person: contato,
        contact_phone: telefone,
        opening_date: dataAbertura,
        zip_code: CEP
      }
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
      }
    });
    props.onAdd()
  }

  const validAdd = () => {
    return CNPJ.length > 0 && razao.length > 0 && dataAbertura.length > 0 && email.length > 0 && CEP.length > 0;
  }

  return (
    <>
      <Form >
        <h1>Adicionar novo convênio</h1>
        <Form.Group>
          <Form.Label>CNPJ:</Form.Label>
          <Form.Control value={CNPJ} onChange={e => setCNPJ(e.target.value)} onBlur={checkCNPJ} type="text" placeholder="CNPJ" />
        </Form.Group>

        <Form.Group hidden={!show}>
          <Form.Label>Razão Social:</Form.Label>
          <Form.Control value={razao} type="text" placeholder="Razão Social" onChange={e => setRazao(e.target.value)} />
        </Form.Group>

        <Form.Group hidden={!show}>
          <Form.Label>Data de abertura:</Form.Label>
          <Form.Control value={dataAbertura} type="date" placeholder="Data de abertura" onChange={e => setDataAbertura(e.target.value)} />
        </Form.Group>

        <Form.Group hidden={!show}>
          <Form.Label>CEP:</Form.Label>
          <Form.Control value={CEP} type="number" placeholder="CEP" onChange={e => setCEP(e.target.value)} />
        </Form.Group>

        <Form.Group hidden={!show}>
          <Form.Label>Endereco:</Form.Label>
          <Form.Control value={endereco} type="text" placeholder="Endereco" onChange={e => setEndereco(e.target.value)} />
        </Form.Group>

        <Form.Group hidden={!show}>
          <Form.Label>Telefone:</Form.Label>
          <Form.Control value={telefone} type="tel" placeholder="Telefone de contato" onChange={(e) => { setTelefone(e.target.value) }} />
        </Form.Group>

        <Form.Group hidden={!show}>
          <Form.Label>Contato:</Form.Label>
          <Form.Control value={contato} type="text" placeholder="Nome da pessoa a contatar" onChange={(e) => { setContato(e.target.value) }} />
        </Form.Group>

        <Form.Group hidden={!show}>
          <Form.Label>Email:</Form.Label>
          <Form.Control value={email} type="email" placeholder="Email de contato" onChange={(e) => { setEmail(e.target.value) }} />
        </Form.Group>
        <Form.Group hidden={!show}>
          <Form.Label>Inicio do Convenio:</Form.Label>
          <Form.Control value={inicioConvenio} type="date" placeholder="Inicio do Convenio" onChange={(e) => { setinicioConvenio(e.target.value) }} />
        </Form.Group>
        <Form.Group hidden={!show}>
          <Form.Label>Termino do convenio:</Form.Label>
          <Form.Control value={fimConvenio} type="date" placeholder="Termino do convenio" onChange={(e) => { setFimConvenio(e.target.value) }} />
        </Form.Group>
        <Form.Group hidden={!show}>
          <Button onClick={handleAdd} disabled={!validAdd()}>
            Adicionar
            </Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default App;
