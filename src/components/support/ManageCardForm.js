import React, { Component } from "react";
import { Form, Message } from "semantic-ui-react";
import AuthContext from "../context/AuthContext";
import { antiFraudApi } from "../misc/AntiFraudApi";
import { handleLogError } from "../misc/Helpers";

class ManageCardForm extends Component {
    static contextType = AuthContext;

    state = {
        card: "",
        isError: false,
        errorMessage: "",
        isCardUpdated: false,
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

        const { card } = this.state;
        if (!card) {
            this.setState({
                isError: true,
                errorMessage: "Please, inform all fields!",
            });
            return;
        }

        antiFraudApi
            .postStolenCard(user, card)
            .then(() => {
                this.setState({
                    card: "",
                    access: "",
                    isError: false,
                    errorMessage: "",
                    isCardUpdated: true,
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
        const { card, isError, errorMessage, isCardUpdated } = this.state;

        return (
            <div>
                <h2>Manage stolen cards</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input
                        name='card'
                        value={card}
                        onChange={this.handleInputChange}
                        placeholder='Enter card number here...'
                        action={{ color: "teal", content: "Submit" }}
                    />
                </Form>
                {isError && <Message negative>{errorMessage}</Message>}
                {isCardUpdated && (
                    <Message positive>
                        Card number submitted successfully!
                    </Message>
                )}
            </div>
        );
    }
}

export default ManageCardForm;
