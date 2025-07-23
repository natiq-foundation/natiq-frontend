import React from "react";
import {
    SurahsViewResponseAyah,
    SurahsViewResponseData,
    TranslationsViewResponseData,
} from "@ntq/sdk";
import { Container, Stack } from "@yakad/ui";
import { QuranConfigProps } from ".";

// import { QuranConfigProps } from ".";

const toArabic = (str: any) => str.toLocaleString("ar-EG");

interface SurahTextProps {
    config: QuranConfigProps;
    surahData: SurahsViewResponseData;
    translationData: TranslationsViewResponseData;
}

const SurahText = ({ surahData,config, translationData}: SurahTextProps) => (
    <Container
        size="md"
        dir="rtl"
        style={{
            display: "block",
            textAlign: "justify",
        }}
    >
        {surahData.ayahs
            .slice(surahData.ayahs[0].is_bismillah ? 1 : 0)
            .map((ayah: any) =>
                config.translationView ? (
                    <AyahBox key={ayah.number}>
                        <AyahText ayah={ayah} />
                        <AyahTranslation
                            translationText={
                                translationData.ayahs[ayah.number - 1]?.text || "Translation text for this ayah not found!"  
                            }
                        />
                    </AyahBox>
                ) : (
                    <AyahText key={ayah.number} ayah={ayah} />
                )
            )}
    </Container>
);

interface AyahBoxProps {
    children?: React.ReactNode;
}

const AyahBox = ({ children }: AyahBoxProps) => (
    <Stack
        style={{
            width: "100%",
            padding: "1rem",
            borderInlineEnd: "0.3rem solid #7d7d7d40",
            marginBottom: "5rem",
        }}
    >
        {children}
    </Stack>
);

const AyahText = ({ ayah }: { ayah: SurahsViewResponseAyah }) => (
    <span
        style={{
            fontFamily: "hafs",
            fontSize: "3.5rem",
            lineHeight: "7rem",
        }}
    >
        {ayah.text}
        {ayah.sajdah === "vajib" && (
            <span
                title="Vajib Sajdah"
                style={{ cursor: "help", fontWeight: "bold" }}
            >
                ۩
            </span>
        )}
        {ayah.sajdah === "mustahab" && (
            <span title="Mustahab Sajdah" style={{ cursor: "help" }}>
                ۩
            </span>
        )}
        <span>{` ﴿${toArabic(ayah.number)}﴾ `}</span>
    </span>
);

interface AyahTranslationProps {
    translationText: string;
}

const AyahTranslation = ({ translationText }: AyahTranslationProps) => (
    <span
        style={{
            direction: "ltr",
            fontFamily: "sans-serif",
            fontSize: "1.8rem",
            lineHeight: "3rem",
            textAlign: "justify",
            textAlignLast: "right",
            opacity: "0.8",
        }}
    >
        {translationText}
    </span>
);

export default SurahText;