import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import query from "./database";
import bcrypt from "bcrypt";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.text());
app.use(express.json());

//To test the API
app.get("/api/test", (req: Request, res: Response) => {
    res.send("Its working!");
})

//To test connection to the database
app.get("api/testDb", async (req: Request, res: Response) => {
    res.send(await query("INSERT INTO `categories` (category) VALUES ('test')"));
})

app.get("/api/categories", async (req: Request, res: Response) => {
    let categoriesWithImage: { category: string, img: any }[] = [];
    const result: { id: number, category: string, bikeAmount: number }[] = await query("SELECT * FROM `categories`");
    if (!Array.isArray(result)) {
        res.send("Something went wrong");
        return;
    }
    for (const category of result) {
        const result: { picture: any } = await query(
            "SELECT `bikes`.`picture` FROM `bikes`,`bike_categories`\
            WHERE `bike_categories`.`bikeId` = `bikes`.`id`\
            AND `bike_categories`.`categoryId` = ?\
            ORDER BY `bikes`.`purchaseAmount` DESC", category.id);
        if (!Array.isArray(result)) {
            res.send("Something went wrong");
            return;
        }
        const img = result[0];
        if (img) {
            categoriesWithImage.push({ category: category.category, img: img.picture.toString('base64') });
        }
    }
    res.send(categoriesWithImage);
});

app.post("/api/register", async (req: Request, res: Response) => {
    /*
        Regels:
        Lengte van de gebruikersnaam moet tussen de 2 en 35 zijn, en moet uniek zijn.
        De email moet uniek zijn en moet voldoen aan de email regex (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).
        Het wachtwoord moet minimaal 8 karakters bevatten, waarvan minimaal 1 kleine letter, 1 grote letter, 1 cijfer en 1 speciaal karakter.
        Het verificatiewachtwoord moet gelijk zijn aan het andere wachtwoord.

        Alle velden moeten ingevuld zijn.
    */

    res.send(req);

    // if (req as { user: string, email: string, pass: string, passVerify: string } === undefined) {
    //     res.status(400);
    //     return;
    // }

    // const reqrmts = {
    //     user: {
    //         entered: false,
    //         unique: false,
    //         longEnough: false,
    //         notTooLong: false
    //     },
    //     email: {
    //         entered: false,
    //         unique: false,
    //         valid: false
    //     },
    //     pass: {
    //         entered: false,
    //         longEnough: false,
    //         smallLetter: false,
    //         capitalLetter: false,
    //         number: false,
    //         specialChar: false
    //     },
    //     passVerify: {
    //         entered: false,
    //         equal: false
    //     }
    // }

    // //Username
    // if (req.user !== "") {
    //     reqrmts.user.entered = true;
    //     const usernames: [string] = await query("SELECT `username` FROM `customers`");
    //     if (!usernames.includes(req.user)) reqrmts.user.unique = true;
    //     if (req.user.length >= 2) reqrmts.user.longEnough = true;
    //     if (req.user.length <= 35) reqrmts.user.notTooLong = true;
    // }
    // //Email
    // if (req.email !== "") {
    //     reqrmts.email.entered = true;
    //     const emails: [string] = await query("SELECT `email` FROM `customers`");
    //     if (!emails.includes(req.email)) reqrmts.email.unique = true;
    //     if (req.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) reqrmts.email.valid = true;
    // }
    // //Password
    // if (req.pass !== "") {
    //     reqrmts.pass.entered = true;
    //     if (req.pass.length >= 8) reqrmts.pass.longEnough = true;
    //     if (req.pass.toUpperCase() != req.pass) reqrmts.pass.smallLetter = true;
    //     if (req.pass.toLowerCase() != req.pass) reqrmts.pass.capitalLetter = true;
    //     if (/\d/.test(req.pass)) reqrmts.pass.number = true;
    //     if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(req.pass)) reqrmts.pass.specialChar = true;
    // }
    // //Password verify
    // if (req.passVerify !== "") {
    //     reqrmts.passVerify.entered = true;
    //     if (req.passVerify === req.pass) reqrmts.passVerify.equal = true;
    // }

    // //If all requirements are met
    // if (reqrmts.user.entered && reqrmts.user.longEnough && reqrmts.user.notTooLong && reqrmts.user.unique && reqrmts.email.entered && reqrmts.email.unique && reqrmts.email.valid && reqrmts.pass.entered && reqrmts.pass.longEnough && reqrmts.pass.smallLetter && reqrmts.pass.capitalLetter && reqrmts.pass.specialChar && reqrmts.pass.number && reqrmts.passVerify.entered && reqrmts.passVerify.equal) {
    //     const hashedPass = await bcrypt.hash(req.pass, await bcrypt.genSalt());
    //     const queryRes = await query("INSERT INTO `customers` (`username`,`email`,`password`) VALUES (?,?,?)", req.user, req.email, hashedPass);
    //     console.log(`queryRes:${queryRes}`); //TODO: using queryRes check if user is entered in database
    //     if (false) {
    //         res.status(500);
    //     } else {
    //         res.status(200);
    //     }
    // } else {
    //     res.status(401);
    //     res.send(JSON.stringify(reqrmts));
    // }
});


app.listen(5000, () => console.log('Server running at port 5000'));