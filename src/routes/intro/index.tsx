import { useEffect, useState } from "react";
import { PaginatedSurahList, surahsList } from "@ntq/sdk";
import { Main, Screen, Row, LoadingIcon, H1, H2 } from "@yakad/ui";
import { Xbackground, XgetStart } from "@yakad/x";
import { ReactComponent as LogoIcon } from "assets/svg/logoicon.svg";
import JumpToSearchFieldButton from "components/jumpToSearchFieldButton";
import LastReadingButton from "components/lastReadingButton";
import AppBarWrapper from "./AppBarWrapper";
import SearchSection from "./SearchSection";
import FooterWrapper from "./FooterWrapper";

export default function Intro() {
    const [surahList, setSurahList] = useState<PaginatedSurahList | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        surahsList({ query: { mushaf: "hafs", limit: 200 } })
            .then((data) => {
                setSurahList(data.data || null);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <Screen>
            <AppBarWrapper />
            <Main style={{ minHeight: "100%" }}>
                <Xbackground variant="dotted">
                    <XgetStart logo={<LogoIcon />}>
                        <IntroGetStartBox />
                    </XgetStart>
                </Xbackground>
                {loading ? (
                    <LoadingIcon variant="dots" size="large" />
                ) : surahList ? (
                    <SearchSection surahList={surahList} />
                ) : (
                    <div>Error loading surah list.</div>
                )}
            </Main>
            <FooterWrapper />
        </Screen>
    );
}

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
        <H2 style={{ margin: "1rem" }}>Natiq Quran</H2>
        <p
            style={{
                fontSize: "1.7rem",
                textAlign: "center",
                marginBottom: "2rem",
            }}
        >
            Natiq Foundation PWA Quran App.
        </p>
        <Row align="center">
            <JumpToSearchFieldButton />
            <LastReadingButton />
        </Row>
        <p style={{ color: "#7d7d7d" }}>Suitable for all ages</p>
        <a target="blank" href="https://natiq.org/privacy-policy">
            Privacy Policy
        </a>
    </>
);
