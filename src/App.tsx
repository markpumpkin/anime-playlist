import _ from "lodash";
import { useState, useMemo, useEffect } from "react";
import "./App.css";
import * as database from "./data/index";
import { data as dldl_p1 } from "./data/dldl_p1";
import { data as dldl_p2 } from "./data/dldl_p2";
import { data as dptk_p5 } from "./data/dptk_p5";
import * as images from "./images";
import Tabs from "./components/Tabs";
import Item from "./Item";
import Content from "./Content";

export type ItemData = {
    value?: string;
    label?: string;
    source?: string;
    content?: {
        overview?: string;
        exercise?: string;
    };
    timestamp?: string;
    thumbnail?: string;
};

const tablist = ["dldl_p1", "dldl_p2", "dptk_p5"];

function App() {
    const [currentItem, setCurrentItem] = useState<ItemData>(dldl_p1[0]);
    const [tabActived, setTabActived] = useState<string>(tablist[0]);

    useEffect(() => {
        const storage = localStorage.getItem("anime-playlist");
        if (!_.isNull(storage)) {
            const { currentItem, tabActived } = JSON.parse(storage);
            setTabActived(tabActived);
            setCurrentItem(currentItem);
        }
    }, []);

    const setStorageValue = (key: string, value: Object) => {
        const storage = localStorage.getItem("anime-playlist");
        let currentValue = _.cloneDeep(value);
        if (!_.isNull(storage)) {
            const currentStorage = JSON.parse(storage);
            currentValue = _.merge(currentStorage, value);
        }

        localStorage.setItem(key, JSON.stringify(currentValue));
    };

    const handleChangePreview = (item: ItemData) => {
        if (item) {
            const currentStorage: any = {};
            currentStorage[tabActived] = { ...item };

            setStorageValue("anime-playlist", currentStorage);
            setCurrentItem(item);
        }
    };

    const data = useMemo(() => {
        const allData = database as any;
        return allData[tabActived] as ItemData[];
    }, [tabActived]);

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

    const handleChangeTab = (tabName: string) => {
        const allDatabase = database as any;
        const storage = localStorage.getItem("anime-playlist");
        let currentItem = allDatabase[tabName][0];

        if (!_.isNull(storage)) {
            const currentStorage = JSON.parse(storage);
            if (currentStorage[tabName]) currentItem = currentStorage[tabName];
        }
        setStorageValue("anime-playlist", {
            tabActived: tabName,
            currentItem,
        });

        setCurrentItem(currentItem);
        setTabActived(tabName);
    };

    const thumbnails = images as any;
    const thumbnailDefault = thumbnails[`${tabActived}_thumbnail`];

    return (
        <div className="container">
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
