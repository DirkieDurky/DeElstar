import { Request, Response } from "express";
import { verifyEmployee } from "../../account/signedInUsers";
import query from "../../../database";

export async function updateBike(req: Request<{}, {}, { credentials: { username: string, token: string }, bikeId: number, column: string, value: string }>, res: Response) {
    const credentials: { username: string, token: string } = req.body.credentials;
    if (!verifyEmployee(credentials)) {
        res.sendStatus(401);
        return;
    }

    await query(`UPDATE \`bikes\` SET \`${req.body.column}\` = ? WHERE \`id\` = ?`, [req.body.value, req.body.bikeId]);
}