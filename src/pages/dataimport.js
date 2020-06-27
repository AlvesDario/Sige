import React, { useContext } from 'react';
import SideNav from '../components/sidenav';
import FileUpload from '../components/fileUpload';
import { Context } from '../components/Wrapper';
import { FormattedMessage } from 'react-intl';

const App = () => {
    const context = useContext(Context);

    return (<>
    <SideNav/>
    <select value={context.locale} onChange={context.selectLang}>
      <option value="en-US">English</option>
      <option value="pt-BR">Português</option>
      <option value="es-CL">Espanhol</option>
    </select>
    <div className="content">
        <h1><FormattedMessage id="importar_dados" /></h1>
        <FileUpload />
    </div>
    </>);
}

export default App;