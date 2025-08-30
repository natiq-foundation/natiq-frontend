import { Spacer, Container, Row, H3, H1, H4 } from "@yakad/ui";
import { QuranConfigProps } from ".";
import SurahPeriodIcon from "components/surahPeriodIcon";
import { SurahDetail } from "@ntq/sdk";

const toArabic = (input: any) => input.toLocaleString("ar-EG");

const SurahHeader = (props: {
    config: QuranConfigProps;
    surahData: SurahDetail;
    bismillahTranslation: string;
}) => (
    <Container
        align="center"
        size="sm"
        style={{
            padding: "2rem",
            marginBottom: "2rem",
        }}
    >
        <Row>
            <span
                style={{
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    fontSize: "2rem",
                }}
            >
                {"Surah: " + props.surahData.number}
            </span>
            <Spacer />
            <H1
                variant="heading4"
                style={{
                    fontFamily: "hafs",
                }}
            >
                {(props.surahData.names[0] as any).name}
            </H1>
            {/* TODO: Is this ok? */}
            <SurahPeriodIcon period={props.surahData.period || "madani"} />
        </Row>
        {props.surahData.ayahs[0].is_bismillah? (
            <>
                <H3
                    style={{
                        fontFamily: "hafs",
                        textAlign: "center",
                        direction: "rtl",
                        fontSize: "4rem",
                        lineHeight: "4rem",
                        margin: "0",
                    }}
                >
                    {props.surahData.ayahs[0].text}
                    {" ﴿"}
                    {toArabic(props.surahData.ayahs[0].number)}
                    {"﴾"}
                </H3>
                {props.config.translationView ? (
                    <H4
                        style={{
                            direction: "ltr",
                            fontFamily: "sans-serif",
                            opacity: "0.8",
                        }}
                    >
                        {props.bismillahTranslation}
                        {" (" + props.surahData.ayahs[0].number + ")"}
                    </H4>
                ) : null}
            </>
        ) : (
            <>
                <H3
                    style={{
                        fontFamily: "hafs",
                        textAlign: "center",
                        direction: "rtl",
                        fontSize: "4rem",
                        lineHeight: "4rem",
                        margin: "0",
                    }}
                >
                    {props.surahData.ayahs[0].bismillah_text}
                </H3>
                {props.config.translationView ? (
                    <H4
                        style={{
                            direction: "ltr",
                            fontFamily: "sans-serif",
                            opacity: "0.8",
                        }}
                    >
                        {props.bismillahTranslation}
                    </H4>
                ) : null}
            </>
        )}
    </Container>
);

export default SurahHeader;
