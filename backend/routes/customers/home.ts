// import app from "../index";
import { Request, Response } from "express";
import query from "../../database";

async function categories(req: Request, res: Response) {
    let categoriesWithImage: { category: string, img: any }[] = [];
    const result: { id: number, category: string }[] = await query("SELECT `id`,`category` FROM `categories` ORDER BY `bikeAmount` DESC");
    if (!Array.isArray(result)) {
        res.send("Something went wrong");
        return;
    }
    for (const category of result) {
        const result: { image: any } = await query(
            "SELECT `bikes`.`image` FROM `bikes`,`bike_categories`\
            WHERE `bike_categories`.`bikeId` = `bikes`.`id`\
            AND `bike_categories`.`categoryId` = ?\
            ORDER BY `bikes`.`purchaseAmount` DESC", category.id);
        if (!Array.isArray(result)) {
            res.send("Something went wrong");
            return;
        }
        const img = result[0];
        if (img) {
            categoriesWithImage.push({ category: category.category, img: img.image.toString('base64') });
        }
    }
    res.send(categoriesWithImage);
};

export { categories }