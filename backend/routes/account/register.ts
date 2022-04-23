import { Request, Response } from "express";
import query from "../../database";
import bcrypt from "bcrypt";

export async function register(req: Request<{}, {}, { user: string, email: string, pass: string, passVerify: string }>, res: Response) {
    /*
        Requirements:
        Lengte van de gebruikersnaam moet tussen de 2 en 35 zijn, en moet uniek zijn.
        De email moet uniek zijn en moet voldoen aan de email regex (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).
        Het wachtwoord moet minimaal 8 karakters bevatten, waarvan minimaal 1 kleine letter, 1 grote letter, 1 cijfer en 1 speciaal karakter.
        Het verificatiewachtwoord moet gelijk zijn aan het andere wachtwoord.

        Alle velden moeten ingevuld zijn.
    */

    const reqrmts = {
        user: {
            entered: false,
            unique: false,
            longEnough: false,
            notTooLong: false
        },
        email: {
            entered: false,
            unique: false,
            valid: false
        },
        pass: {
            entered: false,
            longEnough: false,
            smallLetter: false,
            capitalLetter: false,
            number: false,
            specialChar: false
        },
        passVerify: {
            entered: false,
            equal: false
        }
    }

    //Username
    if (req.body.user !== "") {
        reqrmts.user.entered = true;
        const rows: [{ username: string }] = await query("SELECT `username` FROM `users`");
        const usernames: string[] = rows.map(x => x.username);
        if (!usernames.includes(req.body.user)) reqrmts.user.unique = true;
        if (req.body.user.length >= 2) reqrmts.user.longEnough = true;
        if (req.body.user.length <= 35) reqrmts.user.notTooLong = true;
    }
    //Email
    if (req.body.email !== "") {
        reqrmts.email.entered = true;
        const rows: [{ email: string }] = await query("SELECT `email` FROM `users`");
        const emails: string[] = rows.map(x => x.email);
        if (!emails.includes(req.body.email)) reqrmts.email.unique = true;
        if (req.body.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) reqrmts.email.valid = true;
    }
    //Password
    if (req.body.pass !== "") {
        reqrmts.pass.entered = true;
        if (req.body.pass.length >= 8) reqrmts.pass.longEnough = true;
        if (req.body.pass.toUpperCase() != req.body.pass) reqrmts.pass.smallLetter = true;
        if (req.body.pass.toLowerCase() != req.body.pass) reqrmts.pass.capitalLetter = true;
        if (/\d/.test(req.body.pass)) reqrmts.pass.number = true;
        if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(req.body.pass)) reqrmts.pass.specialChar = true;
    }
    //Password verify
    if (req.body.passVerify !== "") {
        reqrmts.passVerify.entered = true;
        if (req.body.passVerify === req.body.pass) reqrmts.passVerify.equal = true;
    }

    // If all requirements are met
    if (reqrmts.user.entered && reqrmts.user.longEnough && reqrmts.user.notTooLong && reqrmts.user.unique && reqrmts.email.entered && reqrmts.email.unique && reqrmts.email.valid && reqrmts.pass.entered && reqrmts.pass.longEnough && reqrmts.pass.smallLetter && reqrmts.pass.capitalLetter && reqrmts.pass.specialChar && reqrmts.pass.number && reqrmts.passVerify.entered && reqrmts.passVerify.equal) {
        const hashedPass = await bcrypt.hash(req.body.pass, await bcrypt.genSalt());
        await query("INSERT INTO `users` (`username`,`email`,`hash`) VALUES (?,?,?)", [req.body.user, req.body.email, hashedPass]).catch(() => {
            res.send({ status: 500 });
        });
        const rows = await query("SELECT 1 FROM `users` WHERE `email` = ?", [req.body.email]);
        if (rows.length !== 1) {
            res.send({ status: 500 });
        } else {
            res.send({ status: 200 });
        }
    } else {
        res.send({ status: 401, data: JSON.stringify(reqrmts) });
    }
};