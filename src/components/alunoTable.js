import React, { useState } from 'react';
import './alunoTable.css'

const App = () => {
    const [list, setList] = useState([{nome:"Joao", RA: 123456789, curso: "ADS"}]);
    
    // new function(){setList([...list, ]);}()
    const handleTrClick = (e) => {
        window.location.href = "/aluno/"+e;
    }

    return (<>
    <div className="alunoForm">
        <div className="alunoInputForm">
            <label>Nome do Aluno</label>
            <input />
        </div>
        <div className="alunoInputForm">
            <label>RA</label>
            <input />
        </div>
        <div className="alunoInputForm">
            <label>Curso</label>
            <input />
        </div>
        <button>Pesquisar</button>
    </div>
        <table className="alunoTable">
            <tbody>
            {list.map(aluno => <tr key={aluno.RA} onClick={()=>handleTrClick(aluno.RA)}>
                <td>{aluno.nome}</td>
                <td>{aluno.RA}</td>
                <td>{aluno.curso}</td>
            </tr>)}
            </tbody>
        </table>
    </>);
};

export default App;