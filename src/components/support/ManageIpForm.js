import React, { Component } from "react";
import { Form, Message } from "semantic-ui-react";
import AuthContext from "../context/AuthContext";
import { antiFraudApi } from "../misc/AntiFraudApi";
import { handleLogError } from "../misc/Helpers";

class ManageIpForm extends Component {
    static contextType = AuthContext;

    state = {
        ip: "",
        isError: false,
        errorMessage: "",
        isIpUpdated: false,
        isSupport: true,
    };

    componentDidMount() {
        const Auth = this.context;
        const user = Auth.getUser();
        const isSupport = user.role === "SUPPORT";
        this.setState({ isSupport });
    }

    handleInputChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const Auth = this.context;
        const user = Auth.getUser(); // Current signed in user

        const { ip } = this.state;
        if (!ip) {
            this.setState({
                isError: true,
                errorMessage: "Please, inform all fields!",
            });
            return;
        }

        antiFraudApi
            .postSuspiciousIp(user, ip)
            .then(() => {
                this.setState({
                    ip: "",
                    access: "",
                    isError: false,
                    errorMessage: "",
                    isIpUpdated: true,
                });
            })
            .catch((error) => {
                handleLogError(error);
                if (error.response && error.response.data) {
                    this.setState({
                        isError: true,
                        errorMessage: error.response.data,
                    });
                }
            });
    };

    render() {
        const { ip, isError, errorMessage, isIpUpdated } = this.state;

        return (
            <div>
                <h2>Manage suspicious IPs</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input
                        label='Add IP'
                        name='ip'
                        value={ip}
                        onChange={this.handleInputChange}
                        placeholder='IP'
                    />
                    <Form.Button content='Submit' />
                </Form>
                {isError && <Message negative>{errorMessage}</Message>}
                {isIpUpdated && <Message positive>IP access updated!</Message>}
            </div>
        );
    }
}

export default ManageIpForm;
