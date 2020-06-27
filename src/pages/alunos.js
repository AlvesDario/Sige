import { useParams} from "react-router";
import React, { useState, useContext } from 'react';
import SideNav from '../components/sidenav';
import AlunoTable from '../components/alunoTable';
import { Context } from '../components/Wrapper';
import { FormattedMessage } from 'react-intl';

const App = () => {
    const context = useContext(Context);
    const {RA} = useParams();
    const [edit, setEdit] = useState(false);
    const [nome, setNome] = useState("Joao");
    const [nascimento, setNascimento] = useState("20/10/1960");
    const [nomeMae, setNomeMae] = useState("Maria");
    const [estadoCivil, setEstadoCivil] = useState("Solteiro");
    const [curso, setCurso] = useState("ADS");
    const [turno, setTurno] = useState("Noturno");
    const [email, setEmail] = useState("Joao@fatec.sp.gov.br");
    const [endereco, setEndereco] = useState("Av Santana nº14");
    const [CEP, setCEP] = useState("13150-352");
    const [telefone, setTelefone] = useState("19 3898-2357");
    const [celular, setCelular] = useState("19 98246-8342");


    return (<>
        <SideNav/>
        <div className="content">
            <select value={context.locale} onChange={context.selectLang}>
                <option value="en-US">English</option>
                <option value="pt-BR">Português</option>
                <option value="es-CL">Espanhol</option>
            </select>
            <h1><FormattedMessage id="alunos" /></h1>
            {RA && <>
                <label>RA:</label>
                <input type="text" value={RA} disabled={true} />
                <label><FormattedMessage id="nome" /></label>
                <input type="text" value={nome} disabled={!edit} onChange={(e)=>{setNome(e.target.value)}}/>
                <label><FormattedMessage id="nascimento" /></label>
                <input type="text" value={nascimento} disabled={!edit} onChange={(e)=>{setNascimento(e.target.value)}}/>
                <label><FormattedMessage id="nome_mae" /></label>
                <input type="text" value={nomeMae} disabled={!edit} onChange={(e)=>{setNomeMae(e.target.value)}}/>
                <label><FormattedMessage id="estado_civil" /></label>
                <input type="text" value={estadoCivil} disabled={!edit} onChange={(e)=>{setEstadoCivil(e.target.value)}}/>
                <label><FormattedMessage id="Curso" /></label>
                <input type="text" value={curso} disabled={!edit} onChange={(e)=>{setCurso(e.target.value)}}/>
                <label><FormattedMessage id="turno" /></label>
                <input type="text" value={turno} disabled={!edit} onChange={(e)=>{setTurno(e.target.value)}}/>
                <label><FormattedMessage id="e-mail" /></label>
                <input type="text" value={email} disabled={!edit} onChange={(e)=>{setEmail(e.target.value)}}/>
                <label><FormattedMessage id="endereco" /></label>
                <input type="text" value={endereco} disabled={!edit} onChange={(e)=>{setEndereco(e.target.value)}}/>
                <label><FormattedMessage id="cep" /></label>
                <input type="text" value={CEP} disabled={!edit} onChange={(e)=>{setCEP(e.target.value)}}/>
                <label><FormattedMessage id="telefone" /></label>
                <input type="text" value={telefone} disabled={!edit} onChange={(e)=>{setTelefone(e.target.value)}}/>
                <label><FormattedMessage id="celular" /></label>
                <input type="text" value={celular} disabled={!edit} onChange={(e)=>{setCelular(e.target.value)}}/>
                <button onClick={()=>setEdit(!edit)}><FormattedMessage id="editar" /></button>
            </>}
            {!RA && <>
                <AlunoTable />
            </>}
        </div>
    </>);
};

export default App;