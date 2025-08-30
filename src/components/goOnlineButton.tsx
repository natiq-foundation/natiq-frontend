import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@yakad/ui";
import { Symbol } from "@yakad/symbols";

const GoOnlineButton = () => {
    const [online, setOnline] = useState<boolean>(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setOnline(true);
        const handleOffline = () => setOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <>
            {online ? (
                <Link to="https://natiq.net" target="_blank">
                    <Button variant="filled" icon={<Symbol icon="start" />}>
                        Go Online
                    </Button>
                </Link>
            ) : (
                <Button
                    variant="elevated"
                    icon={<Symbol icon="offline_bolt" />}
                    disabled
                >
                    Offline
                </Button>
            )}
        </>
    );
};

export default GoOnlineButton;
