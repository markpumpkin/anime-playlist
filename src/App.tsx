import _ from "lodash";
import { useState } from "react";
import "./App.css";
import { data } from "./data";
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

function App() {
    const [currentItem, setCurrentItem] = useState<ItemData>(data[0]);
    const handleChangePreview = (item: ItemData) => {
        item && setCurrentItem(item);
    };

    return (
        <div className="container">
            <h1 className="app-title">
                Shopify Course App Development with React/Node
            </h1>
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
                        {_.map(data, (item) => (
                            <Item
                                isSelected={currentItem?.value === item.value}
                                {...item}
                                onClick={handleChangePreview}
                            />
                        ))}
                    </ul>
                </div>
            </div>
            <Content {...currentItem?.content} />
        </div>
    );
}

export default App;
