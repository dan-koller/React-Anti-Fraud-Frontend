import React from "react";
import { Form, Input, Table } from "semantic-ui-react";

function TransactionTable({
    transactions,
    cardNumberSearch,
    handleSearchTransaction,
    handleInputChange,
}) {
    let transactionList;
    if (transactions.length === 0) {
        transactionList = (
            <Table.Row key='no-transaction'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>
                    No transactions found
                </Table.Cell>
            </Table.Row>
        );
    } else {
        transactionList = transactions.map((transaction) => {
            return (
                <Table.Row key={transaction.id}>
                    <Table.Cell>{transaction.amount}</Table.Cell>
                    <Table.Cell>{transaction.date}</Table.Cell>
                    <Table.Cell>{transaction.feedback}</Table.Cell>
                    <Table.Cell>{transaction.ip}</Table.Cell>
                    <Table.Cell>{transaction.number}</Table.Cell>
                    <Table.Cell>{transaction.region}</Table.Cell>
                    <Table.Cell>{transaction.result}</Table.Cell>
                </Table.Row>
            );
        });
    }

    return (
        <>
            <Form onSubmit={handleSearchTransaction}>
                <Input
                    action={{ icon: "search" }}
                    name='cardNumberSearch'
                    placeholder='Search by exact card number...'
                    value={cardNumberSearch}
                    onChange={handleInputChange}
                />
            </Form>
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>Amount</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Date</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Feedback</Table.HeaderCell>
                        <Table.HeaderCell width={1}>IP</Table.HeaderCell>
                        <Table.HeaderCell width={1}>
                            Card number
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1}>Region</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{transactionList}</Table.Body>
            </Table>
        </>
    );
}

export default TransactionTable;
