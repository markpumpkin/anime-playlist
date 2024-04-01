import {
    ChangeEvent,
    FormEvent,
    useCallback,
    useEffect,
    useState,
} from "react";
import axios from "axios";
import { SERVER_HOST } from "../../../config";
import Form from "../../../components/Form";
import TableList from "../../../components/TableList";
import { CategoryProps } from "../../../helpers/types";
import "./Category.css";

function Category() {
    const [isEdit, setIsEdit] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState<CategoryProps[]>([]);

    const resetForm = () => {
        setThumbnail("");
        setDescription("");
        setTitle("");
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (isEdit !== null) {
            await axios
                .put(`${SERVER_HOST}:8502/category/update`, {
                    id: isEdit,
                    title,
                    thumbnail,
                    description,
                })
                .then((result: { status?: number; data: CategoryProps[] }) => {
                    if (result.status === 201) {
                        setIsEdit(null);
                        setCategories(result.data);
                        resetForm();
                    }
                });
        } else {
            await axios
                .post(`${SERVER_HOST}:8502/category/create`, {
                    title,
                    thumbnail,
                    description,
                })
                .then((result) => {
                    if (result.status === 201) {
                        setCategories([...categories, result.data]);
                        resetForm();
                    }
                });
        }
    };

    const getCategoryList = useCallback(async (): Promise<void> => {
        await axios
            .get(`${SERVER_HOST}:8502/category/list`)
            .then((result: { status?: number; data: CategoryProps[] }) => {
                if (result.status === 200) {
                    setCategories(result.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        void getCategoryList();
    }, [getCategoryList]);

    const getCurrentCategory = async (id: number) => {
        await axios
            .get(`${SERVER_HOST}:8502/category/getById`, {
                params: { id },
            })
            .then((result: { status?: number; data: CategoryProps }) => {
                if (result.status === 200) {
                    const {
                        description = "",
                        thumbnail = "",
                        title = "",
                    } = result.data;

                    setIsEdit(id);
                    setTitle(title);
                    setThumbnail(thumbnail);
                    setDescription(description);
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    const deleteCategory = (id: number) => {
        console.log("id", id);
    };

    return (
        <div className="admin-wraper">
            <div className="main-content">
                <div className="form-box">
                    <Form
                        editAbled={true}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        handleSubmit={handleSubmit}
                        handleCancel={resetForm}
                    >
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                className="field-control"
                                placeholder="Enter category title"
                                type="text"
                                value={title}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setTitle(e.target.value)
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Thumbnail</label>
                            <input
                                className="field-control"
                                placeholder="Enter thumbnail url"
                                type="text"
                                value={thumbnail}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setThumbnail(e.target.value)
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                className="field-control"
                                placeholder="Enter description"
                                type="text"
                                value={description}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDescription(e.target.value)
                                }
                            />
                        </div>
                    </Form>
                </div>
                <div className="admin-list">
                    <TableList
                        items={categories}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onEdit={getCurrentCategory}
                        onDelete={deleteCategory}
                    />
                </div>
            </div>
        </div>
    );
}

export default Category;
