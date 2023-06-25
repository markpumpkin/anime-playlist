import _ from "lodash";
import { useState, useMemo } from "react";
import "./App.css";
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

    const handleChangePreview = (item: ItemData) => {
        item && setCurrentItem(item);
    };

    const data = useMemo(() => {
        let currentData: ItemData[] = [];
        switch (tabActived) {
            case "dldl_p1": {
                currentData = dldl_p1;
                break;
            }

            case "dldl_p2": {
                currentData = dldl_p2;
                break;
            }

            case "dptk_p5": {
                currentData = dptk_p5;
                break;
            }
        }

        setCurrentItem(currentData[0]);
        return currentData;
    }, [tabActived]);

    const thumbnails = images as any;
    const thumbnailDefault = thumbnails[`${tabActived}_thumbnail`];

    return (
        <div className="container">
            <Tabs
                tablist={tablist}
                tabActived={tabActived}
                onChange={setTabActived}
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
                        <div className="list">
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
