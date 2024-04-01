import { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
import Users, { type UsersProps } from "../../models/tables/User";

export const KEY_SECRET = "anykeytext_key";
export const REFRESH_KEY_SECRET = "anykeytext_refresh_key";

// -> Generate Token
const generateTokens = (payload: {
    id: UsersProps["id"];
    email: UsersProps["email"];
    username: UsersProps["username"];
    permission: UsersProps["permission"];
}) => {
    const { id, email, username, permission } = payload;

    const accessToken = jwt.sign(
        { id, email, username, permission },
        KEY_SECRET,
        {
            expiresIn: "1h",
        }
    );

    const refreshToken = jwt.sign(
        { id, email, username, permission },
        REFRESH_KEY_SECRET,
        {
            expiresIn: "1d",
        }
    );

    return { accessToken, refreshToken };
};

// -> Update Token
const updateRefreshToken = async (
    username: string,
    refreshToken: string | null
) => {
    await Users.update(
        {
            refreshToken,
        },
        { where: { username } }
    );
};

export const login = async (req: { body: UsersProps }, res: Response) => {
    const { username, password } = req.body;
    if (username && password) {
        const user = await Users.findOne({ where: { username } });

        if (user && user.password) {
            // -> Compare password
            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword && user) {
                const tokens = generateTokens({
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    permission: user.permission,
                });

                // -> Callback update refresh token
                await updateRefreshToken(username, tokens.refreshToken);
                if (!res.headersSent)
                    res.status(200).json({ message: "Success", tokens });
            }
        }
    } else res.status(200).json({ message: "Invalid" });
};
