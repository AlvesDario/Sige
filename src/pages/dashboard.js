import React from 'react';
import SideNav from '../components/sidenav';
import { Chart } from "react-google-charts";
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { FormattedMessage } from 'react-intl';

const App = () => {
  const [chartType, setChartType] = useState("");
  const [estagCompan, setEstagCompany] = useState([['Empresa', 'Quantidade']]);
  const [estagEfetive, setEstagEfetive] = useState([['Empresa', 'Efetivos']])


  useEffect(() => {
    const funcoes = {estagiarios_empresas: () => {
      Axios.get("https://45.79.139.78/v1/dashboard/interns_by_companies", {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
        }
      }).then(({ data }) => {
        data.interns_by_companies.map(register => {
          return setEstagCompany(registerTable=> [...registerTable, [
            register.company_name, register.interns_count]]
          )
        }
        )
      })
    }, estagiarios_efetivos: () => {
      Axios.get("https://45.79.139.78/v1/dashboard/effective_internship_contracts_by_company", {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
        }
      }).then(({ data }) => {
        data.effective_contracts_by_company.map(register => {
          return setEstagEfetive(registerTable=> [...registerTable, [
            register.company_name, register.contracts_count]]
          )
        }
        )
      }
      )
    }
  }
  const funcao = funcoes[chartType]
  if(funcao){
    funcao()
  }
  }, [chartType]
  )


  return (<>
    <SideNav />
    <div className='content'>
      <h1>
        <FormattedMessage id="dashboard" />
      </h1>
      <select name="" id="" onChange={(e) => setChartType(e.target.value)}>
        <option>Selecione a visualização do gráfico</option>
        <option value="estagiarios_empresas">Estagiários ativos por empresa</option>
        <option value="estagiarios_efetivos">Estagiários efetivos por empresa</option>
      </select>
      {chartType === "estagiarios_empresas" && <Chart
        width={800}
        height={600}
        chartType="ColumnChart"
        loader={<div>Loading Chart</div>}
        data={estagCompan}
        options={{
          title: 'Estagiarios por empresa',
          chartArea: { width: '50%' },
          hAxis: {
            title: 'Empresa',
            minValue: 0,
          },
          vAxis: {
            title: 'Quantidade de estagiários ativos',
          },
        }}
        legendToggle
      />}
      {chartType === "estagiarios_efetivos" && <Chart
        width={800}
        height={600}
        chartType="ColumnChart"
        loader={<div>Loading Chart</div>}
        data={estagEfetive}
        options={{
          title: 'Estagiarios efetivos por empresa',
          chartArea: { width: '50%' },
          hAxis: {
            title: 'Empresas',
            minValue: 0,
          },
          vAxis: {
            title: 'Efetivos',
          },
        }}
        legendToggle
      />}
    </div>
  </>)
}

export default App;