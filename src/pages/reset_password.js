import React, { useState, useContext, useEffect } from 'react';
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import SideNav from '../components/sidenav';
import { Context } from '../components/Wrapper';
import Axios from "axios";
import { FormattedMessage } from 'react-intl';


const App = () => {
  const context = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");

  const validateForm = () => {
    return password === password2 && password.length > 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post('https://api.fatecsige.com.br:443/v1/auth/reset_password', {
      user_data: {
        email: email,
        password: password2
      }
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
      }
    }).then(res => {
      if (res.status === 200) {
        setMessage(res.data.message)
      }
    }).catch(({ response }) => {
      setMessage(response.data.message);
    })
  }

  useEffect(() => {
    context.selectLang();
    setEmail(localStorage.getItem('email'))
  }, [context])

  return (<>
    <SideNav />
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <h1><FormattedMessage id="redefinir_senha" /></h1>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel><FormattedMessage id="e-mail" /></FormLabel>
          <FormControl type="email" value={email} disabled={true} />
        </FormGroup>
        <FormGroup >
          <FormLabel><FormattedMessage id="nova_senha" /></FormLabel>
          <FormControl type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </FormGroup>
        <FormGroup >
          <FormLabel><FormattedMessage id="digite_novamente" /></FormLabel>
          <FormControl type='password' value={password2} onChange={(e) => { setPassword2(e.target.value) }} />
        </FormGroup>
        {message ? <p>{message}</p> : <></>}
        <button disabled={!validateForm()} type="submit">
          <FormattedMessage id="confirmar" />
        </button>
      </form>
    </div>
  </>);
};

export default App;