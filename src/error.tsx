import { Link, useParams } from "react-router-dom";
import { Button, Container, H1, Main, Screen, SvgIcon } from "@yakad/ui";
import { ReactComponent as LogoIcon } from "./assets/svg/logoicon.svg";

const Error = (props: { status?: number }) => {
    const params = useParams();

    return (
        <Screen>
            <Main>
                <Container
                    align="center"
                    size="sm"
                    style={{ marginTop: "5rem", gap: "2rem" }}
                >
                    <SvgIcon size={14}>
                        <LogoIcon />
                    </SvgIcon>
                    <H1>Error Accord: {params.status || props.status}</H1>
                    <Link to="/">
                        <Button variant="outlined">Back to home</Button>
                    </Link>
                </Container>
            </Main>
        </Screen>
    );
};

export default Error;
