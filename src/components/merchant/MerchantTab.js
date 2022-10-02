import React from "react";
import { Tab } from "semantic-ui-react";
import PostTransactionForm from "./PostTransactionForm";

function MerchantTab() {
    const panes = [
        {
            menuItem: {
                key: "transactions",
                icon: "money bill alternate",
                content: "New transaction",
            },
            render: () => (
                <Tab.Pane>
                    <PostTransactionForm />
                </Tab.Pane>
            ),
        },
    ];

    return <Tab menu={{ attached: "top" }} panes={panes} />;
}

export default MerchantTab;
