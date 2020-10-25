import React from 'react';
import SideNav from '../components/sidenav';
import UsersManagement from '../components/managementUsers1';
import { FormattedMessage } from 'react-intl';

const App = () => {

  return (<>
    <SideNav />
    <div className="content">
      <h1><FormattedMessage id="page_admin" /></h1>
      <UsersManagement />
    </div>
  </>);
};

export default App;