import _ from "lodash";
import { useState, useMemo, useEffect } from "react";
import "./App.css";
import database, { ItemData, dataFullName } from "./data";
import * as images from "./images";
import Tabs from "./components/Tabs";
import Item from "./components/Item/Item";
import Content from "./components/Content";

export type TabActivedName = keyof typeof dataFullName;

const tablist = ["dldl_p1", "dldl_p2", "dptk_p5", "tavt"];
const LOCALSTORAGE_NAME = "anime-playlist";

function App() {
    const [currentItem, setCurrentItem] = useState<ItemData>({});
    const [tabActived, setTabActived] = useState<TabActivedName>(
        tablist[0] as TabActivedName
    );

    /** Set Local Storage */
    const setStorageValue = (key: string, value: Object) => {
        const storage = localStorage.getItem(LOCALSTORAGE_NAME);
        let currentValue = _.cloneDeep(value);
        if (!_.isNull(storage)) {
            const currentStorage = JSON.parse(storage);
            currentValue = _.merge(currentStorage, value);
        }

        localStorage.setItem(key, JSON.stringify(currentValue));
    };

    /** Change Item Preview */
    const handleChangePreview = (item: ItemData) => {
        if (item) {
            const currentStorage: any = { tabActived };
            currentStorage[tabActived] = { ...item };

            setStorageValue(LOCALSTORAGE_NAME, currentStorage);
            setCurrentItem(item);
        }
    };

    /** Objective when change tabActived */
    useEffect(() => {
        const storage = localStorage.getItem(LOCALSTORAGE_NAME);
        if (!_.isNull(storage)) {
            const currentstorage = JSON.parse(storage);
            setTabActived(currentstorage?.tabActived);
            setCurrentItem(currentstorage[tabActived]);
        } else {
            if (tabActived) {
                let currentItem = database[tabActived][0];
                currentItem && setCurrentItem(currentItem);
            }
        }
    }, [tabActived]);

    const data = useMemo(() => {
        const allData = database;
        return allData[tabActived] as ItemData[];
    }, [tabActived]);

    /** Objective when change tabActived, scroll to Item actived */
    useEffect(() => {
        if (tabActived) {
            const timer = setTimeout(() => {
                const currentEl = document
                    .getElementById("anime-list-video")
                    ?.querySelector("._isSelected");

                console.log(currentEl);
                currentEl?.scrollIntoView({ behavior: "smooth" });
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [tabActived]);

    /** Change Tab actived */
    const handleChangeTab = (tabName: TabActivedName) => {
        const storage = localStorage.getItem(LOCALSTORAGE_NAME);
        let currentItem = database[tabName][0];

        if (!_.isNull(storage)) {
            const currentStorage = JSON.parse(storage);
            if (currentStorage[tabName]) currentItem = currentStorage[tabName];
        }

        const currentStorage: any = {};
        currentStorage[tabName] = { ...currentItem };

        setStorageValue(LOCALSTORAGE_NAME, {
            tabActived: tabName,
            ...currentStorage,
        });

        setCurrentItem(currentItem);
        setTabActived(tabName);
    };

    const thumbnails = images as any;
    const thumbnailDefault = thumbnails[`${tabActived}_thumbnail`];

    /** Clear Local Storage value */
    const handleCleanCache = () => {
        localStorage.removeItem(LOCALSTORAGE_NAME);
        const currentTab = tablist[0] as TabActivedName;
        const allDatabase = database;
        let currentItem = allDatabase[currentTab][0];
        setTabActived(currentTab);
        currentItem && setCurrentItem(currentItem);
    };

    useEffect(() => {
        localStorage.removeItem(LOCALSTORAGE_NAME);
    }, []);

    return (
        <div className="container">
            <Tabs
                tablist={tablist}
                tabActived={tabActived}
                onChange={handleChangeTab}
                cleanCache={handleCleanCache}
            >
                <>
                    <h2 className="current-title">{currentItem?.label}</h2>
                    <div className="play-list-wraper">
                        <div className="preview">
                            {currentItem.source === "youtube" && (
                                <iframe
                                    width="100%"
                                    height="350px"
                                    src={`https://www.youtube.com/embed/${currentItem.value}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                            {currentItem.source === "link" && (
                                <video controls className="local-video">
                                    <source
                                        src={currentItem.value}
                                        type="video/mp4"
                                    ></source>
                                </video>
                            )}
                        </div>
                        <div className="list" id="anime-list-video">
                            <ul>
                                {_.map(data, (item: ItemData) => (
                                    <Item
                                        isSelected={
                                            currentItem?.value === item.value
                                        }
                                        thumbnail={
                                            item?.thumbnail || thumbnailDefault
                                        }
                                        {...item}
                                        onClick={handleChangePreview}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <Content {...currentItem?.content} />
                </>
            </Tabs>
        </div>
    );
}

export default App;
