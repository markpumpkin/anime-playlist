import _ from "lodash";
import "./TableList.css";

export type TableListType = {
    items?: {
        id: number;
        title: string;
        thumbnail?: string;
        createdAt?: string;
    }[];

    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
};

const TableList = (props: TableListType) => {
    const { items, onEdit, onDelete } = props;
    return (
        <ul className="table-list">
            {_.map(items, (item) => (
                <li
                    key={item.id}
                    className="item"
                    onDoubleClick={() =>
                        _.isFunction(onEdit) && onEdit(item.id)
                    }
                >
                    <div className="item-info">
                        {item?.thumbnail && (
                            <img
                                className="item-thumbnail-preview"
                                src={item.thumbnail}
                                alt=""
                            />
                        )}
                        <h5 className="item-title">{item.title}</h5>
                    </div>
                    <div className="item-actions">
                        <span
                            className="action _edit"
                            onClick={() =>
                                _.isFunction(onEdit) && onEdit(item.id)
                            }
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                width="24"
                                height="24"
                            >
                                <path d="M16.679,5.60187506 L18.381,7.30587506 C19.207,8.13287506 19.207,9.47787506 18.381,10.3058751 L10.211,18.4858751 L4,19.9998751 L5.512,13.7818751 L13.682,5.60187506 C14.481,4.79987506 15.878,4.79887506 16.679,5.60187506 Z M8.66091072,16.0462125 L9.973,17.3598751 L15.625,11.7018751 L12.289,8.36087506 L6.637,14.0198751 L7.95422762,15.3386821 L11.1467061,12.1463747 C11.3419735,11.9511178 11.6585559,11.9511262 11.8538129,12.1463936 C12.0490698,12.341661 12.0490613,12.6582435 11.8537939,12.8535004 L8.66091072,16.0462125 Z M16.306,11.0198751 L17.7,9.62387506 C18.15,9.17287506 18.15,8.43787506 17.7,7.98687506 L15.998,6.28287506 C15.561,5.84587506 14.801,5.84687506 14.364,6.28287506 L12.97,7.67887506 L16.306,11.0198751 Z M5.426,18.5738751 L8.995,17.7438751 L6.254,14.9988751 L5.426,18.5738751 Z"></path>
                            </svg>
                        </span>
                        <span
                            className="action _delete"
                            onClick={() =>
                                _.isFunction(onDelete) && onDelete(item.id)
                            }
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                width="24"
                                height="24"
                            >
                                <path d="M17,17 C17,18.6568542 15.6568542,20 14,20 L9,20 C7.34314575,20 6,18.6568542 6,17 L6,7 L5,7 L5,6 L18,6 L18,7 L17,7 L17,17 Z M9,9 L10,9 L10,16 L9,16 L9,9 Z M11,9 L12,9 L12,16 L11,16 L11,9 Z M13,9 L14,9 L14,16 L13,16 L13,9 Z M7,17 C7,18.1045695 7.8954305,19 9,19 L14,19 C15.1045695,19 16,18.1045695 16,17 L16,7 L7,7 L7,17 Z M13,6 L13,5 L10,5 L10,6 L9,6 L9,5 C9,4.44771525 9.44771525,4 10,4 L13,4 C13.5522847,4 14,4.44771525 14,5 L14,6 L13,6 Z"></path>
                            </svg>
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TableList;
