import React, { useState } from 'react';
import { FormLabel, FormGroup, FormControl } from 'react-bootstrap';
import Axios from 'axios';
import './login.css';

const App = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("https://api.fatecsige.com.br:443/v1/auth/begin_access_recovery", {
      access_recovery_data: {
        email: email
      }
    }, { headers: { "Content-Language": localStorage.getItem('locale') } }).then(({ response }) => {
      if (response.status === 200) {
        setMessage("email de recuperação enviado com sucesso!");
      }
    }).catch(err => {
      try {
        setMessage(err.response.data.message);
      } catch (e) { }
    })
  }

  const validateForm = () => {
    return email.length > 0;
  }

  return (<>
    <h1>Solicitar recuperação de senha</h1>
    <p>Insira o e-mail utilizado no cadastro</p>
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup >
          <FormLabel>E-mail</FormLabel>
          <FormControl type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <button disabled={!validateForm()} type="submit">Confirmar</button>
        <button onClick={() => document.location.href = '/'}>Voltar</button>
      </form>
    </div>
    {message && <p>{message}</p>}
    <a href="/recupera">Já possui código?</a>
  </>)
}

export default App;