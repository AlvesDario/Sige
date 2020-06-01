import React, { useState } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import "./login.css";

export default function Login() {
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
    <h1>SIGE-ID</h1>
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <label>Email ou RA:</label>
          <FormControl
            autoFocus
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <label>Password:</label>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        {error && <><p>Usuário e senha não confere</p></>}
        <button disabled={!validateForm()} type="submit">
          Acessar
        </button>
      </form>
    </div>
  </>);
}