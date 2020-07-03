import React, { useState } from 'react';
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import Axios from 'axios';
import './login.css';

const App = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState({ pwd: "", confirmpwd: "" });
  const [message, setMessage] = useState("");

  const validateForm = () => {
    return email.length > 0 && password.pwd === password.confirmpwd && password.pwd.length > 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post('https://45.79.139.78/v1/auth/sign_up', {
      new_user_data: {
        name: nome,
        email: email,
        password: password.pwd
      }
    }).then(res => {
      if (res.status === 200) {
        setMessage(res.data.message)
      }
    }).catch(({ response }) => {
      setMessage(response.data.message);
    })
  }

  return (<>
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="Name" bsSize="large">
          <FormLabel>Nome</FormLabel>
          <FormControl autoFocus type="text" value={nome} onChange={e => setNome(e.target.value)} />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl autoFocus type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup >
          <FormLabel>Senha</FormLabel>
          <FormControl type='text' value={password.pwd} onChange={(e) => { const rest = password; setPassword({ ...rest, pwd: e.target.value }) }} />
        </FormGroup>
        <FormGroup >
          <FormLabel>Confirmar Senha</FormLabel>
          <FormControl type='text' value={password.confirmpwd} onChange={(e) => { const rest = password; setPassword({ ...rest, confirmpwd: e.target.value }) }} />
        </FormGroup>
        {message ? <p>{message}</p> : <></>}
        <button disabled={!validateForm()} type="submit">
          Confirmar
        </button>
      </form>
    </div>
  </>)
};

export default App;