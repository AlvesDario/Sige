import React from 'react';
import SideNav from '../components/sidenav';
import FileUpload from '../components/fileUpload';

const App = () => {
    return (<>
    <SideNav/>
    <div className="content">
        <h1>Importar Dados - SIGA</h1>
        <FileUpload />
    </div>
    </>);
}

export default App;