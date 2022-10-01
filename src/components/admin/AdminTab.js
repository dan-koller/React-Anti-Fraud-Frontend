import React from "react";
import { Tab } from "semantic-ui-react";
import AddUserForm from "./AddUserForm";
import UpdateAccessForm from "./UpdateAccessForm";
import UpdateRoleForm from "./UpdateRoleForm";
import UserTable from "./UserTable";

function AdminTab(props) {
    const { handleInputChange } = props;
    const {
        isUsersLoading,
        users,
        userUsernameSearch,
        handleDeleteUser,
        handleSearchUser,
    } = props;
    const {} = props;

    const panes = [
        {
            menuItem: { key: "users", icon: "users", content: "All users" },
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <UserTable
                        users={users}
                        userUsernameSearch={userUsernameSearch}
                        handleInputChange={handleInputChange}
                        handleDeleteUser={handleDeleteUser}
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
                content: "Update role",
            },
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <UpdateRoleForm />
                </Tab.Pane>
            ),
        },
        {
            menuItem: {
                key: "users",
                icon: "unlock alternate",
                content: "Update access",
            },
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <UpdateAccessForm />
                </Tab.Pane>
            ),
        },
    ];

    return <Tab menu={{ attached: "top" }} panes={panes} />;
}

export default AdminTab;
