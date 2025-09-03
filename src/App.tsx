import { Theme } from "@yakad/ui";

import Router from "./router";
import "./assets/css/style.css";
import { client } from "@ntq/sdk";

client.setConfig({
    baseURL: process.env.REACT_APP_API_URL || "https://api.natiq.net",
});

export default function App() {
    return (
        <Theme>
            <Router />
        </Theme>
    );
}
