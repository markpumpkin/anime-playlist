import { Response } from "express";
import Category, { CategoryProps } from "../../models/tables/Category";

export const create = async (req: { body: CategoryProps }, res: Response) => {
    const { title, thumbnail, description } = req.body;
    if (title) {
        try {
            await Category.create({
                title,
                thumbnail,
                description,
            }).then((result) => {
                res.status(201).send(result);
            });
        } catch (error) {
            res.send(error);
        }
    } else res.status(422).json({ message: "Empty title" });
};

export const updateCategory = async (
    req: { body: CategoryProps },
    res: Response
) => {
    const { id, title, thumbnail, description } = req.body;
    if (id !== undefined && title) {
        try {
            await Category.update(
                {
                    title,
                    thumbnail,
                    description,
                },
                { where: { id } }
            ).then(async (count) => {
                await Category.findAll().then((result) => {
                    res.status(201).send(result);
                });
            });
        } catch (error) {
            res.send(error);
        }
    } else res.status(422).json({ message: "Empty title" });
};
