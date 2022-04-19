import { Request, Response } from "express";
import query from "../../database";
import bcrypt from "bcrypt";
import User from "../../User";

const signIn = async (req: Request<{}, {}, { user: string, pass: string }>, res: Response) => {
    const rows = await query("SELECT `id`,`hash` FROM `customers` WHERE username = ?", [req.body.user]);
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
    const hash: string = rows[0].hash
    if (!await bcrypt.compare(req.body.pass, hash)) {
        res.send({ status: 1 });
        return;
    }



    res.send({ status: 2 });
}

export { signIn }