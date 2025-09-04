import {
    AppBar,
    Container,
    Screen,
    Main,
    SvgIcon,
    Stack,
    H1,
    H2,
} from "@yakad/ui";
import { ReactComponent as Logo } from "assets/svg/logoicon.svg"; // TO DO

export default function Apps() {
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
    </AppBar>
);
