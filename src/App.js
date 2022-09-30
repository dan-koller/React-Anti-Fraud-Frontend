import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import PrivateRoute from "./components/misc/PrivateRoute";
import Navbar from "./components/misc/Navbar";
import Home from "./components/home/Home";
import Login from "./components/home/Login";
import Signup from "./components/home/Signup";
import AdminPage from "./components/admin/AdminPage";
import MerchantPage from "./components/merchant/MerchantPage";
import SupportPage from "./components/support/SupportPage";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Route path='/' exact component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
                <PrivateRoute path='/admin' component={AdminPage} />
                <PrivateRoute path='/merchant' component={MerchantPage} />
                <PrivateRoute path='/support' component={SupportPage} />
            </Router>
        </AuthProvider>
    );
}

export default App;
