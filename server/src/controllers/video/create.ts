import { Response } from "express";
import fs from "fs-extra";
import _ from "lodash";
// import { second } from '../../database/dldl_p1.json'
// import Video, { VideoProps } from "../../models/tables/Video";

export const create = async (req: { body: any }, res: Response) => {
    const { source, value, label = "Label", thumbnail, category } = req.body;
    if (source && value) {
        console.log("source && valuesource && value", source, value);

        try {
            await fs.writeJson("./dldl_p1.json", {
                name: "fs-extra",
            });
            // await Video.create({
            //     source,
            //     value,
            //     label,
            //     thumbnail,
            //     category,
            // }).then((result) => {
            //     res.status(201).send(result);
            // });
        } catch (error) {
            console.error(error);
            res.send(error);
        }
    } else res.status(422).json({ message: "Values invalid" });
};

export const updateVideo = async (req: { body: any }, res: Response) => {
    // const { id, source, value, thumbnail, label, category } = req.body;
    // if (id !== undefined && value && label) {
    //     try {
    //         await Video.update(
    //             {
    //                 source,
    //                 value,
    //                 label,
    //                 thumbnail,
    //                 category,
    //             },
    //             { where: { id } }
    //         ).then(async (count) => {
    //             await Video.findAll({ where: { category } }).then((result) => {
    //                 res.status(201).send(result);
    //             });
    //         });
    //     } catch (error) {
    //         res.send(error);
    //     }
    // } else res.status(422).json({ message: "Empty title" });
};

export const initVideos = async (
    req: { body: { videos: any[] } },
    res: Response
) => {
    // const { videos } = req.body;
    // if (videos) {
    //     try {
    //         await Video.bulkCreate(videos).then(async (count) => {
    //             res.send(count);
    //         });
    //     } catch (error) {
    //         res.send(error);
    //     }
    // } else res.status(422).json({ message: "Empty title" });
};
