import React, { useContext, useEffect } from 'react';
import SideNav from '../components/sidenav';
import { Context } from '../components/Wrapper';
import { FormattedMessage } from 'react-intl';

const App = () => {
  const context = useContext(Context);


  const handleLanguageChange = (e) => {
    localStorage.setItem('locale', e.target.value);
    context.selectLang();
  }

  useEffect(()=>{
    context.selectLang();
  }, [context])

  return (<>
    <SideNav />
    <div className="content">
      <h1><FormattedMessage id="configuracao" /></h1>
        <select value={localStorage.getItem('locale')||'pt-BR'} onChange={handleLanguageChange}>
            <option value="en-US">Inglês</option>
            <option value="pt-BR">Português</option>
            <option value="es-CL">Espanhol</option>
        </select>
        <button>
            <a href="/configuracao/reset_password">
                <FormattedMessage id="redefinir_senha" />
            </a>
        </button>
        <button>
            <a href="/configuracao/pending_access">
                <FormattedMessage id="habilitar_acesso" />
            </a>
        </button>
    </div>
  </>);
};

export default App;