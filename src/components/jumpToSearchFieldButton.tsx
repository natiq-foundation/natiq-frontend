import { Button } from "@yakad/ui";
import { Symbol } from "@yakad/symbols";

const JumpToSearchFieldButton = () => {
    const handleClick = () => {
        const searchField = document.getElementById("searchField");
        searchField?.focus();
        searchField?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    };

    return (
        <Button
            variant="filledtonal"
            onClick={handleClick}
            icon={<Symbol icon="search" />}
        >
            Search
        </Button>
    );
};

export default JumpToSearchFieldButton;
