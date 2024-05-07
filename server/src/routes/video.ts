import { Router, Express } from "express";
import {
    // initVideos,
    create,
    // updateVideo,
    // list,
    // getById,
    // deleteVideo,
} from "../controllers/video";

export default (app: Express) => {
    const router = Router();

    // router.post("/initVideos", initVideos);
    router.post("/create", create);
    // router.put("/update", updateVideo);
    // router.get("/list", list);
    // router.get("/getById", getById);
    // router.delete("/delete", deleteVideo);

    app.use("/video", router);
};
