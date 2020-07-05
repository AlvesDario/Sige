import React from 'react';
import SideNav from '../components/sidenav';
import UsersPending from '../components/pendingUsers';
import { FormattedMessage } from 'react-intl';

const App = () => {

  return (<>
    <SideNav />
    <div className="content">
      <h1><FormattedMessage id="usuarios_pendentes" /></h1>
      <UsersPending />
    </div>
  </>);
};

export default App;