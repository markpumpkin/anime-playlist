import { Router, Express } from "express";
import verifyTokenAdmin from "../middleware/admin";
import verifyTokenAuth from "../middleware/manager";
import { create, createAdmin, login, getAll, loginWithToken } from "../controllers/user";

export default (app: Express) => {
    const router = Router();

    // Open when create admin
    router.post("/createAdmin", createAdmin);
    router.post("/create", verifyTokenAdmin, create);
    router.post("/getAll", verifyTokenAdmin, getAll);
    router.post("/login", login);
    router.post("/loginWithToken", verifyTokenAuth, loginWithToken);

    app.use("/api/user", router);
};
