import axios from 'axios';

import React, { useState } from 'react';

import { FormattedMessage } from 'react-intl';
import { FormGroup, FormControl } from 'react-bootstrap';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [cursoID, setCursoID] = useState(0);
  const [message, setMessage] = useState("");
  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };


  const onFileUpload = () => {
    // Create an object of formData 
    const formData = new FormData();
    // // Update the formData object 
    formData.append(
      "file",
      selectedFile
    );
    // Request made to the backend api 
    // Send formData object 
    axios.post("https://45.79.139.78/v1/import_data/upload/" + cursoID, formData, {
      headers: {
        "Content-Type": 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
      }
    }).then(({ data }) => {
      setSelectedFile(null);
      setMessage(data.message);
    })
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2><FormattedMessage id="detalhes" /></h2>
          <p><FormattedMessage id="nome_arquivo" />{selectedFile.name}</p>
          <p><FormattedMessage id="tipo_arquivo" /> {selectedFile.type}</p>
          <p>
            <FormattedMessage id="ultima_modificacao" />:{" "}
            {selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>
            {message ||
              <FormattedMessage id="escolher_arquivo" />}
          </h4>
        </div>
      );
    }
  };

  const validForm = () => {
    return (selectedFile ? true : false) && cursoID !== "0";
  }

  return (
    <div>
      <div>
        <input type="file" onChange={onFileChange} />
        <FormGroup>
          <FormControl as="select" onChange={e => setCursoID(e.target.value)}>
            <option value="0">escolha um curso...</option>
            <option value="1">Análise e Desenvolvimento de Sistemas</option>
            <option value="2">Comércio Exterior</option>
            <option value="3">Gestão Empresarial</option>
            <option value="4">Logística Aeroportuária</option>
            <option value="5">Redes de Computadores</option>
            <option value="6">Serviços</option>
          </FormControl>
        </FormGroup>
        <button disabled={!validForm()} onClick={onFileUpload}>
          <FormattedMessage id="enviar" />
        </button>
      </div>
      {fileData()}
    </div>
  );

}

export default App;