import React, { Component } from "react";
import { Button, Form, Message, Dropdown } from "semantic-ui-react";
import { antiFraudApi } from "../misc/AntiFraudApi";
import { handleLogError } from "../misc/Helpers";
import AuthContext from "../context/AuthContext";

class UpdateAccessForm extends Component {
    static contextType = AuthContext;

    access = [
        { key: "LOCK", text: "LOCK", value: "LOCK" },
        { key: "UNLOCK", text: "UNLOCK", value: "UNLOCK" },
    ];

    state = {
        username: "",
        access: "",
        isError: false,
        errorMessage: "",
        isRoleUpdated: false,
        isAdmin: true,
    };

    componentDidMount() {
        const Auth = this.context;
        const user = Auth.getUser();
        const isAdmin = user.role === "ADMINISTRATOR";
        this.setState({ isAdmin });
    }

    handleInputChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const Auth = this.context;
        const user = Auth.getUser(); // Current signed in user

        const { username, access } = this.state;
        if (!(username && access)) {
            this.setState({
                isError: true,
                errorMessage: "Please, inform all fields!",
            });
            return;
        }

        antiFraudApi
            .updateUserAccess(user, username, access)
            .then(() => {
                this.setState({
                    username: "",
                    access: "",
                    isError: false,
                    errorMessage: "",
                    isRoleUpdated: true,
                });
            })
            .catch((error) => {
                handleLogError(error);
                if (error.response && error.response.data) {
                    this.setState({
                        isError: true,
                        errorMessage: error.response.data.message,
                    });
                }
            });
    };

    render() {
        const { username, isError, isRoleUpdated } = this.state;

        return (
            <Form
                onSubmit={this.handleSubmit}
                error={isError}
                success={!isError}
            >
                <Form.Input
                    label='Username'
                    name='username'
                    required={true}
                    value={username}
                    onChange={this.handleInputChange}
                />
                <Dropdown
                    placeholder='Lock/Unlock'
                    label='Access'
                    name='access'
                    fluid
                    selection
                    options={this.access}
                    multiple={false}
                    required={true}
                    onChange={this.handleInputChange}
                />
                <br />
                {isRoleUpdated && (
                    <Message positive>
                        <Message.Header>Access updated</Message.Header>
                        <p>Successfully updated the access of the user.</p>
                    </Message>
                )}
                {isError && (
                    <Message error>
                        <Message.Header>Error</Message.Header>
                        <p>Error updating role: {this.state.errorMessage}</p>
                    </Message>
                )}
                <Button type='submit'>Update access</Button>
            </Form>
        );
    }
}

export default UpdateAccessForm;
