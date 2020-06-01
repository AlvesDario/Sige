import axios from 'axios';

import React, { useState } from 'react';

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
                    <h2>Detalhes:</h2>
                    <p>Nome do arquivo: {selectedFile.name}</p>
                    <p>Tipo do arquivo: {selectedFile.type}</p>
                    <p>
                        Ultima modificação:{" "}
                        {selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Escolha um arquivo antes de apertar o botão Enviar!</h4>
                </div>
            );
        }
    };

    return (
        <div>
            <div>
                <input type="file" onChange={onFileChange} />
                <button onClick={onFileUpload}>
                    Enviar!
                    </button>
            </div>
            {fileData()}
        </div>
    );

}

export default App;