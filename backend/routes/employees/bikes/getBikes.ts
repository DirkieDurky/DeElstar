import { Request, response, Response } from "express";
import { verifyEmployee } from "../../account/signedInUsers";
import query from "../../../database";

type BikeResponse = {
    image: string,
    type: string,
    size: number,
    electric: boolean,
    color: string,
    brand: string,
    model: string,
    buyDate: object,
    dayPrice: number,
    weekendPrice: number,
    weekPrice: number,
    monthPrice: number
}[];

async function getBikes(req: Request<{}, {}, { username: string, token: string }>, res: Response<BikeResponse>) {
    console.log("Api");
    if (!verifyEmployee(req.query as { username: string, token: string })) {
        res.sendStatus(401);
        return;
    }

    const rows = await query("SELECT `image`,`type`,`size`,`electric`,`color`,`brand`,\
    `model`,`buyDate`,`dayPrice`,`weekendPrice`,`weekPrice`,`monthPrice` FROM `bikes`")

    const bikes = rows.map(x => Object.assign({}, x, { image: x.image.toString("base64") }));

    res.send(bikes);
}

export { getBikes }