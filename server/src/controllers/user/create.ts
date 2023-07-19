import { Response } from "express";
import bcrypt from "bcrypt";
import Users, { type UsersProps } from "../../models/tables/User";

export const create = async (req: { body: UsersProps }, res: Response) => {
    const { email, username, password, permission } = req.body;
    if (username && password && email) {
        const isExist = await Users.findOne({ where: { username } });
        if (isExist === null) {
            const salt = await bcrypt.genSalt(10);
            let newPass = await bcrypt.hash(password, salt);

            try {
                const newRecord = await Users.create({
                    email,
                    username,
                    password: newPass,
                    permission,
                });

                res.status(200).json({ message: "Success", newRecord });
            } catch (error) {
                res.status(200).json({ message: "Error", error });
            }
        } else res.status(200).json({ message: "Exists" });
    } else res.status(200).json({ message: "Invalid" });
};

export const createAdmin = async (req: { body: UsersProps }, res: Response) => {
    const { email, username, password } = req.body;
    if (username && password && email) {
        const isExist = await Users.findOne({ where: { username } });
        if (isExist === null) {
            const salt = await bcrypt.genSalt(10);
            let newPass = await bcrypt.hash(password, salt);

            try {
                const newRecord = await Users.create({
                    email,
                    username,
                    password: newPass,
                    permission: 1,
                });

                res.status(200).json({ message: "Success", newRecord });
            } catch (error) {
                res.status(200).json({ message: "Error", error });
            }
        } else res.status(200).json({ message: "Exists" });
    } else res.status(200).json({ message: "Invalid" });
};
