import { Link } from "react-router-dom";
import { PaginatedSurahList, surahsList} from "@ntq/sdk";
import { Main, Screen, Spacer, Button, Footer, Row, LoadingIcon, H1, H2 } from "@yakad/ui";
import { Xbackground, XgetStart } from "@yakad/x";

import Search from "./search";
import IntroAppBar from "./appBar";
import { ReactComponent as LogoIcon } from "assets/svg/logoicon.svg";
import JumpToSearchFieldButton from "components/jumpToSearchFieldButton";
import LastReadingButton from "components/lastReadingButton";
import { useEffect, useState } from "react";

const Intro = () => {
    const [surahList, setSurahList] = useState<PaginatedSurahList | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        surahsList({query: {mushaf: "hafs", limit: 200}}).then(data => {
            setSurahList(data.data || null);
        }).catch(err => {
            console.error(err)
        })
        .finally(() => setLoading(false));
    }, []);

    return (
        <Screen>
            <IntroAppBar />
            <Main style={{minHeight: "100%"}}>
                <Xbackground variant="dotted">
                    <XgetStart logo={<LogoIcon />}>
                        <IntroGetStartBox />
                    </XgetStart>
                </Xbackground>
                {loading ? (
                    <LoadingIcon variant="dots" size="large" />
                ) : surahList ? (
                    <Search surahList={surahList} />
                ) : (
                    <div>Error loading surah list.</div>
                )}
            </Main>
            <IntroFooter />
        </Screen>
    );
};

const IntroGetStartBox = () => (
    <>
        <H1
            style={{
                fontFamily: "Hafs",
                textAlign: "center",
                margin: "0",
            }}
        >
            <span
                style={{
                    fontSize: "7rem",
                }}
            >
                الْقُرآنُ{" "}
            </span>
            <span style={{ fontSize: "7.7rem", color: "#aa8a59" }}>
                النّاطِق
            </span>
        </H1>
        <H2 style={{ margin: "1rem" }}>Natiq Offline</H2>
        <p
            style={{
                fontSize: "1.7rem",
                textAlign: "center",
                marginBottom: "2rem",
            }}
        >
            Read Quran in Natiq offline mode.
        </p>
        <Row align="center">
            <JumpToSearchFieldButton />
            <LastReadingButton />
        </Row>
        <p style={{ color: "#7d7d7d" }}>Suitable for all ages</p>
        <a target="blank" href="https://blog.natiq.net/privacy-policy">
            Privacy Policy
        </a>
    </>
);

const IntroFooter = () => (
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
        <Link to="https://github.com/NatiqQuran/nq-offline" target="_blank">
            <Button variant="link">GitHub</Button>
        </Link>
    </Footer>
);

export default Intro;
