import { ReactNode, createContext, useEffect, useState } from "react"

export interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

export interface TransactionContextType {
    transactions: Transaction[]
}

export interface TransactionProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function loadTransactions() {
        const response = await fetch('http://localhost:3333/transactions', {
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log(response)
        const data = await response.json()
        console.log(data);
        setTransactions(data)
    }

    useEffect(() => {
        loadTransactions()
    }, [])

    return (
        <TransactionsContext.Provider value={{
            transactions
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}