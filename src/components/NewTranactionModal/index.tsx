import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';

import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg'

import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps { 
    isOpen: boolean;
    onResquestClose: ()=> void;
 }

export function NewTransactionModal({ isOpen, onResquestClose }: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();
    
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(Number);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransation(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
            createdAt: ''
        })
        setTitle('');
        setAmount(Number);
        setCategory('');
        setType('deposit');
        onResquestClose();
    }
    
    return(
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onResquestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button 
                type="button" 
                onClick={ onResquestClose } 
                className="react-modal-close"
            >
                <img className="close" src={closeImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleCreateNewTransation}>
                <h2>Cadastrar Transação</h2>
                
                <input 
                    placeholder="Titulo"
                    value={title}
                    required
                    onChange={event => setTitle(event.target.value)}
                />

                <input 
                    type="number" 
                    placeholder="Valor"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={()=> {setType('deposit'); }}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={()=> {setType('withdraw'); }}
                        isActive={type === 'withdraw'} 
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saida" />
                        <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                    placeholder="Categoria"
                    value={category}
                    required
                    onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">
                    Cadastar
                </button>
            </Container>
        </Modal>
    );
}