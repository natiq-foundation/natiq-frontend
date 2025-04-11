import { Period } from "@ntq/sdk";
import { SvgIcon } from "@yakad/ui";
import { ReactComponent as Madineh } from "assets/svg/madineh - filled.svg";
import { ReactComponent as Makkah } from "assets/svg/makkah - filled.svg";

const SurahPeriodIcon = ({ period }: { period: Period }) =>
    period === "makki" ? (
        <SvgIcon title="Makki" style={{ cursor: "help" }}>
            <Makkah />
        </SvgIcon>
    ) : (
        <SvgIcon title="Madani" style={{ cursor: "help" }}>
            <Madineh />
        </SvgIcon>
    );

export default SurahPeriodIcon;
