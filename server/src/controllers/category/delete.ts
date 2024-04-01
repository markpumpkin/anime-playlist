import { Response, Request } from "express";
import Category from "../../models/tables/Category";

export const deleteCategory = async (req: Request, res: Response) => {
    if (req.body?.id || req.body?.ids) {
        try {
            await Category.destroy({
                where: { id: req.body.id || req.body.ids },
            }).then((result) => {
                res.send({ count: result });
            });
        } catch (error) {
            res.send(error);
        }
    } else res.status(422).json({ message: "Empty title" });
};
