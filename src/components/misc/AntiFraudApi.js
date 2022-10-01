import axios from "axios";
import { config } from "../../Constants";

export const antiFraudApi = {
    authenticate,
    signup,
    // Administator
    deleteUser,
    getUserList,
    updateUserRole,
    updateUserAccess,
    // Merchant
    postTransaction,
    // Support
};

// Authenticate user
function authenticate(username, password) {
    return instance.post(
        "/api/auth/login",
        { username, password },
        { headers: { "Content-type": "application/json" } }
    );
}

// Signup new user
function signup(user) {
    return instance.post("/api/auth/user", user, {
        headers: { "Content-type": "application/json" },
    });
}

// -- Administrative tasks --

// Remove existing users
function deleteUser(user, username) {
    return instance.delete(`/api/auth/user/${username}`, {
        headers: { Authorization: basicAuth(user) },
    });
}

// Get a list of active users
function getUserList(user) {
    return instance.get("/api/auth/list", {
        headers: { Authorization: basicAuth(user) },
    });
}

// Update role of an existing user
function updateUserRole(user, username, role) {
    return instance.put(
        "/api/auth/role",
        { username, role },
        { headers: { Authorization: basicAuth(user) } }
    );
}

// Update access level of an existing user (LOCK/UNLOCK)
function updateUserAccess(user, username, access) {
    return instance.put(
        "/api/auth/access",
        { username, access },
        { headers: { Authorization: basicAuth(user) } }
    );
}

// -- Merchant tasks --

// Post new transaction
function postTransaction(user, transaction) {
    return instance.post("/api/transactions", transaction, {
        // User must be authenticated
        headers: {
            Authorization: basicAuth(user),
            "Content-type": "application/json",
        },
    });
}

// -- Support tasks --

// Post or Delete a suspicious ip address based on the selected action (ADD/REMOVE)
function postOrDeleteSuspiciousIp(user, ip, action) {
    return instance[action](`/api/suspicious/${ip}`, null, {
        headers: { Authorization: basicAuth(user) },
    });
}

// Post or Delete a stolen card based on the selected action (ADD/REMOVE)
function postOrDeleteStolenCard(user, card, action) {
    return instance[action](`/api/stolen/${card}`, null, {
        headers: { Authorization: basicAuth(user) },
    });
}

// Get the transaction history of a specific card number
function getTransactionHistory(user, card) {
    return instance.get(`/api/transactions/${card}`, {
        headers: { Authorization: basicAuth(user) },
    });
}

// Get the complete transaction history
function getFullTransactionHistory(user) {
    return instance.get("/api/transactions", {
        headers: { Authorization: basicAuth(user) },
    });
}

// Review transactions
function reviewTransaction(user, transaction) {
    return instance.put(
        `/api/transactions/${transaction.id}`,
        { status: transaction.status },
        { headers: { Authorization: basicAuth(user) } }
    );
}

// -- Axios instance --

// Create axios instance and set default config
const instance = axios.create({
    baseURL: config.url.API_BASE_URL,
});

// -- Helper functions --

// Handle basic auth for all requests
function basicAuth(user) {
    return `Basic ${user.authdata}`;
}
