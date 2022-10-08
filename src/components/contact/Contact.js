import { Component } from "react";
import { Container, Segment, Dimmer, Loader } from "semantic-ui-react";
import ContactForm from "./ContactForm";

class Contact extends Component {
    state = {
        isLoading: false,
    };

    async componentDidMount() {
        this.setState({ isLoading: false });
    }

    render() {
        const { isLoading } = this.state;
        if (isLoading) {
            return (
                <Segment basic style={{ marginTop: window.innerHeight / 2 }}>
                    <Dimmer active inverted>
                        <Loader inverted size='huge'>
                            Loading
                        </Loader>
                    </Dimmer>
                </Segment>
            );
        } else {
            return (
                <Container>
                    <ContactForm />
                </Container>
            );
        }
    }
}

export default Contact;
