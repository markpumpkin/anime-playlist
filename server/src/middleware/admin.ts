import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { UsersProps } from "../models/tables/User";
import { KEY_SECRET } from "../controllers/user/login";

const verifyToken = (
    req: { header: Request["header"] },
    res: Response,
    next?: () => void
) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    console.log("Here", authHeader);

    // => Check has Token in Header
    if (!token) return res.status(401).json({ message: "Token is empty" });

    try {
        const decoded = jwt.verify(token, KEY_SECRET) as {
            id: UsersProps["id"];
            email: UsersProps["email"];
            username: UsersProps["username"];
            permission: UsersProps["permission"];
            iat?: number;
            exp?: number;
        };

        if (decoded && decoded?.permission === 1) {
            _.isFunction(next) && next();
        } else return res.status(401).json({ message: "not Permission" });
    } catch (error) {
        return res.status(403).json({ error });
    }
};

export default verifyToken;
