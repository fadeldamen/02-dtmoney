import React, {useContext} from 'react';
import { Container } from "./styles";
import incomeImg from '../../assets/Entradas.svg';
import outcomeImg from '../../assets/Saídas.svg';
import totalImg from '../../assets/Total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary() {
    const {transactions} = useTransactions();


    const sumary = transactions.reduce((acc, transaction) =>{
        if (transaction.type== 'deposit'){
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;

        } else {
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;

        }
        return acc;
    },{
        deposits: 0, 
        withdraws:0, 
        total: 0,
    })


    return(
        <Container>

            <div>
                <header>
                   <p>Entradas</p>
                   <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR',{
                        style: 'currency',
                        currency: 'BRL'

                    }).format(sumary.deposits)}                

                </strong>
            </div>
            <div>
                <header>
                   <p>Saidas</p>
                   <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>- 
                    {new Intl.NumberFormat('pt-BR',{
                        style: 'currency',
                        currency: 'BRL'

                    }).format(sumary.withdraws)}    
                </strong>
            </div>
            <div className="hightlight-background">
                <header>
                   <p>Total</p>
                   <img src={totalImg} alt="Total" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR',{
                        style: 'currency',
                        currency: 'BRL'

                    }).format(sumary.total)}   
                </strong>
            </div>
        </Container>
    );
}