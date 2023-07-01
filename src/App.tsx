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

    return (
        <div className="container">
            <span className="clean-cache-local" onClick={handleCleanCache}>
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                >
                    <path d="M12,19 C8.13400675,19 5,15.8659932 5,12 L6,12 C6,15.3137085 8.6862915,18 12,18 C14.2208471,18 16.1598786,16.7934041 17.1973068,15 L14,15 L14,14 L19,14 L19,19 L18,19 L18,15.6075866 C16.7751029,17.6404178 14.5463251,19 12,19 Z M10,9 L10,10 L5,10 L5,5 L6,5 L6,8.39241339 C7.22489715,6.35958217 9.45367486,5 12,5 C15.8659932,5 19,8.13400675 19,12 L18,12 C18,8.6862915 15.3137085,6 12,6 C9.77915293,6 7.84012143,7.20659589 6.80269317,9 L10,9 Z"></path>
                </svg>
            </span>
            <Tabs
                tablist={tablist}
                tabActived={tabActived}
                onChange={handleChangeTab}
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
