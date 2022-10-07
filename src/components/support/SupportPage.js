import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import AuthContext from "../context/AuthContext";
import { antiFraudApi } from "../misc/AntiFraudApi";
import { handleLogError } from "../misc/Helpers";
import SupportTab from "./SupportTab";

class SupportPage extends Component {
    static contextType = AuthContext;

    state = {
        users: [],
        userUsernameSearch: "",
        ips: [],
        ipAddressSearch: "",
        cards: [],
        cardNumberSearch: "",
        transactions: [],
        isSupport: true,
        isUsersLoading: false,
    };

    componentDidMount() {
        const Auth = this.context;
        const user = Auth.getUser();
        const isSupport = user.role === "SUPPORT";
        this.setState({ isSupport });

        this.handleGetUsers();
        this.handleGetIps();
        this.handleGetCards();
        this.handleGetTransactions();
    }

    handleInputChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    handleGetUsers = () => {
        const Auth = this.context;
        const user = Auth.getUser();

        this.setState({ isUsersLoading: true });
        antiFraudApi
            .getUserList(user)
            .then((response) => {
                this.setState({ users: response.data });
            })
            .catch((error) => {
                handleLogError(error);
            })
            .finally(() => {
                this.setState({ isUsersLoading: false });
            });
    };

    handleSearchUser = () => {
        const Auth = this.context;
        const user = Auth.getUser();

        const username = this.state.userUsernameSearch;
        antiFraudApi
            .getUserList(user, username)
            .then((response) => {
                // Get the all the username that match or partially match the search ignoring case
                const users = response.data.filter((user) =>
                    user.username.toLowerCase().includes(username.toLowerCase())
                );
                this.setState({ users });
            })
            .catch((error) => {
                handleLogError(error);
                this.setState({ users: [] });
            });
    };

    handleGetIps = () => {
        const Auth = this.context;
        const user = Auth.getUser();

        antiFraudApi
            .getSuspiciousIps(user)
            .then((response) => {
                this.setState({ ips: response.data });
            })
            .catch((error) => {
                handleLogError(error);
                this.setState({ ips: [] });
            });
    };

    handleDeleteIp = (ip) => {
        const Auth = this.context;
        const user = Auth.getUser();

        antiFraudApi
            .deleteSuspiciousIp(user, ip)
            .then(() => {
                this.handleGetIps();
            })
            .catch((error) => {
                handleLogError(error);
            });
    };

    handleSearchIp = () => {
        const Auth = this.context;
        const user = Auth.getUser();

        const ipAddress = this.state.ipAddressSearch;
        antiFraudApi
            .getSuspiciousIps(user)
            .then((response) => {
                // Get the all the ips that match or partially match the number
                const ips = response.data.filter((ip) =>
                    ip.ip.includes(ipAddress)
                );
                this.setState({ ips });
            })
            .catch((error) => {
                handleLogError(error);
                this.setState({ ips: [] });
            });
    };

    handleGetCards = () => {
        const Auth = this.context;
        const user = Auth.getUser();

        antiFraudApi
            .getStolenCards(user)
            .then((response) => {
                this.setState({ cards: response.data });
            })
            .catch((error) => {
                handleLogError(error);
                this.setState({ cards: [] });
            });
    };

    handleDeleteCard = (card) => {
        const Auth = this.context;
        const user = Auth.getUser();

        antiFraudApi
            .deleteStolenCard(user, card)
            .then(() => {
                this.handleGetCards();
            })
            .catch((error) => {
                handleLogError(error);
            });
    };

    handleSearchCard = () => {
        const Auth = this.context;
        const user = Auth.getUser();

        const cardNumber = this.state.cardNumberSearch;
        antiFraudApi
            .getStolenCards(user)
            .then((response) => {
                // Get the all the cards that match or partially match the number
                const cards = response.data.filter((card) =>
                    card.cardNumber.includes(cardNumber)
                );
                this.setState({ cards });
            })
            .catch((error) => {
                handleLogError(error);
                this.setState({ cards: [] });
            });
    };

    handleGetTransactions = () => {
        const Auth = this.context;
        const user = Auth.getUser();

        antiFraudApi
            .getFullTransactionHistory(user)
            .then((response) => {
                this.setState({ transactions: response.data });
            })
            .catch((error) => {
                handleLogError(error);
                this.setState({ transactions: [] });
            });
    };

    handleSearchTransaction = () => {
        const Auth = this.context;
        const user = Auth.getUser();

        const cardNumber = this.state.cardNumberSearch;
        antiFraudApi
            .getTransactionHistory(user, cardNumber)
            .then((response) => {
                this.setState({ transactions: response.data });
            })
            .catch((error) => {
                handleLogError(error);
                this.setState({ transactions: [] });
            });
    };

    handleReviewTransaction = (transaction, feedback) => {
        const Auth = this.context;
        const user = Auth.getUser();

        antiFraudApi
            .reviewTransaction(user, transaction, feedback)
            .then(() => {
                this.handleGetTransactions();
            })
            .catch((error) => {
                handleLogError(error);
            });
    };

    render() {
        if (!this.state.isSupport) {
            return <Redirect to='/' />;
        } else {
            const {
                isSupport,
                isUsersLoading,
                users,
                userUsernameSearch,
                ips,
                ipAddressSearch,
                cards,
                cardNumberSearch,
                transactions,
            } = this.state;
            return (
                <Container>
                    <SupportTab
                        // General
                        isSupport={isSupport}
                        isUsersLoading={isUsersLoading}
                        handleInputChange={this.handleInputChange}
                        // Users
                        users={users}
                        userUsernameSearch={userUsernameSearch}
                        handleSearchUser={this.handleSearchUser}
                        // Ips
                        ips={ips}
                        ipAddressSearch={ipAddressSearch}
                        handleSearchIp={this.handleSearchIp}
                        handleDeleteIp={this.handleDeleteIp}
                        // Cards
                        cards={cards}
                        cardNumberSearch={cardNumberSearch}
                        handleSearchCard={this.handleSearchCard}
                        handleDeleteCard={this.handleDeleteCard}
                        // Transactions
                        transactions={transactions}
                        handleSearchTransaction={this.handleSearchTransaction}
                        handleReviewTransaction={this.handleReviewTransaction}
                    />
                </Container>
            );
        }
    }
}

export default SupportPage;
