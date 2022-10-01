import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import AuthContext from "../context/AuthContext";
import { antiFraudApi } from "../misc/AntiFraudApi";
import AdminTab from "./AdminTab";
import { handleLogError } from "../misc/Helpers";

class AdminPage extends Component {
    static contextType = AuthContext;

    state = {
        users: [],
        userUsernameSearch: "",
        isAdmin: true,
        isUsersLoading: false,
    };

    componentDidMount() {
        const Auth = this.context;
        const user = Auth.getUser();
        const isAdmin = user.role === "ADMINISTRATOR";
        this.setState({ isAdmin });

        this.handleGetUsers();
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

    handleDeleteUser = (username) => {
        const Auth = this.context;
        const user = Auth.getUser();

        antiFraudApi
            .deleteUser(user, username)
            .then(() => {
                this.handleGetUsers();
            })
            .catch((error) => {
                handleLogError(error);
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

    render() {
        if (!this.state.isAdmin) {
            return <Redirect to='/' />;
        } else {
            const { isUsersLoading, users, userUsernameSearch } = this.state;
            return (
                <Container>
                    <AdminTab
                        isUsersLoading={isUsersLoading}
                        users={users}
                        userUsernameSearch={userUsernameSearch}
                        handleDeleteUser={this.handleDeleteUser}
                        handleSearchUser={this.handleSearchUser}
                        handleInputChange={this.handleInputChange}
                    />
                </Container>
            );
        }
    }
}

export default AdminPage;
