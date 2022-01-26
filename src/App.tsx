import { Dashboard } from './components/Dashboard';
import Modal from 'react-modal'
;import { Header } from './components/Header';
import { TransactionTable } from './components/TransactionTable';
import { GlobalStyle } from './styles/global';
import { useState } from 'react';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionProvider } from './hooks/useTransactions';

Modal.setAppElement('#root')

export function App() {
    const [isNewTransactionModalOpen, setIsNewTransactionModal] = useState(false);
    
    function handleOpenNewTransactionModal(){
        setIsNewTransactionModal(true);
    }

    function handleCloseNewTransactionModal(){
        setIsNewTransactionModal(false);
    }   

  return (
    <TransactionProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}

      
      />

      <TransactionTable />
  
      <GlobalStyle />
    </TransactionProvider>
  );
}