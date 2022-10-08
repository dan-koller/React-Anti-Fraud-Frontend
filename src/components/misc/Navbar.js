import React from "react";
import { Link } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { getUser, userIsAuthenticated, userLogout } = useAuth();

    const logout = () => {
        userLogout();
    };

    const enterMenuStyle = () => {
        return userIsAuthenticated()
            ? { display: "none" }
            : { display: "block" };
    };

    const logoutMenuStyle = () => {
        return userIsAuthenticated()
            ? { display: "block" }
            : { display: "none" };
    };

    const adminPageStyle = () => {
        const user = getUser();
        return user && user.role === "ADMINISTRATOR"
            ? { display: "block" }
            : { display: "none" };
    };

    const merchantPageStyle = () => {
        const user = getUser();
        return user && user.role === "MERCHANT"
            ? { display: "block" }
            : { display: "none" };
    };

    const supportPageStyle = () => {
        const user = getUser();
        return user && user.role === "SUPPORT"
            ? { display: "block" }
            : { display: "none" };
    };

    const getUserName = () => {
        const user = getUser();
        return user ? user.name : "";
    };

    return (
        <Menu
            inverted
            color='teal'
            stackable
            size='massive'
            style={{ borderRadius: 0 }}
        >
            <Container>
                <Menu.Item header>Anti-Fraud System</Menu.Item>
                <Menu.Item as={Link} exact='true' to='/'>
                    Home
                </Menu.Item>
                <Menu.Item as={Link} to='/about' style={enterMenuStyle()}>
                    About
                </Menu.Item>
                <Menu.Item as={Link} to='/contact' style={enterMenuStyle()}>
                    Contact
                </Menu.Item>
                <Menu.Item as={Link} to='/admin' style={adminPageStyle()}>
                    Administration
                </Menu.Item>
                <Menu.Item as={Link} to='/merchant' style={merchantPageStyle()}>
                    Merchant
                </Menu.Item>
                <Menu.Item as={Link} to='/support' style={supportPageStyle()}>
                    Support
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item as={Link} to='/login' style={enterMenuStyle()}>
                        Login
                    </Menu.Item>
                    <Menu.Item as={Link} to='/signup' style={enterMenuStyle()}>
                        Sign Up
                    </Menu.Item>
                    <Menu.Item
                        header
                        style={logoutMenuStyle()}
                    >{`Hello, ${getUserName()}`}</Menu.Item>
                    <Menu.Item
                        as={Link}
                        to='/'
                        style={logoutMenuStyle()}
                        onClick={logout}
                    >
                        Logout
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    );
}

export default Navbar;
