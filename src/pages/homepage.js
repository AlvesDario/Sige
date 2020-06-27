import React, { useContext } from 'react';
import SideNav from '../components/sidenav';
import './homepage.css';
import { Context } from '../components/Wrapper';
import { FormattedMessage } from 'react-intl';

const App = () => {
  const context = useContext(Context);

  return (<>
    <SideNav />
    <select value={context.locale} onChange={context.selectLang}>
      <option value="en-US">English</option>
      <option value="pt-BR">Português</option>
      <option value="es-CL">Espanhol</option>
    </select>
    <div className="content">
      <h1>
        <FormattedMessage id="bem_vindo" />
      </h1>
      <img className="banner" alt="img1" src="http://www.fatecid.com.br/site/wp-content/uploads/2020/03/corona01-1.jpg" />
    </div>
  </>);
};

export default App;