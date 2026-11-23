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

    const [loading, setLoading] = useState<boolean>(true);
    const [surah, setSurah] = useState<SurahDetail | null>(null);
    const [translationAyahs, setTranslationAyahs] =
        useState<PaginatedAyahTranslationList | null>(null);

    const [translation, setTranslation] = useState<Translation | null>(null);

    useEffect(() => {
        navigate("/quran/" + config.surahID);
        setLoading(true);
        setSurah(null);
        setTranslationAyahs(null);
        surahsRetrieve({ path: { id: config.surahID } })
            .then((data) => {
                setSurah(data.data || null);
                setLoading(false);
                console.log(data.error);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [config.surahID]); //eslint-disable-line

    useEffect(() => {
        setLoading(true);
        if (config.translationID) {
            translationsRetrieve({ path: { id: config.translationID } })
                .then((data) => {
                    setTranslation(data.data || null);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                });

            translationsAyahsList({
                path: { id: config.translationID },
                query: { surah_id: config.surahID },
            })
                .then((data) => {
                    setLoading(false);
                    setTranslationAyahs(data.data || null);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [config.surahID, config.translationID]); //eslint-disable-line

    return (
        <>
            {loading || !surah ? (
                <LoadingIcon size="large" variant="dots" />
            ) : (
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
                        translationData={translationAyahs}
                    />
                </>
            )}
        </>
    );
};

export default QuranView;
