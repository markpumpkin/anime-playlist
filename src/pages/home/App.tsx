import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import axios from "axios";
import "./App.css";
// import database, { ItemData, dataFullName } from "./data";
// import * as images from "./images";
import Dropdown from "../../components/Dropdown";
import Item from "./components/Item/Item";
import { mapCategoryOptions } from "../../helpers/helpers";
import { CategoryProps, VideoProps } from "../../helpers/types";

// export type TabActivedName = keyof typeof dataFullName;

// const LOCALSTORAGE_NAME = "anime-playlist";
// const categories = _.keysIn(database) as TabActivedName[];

// /** Get data list option */
// const dataList = () => {
//     const options: { value: TabActivedName; label: string }[] = [];
//     _.each(categories, (item) => {
//         options.push({
//             value: item,
//             label: dataFullName[item],
//         });
//     });

//     return options;
// };

const getDefaultThumbnail = (
    categories: CategoryProps[],
    categoryID: number | string
) => {
    const currentCategory = _.find(
        categories,
        (category) => _.toNumber(category.id) === _.toNumber(categoryID)
    );

    return currentCategory?.thumbnail;
};

function App() {
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [videos, setVideos] = useState<VideoProps[]>([]);
    const [currentItem, setCurrentItem] = useState<VideoProps | undefined>(
        undefined
    );
    const [tabActived, setTabActived] = useState<number | string>("");

    const getVideoList = useCallback(async (): Promise<void> => {
        if (tabActived !== "") {
            await axios
                .get(
                    `http://localhost:8501/video/list?categoryId=${tabActived}`
                )
                .then((result: { status?: number; data: VideoProps[] }) => {
                    if (result.status === 200) {
                        setVideos(result.data);
                        setCurrentItem(result.data[0]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [tabActived]);

    const getCategoryList = useCallback(async (): Promise<void> => {
        await axios
            .get(`http://localhost:8501/category/list`)
            .then((result: { status?: number; data: CategoryProps[] }) => {
                if (result.status === 200) {
                    setCategories(result.data);
                    setTabActived(result.data[0].id);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        void getCategoryList();
    }, [getCategoryList]);

    // /** Set Local Storage */
    // const setStorageValue = (key: string, value: Object) => {
    //     const storage = localStorage.getItem(LOCALSTORAGE_NAME);
    //     let currentValue = _.cloneDeep(value);
    //     if (!_.isNull(storage)) {
    //         const currentStorage = JSON.parse(storage);
    //         currentValue = _.merge(currentStorage, value);
    //     }

    //     localStorage.setItem(key, JSON.stringify(currentValue));
    // };

    // /** Change Item Preview */
    const handleChangePreview = (item: VideoProps) => {
        if (item) {
            // const currentStorage: any = { tabActived };
            // currentStorage[tabActived] = { ...item };
            // setStorageValue(LOCALSTORAGE_NAME, currentStorage);
            setCurrentItem(item);
        }
    };

    // /** Objective when change tabActived */
    useEffect(() => {
        // const storage = localStorage.getItem(LOCALSTORAGE_NAME);
        // if (!_.isNull(storage)) {
        //     const currentstorage = JSON.parse(storage);
        //     setTabActived(currentstorage?.tabActived);
        //     setCurrentItem(currentstorage[currentstorage?.tabActived]);
        // } else {
        //     if (tabActived) {
        //         let currentItem = database[tabActived][0];
        //         currentItem && setCurrentItem(currentItem);
        //     }
        // }
        void getVideoList();
    }, [getVideoList]);

    // /** Get current Data */
    // const data = useMemo(() => {
    //     const allData = database;
    //     return allData[tabActived] as ItemData[];
    // }, [tabActived]);

    // /** Get thumbnail default of each data */
    // const thumbnailDefault = useMemo(() => {
    //     const thumbnails = images as any;
    //     return thumbnails[`${tabActived}_thumbnail`];
    // }, [tabActived]);

    // /** Objective when change tabActived, scroll to Item actived */
    // useEffect(() => {
    //     if (tabActived) {
    //         const timer = setTimeout(() => {
    //             const currentEl = document
    //                 .getElementById("anime-list-video")
    //                 ?.querySelector("._isSelected");

    //             currentEl?.scrollIntoView({ behavior: "smooth" });
    //         }, 500);

    //         return () => clearTimeout(timer);
    //     }
    // }, [tabActived]);

    // /** Change Tab actived */
    const handleChangeTab = (tabName?: number | string) => {
        // const storage = localStorage.getItem(LOCALSTORAGE_NAME);
        // let currentItem = database[tabName][0];
        // if (!_.isNull(storage)) {
        //     const currentStorage = JSON.parse(storage);
        //     if (currentStorage[tabName]) currentItem = currentStorage[tabName];
        // }
        // const currentStorage: any = { tabActived: tabName };
        // currentStorage[tabName] = { ...currentItem };
        // setStorageValue(LOCALSTORAGE_NAME, currentStorage);
        // setCurrentItem(currentItem);
        !_.isUndefined(tabName) && setTabActived(tabName);
    };

    // /** Clear Local Storage value */
    const handleCleanCache = () => {
        // localStorage.removeItem(LOCALSTORAGE_NAME);
        // const currentTab = categories[0];
        // const allDatabase = database;
        // let currentItem = allDatabase[currentTab][0];
        // setTabActived(currentTab);
        // currentItem && setCurrentItem(currentItem);
    };

    // console.log("categories", categories, getDefaultThumbnail(categories, "1"));

    return (
        <div className="container">
            <span
                className="clean-cache-local"
                onClick={handleCleanCache}
                style={{ opacity: "0.1" }}
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                >
                    <path d="M12,19 C8.13400675,19 5,15.8659932 5,12 L6,12 C6,15.3137085 8.6862915,18 12,18 C14.2208471,18 16.1598786,16.7934041 17.1973068,15 L14,15 L14,14 L19,14 L19,19 L18,19 L18,15.6075866 C16.7751029,17.6404178 14.5463251,19 12,19 Z M10,9 L10,10 L5,10 L5,5 L6,5 L6,8.39241339 C7.22489715,6.35958217 9.45367486,5 12,5 C15.8659932,5 19,8.13400675 19,12 L18,12 C18,8.6862915 15.3137085,6 12,6 C9.77915293,6 7.84012143,7.20659589 6.80269317,9 L10,9 Z"></path>
                </svg>
            </span>
            <a
                href="/admin"
                className="goto-admin"
                onClick={handleCleanCache}
                style={{ opacity: "0.1" }}
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                >
                    <path d="M9,9 L16,9 C17.1045695,9 18,9.8954305 18,11 L18,16 C18,17.6568542 16.6568542,19 15,19 L10,19 C8.34314575,19 7,17.6568542 7,16 L7,11 C7,9.8954305 7.8954305,9 9,9 Z M9,10 C8.44771525,10 8,10.4477153 8,11 L8,16 C8,17.1045695 8.8954305,18 10,18 L15,18 C16.1045695,18 17,17.1045695 17,16 L17,11 C17,10.4477153 16.5522847,10 16,10 L9,10 Z M12.5,5 C14.4329966,5 16,6.56700338 16,8.5 L16,9 L9,9 L9,8.5 C9,6.56700338 10.5670034,5 12.5,5 Z M12.5,6 C11.1192881,6 10,7.11928813 10,8.5 L10,9 L15,9 L15,8.5 C15,7.11928813 13.8807119,6 12.5,6 Z M13,13 L14,13 L14,14 L13,14 L13,16 L12,16 L12,14 L11,14 L11,13 L12,13 L12,12 L13,12 L13,13 Z"></path>
                </svg>
            </a>
            <Dropdown
                showEmptyOption={false}
                value={tabActived}
                options={mapCategoryOptions(categories)}
                onChange={(value) => handleChangeTab(value)}
            />
            <>
                <h2 className="current-title">{currentItem?.label}</h2>
                <div className="play-list-wraper">
                    <div className="preview">
                        {currentItem?.source === "youtube" && (
                            <iframe
                                width="100%"
                                height="350px"
                                src={`https://www.youtube.com/embed/${currentItem.value}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}
                        {currentItem?.source === "link" && (
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
                            {_.map(videos, (item: VideoProps) => (
                                <Item
                                    isSelected={
                                        currentItem?.value === item.value
                                    }
                                    thumbnail={item.thumbnail}
                                    defaultThumbnail={getDefaultThumbnail(
                                        categories,
                                        item.category
                                    )}
                                    {...item}
                                    onClick={handleChangePreview}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </>
        </div>
    );
}

export default App;
