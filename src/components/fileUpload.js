import axios from 'axios';

import React, { useState } from 'react';

import { FormattedMessage } from 'react-intl';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // On file select (from the pop up) 
  const onFileChange = event => {
    // Update the state 
    setSelectedFile(event.target.files[0]);
  };

  // On file upload (click the upload button) 
  const onFileUpload = () => {
    // Create an object of formData 
    const formData = new FormData();
    // Update the formData object 
    formData.append(
      "myFile",
      selectedFile,
      selectedFile.name
    );
    // Details of the uploaded file 
    console.log(selectedFile);
    // Request made to the backend api 
    // Send formData object 
    axios.post("api/uploadfile", formData);
  };

  // File content to be displayed after 
  // file upload is complete 
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
          <h4><FormattedMessage id="escolher_arquivo" /></h4>
        </div>
      );
    }
  };

  return (
    <div>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>
          <FormattedMessage id="enviar" />
        </button>
      </div>
      {fileData()}
    </div>
  );

}

export default App;