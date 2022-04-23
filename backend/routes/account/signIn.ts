import { Request, Response } from "express";
import query from "../../database";
import bcrypt from "bcrypt";
import signedInUsers, { updateUserToken } from "./signedInUsers";

export async function signIn(req: Request<{}, {}, { user: string, pass: string }>, res: Response) {
    const rows = await query("SELECT `username`,`hash`,`type` FROM `users` WHERE username = ?", [req.body.user]);
    /*
        Status codes:
        0: User not found,
        1: Incorrect password,
        2: Successfully signed in
    */
    if (rows.length < 1) {
        res.send({ status: 0 });
        return;
    }
    const user = rows[0];
    if (!await bcrypt.compare(req.body.pass, user.hash)) {
        res.send({ status: 1 });
        return;
    }

    const token = Math.random().toString(36);
    updateUserToken(user.username, token, user.type);
    res.send({ status: 2, token: token, type: user.type });
}