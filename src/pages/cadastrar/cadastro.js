import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './cadastro.css';

export default function Cadastrar() {
    const navigate = useNavigate();
    const [placa, setPlaca] = useState('');
    const [nome, setNome] = useState('');
    const [celular, setCelular] = useState('');
    const [cpf, setCpf] = useState('');
    const [vagasDisponiveis, setVagasDisponiveis] = useState(0);
    const [totalVagas, setTotalVagas] = useState(0);
    const [veiculosCadastrados, setVeiculosCadastrados] = useState(() => {
        const veiculosSalvos = localStorage.getItem('veiculosCadastrados');
        return veiculosSalvos ? JSON.parse(veiculosSalvos) : [];
    });

    useEffect(() => {
        const vagasSalvas = localStorage.getItem('vagasDisponiveis');
        if (vagasSalvas) {
            setVagasDisponiveis(parseInt(vagasSalvas, 10));
        }

        const totalVagasSalvas = localStorage.getItem('totalVagas');
        if (totalVagasSalvas) {
            setTotalVagas(parseInt(totalVagasSalvas, 10));
        }
    }, []);

    const cadastrarVeiculo = () => {
        if (!placa || !nome || !celular || !cpf) {
            toast.error('Por favor, preencha todos os campos!');
            return;
        }

        const novoVeiculo = { placa, nome, celular, cpf };
        const atualizarVeiculos = [...veiculosCadastrados, novoVeiculo];
        setVeiculosCadastrados(atualizarVeiculos);
        localStorage.setItem('veiculosCadastrados', JSON.stringify(atualizarVeiculos));
        toast.success('Cadastro Realizado!')
        toast.success('Redirecionado para o Início!')

        setPlaca('');
        setNome('');
        setCelular('');
        setCpf('');
        navigate('/');
    };

    return (
        <div className='container'>
            <div className='box-container'>
                <div className='container-cadastro'>
                    <h1>Cadastrar Veículo</h1>
                    <p>Vagas disponíveis: {vagasDisponiveis} / {totalVagas}</p>
                    <input
                        type='text'
                        placeholder='Placa do Veículo'
                        value={placa}
                        onChange={(e) => setPlaca(e.target.value)}
                    />
                    <input
                        placeholder='Nome do Motorista'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                        placeholder='Celular'
                        value={celular}
                        onChange={(e) => setCelular(e.target.value)}
                    />
                    <input
                        placeholder='CPF'
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />
                    <button className='cadastrar' onClick={cadastrarVeiculo}>Cadastrar</button>
                </div>
            </div>
        </div>
    );
}