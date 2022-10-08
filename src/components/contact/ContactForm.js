import { Component } from "react";
import { Button, Form, Grid, Segment, Message } from "semantic-ui-react";

// Create a contact form component
class ContactForm extends Component {
    // Create a state object
    state = {
        name: "",
        email: "",
        message: "",
        isSent: false,
    };

    // Create a function to handle form submission
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.setState({ isSent: true });
    };

    // Create a function to handle form input changes
    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // Render the contact form component
    render() {
        const { name, email, message, isSent } = this.state;
        return (
            // Add a header
            <Grid textAlign='center'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <h2>Leave a message</h2>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Segment>
                            <Form.Input
                                fluid
                                autoFocus
                                name='name'
                                icon='user'
                                iconPosition='left'
                                placeholder='Your name'
                                onChange={this.handleInputChange}
                            />
                            <Form.Input
                                fluid
                                name='email'
                                icon='mail'
                                iconPosition='left'
                                placeholder='Your email'
                                onChange={this.handleInputChange}
                            />
                            <Form.TextArea
                                fluid
                                name='message'
                                icon='lock'
                                iconPosition='left'
                                placeholder='Your message'
                                onChange={this.handleInputChange}
                            />
                            <Button color='teal' fluid size='large'>
                                Send
                            </Button>
                        </Segment>
                    </Form>
                    {isSent && (
                        <Message positive>
                            <Message.Header>
                                Your message has been sent!
                            </Message.Header>
                            <p>
                                Thank you for contacting us. We will get back to
                                you as soon as possible.
                            </p>
                        </Message>
                    )}
                </Grid.Column>
            </Grid>
        );
    }
}

export default ContactForm;
