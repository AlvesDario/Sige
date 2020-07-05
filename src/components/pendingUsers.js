import React, { useState, useEffect, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import './searchTable.css';
import Axios from 'axios';
import { Context } from '../components/Wrapper';

const App = () => {
  const context = useContext(Context);
  const [pendingUsers, setPendingUsers] = useState([]);

  const [error, setError] = useState(0);

  function refreshPage() {
    window.location.reload(false);
  }

  function aceptUser(id) {
    Axios.put("https://45.79.139.78/v1/management/users/" + id + "/enable", {
        key: "value"
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
    Axios.get("https://45.79.139.78/v1/management/users/pending", {
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
            {pendingUsers.map(user => <tr key={user.email}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                  <button>
                    <img src={require('../img/correct_img.png')} alt="" width="30px" onClick={() => aceptUser(user.id)} />
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