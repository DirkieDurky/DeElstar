import { Request, Response } from "express";
import { verifyEmployee } from "../../account/signedInUsers";
import query from "../../../database";

type BikeData = {
    id: number,
    image: string,
    type: string,
    size: number,
    color: string,
    brand: string,
    model: string,
    buyDate: object,
    dayPrice: number,
    weekendPrice: number,
    weekPrice: number,
    monthPrice: number
};

export async function getBikes(req: Request<{}, {}, { credentials: { username: string, token: string } }>, res: Response<BikeData[]>) {
    const credentials: { username: string, token: string } = JSON.parse(req.query.credentials as string);
    if (!verifyEmployee(credentials)) {
        res.sendStatus(401);
        return;
    }

    const rows = await query("SELECT `id`,`image`,`type`,`size`,`color`,`brand`,\
    `model`,`buyDate`,`dayPrice`,`weekendPrice`,`weekPrice`,`monthPrice` FROM `bikes`");

    const bikes = rows.map(x => Object.assign({}, x, { image: (x.image && x.image.toString("base64")) }));

    res.send(bikes);
}