import './home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

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