import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import AuthContext from "../context/AuthContext";
import MerchantTab from "./MerchantTab";

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

    render() {
        if (!this.state.isUser) {
            return <Redirect to='/' />;
        } else {
            return (
                <Container>
                    <MerchantTab />
                </Container>
            );
        }
    }
}

export default MerchantPage;
