import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import AuthContext from "../context/AuthContext";
import { antiFraudApi } from "../misc/AntiFraudApi";
import { handleLogError } from "../misc/Helpers";

class MerchantPage extends Component {
    static contextType = AuthContext;

    state = {
        isUser: true,
    };

    componentDidMount() {
        const Auth = this.context;
        const user = Auth.getUser();
        const isUser = user.role === "MERCHANT";
        this.setState({ isUser });
    }

    // handleInputChange = (e, { name, value }) => {
    //     this.setState({ [name]: value });
    // };

    render() {
        if (!this.state.isUser) {
            return <Redirect to='/' />;
        } else {
            return (
                <Container text>
                    <h1>This is the merchant page</h1>
                    <p>Currently this site is under construction.</p>
                </Container>
            );
        }
    }
}

export default MerchantPage;
