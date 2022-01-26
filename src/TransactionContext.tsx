import { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from './Services/api';


interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt:string;

}

// interface TransactionInput {
//     title: string;
//     amount: number;
//     type: string;
//     category: string;  
// }

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;


interface TransactionProviderProps{
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[],
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);



export function  TransactionProvider({  children }: TransactionProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);


    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    },[]);


    async function createTransaction(transationInput:TransactionInput){
        const response = await api.post('/transactions',{
            ...transationInput,
            createAt: new Date(),
        } );    
        const { transaction } = response.data;  


        setTransactions([
            ...transactions,
            transaction,

        ]);  
    }


    return(
      <TransactionContext.Provider value={{transactions, createTransaction}}> 
        {children}
      </TransactionContext.Provider>  
    );
}