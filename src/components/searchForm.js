import React from 'react';
import './searchForm.css';

const App = ({inputs}) => {
  return (<>
    <div className="searchForm">
      {inputs.map((element, id) => {
        return (
        <div key={id} className="searchInputForm">
          <label>{element}</label>
          <input />
        </div>
        )
      })}
      <button><FormattedMessage id='pesquisar' /></button>
    </div>
  </>)
}

export default App;