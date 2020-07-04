import React, { useState, useContext } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import "./login.css";
import { Context } from '../components/Wrapper';
import { FormattedMessage } from 'react-intl';
import Axios from "axios";

export default function Login() {
  const context = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(0);

  const handleLanguageChange = (e) => {
    localStorage.setItem('locale', e.target.value);
    context.selectLang();
  }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    Axios.post('https://45.79.139.78/v1/auth/authenticate', {
      credentials: {
        email: email,
        password: password
      }
    }).then(res => {
      if (res.status === 200) {
        localStorage.setItem('jwtToken', res.data.token);
        localStorage.setItem('email', email);
        window.location.href = "/home";
      }
    }).catch(({ response }) => {
      setError(response.status);
    })
  }

  return (<>
    <select value={localStorage.getItem('locale')||'pt-BR'} onChange={handleLanguageChange}>
      <option value="en-US">Inglês</option>
      <option value="pt-BR">Português</option>
      <option value="es-CL">Espanhol</option>
    </select>
    <h1>SIGE-ID</h1>
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <label>
            <FormattedMessage
              id="email_ou_ra"
            />
          </label>
          <FormControl
            autoFocus
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <label><FormattedMessage
            id="senha"
          /></label>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        {error ? <p><FormattedMessage id={"erro_login_" + error} /></p> : <></>}
        <button disabled={!validateForm()} type="submit">
          <FormattedMessage
            id="acessar"
          />
        </button>
      </form>
    </div>
    <a href='/cadastro'><FormattedMessage id="cadastrar" /></a><br/>
    <a href='/remember'><FormattedMessage id="esqueci" /></a>
  </>);
}