import React, { Component } from "react";
import { Button, Form, Message, Dropdown } from "semantic-ui-react";
import { antiFraudApi } from "../misc/AntiFraudApi";
import { handleLogError } from "../misc/Helpers";
import AuthContext from "../context/AuthContext";

class PostTransactionForm extends Component {
    static contextType = AuthContext;

    region = [
        { key: "EAP", text: "East Asia and Pacific", value: "EAP" },
        { key: "ECA", text: "Europe and Central Asia", value: "ECA" },
        { key: "HIC", text: "High-Income Countries", value: "HIC" },
        { key: "LAC", text: "Latin America and Caribbean", value: "LAC" },
        { key: "MENA", text: "Middle East and North Africa", value: "MENA" },
        { key: "SA", text: "South Asia", value: "SA" },
        { key: "SSA", text: "Sub-Saharan Africa", value: "SSA" },
    ];

    state = {
        amount: "",
        ip: "",
        number: "",
        region: "",
        date: "",
        isError: false,
        errorMessage: "",
        responseMessage: "",
        isTransactionPosted: false,
    };

    // Returns the current date in the format yyyy-MM-ddTHH:mm:ss
    getCurrentDate = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, "0");
        let day = String(date.getDate()).padStart(2, "0");
        let hours = String(date.getHours()).padStart(2, "0");
        let minutes = String(date.getMinutes()).padStart(2, "0");
        let seconds = String(date.getSeconds()).padStart(2, "0");

        return (
            year +
            "-" +
            month +
            "-" +
            day +
            "T" +
            hours +
            ":" +
            minutes +
            ":" +
            seconds
        );
    };

    setClientIpAddr = () => {
        const providerUrl = "https://api.ipify.org?format=json";

        fetch(providerUrl)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ ip: data.ip });
            })
            .catch((error) => {
                handleLogError(error);
            });
    };

    componentDidMount() {
        // Set the state of the date field to the current date
        const date = this.getCurrentDate();
        this.setState({ date });

        // Set the state of the ip field to the client's IP address
        this.setClientIpAddr();
    }

    handleInputChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const Auth = this.context;
        const user = Auth.getUser(); // Current signed in user

        const { amount, ip, number, region, date } = this.state;
        if (!(amount && ip && number && region && date)) {
            this.setState({
                isError: true,
                errorMessage: "Please, inform all fields!",
            });
            return;
        }

        const transaction = { amount, ip, number, region, date };
        // Parse the amount to a float
        transaction.amount = parseFloat(transaction.amount.replace(",", "."));

        antiFraudApi
            .postTransaction(user, transaction)
            .then((response) => {
                this.setState({ responseMessage: response.data });
            })
            .then(() => {
                this.setState({
                    amount: "",
                    ip: "",
                    number: "",
                    name: "",
                    region: "",
                    date: "",
                    isError: false,
                    errorMessage: "",
                    isTransactionPosted: true,
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

    reset = () => {
        window.location.reload();
    };

    render() {
        const {
            amount,
            ip,
            number,
            region,
            isError,
            responseMessage,
            isTransactionPosted,
        } = this.state;
        return (
            <Form
                onSubmit={this.handleSubmit}
                error={isError}
                success={!isError}
            >
                <Form.Input
                    label='Amount'
                    name='amount'
                    required={true}
                    value={amount}
                    onChange={this.handleInputChange}
                />
                <Form.Input
                    label='Card number'
                    name='number'
                    inputMode='numeric'
                    pattern='[0-9\s]{13,19}'
                    autoComplete='cc-number'
                    maxLength='19'
                    required={true}
                    value={number}
                    onChange={this.handleInputChange}
                />
                <Dropdown
                    placeholder='Select region'
                    label='Region'
                    name='region'
                    fluid
                    selection
                    options={this.region}
                    multiple={false}
                    required={true}
                    onChange={this.handleInputChange}
                    clearable={true}
                />
                <br />
                {isTransactionPosted && (
                    <Message positive>
                        <Message.Header>Transaction posted</Message.Header>
                        <p>Transaction submitted successfully.</p>
                        <p>
                            Result: {JSON.stringify(responseMessage.result)}{" "}
                            {responseMessage.info !== "none" && (
                                <span>Info: {responseMessage.info}</span>
                            )}
                        </p>
                    </Message>
                )}
                {isError && (
                    <Message error>
                        <Message.Header>Error</Message.Header>
                        <p>
                            Error posting the transaction:{" "}
                            {this.state.errorMessage}
                        </p>
                    </Message>
                )}
                <Button positive type='submit'>
                    Post transaction
                </Button>
                {/* Reload form to reset the state */}
                <Button negative type='button' onClick={this.reset}>
                    Reset
                </Button>
            </Form>
        );
    }
}

export default PostTransactionForm;
