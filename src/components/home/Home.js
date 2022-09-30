import React, { Component } from "react";
import {
    Grid,
    Container,
    Image,
    Segment,
    Dimmer,
    Loader,
} from "semantic-ui-react";

class Home extends Component {
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
            const {} = this.state;
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
                                <Segment color="blue">
                                <p>
                                    This project demonstrates (in a simplified
                                    form) the principles of anti-fraud systems
                                    in the financial sector. For this project,
                                    we will work on a system with an expanded
                                    role model, a set of REST endpoints
                                    responsible for interacting with users, and
                                    an internal transaction validation logic
                                    based on a set of heuristic rules.
                                </p>
                                <p>
                                    You can find the complete code on{" "}
                                    <a href='https://github.com/dan-koller/Spring-Anti-Fraud-System'>
                                        Github
                                    </a>
                                    .
                                </p>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    {/* Other projects heading */}
                    <Grid stackable columns={1}>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                                <h1>More projects</h1>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    {/* Other projects */}
                    <Grid stackable columns={3}>
                        <Grid.Row>
                            {/* First project */}
                            <Grid.Column textAlign='center'>
                                <Image
                                    src='https://raw.githubusercontent.com/dan-koller/Spring-Code-Sharing-Platform/main/img.png'
                                    style={{ marginTop: "2em", height: "150px", resizeMode: "contain" }}
                                />
                                <div class='card-body text-center'>
                                    <h6 class='card-title'>
                                        Code Sharing Platform
                                    </h6>
                                    <a
                                        href='https://github.com/dan-koller/Spring-Code-Sharing-Platform'
                                        class='btn btn-primary btn-sm'
                                    >
                                        Github
                                    </a>
                                </div>
                            </Grid.Column>
                            {/* Second project */}
                            <Grid.Column textAlign='center'>
                                <Image
                                    src='https://dan-koller.github.io/src/images/api-coding.jpg'
                                    style={{ marginTop: "2em", height: "150px", resizeMode: "contain" }}
                                />
                                <div class='card-body text-center'>
                                    <h6 class='card-title'>
                                        Spring Accounting service
                                    </h6>
                                    <a
                                        href='https://github.com/dan-koller/Spring-Accounting-Service'
                                        class='btn btn-primary btn-sm'
                                    >
                                        Github
                                    </a>
                                </div>
                            </Grid.Column>
                            {/* Thirdproject */}
                            <Grid.Column textAlign='center'>
                                <Image
                                    src='https://raw.githubusercontent.com/dan-koller/Flask-Weather-App/main/res/weather-app-screenshot.png'
                                    style={{ marginTop: "2em", height: "150px", resizeMode: "contain" }}
                                />
                                <div class='card-body text-center'>
                                    <h6 class='card-title'>
                                        Flask Weather App
                                    </h6>
                                    <a
                                        href='https://github.com/dan-koller/Flask-Weather-App'
                                        class='btn btn-primary btn-sm'
                                    >
                                        Github
                                    </a>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            );
        }
    }
}

export default Home;
