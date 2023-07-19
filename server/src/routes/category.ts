import { Router, Express } from "express";
import {
    create,
    updateCategory,
    list,
    getById,
    deleteCategory,
} from "../controllers/category";

export default (app: Express) => {
    const router = Router();

    router.post("/create", create);
    router.put("/update", updateCategory);
    router.get("/list", list);
    router.get("/getById", getById);
    router.delete("/delete", deleteCategory);

    app.use("/category", router);
};
