import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { SERVER_HOST } from '../../../config';
import TableList from '../../../components/TableList';
import Form from '../../../components/Form';
import Dropdown from '../../../components/Dropdown';
import { CategoryProps, VideoProps } from '../../../helpers/types';
import './Video.css';

const mapCategoryOptions = (categories: CategoryProps[]) => {
    const abc: { value?: string | number; label?: string }[] = [];
    _.map(categories, category => abc.push({ value: category.id, label: category.title }));

    return abc;
};

const mapTableItems = (items: VideoProps[]) => {
    const abc: {
        id: number;
        title: string;
        thumbnail?: string;
        createdAt?: string;
    }[] = [];
    _.map(
        items,
        item =>
            item?.id &&
            abc.push({
                id: item.id,
                title: item.label,
                thumbnail: item.thumbnail
            })
    );

    return abc;
};

function Video() {
    const [isEdit, setIsEdit] = useState<number | null>(null);
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [currentCategory, setCurrentCategory] = useState<number | string>('');
    const [label, setLabel] = useState('');
    const [value, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [videos, setVideos] = useState<VideoProps[]>([]);

    const resetForm = () => {
        setThumbnail('');
        setDescription('');
        setLabel('');
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        // if (isEdit !== null) {
        //     await axios
        //         .put(`${SERVER_HOST}:8502/video/update`, {
        //             id: isEdit,
        //             source: 'youtube',
        //             label,
        //             value,
        //             thumbnail,
        //             category: currentCategory
        //         })
        //         .then((result: { status?: number; data: VideoProps[] }) => {
        //             if (result.status === 201) {
        //                 setIsEdit(null);
        //                 setVideos(result.data);
        //                 resetForm();
        //             }
        //         });
        // } else {
        //     await axios
        //         .post(`http://localhost:3333/video/create`, {
        //             source: 'youtube',
        //             label,
        //             value,
        //             thumbnail,
        //             category: currentCategory
        //         })
        //         .then(result => {
        //             if (result.status === 201) {
        //                 setVideos([...videos, result.data]);
        //                 resetForm();
        //             }
        //         });
        // }
        await axios
            .post(`http://localhost:3333/video/create`, {
                source: 'youtube',
                label,
                value,
                thumbnail,
                category: currentCategory
            })
            .then(result => {
                // if (result.status === 201) {
                //     setVideos([...videos, result.data]);
                //     resetForm();
                // }
            });
    };

    const getVideoList = useCallback(async (): Promise<void> => {
        // await axios
        //     .get(`${SERVER_HOST}:8502/video/list?categoryId=${currentCategory}`)
        //     .then((result: { status?: number; data: VideoProps[] }) => {
        //         if (result.status === 200) {
        //             setVideos(result.data);
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }, [currentCategory]);

    const getCategoryList = useCallback(async (): Promise<void> => {
        await axios
            .get(`${SERVER_HOST}:8502/category/list`)
            .then((result: { status?: number; data: CategoryProps[] }) => {
                if (result.status === 200) {
                    setCategories(result.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        void getCategoryList();
        void getVideoList();
    }, [getCategoryList, getVideoList]);

    const deleteCurrentVideo = (id: number) => {
        console.log('video id', id);
    };

    const getCurrentVideo = async (id: number): Promise<void> => {
        await axios
            .get(`${SERVER_HOST}:8502/video/getById`, {
                params: { id }
            })
            .then((result: { status?: number; data: VideoProps }) => {
                if (result.status === 200) {
                    const { value = '', label = '', thumbnail = '', category = '' } = result.data;

                    setIsEdit(id);
                    setLabel(label);
                    setThumbnail(thumbnail);
                    setDescription(value);

                    setCurrentCategory(category);
                }
            })
            .catch(error => {
                console.log('error', error);
            });
    };

    const handleChangeCategory = (value?: string | number) => {
        !_.isUndefined(value) && setCurrentCategory(value);
    };

    return (
        <div className="admin-wraper">
            <div className="video-category">
                <label>Category</label>
                <Dropdown
                    value={currentCategory}
                    options={mapCategoryOptions(categories)}
                    onChange={handleChangeCategory}
                />
            </div>
            <div className="main-content">
                <div className="form-box">
                    <Form
                        editAbled={true}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        handleSubmit={handleSubmit}
                        handleCancel={resetForm}
                    >
                        <div className="form-group">
                            <label>Value</label>
                            <input
                                className="field-control"
                                placeholder="Enter value"
                                type="text"
                                value={value}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDescription(e.target.value)
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Label</label>
                            <input
                                className="field-control"
                                placeholder="Enter category label"
                                type="text"
                                value={label}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Thumbnail</label>
                            <input
                                className="field-control"
                                placeholder="Enter thumbnail url"
                                type="text"
                                value={thumbnail}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setThumbnail(e.target.value)}
                            />
                        </div>
                    </Form>
                </div>
                <div className="admin-list">
                    <TableList
                        items={mapTableItems(videos)}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onEdit={getCurrentVideo}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onDelete={deleteCurrentVideo}
                    />
                </div>
            </div>
        </div>
    );
}

export default Video;
