import { Express } from "express";
import UserRoutes from "./user";
import CategoryRoutes from "./category";
import VideoRoutes from "./video";

export const initRouters = (app: Express) => {
    UserRoutes(app);
    CategoryRoutes(app);
    VideoRoutes(app);
    return null;
};
