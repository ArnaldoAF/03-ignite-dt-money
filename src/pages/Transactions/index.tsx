import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { PriceHighlight, TransactionContainer, TransactionTable } from "./styles";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

export function Transactions() {

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
        <div>
            <Header />
            <Summary />

            <TransactionContainer>
                <SearchForm />
                <TransactionTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td width="50%">{transaction.description}</td>
                                    <td>
                                        <PriceHighlight variant={transaction.type}>
                                            R$ 12.000,00

                                        </PriceHighlight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.createdAt}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td width="50%">Desenvolvimento de Software</td>
                            <td>
                                <PriceHighlight variant="income">
                                    R$ 12.000,00

                                </PriceHighlight>
                            </td>
                            <td>Venda</td>
                            <td>13/04/2022</td>
                        </tr>
                        <tr>
                            <td width="50%">Desenvolvimento de Software</td>
                            <td>
                                <PriceHighlight variant="outcome">
                                    R$ -12.000,00
                                </PriceHighlight>
                            </td>
                            <td>Venda</td>
                            <td>13/04/2022</td>
                        </tr>
                    </tbody>
                </TransactionTable>
            </TransactionContainer >
        </div>

    )
}