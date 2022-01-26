import React, {useContext} from 'react';
import { Container } from "./styles";
import incomeImg from '../../assets/Entradas.svg';
import outcomeImg from '../../assets/Saídas.svg';
import totalImg from '../../assets/Total.svg';
import { TransactionContext } from '../../TransactionContext';

export function Summary() {
    const {transactions} = useContext(TransactionContext);
    console.log(transactions)
    return(
        <Container>

            <div>
                <header>
                   <p>Entradas</p>
                   <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>R$1000,00</strong>
            </div>
            <div>
                <header>
                   <p>Saidas</p>
                   <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>- R$500,00</strong>
            </div>
            <div className="hightlight-background">
                <header>
                   <p>Total</p>
                   <img src={totalImg} alt="Total" />
                </header>
                <strong>R$500,00</strong>
            </div>
        </Container>
    );
}