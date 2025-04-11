import React, { useEffect, useState } from "react";
import {
    SurahListResponseItem,
    TranslationListResponseItem,
    getLangNameFromCode,
} from "@ntq/sdk";
import {
    List,
    ListItem,
    Button,
    Spacer,
    Row,
    Loading,
    Select,
    CheckBox,
    Hr,
} from "@yakad/ui";

import { QuranConfigProps } from ".";
import { selectDefaultTranslationUUIDFromList } from "./config";
import { controllerSurah, controllerTranslation } from "connection";
import ViewModeSelect from "components/viewModeSelect";

interface CollapseList {
    [n: number]: boolean;
}

const NavigationList = (props: {
    config: QuranConfigProps;
    setConfig: any;
}) => {
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
                        borderstyle="semi"
                        onClick={() => handleClickCollapseList(index)}
                    >
                        {item.name}
                        <Spacer />
                    </Button>
                    <List
                        collapsed={collapsedList[index]}
                        direction="column"
                        style={{ marginTop: "1rem", marginInlineStart: "2rem" }}
                    >
                        {item.navListItems}
                        <div style={{ height: "2rem" }} />
                    </List>
                </ListItem>
            ))}
        </List>
    );
};

const NavListItemsQuran = ({
    config,
    setConfig,
}: {
    config: QuranConfigProps;
    setConfig: any;
}) => {
    const [surahList, setSurahList] = useState<SurahListResponseItem[] | null>(
        null
    );

    useEffect(() => {
        controllerSurah
            .list({ params: { mushaf: "hafs" } })
            .then((response) => {
                setSurahList(response.data);
            });
    }, []); //eslint-disable-line

    return (
        <>
            {/* <ListItem>
                <ViewModeSelect
                    name="viewMode"
                    defaultValue={config.viewMode}
                    onChange={(e) => {
                        setConfig({
                            ...config,
                            viewMode: e.target.value,
                        });
                        alert("ZZ");
                    }}
                />
                <Hr />
                <select
                    defaultValue={config.viewMode}
                    onChange={(e) =>
                        setConfig({
                            ...config,
                            viewMode: e.target.value,
                        })
                    }
                >
                    <option value="view1">View 1</option>
                    <option value="view2">View 2</option>
                </select>
            </ListItem> */}
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
                                        surah.names[0].arabic}
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
                                (surah: SurahListResponseItem) =>
                                    surah.uuid === config.surahUUID &&
                                    Array.from({
                                        length: surah.number_of_ayahs,
                                    }).map((_, index) => (
                                        <option key={index} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))
                            )}
                        </Select>
                    </>
                ) : (
                    <Loading variant="dots" />
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
    const [translationList, setTranslationList] = useState<
        TranslationListResponseItem[] | null
    >(null);

    useEffect(() => {
        controllerTranslation
            .list({ params: { mushaf: "hafs" } })
            .then((response) => {
                setTranslationList(response.data);
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
                                {getLangNameFromCode(translation.language) +
                                    " - " +
                                    translation.translator.username}
                            </option>
                        ))}
                    </Select>
                ) : (
                    <Loading variant="dots" />
                )}
            </ListItem>
        </>
    );
};

export default NavigationList;
