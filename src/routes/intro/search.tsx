import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Surah, surahsList } from "@ntq/sdk";
import { filterArrayBySearch } from "@yakad/lib";
import {
    Container,
    GridContainer,
    GridItem,
    Card,
    Row,
    Spacer,
    Stack,
    Hr,
    H2,
} from "@yakad/ui";

import RandomSurahButton from "components/randomSurahButton";
import SurahPeriodIcon from "components/surahPeriodIcon";

const Search = (props: { surahList: Surah[] }) => {
    const [filteredSurahList, setFilteredSurahList] =
        useState<Surah[]>(props.surahList);

    const [isSearching, setIsSearching] = useState<boolean>(false);

    const filterBySearchInputOnChange = (searchValue: string) => {
        setIsSearching(Boolean(searchValue));
        setFilteredSurahList(
            filterArrayBySearch(props.surahList, searchValue, [
                "number",
                "names",
                "period",
                "arabic",
            ])
        );
    };

    return (
        <Container size="md" style={{ marginTop: "2rem" }}>
            <SearchBar onSearch={filterBySearchInputOnChange} />
            {!isSearching && <RelatedSurahs surahList={props.surahList} />}
            <SearchResult surahList={filteredSurahList} />
        </Container>
    );
};

const SearchBar = (props: { onSearch: (query: string) => void }) => {
    const searchBarRef = useRef<HTMLInputElement>(null);

    const scrollToSearchBar = () => {
        searchBarRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <Row
            ref={searchBarRef}
            style={{
                position: "sticky",
                top: "0",
                zIndex: "1",
            }}
        >
            <div
                style={{
                    width: "100%",
                    backgroundColor: "rgb(var(--surfaceColor, 254 247 255))",
                    borderRadius: "0 0 3rem 3rem",
                }}
            >
                <input
                    id="searchField"
                    style={{
                        boxSizing: "border-box",
                        width: "100%",
                        height: "6rem",
                        padding: "3rem",
                        margin: "2rem 0 0",
                        border: "0.1rem solid #7d7d7d7d",
                        boxShadow: "0 0 0.4rem #7d7d7d7d",
                        borderRadius: "3rem",
                        fontSize: "1.6rem",
                        backgroundColor:
                            "rgb(var(--surfaceContainerColor, 243 237 247))",
                        color: "inherit",
                    }}
                    type="search"
                    placeholder="Search Surah by Name or Number"
                    onClick={scrollToSearchBar}
                    onChange={(e) => {
                        scrollToSearchBar();
                        props.onSearch(e.target.value);
                    }}
                />
            </div>
        </Row>
    );
};

const RelatedSurahs = (props: { surahList: Surah[] }) => (
    <Row style={{ marginTop: "2rem" }} overflow="scroll">
        <RandomSurahButton surahList={props.surahList} />
        {/* <GoToSurahButton surahList={props.surahList} surahNumber={55} />
        <GoToSurahButton surahList={props.surahList} surahNumber={36} />
        <GoToSurahButton surahList={props.surahList} surahNumber={48} />
        <GoToSurahButton surahList={props.surahList} surahNumber={89} /> */}
    </Row>
);

const SearchResult = (props: { surahList: Surah[] }) => (
    <div
        style={{
            width: "100%",
            minHeight: "calc(100vh - 16rem)",
            marginBottom: "2rem",
        }}
    >
        <H2 style={{ marginBottom: "0", fontSize: "3.4rem" }}>Surahs List</H2>
        <Hr marginx={2} />
        {props.surahList.length === 0 ? (
            <H2 style={{ margin: "5rem auto", textAlign: "center" }}>
                No Search Result
            </H2>
        ) : (
            <GridContainer>
                {props.surahList.map((surah) => (
                    <GridItem xl={4} md={6} xs={12} key={surah.uuid}>
                        <SurahLinkBox surah={surah} />
                    </GridItem>
                ))}
            </GridContainer>
        )}
    </div>
);

const SurahLinkBox = (props: { surah: Surah }) => (
    <Link to={`/quran/${props.surah.uuid}`}>
        <Card>
            <Row>
                <span
                    style={{
                        fontFamily: "sans-serif",
                        fontSize: "2rem",
                        fontWeight: "bold",
                    }}
                >
                    {props.surah.number}
                </span>
                <Spacer />
                <Stack style={{ gap: "0" }}>
                    <Row>
                        <span
                            style={{
                                fontFamily: "hafs",
                                fontSize: "2.5rem",
                                fontWeight: "bold",
                            }}
                        >
                            {(props.surah.names[0] as any).name}
                        </span>
                        <SurahPeriodIcon period={props.surah.period!} />
                    </Row>
                </Stack>
            </Row>
        </Card>
    </Link>
);

export default Search;
