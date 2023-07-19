import { Response, Request } from "express";
import Video from "../../models/tables/Video";

export const deleteVideo = async (req: Request, res: Response) => {
    if (req.body?.id || req.body?.ids) {
        try {
            await Video.destroy({
                where: { id: req.body.id || req.body.ids },
            }).then((result) => {
                res.send({ count: result });
            });
        } catch (error) {
            res.send(error);
        }
    } else res.status(422).json({ message: "Empty title" });
};
