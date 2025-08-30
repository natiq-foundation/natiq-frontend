import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Container,
    Button,
    Screen,
    Main,
    AppBar,
    SvgIcon,
    Stack,
    H1,
    H2,
} from "@yakad/ui";
import { Symbol } from "@yakad/symbols";

import { isLocalhost } from "utils/isLocalhost";
import { ReactComponent as Logo } from "assets/svg/logoicon.svg";

export default function Offline() {
    const refresh = () => window.location.reload();

    const navigate = useNavigate();

    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
    useEffect(() => {
        ononline = () => setIsOnline(true);
        onoffline = () => setIsOnline(false);
    }, []);

    useEffect(() => {
        if (!isLocalhost && isOnline) navigate("/next", { replace: true });
    }, [isOnline, navigate]);

    return (
        <Screen>
            <OfflineAppBar />
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
                    <Stack align="center">
                        <Symbol size={12} icon="offline_bolt" />
                        <H2>You are offline</H2>
                    </Stack>
                    <Stack align="center">
                        <Button
                            variant="filled"
                            icon={<Symbol icon="refresh" />}
                            onClick={refresh}
                        >
                            Refresh
                        </Button>
                        <p style={{ margin: 0 }}>or</p>
                        <Link to="/">
                            <Button
                                variant="outlined"
                                icon={<Symbol icon="download_for_offline" />}
                            >
                                Use offline mode
                            </Button>
                        </Link>
                    </Stack>
                </Container>
            </Main>
        </Screen>
    );
}

const OfflineAppBar = () => (
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
    </AppBar>
);
