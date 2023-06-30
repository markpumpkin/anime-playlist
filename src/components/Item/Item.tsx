import _ from "lodash";
import "./Item.css";
import type { ItemData } from "../../data";

export type ItemProps = ItemData & {
    onClick?: (item: ItemData) => void;
    isSelected?: boolean;
};

function Item(props: ItemProps) {
    const { label, source, value, thumbnail, timestamp, isSelected, onClick } = props;
    const handleClick = (e?: any) => {
        e.preventDefault();
        e.stopPropagation();
        _.isFunction(onClick) && onClick(props);
    };

    return (
        <li className={isSelected ? "item _isSelected" : "item"}>
            {source === "youtube" && (
                <a
                    target="_blank"
                    className="link-youtube _watchinyoutube"
                    href={`https://www.youtube.com/watch?v=${value}`}
                    rel="noreferrer"
                    onClick={() => _.isFunction(onClick) && onClick(props)}
                >
                    {timestamp && <span className="timestamp">{timestamp}</span>}
                    {thumbnail ? (
                        <img src={thumbnail} alt={label} width="100%" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                        </svg>
                    )}
                </a>
            )}
            {source === "link" && (
                <a target="_blank" className="link-youtube" href={value} rel="noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                    </svg>
                </a>
            )}
            <a href="/shopify-source.html" title={label} className="label" onClick={handleClick}>
                <span className="text-clamp">{label}</span>
            </a>
        </li>
    );
}

export default Item;
