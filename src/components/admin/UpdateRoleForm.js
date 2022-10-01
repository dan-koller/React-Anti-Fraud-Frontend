import React, { Component } from "react";
import { Button, Form, Message, Dropdown } from "semantic-ui-react";
import { antiFraudApi } from "../misc/AntiFraudApi";
import { handleLogError } from "../misc/Helpers";
import AuthContext from "../context/AuthContext";

class UpdateRoleForm extends Component {
    static contextType = AuthContext;

    role = [
        { key: "MERCHANT", text: "MERCHANT", value: "MERCHANT" },
        { key: "SUPPORT", text: "SUPPORT", value: "SUPPORT" },
    ];

    state = {
        username: "",
        role: "",
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

        const { username, role } = this.state;
        if (!(username && role)) {
            this.setState({
                isError: true,
                errorMessage: "Please, inform all fields!",
            });
            return;
        }

        antiFraudApi
            .updateUserRole(user, username, role)
            .then(() => {
                this.setState({
                    username: "",
                    role: "",
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
                    placeholder='Select Role'
                    label='Role'
                    name='role'
                    fluid
                    selection
                    options={this.role}
                    multiple={false}
                    required={true}
                    onChange={this.handleInputChange}
                />
                <br />
                {isRoleUpdated && (
                    <Message positive>
                        <Message.Header>Role updated</Message.Header>
                        <p>Successfully updated the role of the user.</p>
                    </Message>
                )}
                {isError && (
                    <Message error>
                        <Message.Header>Error</Message.Header>
                        <p>Error updating role: {this.state.errorMessage}</p>
                    </Message>
                )}
                <Button type='submit'>Update role</Button>
            </Form>
        );
    }
}

export default UpdateRoleForm;
