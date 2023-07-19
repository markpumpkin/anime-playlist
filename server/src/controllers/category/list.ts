import { Response, Request } from "express";
import Category, { CategoryProps } from "../../models/tables/Category";

export const list = async (req: Request, res: Response) => {
    await Category.findAll()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
};

export const getById = async (
    req: { query: { id: number } },
    res: Response
) => {
    const { id } = req.query;

    await Category.findOne({ where: { id } })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
};
