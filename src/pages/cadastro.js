import React, { useState, useEffect, useContext } from 'react';
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import Axios from 'axios';
import './login.css';
import { FormattedMessage } from 'react-intl';
import { Context } from '../components/Wrapper';

const App = () => {
  const context = useContext(Context);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState({ pwd: "", confirmpwd: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    context.selectLang();
  }, [context])

  const validateForm = () => {
    return email.length > 0 && password.pwd === password.confirmpwd && password.pwd.length > 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post('http://54.232.146.18:80/v1/auth/sign_up', {
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
          <FormLabel><FormattedMessage id="nome" /></FormLabel>
          <FormControl autoFocus type="text" value={nome} onChange={e => setNome(e.target.value)} />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel><FormattedMessage id="e-mail" /></FormLabel>
          <FormControl type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <FormLabel><FormattedMessage id="senha" /></FormLabel>
          <FormControl type='password' value={password.pwd} onChange={(e) => { const rest = password; setPassword({ ...rest, pwd: e.target.value }) }} />
        </FormGroup>
        <FormGroup >
          <FormLabel><FormattedMessage id="confirmar_senha" /></FormLabel>
          <FormControl type='password' value={password.confirmpwd} onChange={(e) => { const rest = password; setPassword({ ...rest, confirmpwd: e.target.value }) }} />
        </FormGroup>
        {message ? <p>{message}</p> : <></>}
        <button disabled={!validateForm()} type="submit"><FormattedMessage id="confirmar" /></button>
      </form>
    </div>
  </>)
};

export default App;