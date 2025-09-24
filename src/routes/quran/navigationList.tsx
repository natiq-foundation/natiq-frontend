import { useEffect, useState } from "react";
import {
    Surah,
    surahsList,
    mushafsList,
    translationsList,
    PaginatedTranslationListList,
} from "@ntq/sdk";
import {
    List,
    ListItem,
    Button,
    Spacer,
    Row,
    LoadingIcon,
    Select,
    CheckBox,
} from "@yakad/ui";
import { QuranConfigProps } from ".";
import { selectDefaultTranslationUUIDFromList } from "./config";

interface CollapseList {
    [n: number]: boolean;
}

export default function NavigationList(props: {
    config: QuranConfigProps;
    setConfig: any;
}) {
    const [collapsedList, setcollapsedList] = useState<CollapseList>({});

    const handleClickCollapseList = (index: number) =>
        setcollapsedList((object) => ({
            ...object,
            [index]: object[index] ? !object[index] : true,
        }));

    const listObjects = [
        {
            name: "Quran",
            navListItems: (
                <NavListItemsQuran
                    config={props.config}
                    setConfig={props.setConfig}
                />
            ),
        },
        // {
        //     name: "Arabic Text",
        //     navListItems: (
        //         <NavListItemsArabicText
        //             config={props.config}
        //             setConfig={props.setConfig}
        //         />
        //     ),
        // },
        {
            name: "Translation",
            navListItems: (
                <NavListItemsTranslation
                    config={props.config}
                    setConfig={props.setConfig}
                />
            ),
        },
    ];

    return (
        <List direction="column">
            {listObjects.map((item, index) => (
                <ListItem key={index}>
                    <Button
                        size="medium"
                        variant={collapsedList[index] ? "text" : "elevated"}
                        borderStyle="semi"
                        onClick={() => handleClickCollapseList(index)}
                        style={{
                            marginInlineEnd: "1rem",
                        }}
                    >
                        {item.name}
                        <Spacer />
                    </Button>
                    <List
                        collapsed={collapsedList[index]}
                        direction="column"
                        style={{
                            padding: "1rem 1rem 2rem",
                        }}
                    >
                        {item.navListItems}
                    </List>
                </ListItem>
            ))}
        </List>
    );
}

const NavListItemsQuran = ({
    config,
    setConfig,
}: {
    config: QuranConfigProps;
    setConfig: any;
}) => {
    const [surahList, setSurahList] = useState<Surah[] | null>(null);

    useEffect(() => {
        surahsList({ query: { mushaf: "hafs", limit: 115 } })
            .then((data) => {
                setSurahList(data.data || null);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []); //eslint-disable-line

    return (
        <>
            <ListItem>
                {surahList ? (
                    <>
                        <Select
                            variant="filled"
                            name="surahUUID"
                            placeholder="Surah"
                            defaultValue={config.surahUUID}
                            onChange={(e) =>
                                setConfig({
                                    ...config,
                                    surahUUID: e.target.value,
                                })
                            }
                        >
                            {surahList.map((surah) => (
                                <option key={surah.uuid} value={surah.uuid}>
                                    {surah.number +
                                        " - " +
                                        (surah.names[0] as any).name}
                                </option>
                            ))}
                        </Select>
                        <Select
                            variant="filled"
                            name="ayahNumber"
                            placeholder="Ayah Number"
                            defaultValue={config.ayahNumber}
                            onChange={(e) =>
                                setConfig({
                                    ...config,
                                    ayahNumber: e.target.value,
                                })
                            }
                        >
                            {surahList.map(
                                (surah) =>
                                    surah.uuid === config.surahUUID &&
                                    Array.from({
                                        length: parseInt(surah.number_of_ayahs), // FIX this
                                    }).map((_, index) => (
                                        <option key={index} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))
                            )}
                        </Select>
                    </>
                ) : (
                    <LoadingIcon variant="dots" />
                )}
            </ListItem>
        </>
    );
};

const NavListItemsArabicText = (props: {
    config: QuranConfigProps;
    setConfig: any;
}) => (
    <>
        <ListItem>
            <Row style={{ height: "3.2rem" }}>
                <span>Show:</span>
                <Spacer />
                <input type="checkbox" name="showArabic" />
            </Row>
        </ListItem>
        <ListItem>
            <Row style={{ height: "3.2rem" }}>
                <span>Tajweed:</span>
                <Spacer />
                <input type="checkbox" name="showArabic" />
            </Row>
        </ListItem>
        <ListItem>
            <Select variant="filled" placeholder="Font:" disabled>
                <option value="1">FontName</option>
            </Select>
        </ListItem>
    </>
);

const NavListItemsTranslation = (props: {
    config: QuranConfigProps;
    setConfig: any;
}) => {
    const [translationList, setTranslationList] =
        useState<PaginatedTranslationListList | null>(null);

    useEffect(() => {
        mushafsList().then((response) => {
            translationsList({
                query: {
                    mushaf: "hafs",
                },
            })
                .then((data) => {
                    setTranslationList(data.data || null);
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    }, []); // eslint-disable-line

    //Set a Translation as Default if no one selected before
    useEffect(() => {
        if (translationList) {
            if (props.config.translationUUID === undefined)
                props.setConfig({
                    ...props.config,
                    translationUUID:
                        selectDefaultTranslationUUIDFromList(translationList),
                });
        }
    }, [translationList]); //eslint-disable-line

    return (
        <>
            <ListItem>
                <CheckBox
                    label="Show:"
                    name="translationView"
                    defaultChecked={props.config.translationView}
                    onChange={(e) =>
                        props.setConfig({
                            ...props.config,
                            translationView: e.target.checked,
                        })
                    }
                />
            </ListItem>
            <ListItem>
                {translationList && props.config.translationUUID ? (
                    <Select
                        variant="filled"
                        placeholder="Translation"
                        defaultValue={
                            props.config.translationUUID
                                ? props.config.translationUUID
                                : undefined
                        }
                        onChange={(e) =>
                            props.setConfig({
                                ...props.config,
                                translationUUID: e.target.value,
                            })
                        }
                    >
                        {translationList.map((translation) => (
                            <option
                                key={translation.uuid}
                                value={translation.uuid}
                            >
                                {translation.language +
                                    " - " +
                                    translation.translator_uuid}
                            </option>
                        ))}
                    </Select>
                ) : (
                    <LoadingIcon variant="dots" />
                )}
            </ListItem>
        </>
    );
};
