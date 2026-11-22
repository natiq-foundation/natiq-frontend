import { PaginatedTranslationListList } from "@ntq/sdk";
import { QuranConfigProps } from ".";

const defaultConfigData = (id: string): QuranConfigProps => {
    const configFromLocalStorageString = localStorage.getItem("config");
    const configFromLocalStorage: QuranConfigProps | null =
        configFromLocalStorageString
            ? JSON.parse(configFromLocalStorageString)
            : null;

    return configFromLocalStorage
        ? {
              viewMode: configFromLocalStorage.viewMode,
              surahID: id,
              ayahNumber: configFromLocalStorage.ayahNumber,
              translationView: configFromLocalStorage.translationView,
              translationID: configFromLocalStorage.translationID,
          }
        : {
              viewMode: "view1",
              surahID: id,
              ayahNumber: 1,
              translationView: true,
              translationID: undefined,
          };
};

const selectDefaultTranslationIDFromList = (
    translationList: PaginatedTranslationListList,
): string => {
    const language = "en";
    const defaultTranslation = translationList.find(
        (translation) => translation.language === language,
    );
    return defaultTranslation ? defaultTranslation.id : "No Translation Find";
};

export { defaultConfigData, selectDefaultTranslationIDFromList };
