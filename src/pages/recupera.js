import React, { useState } from 'react';
import { FormLabel, FormGroup, FormControl } from 'react-bootstrap';
import Axios from 'axios';
import './login.css';

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ pwd: "", confirmpwd: "" });
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [validCode, setValidCode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password.pwd) {
      Axios.post("https://api.fatecsige.com.br:443/v1/auth/verify_access_recovery_code", {
        access_recovery_data: {
          email: email,
          recovery_code: code
        }
      }).then((res) => {
        if (res.response.status === 200) {
          localStorage.setItem('jwtToken', res.data.token);
          setMessage("Codigo valido, insira a senha!");
          setValidCode(true)
        }
      }).catch(err => {
        try {
          setMessage(err.response.data.message);
        } catch (e) { }
      })
    }
    else {
      Axios.post("https://api.fatecsige.com.br:443/v1/auth/reset_password", {
        user_data: {
          email: email,
          password: password.pwd
        }
      },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
          }
        }).then(({ response }) => {
          if (response.status === 200) {
            setMessage("email de recuperação enviado com sucesso!");
          }
        }).catch(err => {
          try {
            setMessage(err.response.data.message);
          } catch (e) { }
        })
    }
  }

  const validateForm = () => {
    if (validCode) {
      return email.length > 0 && password.pwd === password.confirmpwd && password.pwd.length > 0;
    }
    return email.length > 0 && code.length > 0;
  }

  return (<>
    <h1>Recuperar Senha</h1>
    <p>Insira o email utilizado no cadastro</p>
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup >
          <FormLabel>Email</FormLabel>
          <FormControl type='email' disabled={validCode} value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup >
          <FormLabel>Codigo</FormLabel>
          <FormControl type='text' disabled={validCode} value={code} onChange={(e) => setCode(e.target.value)} />
        </FormGroup>
        {validCode && <>
          <FormGroup >
            <FormLabel>Senha</FormLabel>
            <FormControl type='text' value={password.pwd} onChange={(e) => { const rest = password; setPassword({ ...rest, pwd: e.target.value }) }} />
          </FormGroup>
          <FormGroup >
            <FormLabel>Confirmar Senha</FormLabel>
            <FormControl type='text' value={password.confirmpwd} onChange={(e) => { const rest = password; setPassword({ ...rest, confirmpwd: e.target.value }) }} />
          </FormGroup>
        </>}
        <button disabled={!validateForm()} type="submit">Confirmar</button>
      </form>
    </div>
    {message && <p>{message}</p>}
  </>)
}

export default App;