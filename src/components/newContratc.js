import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Axios from 'axios';

const App = (props) => {
  // const [nConvenio, setNConvenio] = useState("");
  const [RA, setRA] = useState("");
  const [empresaID, setEmpresaID] = useState("");
  // const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");//start_date, ending_date
  const [endingDate, setEndingDate] = useState("");//start_date, ending_date
  // const [quiz, setQuiz] = useState({ has_become_effective: false, has_switched_companies: false });

  const [alunoName, setAlunoName] = useState("");
  const [empresaCNPJ, setEmpresaCNPJ] = useState("");
  const [empresaName, setEmpresaName] = useState("");

  const checkRA = () => {
    if (RA) {
      Axios.get("https://api.fatecsige.com.br:443/v1/intern_records/records/record?intern_ra=" + RA, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
      }).then(({ data }) => {
        const { name } = data.intern_record;
        setAlunoName(name || "");
      });
    }
  };

  const checkCNPJ = () => {
    if (empresaCNPJ) {
      Axios.get("https://api.fatecsige.com.br:443/v1/associated_companies/companies", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
      }).then(({ data }) => {
        try {
          const empresa_associada = data.associated_companies.filter((company) => company.cnpj === empresaCNPJ);
          if (Array.isArray(empresa_associada) && empresa_associada[0]) {
            const { id, company_name } = empresa_associada[0];
            setEmpresaID(id || "");
            setEmpresaName(company_name || "");
          }
        } catch (err) { console.log(err) }
      });
    }
  }

  const handleAdd = () => {
    // /v1/internship_contracts/contracts
    Axios.post("https://api.fatecsige.com.br:443/v1/internship_contracts/contracts", {
      new_contract_data: {
        intern_ra: RA,
        company_id: empresaID
      }
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
      }
    }).then(({ data }) => {
      Axios.post("https://api.fatecsige.com.br:443/v1/internship_contracts/contracts/" + data.internship_contract.id, {
        new_subcontract_data: {
          start_date: new Date(startDate).toISOString(),
          ending_date: new Date(endingDate).toISOString()
        }
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
      })
    })
    props.onAdd()
  }

  const validAdd = () => {
    return true;
  }

  return (
    <>
      <Form >
        <h1>Adicionar novo Contrato</h1>

        <Form.Group>
          <Form.Label>RA do aluno:</Form.Label>
          <Form.Control value={RA} onChange={e => setRA(e.target.value)} onBlur={checkRA} type="text" placeholder="RA do aluno" />

          <Form.Text className="text-muted">
            {alunoName ? "Aluno encontrado: " + alunoName : "Aluno não encontrado, verifique o RA"}
          </Form.Text>
        </Form.Group>

        <Form.Group hidden={!alunoName}>
          <Form.Label>CNPJ:</Form.Label>
          <Form.Control value={empresaCNPJ} onChange={e => setEmpresaCNPJ(e.target.value)} onBlur={checkCNPJ} type="text" placeholder="CNPJ da empresa" />
          <Form.Text className="text-muted">
            {empresaName ? "Empresa conveniada encontrado: " + empresaName : "Empresa conveniada não encontrado"}
          </Form.Text>
        </Form.Group>

        <Form.Group hidden={!alunoName && !empresaCNPJ}>
          <Form.Label>Data de início:</Form.Label>
          <Form.Control value={startDate} type="date" placeholder="Data de inicio do contrato" onChange={e => setStartDate(e.target.value)} />
        </Form.Group>

        <Form.Group hidden={!alunoName && !empresaCNPJ}>
          <Form.Label>Data de abertura:</Form.Label>
          <Form.Control value={endingDate} type="date" placeholder="Data de termino do contrato" onChange={e => setEndingDate(e.target.value)} />
        </Form.Group>

        <Form.Group hidden={!alunoName && !empresaCNPJ}>
          <Button onClick={handleAdd} disabled={!validAdd()}>
            Adicionar
            </Button>
        </Form.Group>
        {/* <Form.Group>
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
         */}
      </Form>
    </>
  );
}

export default App;