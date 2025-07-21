import { Connection, ControllerMushafs, ControllerSurahs, ControllerTranslations } from "@ntq/sdk";

const connection = new Connection([
    new URL(process.env.REACT_APP_API_URL || "https://api.natiq.net"),
]);

export const controllerSurah = new ControllerSurahs(connection);
export const controllerTranslation = new ControllerTranslations(connection);
export const controllerMushaf = new ControllerMushafs(connection);
