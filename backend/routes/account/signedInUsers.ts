import { Request, Response } from "express";

let signedInUsers: { user: string, token: string }[] = [];

function updateUserToken(username: string, token: string) {
    signedInUsers = signedInUsers.filter(u => u.user !== username);
    signedInUsers.push({ user: username, token: token });
}

function getUserToken(req: Request, res: Response) {
    const user = signedInUsers.find(u => u.user === req.query.user);
    if (user === undefined) {
        res.send(null);
        return;
    }
    res.send(user.token);
}

export default signedInUsers;
export { getUserToken, updateUserToken }