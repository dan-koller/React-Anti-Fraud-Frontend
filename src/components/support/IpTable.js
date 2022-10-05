import React from "react";
import { Form, Button, Input, Table } from "semantic-ui-react";

function IpTable({
    ips,
    ipAddressSearch,
    handleSearchIp,
    handleDeleteIp,
    handleInputChange,
}) {
    let ipList;
    if (ips.length === 0) {
        ipList = (
            <Table.Row key='no-ip'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>
                    No ip addresses found
                </Table.Cell>
            </Table.Row>
        );
    } else {
        ipList = ips.map((ip) => {
            return (
                <Table.Row key={ip.id}>
                    <Table.Cell collapsing>
                        <Button
                            circular
                            color='red'
                            size='small'
                            icon='trash'
                            onClick={() => handleDeleteIp(ip.ip)}
                        />
                    </Table.Cell>
                    <Table.Cell>{ip.id}</Table.Cell>
                    <Table.Cell>{ip.ip}</Table.Cell>
                </Table.Row>
            );
        });
    }

    return (
        <>
            <Form onSubmit={handleSearchIp}>
                <Input
                    action={{ icon: "search" }}
                    name='ipAddressSearch'
                    placeholder='Search by IP address'
                    value={ipAddressSearch}
                    onChange={handleInputChange}
                />
            </Form>
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>Remove</Table.HeaderCell>
                        <Table.HeaderCell width={1}>ID</Table.HeaderCell>
                        <Table.HeaderCell width={6}>
                            IP address
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{ipList}</Table.Body>
            </Table>
        </>
    );
}

export default IpTable;
