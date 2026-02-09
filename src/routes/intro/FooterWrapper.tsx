import { Link } from "react-router-dom";
import { Button, Footer, Spacer } from "@yakad/ui";

export default function FooterWrapper() {
    return (
        <Footer>
            <Link to="https://natiq.org/privacy-policy" target="_blank">
                <Button variant="link">Privacy Policy</Button>
            </Link>
            <Spacer />
            <Link to="https://natiq.org" target="_blank">
                <Button variant="link">Blog</Button>
            </Link>
            <Link to="https://natiq.org/sponsor" target="_blank">
                <Button variant="link">Sponsor</Button>
            </Link>
            <Link to="https://github.com/natiq-foundation" target="_blank">
                <Button variant="link">GitHub</Button>
            </Link>
        </Footer>
    );
}
