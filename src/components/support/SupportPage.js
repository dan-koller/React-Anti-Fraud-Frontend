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
        ips: [],
        userUsernameSearch: "",
        ipAddressSearch: "",
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
            } = this.state;
            return (
                <Container>
                    <SupportTab
                        isSupport={isSupport}
                        isUsersLoading={isUsersLoading}
                        users={users}
                        userUsernameSearch={userUsernameSearch}
                        handleSearchUser={this.handleSearchUser}
                        ips={ips}
                        ipAddressSearch={ipAddressSearch}
                        handleSearchIp={this.handleSearchIp}
                        handleDeleteIp={this.handleDeleteIp}
                        handleInputChange={this.handleInputChange}
                    />
                </Container>
            );
        }
    }
}

export default SupportPage;
