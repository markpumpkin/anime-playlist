import { useState } from "react";
import _ from "lodash";
import "./App.css";
import { data } from "./data";
import Item from "./Item";

export type ItemData = {
    value?: string;
    label?: string;
    source?: string;
};

function App() {
    const [currentItem, setCurrentItem] = useState<ItemData>(data[0]);
    const handleChangePreview = (item: ItemData) => {
        item && setCurrentItem(item);
    };

    return (
        <div className="play-list-wapper">
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
                        <Item {...item} onClick={handleChangePreview} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
