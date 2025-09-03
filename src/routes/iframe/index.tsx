import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Screen, Text } from "@yakad/ui";

export default function Iframe() {
    const location = useLocation();

    const src: string = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return params.get("src") ?? "";
    }, [location.search]);

    return (
        <Screen align="center">
            {src ? (
                <iframe
                    title="Natiq App Loader"
                    src={src}
                    style={{ width: "100%", height: "100vh", border: 0 }}
                />
            ) : (
                <Text variant="heading3">No src provided</Text>
            )}
        </Screen>
    );
}
