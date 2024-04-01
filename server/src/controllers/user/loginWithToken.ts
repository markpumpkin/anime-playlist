import { Response, Request } from "express";
import _ from "lodash";

export const loginWithToken = async (_req: Request, res: Response) => {
    res.status(200).json({ message: "Logged" });
};
