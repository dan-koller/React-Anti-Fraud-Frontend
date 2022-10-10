import React from "react";
import { Tab } from "semantic-ui-react";
import UserTable from "../admin/UserTable";
import AddUserForm from "../admin/AddUserForm";
import ManageIpForm from "./ManageIpForm";
import IpTable from "./IpTable";
import ManageCardForm from "./ManageCardForm";
import CardTable from "./CardTable";
import TransactionTable from "./TransactionTable";
import ReviewTransactionTable from "./ReviewTransactionTable";

function SupportTab(props) {
    const { handleInputChange } = props;
    const {
        isSupport,
        isUsersLoading,
        // User table
        users,
        userUsernameSearch,
        handleSearchUser,
        // IP table
        ips,
        ipAddressSearch,
        handleSearchIp,
        handleDeleteIp,
        // Card table
        cards,
        cardNumberSearch,
        handleSearchCard,
        handleDeleteCard,
        // Transaction table
        transactions,
        handleSearchTransaction,
        handleReviewTransaction,
    } = props;

    const panes = [
        {
            menuItem: { key: "users", icon: "users", content: "All users" },
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <UserTable
                        isSupport={isSupport}
                        users={users}
                        userUsernameSearch={userUsernameSearch}
                        handleInputChange={handleInputChange}
                        handleSearchUser={handleSearchUser}
                    />
                </Tab.Pane>
            ),
        },
        {
            menuItem: { key: "add", icon: "user plus", content: "Add user" },
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <AddUserForm />
                </Tab.Pane>
            ),
        },
        {
            menuItem: {
                key: "ips",
                icon: "unlock alternate",
                content: "Manage IP addresses",
            },
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <ManageIpForm />
                    <br />
                    <h3>Currently blocked IP addresses</h3>
                    <IpTable
                        isSupport={isSupport}
                        ips={ips}
                        ipAddressSearch={ipAddressSearch}
                        handleSearchIp={handleSearchIp}
                        handleDeleteIp={handleDeleteIp}
                        handleInputChange={handleInputChange}
                    />
                </Tab.Pane>
            ),
        },
        {
            menuItem: {
                key: "cards",
                icon: "credit card",
                content: "Manage cards",
            },
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <ManageCardForm />
                    <br />
                    <h3>Cards currently flagged as stolen</h3>
                    <CardTable
                        isSupport={isSupport}
                        cards={cards}
                        cardNumberSearch={cardNumberSearch}
                        handleSearchCard={handleSearchCard}
                        handleDeleteCard={handleDeleteCard}
                        handleInputChange={handleInputChange}
                    />
                </Tab.Pane>
            ),
        },
        {
            menuItem: {
                key: "transactions",
                icon: "euro sign",
                content: "Transactions",
            },
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <TransactionTable
                        isSupport={isSupport}
                        transactions={transactions}
                        cardNumberSearch={cardNumberSearch}
                        handleSearchTransaction={handleSearchTransaction}
                        handleInputChange={handleInputChange}
                    />
                </Tab.Pane>
            ),
        },
        {
            menuItem: {
                key: "reviews",
                icon: "handshake",
                content: "Review transactions",
            },
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <h3>Pending transaction reviews</h3>
                    <ReviewTransactionTable
                        isSupport={isSupport}
                        transactions={transactions}
                        cardNumberSearch={cardNumberSearch}
                        handleSearchTransaction={handleSearchTransaction}
                        handleReviewTransaction={handleReviewTransaction}
                        handleInputChange={handleInputChange}
                    />
                </Tab.Pane>
            ),
        },
    ];

    return <Tab menu={{ attached: "top" }} panes={panes} />;
}

export default SupportTab;
