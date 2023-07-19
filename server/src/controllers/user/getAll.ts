import { Response, Request } from "express";
import Users from "../../models/tables/User";

export const getAll = async (_req: Request, res: Response) => {
    try {
        const newRecord = await Users.findAll();
        res.status(200).json({ message: "Success", newRecord });
    } catch (error) {
        res.status(200).json({ message: "Error", error });
    }
};
