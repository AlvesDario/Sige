import React, { useState, useContext } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import "./login.css";
import { Context } from '../components/Wrapper';
import { FormattedMessage } from 'react-intl';

export default function Login() {
  const context = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(email==='admin' && password==='admin')
      window.location.href = "/home";
    else{setError(true)}
  }

  return (<>
    <select value={context.locale} onChange={context.selectLang}>
      <option value="en-US">English</option>
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
        {error && <><p><FormattedMessage id="erro_login"/></p></>}
        <button disabled={!validateForm()} type="submit">
          <FormattedMessage 
            id="acessar"
            />
        </button>
      </form>
    </div>
  </>);
}