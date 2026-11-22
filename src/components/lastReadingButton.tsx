import { useNavigate } from "react-router-dom";
import { Button } from "@yakad/ui";

import { QuranConfigProps } from "routes/quran";

const LastReadingButton = () => {
    const navigate = useNavigate();

    const configFromLocalStorageString = localStorage.getItem("config");
    const configFromLocalStorage: QuranConfigProps | null =
        configFromLocalStorageString
            ? JSON.parse(configFromLocalStorageString)
            : null;

    const handleClick = () => {
        if (configFromLocalStorage) {
            navigate("/quran/" + configFromLocalStorage.surahID);
        }
    };

    return (
        <Button
            variant="filledtonal"
            disabled={!Boolean(configFromLocalStorage)}
            onClick={handleClick}
        >
            Last reading
        </Button>
    );
};

export default LastReadingButton;
