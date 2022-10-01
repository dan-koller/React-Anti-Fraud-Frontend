import React, { Component } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { antiFraudApi } from "../misc/AntiFraudApi";
import { handleLogError } from "../misc/Helpers";

class AddUserForm extends Component {
    state = {
        username: "",
        password: "",
        name: "",
        isError: false,
        errorMessage: "",
        isUserAdded: false,
    };

    handleInputChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { username, password, name } = this.state;
        if (!(username && password && name)) {
            this.setState({
                isError: true,
                errorMessage: "Please, inform all fields!",
            });
            return;
        }

        const user = { username, password, name };
        antiFraudApi
            .signup(user)
            .then(() => {
                this.setState({
                    username: "",
                    password: "",
                    name: "",
                    isError: false,
                    errorMessage: "",
                    isUserAdded: true,
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
        const { username, password, name, isError, isUserAdded } = this.state;
        return (
            <Form
                onSubmit={this.handleSubmit}
                error={isError}
                success={!isError}
            >
                <Form.Input
                    label='Full name'
                    name='name'
                    required={true}
                    value={name}
                    onChange={this.handleInputChange}
                />
                <Form.Input
                    label='Username'
                    name='username'
                    required={true}
                    value={username}
                    onChange={this.handleInputChange}
                />
                <Form.Input
                    label='Password'
                    name='password'
                    type='password'
                    required={true}
                    value={password}
                    onChange={this.handleInputChange}
                />
                {isUserAdded && (
                    <Message positive>
                        <Message.Header>User added</Message.Header>
                        <p>
                            The user {this.username} has been added to the
                            database.
                        </p>
                    </Message>
                )}
                <Button type='submit'>Add User</Button>
            </Form>
        );
    }
}

export default AddUserForm;
