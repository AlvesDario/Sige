import React, { useState, useEffect, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import './searchTable.css';
import Axios from 'axios';
import { Context } from '../components/Wrapper';
import Roles from '../utils/roles';

const App = () => {
  const context = useContext(Context);
  const [users, setUsers] = useState([]);

  const [newRole, setNewRole] = useState("");

  const [error, setError] = useState(0);

  function teste(id, event) {
      event.preventDefault();
      let myResult = event.target.value;

      console.log("O id da minha role: "+ myResult);
      console.log("o id do meu user: "+ id);
  }

  function refreshPage() {
    window.location.reload(false);
  }

  const handleLanguageChange = (id, e) => {
      console.log("sei la ovalor " + e.target.value)
      console.log("id é é é: " + id);
    Axios.put("https://45.79.139.78/v1/management/users/" + id + "/role", {
        "user_new_data": {
            "role": ""
        }
    }, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwtToken")
        }
    }).then(res => {
        if (res.status === 200) {
            refreshPage();
        }
    }).catch(({ response }) => {
      setError(response.status);
    })
      
  }
  function modifyRole(id) {
      console.log("id do usuario" + id);
    Axios.put("https://45.79.139.78/v1/management/users/" + id + "/role", {
        "user_new_data": {
            "role": ""
        }
    }, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwtToken")
        }
    }).then(res => {
        if (res.status === 200) {
            refreshPage();
        }
    }).catch(({ response }) => {
      setError(response.status);
    })
  }

  useEffect(()=>{
    Axios.get("https://45.79.139.78/v1/management/users/active", {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
        }
    }).then(res => {
        if (res.status === 200) {
            setUsers(res.data.users);
        }
    }).catch(({ response }) => {
        console.log(response);
    })
    context.selectLang();
  }, [context])

  return (<>
  <div>
    {error ? <p><FormattedMessage id={"erro_request_pending"} /></p> : <></>}
    {users.length === 0 ? (
      <p><FormattedMessage id="nenhum_usuario" /></p>
    ) : (
        <table className="searchTable">
          <tbody>
            {users.map(user => <tr key={user.email}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
              <select>
                <option>{Roles[user.role]}</option>  
                <option value="1">{Roles[1]}</option>
                <option value="2">{Roles[2]}</option>
                <option value="3">{Roles[3]}</option>
              </select>
              </td>
            </tr>)}
          </tbody>
        </table>
      )}
    </div>
  </>);
};

export default App;