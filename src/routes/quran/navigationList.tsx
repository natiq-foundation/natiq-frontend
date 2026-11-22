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
import { selectDefaultTranslationIDFromList } from "./config";

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
        surahsList({ query: { rasm_ol_mushaf: "hafs", limit: 115 } })
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
                            name="surahID"
                            placeholder="Surah"
                            defaultValue={config.surahID}
                            onChange={(e) =>
                                setConfig({
                                    ...config,
                                    surahID: e.target.value,
                                })
                            }
                        >
                            {surahList.map((surah) => (
                                <option key={surah.id} value={surah.id}>
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
                                    surah.id === config.surahID &&
                                    Array.from({
                                        length: parseInt(surah.number_of_ayahs), // FIX this
                                    }).map((_, index) => (
                                        <option key={index} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    )),
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
                    rasm_ol_mushaf: "hafs",
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
            if (props.config.translationID === undefined)
                props.setConfig({
                    ...props.config,
                    translationID:
                        selectDefaultTranslationIDFromList(translationList),
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
                {translationList && props.config.translationID ? (
                    <Select
                        variant="filled"
                        placeholder="Translation"
                        defaultValue={
                            props.config.translationID
                                ? props.config.translationID
                                : undefined
                        }
                        onChange={(e) =>
                            props.setConfig({
                                ...props.config,
                                translationID: e.target.value,
                            })
                        }
                    >
                        {translationList.map((translation) => (
                            <option key={translation.id} value={translation.id}>
                                {translation.language +
                                    " - " +
                                    translation.translator_id}
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
