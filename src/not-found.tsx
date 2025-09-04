import { H1, Screen } from "@yakad/ui";
import { GoBackButton } from "components/buttons/GoBackButton";

export default function NotFound() {
    return (
        <Screen align="center">
            <H1>404 Not Found</H1>
            <GoBackButton variant="outlined">Go Back</GoBackButton>
        </Screen>
    );
}
