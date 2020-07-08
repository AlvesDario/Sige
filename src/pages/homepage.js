import React, { useContext, useEffect } from 'react';
import SideNav from '../components/sidenav';
import './homepage.css';
import { Context } from '../components/Wrapper';
import { FormattedMessage } from 'react-intl';

const App = () => {
  const context = useContext(Context);

  useEffect(()=>{
    context.selectLang();
  }, [context])

  return (<>
    <SideNav />
    <div className="content">
      <h1>
        <FormattedMessage id="bem_vindo" />
      </h1>
      <img className="banner" alt="img1" src="http://www.fatecid.com.br/site/wp-content/uploads/2020/03/corona01-1.jpg" />
    </div>
  </>);
};

export default App;