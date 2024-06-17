import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { PriceHighlight, TransactionContainer, TransactionTable } from "./styles";

export function Transactions() {
    return (
        <div>
            <Header />
            <Summary />

            <TransactionContainer>

                <TransactionTable>
                    <tbody>
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