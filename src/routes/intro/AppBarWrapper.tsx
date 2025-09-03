import { AppBar, H1, Spacer, SvgIcon } from "@yakad/ui";
import { ReactComponent as LogoIcon } from "assets/svg/logoicon.svg";
import GoOnlineButton from "../../components/goOnlineButton";

export default function AppBarWrapper() {
    return (
        <AppBar>
            <SvgIcon size={5}>
                <LogoIcon />
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
            <GoOnlineButton />
        </AppBar>
    );
}
