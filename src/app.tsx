import { Theme } from "@yakad/ui";

import Router from "./router";
import "./assets/css/style.css";
import { client } from "@ntq/sdk";

client.setConfig({
    baseURL: process.env.REACT_APP_API_URL || "https://api.natiq.net",
})

const App = () => (
    <Theme>
        <Router />
    </Theme>
);

export default App;
