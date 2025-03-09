import React, { useState } from "react";
import { GridContainer, GridItem } from "@yakad/ui";
import styles from "./viewModeSelect.module.css";

const ViewModeSelect: React.FC = () => {
    const [selectedView, setSelectedView] = useState("view1");

    const handleSelect = (view: string) => {
        setSelectedView(view);
    };

    return (
        <GridContainer style={{ marginTop: "1rem" }}>
            <GridItem
                xl={6}
                onClick={() => handleSelect("view1")}
                className={`${styles.item} ${styles.mushaf} ${
                    selectedView === "view1" ? styles.selected : ""
                }`}
            >
                <div className={styles.ayyah}></div>
                <div className={styles.translation}></div>
                <div className={styles.ayyah}></div>
                <div className={styles.translation}></div>
                <div className={styles.ayyah}></div>
                <div className={styles.translation}></div>
                <div className={styles.ayyah}></div>
                <div className={styles.translation}></div>
                <div className={styles.ayyah}></div>
                <div className={styles.translation}></div>
            </GridItem>
            <GridItem
                xl={6}
                onClick={() => handleSelect("view2")}
                className={`${styles.item} ${styles.continuous} ${
                    selectedView === "view2" ? styles.selected : ""
                }`}
            >
                <div className={styles.ayyah}></div>
                <div className={styles.translation}></div>
                <div className={styles.ayyah}></div>
                <div className={styles.translation}></div>
                <div className={styles.ayyah}></div>
                <div className={styles.translation}></div>
                <div className={styles.ayyah}></div>
                <div className={styles.translation}></div>
            </GridItem>
            <select value={selectedView} style={{ display: "none" }}>
                <option value="view1">View 1</option>
                <option value="view2">View 2</option>
            </select>
        </GridContainer>
    );
};

export default ViewModeSelect;
