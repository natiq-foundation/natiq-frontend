import { TranslationListResponseItem } from "@ntq/sdk";
import { QuranConfigProps } from ".";

const defaultConfigData = (uuid: string): QuranConfigProps => {
    const configFromLocalStorageString = localStorage.getItem("config");
    const configFromLocalStorage: QuranConfigProps | null =
        configFromLocalStorageString
            ? JSON.parse(configFromLocalStorageString)
            : null;

    return configFromLocalStorage
        ? {
              viewMode: configFromLocalStorage.viewMode,
              surahUUID: uuid,
              ayahNumber: configFromLocalStorage.ayahNumber,
              translationView: configFromLocalStorage.translationView,
              translationUUID: configFromLocalStorage.translationUUID,
          }
        : {
              viewMode: "view1",
              surahUUID: uuid,
              ayahNumber: 1,
              translationView: true,
              translationUUID: undefined,
          };
};

const selectDefaultTranslationUUIDFromList = (
    translationList: TranslationListResponseItem[]
): string => {
    const language = "en";
    const defaultTranslation = translationList.find(
        (translation) => translation.language === language
    );
    return defaultTranslation ? defaultTranslation.uuid : "No Translation Find";
};

export { defaultConfigData, selectDefaultTranslationUUIDFromList };
