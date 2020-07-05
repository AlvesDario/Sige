import React from 'react';
import SideNav from '../components/sidenav';
import { Chart } from "react-google-charts";
import { useState } from 'react';
import Axios from 'axios';
import { FormattedMessage } from 'react-intl';

const App = () => {
  const [chartType, setChartType] = useState("");
  const [internsByCompany, setIBC] = useState([]);
  
  function getDash(op) {
  }
  // https://45.79.139.78/v1/dashboard/effective_internship_contracts_by_company?ranking_size=1
  // https://45.79.139.78/v1/dashboard/interns_by_companies
  // {'interns_by_companies': [{'Test Company 0': 2}]}
  // Axios.get("https://45.79.139.78/v1/dashboard/effective_internship_contracts_by_company?ranking_size=1").then(( data ) => {
  //   console.log(data);
  // });
  // Axios.get("").then(({ data }) => {

  // })
  return (<>
    <SideNav />
    <div className='content'>
      <h1>
        <FormattedMessage id="dashboard" />
      </h1>
      <select name="" id="" onChange={(e) => getDash(e.target.value)}>
        <option>Selecione a visualização do gráfico</option>
        <option value="estagiarios_empresas">estagiarios por empresa</option>
        <option value="estagiarios_efetivos">estagiarios que foi efetivado</option>
      </select>
      {chartType === "estagiarios_curso" && <Chart
        width={800}
        height={600}
        chartType="ColumnChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Estagiarios', 'Curso'],
          ['ADS', 50],
          ['Gestão', 20],
          ['Comex', 1],
        ]}
        options={{
          title: 'Estagiarios por curso',
          chartArea: { width: '50%' },
          hAxis: {
            title: 'Estagiarios',
            minValue: 0,
          },
          vAxis: {
            title: 'Curso',
          },
        }}
        legendToggle
      />}
      {chartType === "estagiarios_empresa" && <Chart
        width={800}
        height={600}
        chartType="ColumnChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Estagiarios', 'Curso'],
          ["ibm", 20],
          ["joao dere", 10],
          ["diebold", 15]
        ]}
        options={{
          title: 'Estagiarios por empresa',
          chartArea: { width: '50%' },
          hAxis: {
            title: 'Estagiarios',
            minValue: 0,
          },
          vAxis: {
            title: 'Empresa',
          },
        }}
        legendToggle
      />}
    </div>
  </>)
}

export default App;