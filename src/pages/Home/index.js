import './home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('totalVagas')) {
            localStorage.setItem('totalVagas', 60);
            localStorage.setItem('vagasDisponiveis', 60);
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
                <div className='btnContainer'>
                    <button className='btnCadastrar' onClick={telaCadastro}>Cadastrar Veículo</button>
                    <button className='btnConsulta' onClick={telaConsulta}>Consultar Placa</button>
                </div>
            </div>
        </div>
    );
}