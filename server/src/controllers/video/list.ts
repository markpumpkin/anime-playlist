import { Response, Request } from "express";
import Video from "../../models/tables/Video";

export const list = async (req: Request, res: Response) => {
    let queryWhere = {};
    if (req.query.categoryId)
        queryWhere = { category: `${req.query.categoryId}` };

    await Video.findAll({ where: queryWhere })
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

    await Video.findOne({ where: { id } })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
};
