import React, { useState, useEffect, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import './searchTable.css';
import Axios from 'axios';
import { Context } from '../components/Wrapper';
import Roles from '../utils/roles';

const App = () => {
  const context = useContext(Context);
  const [users, setUsers] = useState([]);

  const [error, setError] = useState(0);

  function refreshPage() {
    window.location.reload(false);
  }

  function deleteUser(id) {
    Axios.delete("https://45.79.139.78/v1/management/users/" + id, {
      headers: {
          Authorization: 'Bearer ' + localStorage.getItem("jwtToken")
      }
    }).then(res => {
      if (res.status === 200) {
        alert("Usuário deletado do sistema com sucesso");
        refreshPage();
      }
    }).catch(() => {
      alert("Error in user delete");
    })
  }

  function disableUser(id) {
    Axios.put("https://45.79.139.78/v1/management/users/" + id + "/disable", {
      key: "value"
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("jwtToken")
      }
    }).then(res => {
      if (res.status === 200) {
        alert("Usuário desabilitado com sucesso, foi inserido na tela de usuários pendentes novamente");
        refreshPage();
      }
    }).catch(() => {
      alert("Error in user disable");
    })
  }

  function modifyRole(id, value) {
    Axios.put("https://45.79.139.78/v1/management/users/" + id + "/role", {
        "user_new_data": {
            "role": value
        }
    }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("jwtToken")
        }
    }).then(res => {
        if (res.status === 200) {
            alert("Role do usuário modificado com sucesso!");
            refreshPage();
        }
    }).catch(() => {
      alert("Error in role modifie");
    })
  }

  useEffect(()=>{
    Axios.get("https://45.79.139.78/v1/management/users/active", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
    }).then(res => {
        if (res.status === 200) {
            setUsers(res.data.users);
        }
    }).catch(() => {
    })
    context.selectLang();
  }, [context])

  return (<>
  <div>
    {error ? <p><FormattedMessage id={"erro_role"} /></p> : <></>}
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
              <select id="select-role" onChange={e => {modifyRole(user.id, e.target.value)}}>
                <option>{Roles[user.role]}</option>  
                <option value="1">{Roles[1]}</option>
                <option value="2">{Roles[2]}</option>
                <option value="3">{Roles[3]}</option>
              </select>
              </td>
              <td>
                <button onClick={() => disableUser(user.id)}><FormattedMessage id="disable" /></button>
              </td>
              <td>
                <button onClick={() => deleteUser(user.id)}><FormattedMessage id="delete" /></button>
              </td>
            </tr>)}
          </tbody>
        </table>
      )}
    </div>
  </>);
};

export default App;