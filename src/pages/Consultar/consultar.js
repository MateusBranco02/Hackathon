import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './consultar.css';

export default function ConsultarPlaca() {
    const [placa, setPlaca] = useState('');
    const [veiculoEncontrado, setVeiculoEncontrado] = useState(null);
    const [placasCadastradas, setPlacasCadastradas] = useState([]);
    const [vagasDisponiveis, setVagasDisponiveis] = useState(0);
    const [totalVagas, setTotalVagas] = useState(0);
    const [inputLiberarVagas, setLiberarVagas] = useState(false);
    const [vagasLiberar, setVagasLiberar] = useState('');
    const [pesquisado, setPesquisado] = useState(false); // Novo estado para verificar se uma pesquisa foi realizada
    const navigate = useNavigate();

    useEffect(() => {
        const veiculosSalvos = localStorage.getItem('veiculosCadastrados');
        if (veiculosSalvos) {
            setPlacasCadastradas(JSON.parse(veiculosSalvos));
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

    const verificarPlaca = () => {
        if (!placa) {
            toast.error('Por favor, insira uma placa antes de pesquisar!');
            return;
        }

        setPesquisado(true); // Marcar que uma pesquisa foi realizada
        const veiculo = placasCadastradas.find(e => e.placa === placa);
        if (veiculo) {
            setVeiculoEncontrado(veiculo);
        } else {
            setVeiculoEncontrado(null);
        }
    };

    const autorizarAcesso = () => {
        if (vagasDisponiveis > 0) {
            const novasVagas = vagasDisponiveis - 1;
            setVagasDisponiveis(novasVagas);
            localStorage.setItem('vagasDisponiveis', novasVagas);
            toast.success("Acesso autorizado!");

            setPlaca('');
            setVeiculoEncontrado(null);
            setPesquisado(false); // Resetar o estado de pesquisa após autorização
        } else {
            toast.warning("Não há vagas disponíveis!");
        }
    };

    const liberarVagas = () => {
        const vagasLiberadas = parseInt(vagasLiberar, 10);
        if (!isNaN(vagasLiberadas) && vagasLiberadas > 0) {
            const novasVagas = vagasDisponiveis + vagasLiberadas;
            if (novasVagas <= totalVagas) {
                setVagasDisponiveis(novasVagas);
                localStorage.setItem('vagasDisponiveis', novasVagas);
                toast.success(`${vagasLiberadas} vaga(s) liberada(s)!`);
                setVagasLiberar('');
                setLiberarVagas(false);
            } else {
                toast.error("Todas as vagas estão liberadas!");
            }
        } else {
            toast.error("Por favor, insira um número válido!");
        }
    };

    const telaCadastro = () => {
        navigate('/cadastro');
        toast.success('Redirecionado para Cadastro!');
    }

    return (
        <div className='container-centro'>
            <div className='container-consulta'>
                <div className='agrupar-botao'>
                    <input
                        type="text"
                        value={placa}
                        onChange={(e) => setPlaca(e.target.value)}
                        placeholder="Digite a placa do carro"
                    />
                    <button className='btnVerificarPlaca' onClick={verificarPlaca}>🔍</button>
                </div>

                <p className='qtdVagas'>Vagas disponíveis: {vagasDisponiveis} / {totalVagas}</p>
            </div>

            <div className='resultado'>
                <div className='liberarVagas'>
                    <button className='btnLiberarVagas' onClick={() => setLiberarVagas(!inputLiberarVagas)}>
                        Liberar vaga(s)
                    </button>

                    {inputLiberarVagas && (
                        <div className='liberar-vagas'>
                            <input
                                type="number"
                                value={vagasLiberar}
                                onChange={(e) => setVagasLiberar(e.target.value)}
                                placeholder="Informe o número de vagas!"
                            />
                            <button onClick={liberarVagas}>Confirmar</button>
                        </div>
                    )}
                </div>

                {pesquisado && veiculoEncontrado && (
                    <div className='box-resultado'>
                        <p>Placa: {veiculoEncontrado.placa}</p>
                        <p>Nome: {veiculoEncontrado.nome}</p>
                        <p>Celular: {veiculoEncontrado.celular}</p>
                        <p>CPF: {veiculoEncontrado.cpf}</p>
                        <button className='btnAcesso' onClick={autorizarAcesso}>Autorizar Acesso</button>
                    </div>
                )}

                {pesquisado && !veiculoEncontrado && (
                    <div>
                        <p>Placa não encontrada.</p>
                        <p>Realize o cadastro do veículo.</p>
                        <button onClick={telaCadastro}>Ir para cadastro</button>
                    </div>
                )}
            </div>

        </div>
    );
}















/*
<div className='container'>
            <div className='container-centro'>
                <div className='container-consulta'>
                    <div className='agrupar-botao'>
                        <input
                            type="text"
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                            placeholder="Digite a placa do carro"
                        />
                        <button onClick={verificarPlaca}>🔍</button>
                    </div>
                    <p className='qtdVagas'>Vagas disponíveis: {vagasDisponiveis} / {totalVagas}</p>
                    <button onClick={() => setLiberarVagas(!inputLiberarVagas)}>
                        Liberar vaga(s)
                    </button>
                    {inputLiberarVagas && (
                        <div className='liberar-vagas'>
                            <input
                                type="number"
                                value={vagasLiberar}
                                onChange={(e) => setVagasLiberar(e.target.value)}
                                placeholder="Número de vagas para liberar"
                            />
                            <button onClick={liberarVagas}>Confirmar</button>
                        </div>
                    )}
                </div>

                <div className='resultado'>
                    {pesquisado && veiculoEncontrado && (
                        <div>
                            <p>Placa: {veiculoEncontrado.placa}</p>
                            <p>Nome: {veiculoEncontrado.nome}</p>
                            <p>Celular: {veiculoEncontrado.celular}</p>
                            <p>CPF: {veiculoEncontrado.cpf}</p>
                            <button onClick={autorizarAcesso}>Autorizar Acesso</button>
                        </div>
                    )}

                    {pesquisado && !veiculoEncontrado && (
                        <div>
                            <p>Placa não encontrada.</p>
                            <p>Realize o cadastro do veículo.</p>
                            <button onClick={telaCadastro}>Ir para cadastro</button>
                        </div>
                    )}
                </div>
            </div>
        </div>

*/