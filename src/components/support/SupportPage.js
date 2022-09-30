import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import AuthContext from "../context/AuthContext";
import { antiFraudApi } from "../misc/AntiFraudApi";
import { handleLogError } from "../misc/Helpers";

class SupportPage extends Component {
    static contextType = AuthContext;

    state = {
        isUser: true,
    };

    componentDidMount() {
        const Auth = this.context;
        const user = Auth.getUser();
        const isUser = user.role === "SUPPORT";
        this.setState({ isUser });
    }

    render() {
        if (!this.state.isUser) {
            return <Redirect to='/' />;
        } else {
            return (
                <Container text>
                    <h1>This is the support page</h1>
                    <p>Currently this site is under construction.</p>
                </Container>
            );
        }
    }
}

export default SupportPage;
