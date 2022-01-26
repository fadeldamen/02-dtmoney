import { FormEvent, useState } from 'react';

import Modal from 'react-modal';
import { Container, TransationTypeContainer , RadioBox } from './styles';
import closeImg from '../../assets/Botão - Fechar.svg';
import incomeImg from '../../assets/Entradas.svg';
import outcomeImg from '../../assets/Saídas.svg';
import { api } from '../../Services/api';
import { useTransactions } from '../../hooks/useTransactions';




interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}


export function NewTransactionModal({ isOpen, onRequestClose }:NewTransactionModalProps){
    const {createTransaction} = useTransactions();
    const [ type, setType ] = useState('deposit');
    const [ title, setTitle ] = useState('');
    const [ value, setValue ] = useState(0);
    const [ category, setCategory ] = useState('');





    async function handleCreateNewTransaction(event:FormEvent) {
        event.preventDefault();

        await createTransaction({
            title, 
            amount: value,
            category, 
            type,

        })
        setTitle('');
        setValue(0);
        setCategory('');
        setType('deposit');

        onRequestClose();
    };


    return(
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button 
                type="button" 
                onClick={onRequestClose} 
                className="react-modal-close"  
            >

                    <img src={closeImg} alt="fechar modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction} >
                <h2>Cadastrar Transação</h2>
                <input
                    placeholder="Titulo"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input
                    type="number"
                    placeholder="Valor"
                    value={value}
                    onChange={event => setValue(+event.target.value)}                    
                />      

                <TransationTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={()=> { setType('deposit'); }}
                        isActive={type == 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={()=> { setType('withdraw'); }}                        
                        isActive={type == 'withdraw'}
                        activeColor="red"                        
                    >
                        <img src={outcomeImg} alt="Saida" />
                        <span>Saida</span>
                    </RadioBox>

                </TransationTypeContainer>


                <input
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}                        
                />
                <button type="submit">
                    Cadastrar    
                </button>                          
            </Container>
        </Modal>    
    );
}