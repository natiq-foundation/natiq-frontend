import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingIcon } from "@yakad/ui";
import { QuranConfigProps } from ".";
import SurahHeader from "./surahHeader";
import SurahText from "./text";
import {
    SurahDetail,
    surahsRetrieve,
    translationsRetrieve,
    Translation,
    translationsAyahsList,
    PaginatedAyahTranslationList,
} from "@ntq/sdk";

const QuranView = ({ config }: { config: QuranConfigProps }) => {
    const navigate = useNavigate();

    const [surah, setSurah] = useState<SurahDetail | null>(null);
    const [translationAyahs, setTranslationAyahs] =
        useState<PaginatedAyahTranslationList | null>(null);

    const [translation, setTranslation] = useState<Translation | null>(null);

    useEffect(() => {
        navigate("/quran/" + config.surahUUID);
        setSurah(null);
        setTranslationAyahs(null);
        surahsRetrieve({ path: { uuid: config.surahUUID } })
            .then((data) => {
                setSurah(data.data || null);
                console.log(data.error);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [config.surahUUID]); //eslint-disable-line

    useEffect(() => {
        if (config.translationUUID) {
            translationsRetrieve({ path: { uuid: config.translationUUID } })
                .then((data) => {
                    setTranslation(data.data || null);
                })
                .catch((err) => {
                    console.error(err);
                });

            translationsAyahsList({
                path: { uuid: config.translationUUID },
                query: { surah_uuid: config.surahUUID },
            })
                .then((data) => {
                    setTranslationAyahs(data.data || null);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [config.surahUUID, config.translationUUID]); //eslint-disable-line

    return (
        <>
            {surah && translation && translationAyahs ? (
                <>
                    <SurahHeader
                        config={config}
                        surahData={surah}
                        bismillahTranslation={
                            translationAyahs?.[0].bismillah || ""
                        }
                    />
                    <SurahText
                        config={config}
                        surahData={surah}
                        translationData={translationAyahs || null}
                    />
                </>
            ) : (
                <LoadingIcon size="large" variant="dots" />
            )}
        </>
    );
};

export default QuranView;
