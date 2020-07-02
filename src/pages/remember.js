import React, { useState } from 'react';
import { FormLabel, FormGroup, FormControl } from 'react-bootstrap';
import Axios from 'axios';
import './login.css';

const App = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("https://45.79.139.78/v1/auth/begin_access_recovery", {
      access_recovery_data: {
        email: email
      }
    }, {headers: {"Content-Language": "pt-BR"}}).then(({response}) => {
      if(response.status === 200){
        setMessage("email de recuperação enviado com sucesso!");
      }
    }).catch(err => {
      try{
        setMessage(err.response.data.message);
      }catch(e){}
    })
  }

  const validateForm = () => {
    return email.length > 0;
  }

  return (<>
    <h1>Lembrar Senha</h1>
    <p>Ensira o email utilizado no cadastro</p>
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup >
          <FormLabel>Email</FormLabel>
          <FormControl type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <button disabled={!validateForm()} type="submit">Confirmar</button>
      </form>
    </div>
    {message && <p>{message}</p>}
  </>)
}

export default App;