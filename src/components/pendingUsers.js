import React, { useState, useEffect, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import './searchTable.css';
import Axios from 'axios';
import { Context } from '../components/Wrapper';

const App = () => {
  const context = useContext(Context);
  const [pendingUsers, setPendingUsers] = useState([]);

  const [error] = useState(0);

  function refreshPage() {
    window.location.reload(false);
  }

  function deleteUser(id) {
    Axios.delete("http://54.232.146.18:80/v1/management/users/" + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("jwtToken")
      }
    }).then(res => {
      if (res.status === 200) {
        refreshPage();
      }
    }).catch(() => {
      alert("Error in user delete");
    })
  }

  function aceptUser(id) {
    Axios.put("http://54.232.146.18:80/v1/management/users/" + id + "/enable", {
      key: "value"
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("jwtToken")
      }
    }).then(res => {
      if (res.status === 200) {
        refreshPage();
      }
    }).catch(() => {
      alert("Ocorreu um erro na aprovação do usuário")
    })
  }

  useEffect(() => {
    Axios.get("http://54.232.146.18:80/v1/management/users/pending", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
      }
    }).then(res => {
      if (res.status === 200) {
        setPendingUsers(res.data.users);
      }
    }).catch(({ response }) => {
      console.log(response);
    })
    context.selectLang();
  }, [context])

  return (<>
    <div>
      {error ? <p><FormattedMessage id={"erro_request_pending"} /></p> : <></>}
      {pendingUsers.length === 0 ? (
        <p><FormattedMessage id="nenhum_registro" /></p>
      ) : (
          <table className="searchTable">
            <tbody>
              <td><h4><FormattedMessage id="nome_sem_ponto" /></h4></td>
              <td><h4><FormattedMessage id="e-mail_sem_ponto" /></h4></td>
              <td><h4><FormattedMessage id="aprovar_usuario" /></h4></td>
              <td><h4><FormattedMessage id="delete" /></h4></td>
              {pendingUsers.map(user => <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button>
                    <img src={require('../img/correct_img.png')} alt="" width="30px" onClick={() => aceptUser(user.id)} />
                  </button>
                </td>
                <td>
                  <button>
                    <img src={require('../img/delete_img.png')} alt="" width="30px" onClick={() => deleteUser(user.id)} />
                  </button>
                </td>
              </tr>)}
            </tbody>
          </table>
        )}
    </div>
  </>);
};

export default App;