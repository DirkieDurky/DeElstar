import { Request, Response } from "express";
import query from "../database";

//To test the API
export function test(req: Request, res: Response) {
    res.send("Its working!");
}

//To test connection to the database
export async function testDb(req: Request, res: Response) {
    res.send(await query("INSERT INTO `categories` (category) VALUES ('test')"));
}