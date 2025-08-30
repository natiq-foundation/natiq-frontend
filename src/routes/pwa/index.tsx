import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    AppBar,
    Container,
    Button,
    Screen,
    Main,
    SvgIcon,
    Spacer,
    Stack,
    H1,
    H2,
} from "@yakad/ui";
import { Symbol } from "@yakad/symbols";

import { isLocalhost } from "utils/isLocalhost";
import { ReactComponent as Logo } from "assets/svg/logoicon.svg";

export default function Pwa() {
    const navigate = useNavigate();

    const isPwaIntroPagePassed: boolean =
        localStorage.getItem("pwaIntroPassed") === "true";

    const navigateTo = () => {
        navigator.onLine
            ? navigate("/next", { replace: true })
            : navigate("/offline", { replace: true });
    };

    useEffect(() => {
        if (isPwaIntroPagePassed)
            if (!isLocalhost || window.confirm("Confirm navigate."))
                navigateTo();
    }, []); //eslint-disable-line

    const launch = () => {
        localStorage.setItem("pwaIntroPassed", "true");
        navigateTo();
    };

    return (
        <Screen>
            <PwaAppBar />
            <Main>
                <Container
                    size="sm"
                    align="center"
                    style={{
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        minHeight: "calc(100vh - 6rem)",
                        paddingTop: "3rem",
                        paddingBottom: "3rem",
                    }}
                >
                    <Stack align="center" style={{ gap: 0 }}>
                        <SvgIcon size={15}>
                            <Logo />
                        </SvgIcon>
                        <H2>Natiq PWA</H2>
                        <p>Wellcome to Natiq PWA mode</p>
                        <ul style={{ textAlign: "start" }}>
                            <li>Use like your native apps</li>
                            <li>Read Quran when offline</li>
                            <li>Keep a Quran text in your system</li>
                            <li>Full access to web version feathers</li>
                        </ul>
                    </Stack>
                    <Stack align="center" style={{ gap: 0 }}>
                        <Button
                            variant="filled"
                            icon={<Symbol icon="start" />}
                            onClick={launch}
                        >
                            Launch Natiq
                        </Button>
                        <p>or</p>
                        <Link to="https://blog.natiq.net" target="_blank">
                            <Button
                                variant="link"
                                icon={<Symbol icon="read_more" />}
                            >
                                Read more
                            </Button>
                        </Link>
                    </Stack>
                </Container>
            </Main>
        </Screen>
    );
}

const PwaAppBar = () => (
    <AppBar>
        <SvgIcon size={5}>
            <Logo />
        </SvgIcon>
        <H1
            style={{
                fontFamily: "arial",
                fontSize: "2.4rem",
                fontWeight: "normal",
                letterSpacing: "0.1rem",
            }}
        >
            Natiq
        </H1>
        <Spacer />
        <Link to="/">
            <Button
                variant="outlined"
                icon={<Symbol icon="download_for_offline" />}
            >
                Offline mode
            </Button>
        </Link>
    </AppBar>
);
