import { Link } from "react-router-dom";
import { Button, Footer, Spacer } from "@yakad/ui";

export default function FooterWrapper() {
    return (
        <Footer>
            <Link to="https://blog.natiq.net/privacy-policy" target="_blank">
                <Button variant="link">Privacy Policy</Button>
            </Link>
            <Spacer />
            <Link to="https://blog.natiq.net" target="_blank">
                <Button variant="link">Blog</Button>
            </Link>
            <Link to="https://blog.natiq.net/sponsor" target="_blank">
                <Button variant="link">Sponsor</Button>
            </Link>
            <Link
                to="https://github.com/natiq-foundation/nq-offline"
                target="_blank"
            >
                <Button variant="link">GitHub</Button>
            </Link>
        </Footer>
    );
}
