import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { UsersProps } from "../models/tables/User";
import { KEY_SECRET } from "../controllers/user/login";

const verifyToken = (
    req: {
        header: Request["header"];
        userId: UsersProps["id"];
        username: UsersProps["username"];
    },
    res: Response,
    next?: () => void
) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Authorization" });

    try {
        const decoded = jwt.verify(token, KEY_SECRET) as {
            id: UsersProps["id"];
            email: UsersProps["email"];
            username: UsersProps["username"];
            permission: UsersProps["permission"];
            iat?: number;
            exp?: number;
        };
        req.userId = decoded?.id;
        req.username = decoded?.username;
        _.isFunction(next) && next();
    } catch (error) {
        return res.status(403).json({ error });
    }
};

export default verifyToken;
