import './home.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
    const navigate = useNavigate();
    const [vagasDisponiveis, setVagasDisponiveis] = useState(0);
    const [totalVagas, setTotalVagas] = useState(0);

    useEffect(() => {
        if (!localStorage.getItem('totalVagas')) {
            localStorage.setItem('totalVagas', 60);
            localStorage.setItem('vagasDisponiveis', 60);
        }

        const vagasSalvas = localStorage.getItem('vagasDisponiveis');
        if (vagasSalvas) {
            setVagasDisponiveis(parseInt(vagasSalvas, 10));
        }

        const totalVagasSalvas = localStorage.getItem('totalVagas');
        if (totalVagasSalvas) {
            setTotalVagas(parseInt(totalVagasSalvas, 10));
        }
    }, []);

    const telaCadastro = () => {
        navigate('/cadastro');
    }

    const telaConsulta = () => {
        navigate('/consultar');
    }

    return (
        <div className="container">
            <div className='box-container'>
                <p>Vagas disponíveis: {vagasDisponiveis} / {totalVagas}</p>
                <div className='btnContainer'>
                    <button className='btnCadastrar' onClick={telaCadastro}>Cadastrar Veículo</button>
                    <button className='btnConsulta' onClick={telaConsulta}>Consultar Placa</button>
                </div>
            </div>
        </div>
    );
}