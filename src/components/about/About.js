import { Component } from "react";
import { Grid, Container, Segment, Dimmer, Loader } from "semantic-ui-react";

class About extends Component {
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
                <Container text>
                    {/* Main heading */}
                    <Grid stackable columns={1}>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                                <h1>Anti-Fraud System</h1>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    {/* Project description */}
                    <Grid stackable columns={1}>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                                <Segment color='teal'>
                                    <p>
                                        This project demonstrates (in a
                                        simplified form) the principles of
                                        anti-fraud systems in the financial
                                        sector. For this project, we will work
                                        on a system with an expanded role model,
                                        a set of REST endpoints responsible for
                                        interacting with users, and an internal
                                        transaction validation logic based on a
                                        set of heuristic rules.
                                    </p>
                                    <p>
                                        The system is mainly divided into two
                                        parts: the front-end and the back-end.
                                        The front-end is responsible for the
                                        interaction with the user, and the
                                        back-end is responsible for the
                                        interaction with the database and the
                                        validation of the transactions.
                                    </p>
                                    <p>
                                        The frontend is a web application built
                                        with React and Semantic UI. The backend
                                        is a REST API built with Spring Boot and
                                        Spring Security that uses a MySQL
                                        database.
                                    </p>
                                    <p>
                                        You can find the complete code for the{" "}
                                        <a href='https://github.com/dan-koller/React-Anti-Fraud-Frontend'>
                                            frontend
                                        </a>{" "}
                                        and{" "}
                                        <a href='https://github.com/dan-koller/Spring-Anti-Fraud-System'>
                                            backend
                                        </a>{" "}
                                        on GitHub.
                                    </p>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            );
        }
    }
}

export default About;
