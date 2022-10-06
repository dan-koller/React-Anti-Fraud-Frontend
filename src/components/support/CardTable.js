import React from "react";
import { Form, Button, Input, Table } from "semantic-ui-react";

function CardTable({
    cards,
    cardNumberSearch,
    handleSearchCard,
    handleDeleteCard,
    handleInputChange,
}) {
    let cardList;
    if (cards.length === 0) {
        cardList = (
            <Table.Row key='no-card'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>
                    No cards found
                </Table.Cell>
            </Table.Row>
        );
    } else {
        cardList = cards.map((card) => {
            return (
                <Table.Row key={card.id}>
                    <Table.Cell collapsing>
                        <Button
                            circular
                            color='red'
                            size='small'
                            icon='trash'
                            onClick={() => handleDeleteCard(card.number)}
                        />
                    </Table.Cell>
                    <Table.Cell>{card.id}</Table.Cell>
                    <Table.Cell>{card.number}</Table.Cell>
                </Table.Row>
            );
        });
    }

    return (
        <>
            <Form onSubmit={handleSearchCard}>
                <Input
                    action={{ icon: "search" }}
                    name='cardNumberSearch'
                    placeholder='Search by card number'
                    value={cardNumberSearch}
                    onChange={handleInputChange}
                />
            </Form>
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>Remove</Table.HeaderCell>
                        <Table.HeaderCell width={1}>ID</Table.HeaderCell>
                        <Table.HeaderCell width={6}>
                            Card number
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{cardList}</Table.Body>
            </Table>
        </>
    );
}

export default CardTable;
