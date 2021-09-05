import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionType {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}


export const TransactionsContext = createContext<TransactionType[]>([]);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    api.get("/transactions")
      .then(response => setTransactions(response.data.transactions));
  }, []);

  return(
    <TransactionsContext.Provider value={
      transactions
    }>
      {children}
    </TransactionsContext.Provider>
  )
} 
