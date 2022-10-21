import _ from "lodash";
import "./Item.css";
import type { ItemData } from "./App";

export type ItemProps = ItemData & {
    onClick?: (item: ItemData) => void;
};

function Item(props: ItemProps) {
    const { label, source, value, onClick } = props;
    const handleClick = () =>
        _.isFunction(onClick) && onClick({ source, value, label });
    return (
        <li className="item" onClick={handleClick}>
            {label}
        </li>
    );
}

export default Item;
