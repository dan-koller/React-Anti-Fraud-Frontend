import React from "react";
import { Tab } from "semantic-ui-react";
import UserTable from "../admin/UserTable";
import AddUserForm from "../admin/AddUserForm";
import ManageIpForm from "./ManageIpForm";
import IpTable from "./IpTable";

function SupportTab(props) {
    const { handleInputChange } = props;
    const {
        isSupport,
        isUsersLoading,
        users,
        userUsernameSearch,
        handleSearchUser,
        ips,
        ipAddressSearch,
        handleSearchIp,
        handleDeleteIp,
    } = props;
    const {} = props;

    const panes = [
        {
            menuItem: { key: "users", icon: "users", content: "All users" },
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <UserTable
                        isSupport={isSupport}
                        users={users}
                        userUsernameSearch={userUsernameSearch}
                        handleInputChange={handleInputChange}
                        handleSearchUser={handleSearchUser}
                    />
                </Tab.Pane>
            ),
        },
        {
            menuItem: { key: "users", icon: "user plus", content: "Add user" },
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <AddUserForm />
                </Tab.Pane>
            ),
        },
        {
            menuItem: {
                key: "users",
                icon: "key",
                content: "Manage IP addresses",
            },
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <ManageIpForm />
                    <br />
                    <h3>Currently blocked IP addresses</h3>
                    <IpTable
                        isSupport={isSupport}
                        ips={ips}
                        ipAddressSearch={ipAddressSearch}
                        handleSearchIp={handleSearchIp}
                        handleDeleteIp={handleDeleteIp}
                        handleInputChange={handleInputChange}
                    />
                </Tab.Pane>
            ),
        },
        {
            menuItem: {
                key: "users",
                icon: "unlock alternate",
                content: "Manage cards",
            },
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <p>Manage cards</p>
                </Tab.Pane>
            ),
        },
        {
            menuItem: {
                key: "users",
                icon: "unlock alternate",
                content: "Transactions",
            },
            render: () => (
                // TODO: Implement search like user search
                <Tab.Pane loading={isUsersLoading}>
                    <p>Transactions</p>
                </Tab.Pane>
            ),
        },
        {
            menuItem: {
                key: "users",
                icon: "unlock alternate",
                content: "Review transactions",
            },
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <p>Review transactions</p>
                </Tab.Pane>
            ),
        },
    ];

    return <Tab menu={{ attached: "top" }} panes={panes} />;
}

export default SupportTab;
