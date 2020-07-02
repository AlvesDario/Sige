import React, { useContext, useEffect } from 'react';
import SideNav from '../components/sidenav';
import FileUpload from '../components/fileUpload';
import { Context } from '../components/Wrapper';
import { FormattedMessage } from 'react-intl';

const App = () => {
    const context = useContext(Context);

    useEffect(()=>{
      context.selectLang();
    }, [])

    return (<>
    <SideNav/>
    <div className="content">
        <h1><FormattedMessage id="importar_dados" /></h1>
        <FileUpload />
    </div>
    </>);
}

export default App;