import { ReactNode, createContext, useEffect, useState } from "react"
import { api } from "../lib/axios";

export interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface CreateTransactionProps {
    description: string,
    price: number,
    category: string,
    type: "income" | "outcome",
}


export interface TransactionContextType {
    transactions: Transaction[],
    fetchTransactions: (query?: string) => Promise<void>,
    createTransaction: (data: CreateTransactionProps) => Promise<void>
}

export interface TransactionProviderProps {
    children: ReactNode
}


export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function fetchTransactions(query?: string) {
        const response = await api.get('transactions', {
            params: {
                _sort: 'createdAt',
                _order: 'desc',
                q: query
            }
        })

        setTransactions(response.data)
    }


    async function createTransaction(data: CreateTransactionProps) {
        const {
            category,
            description,
            price,
            type
        } = data
        const response = await api.post('transactions', {
            category,
            description,
            price,
            type,
            createdAt: new Date()
        })

        setTransactions(state => [response.data, ...state])

    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    return (
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions,
            createTransaction
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}