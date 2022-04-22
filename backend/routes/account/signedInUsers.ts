import { Request, Response } from "express";

enum userType {
    customer,
    employee
}

let signedInUsers: { user: string, token: string, type: userType }[] = [];

function updateUserToken(username: string, token: string, type: userType) {
    signedInUsers = signedInUsers.filter(u => u.user !== username);
    signedInUsers.push({ user: username, token: token, type: type });
}

function getUserToken(req: Request, res: Response) {
    const user = signedInUsers.find(u => u.user === req.query.user);
    if (user === undefined) {
        res.send(null);
        return;
    }
    res.send(user.token);
}

function verifyEmployee(credentials: { username: string, token: string }): boolean {
    //For some dumb reason this doesnt work
    // return !!signedInUsers.find(u => u.user === credentials.username && u.token === credentials.token && u.type === userType.employee);
    //And this does
    return !!signedInUsers.find(u => u.user === credentials.username && u.token === credentials.token && u.type.toString() === 'employee');
}

export default signedInUsers;
export { getUserToken, updateUserToken, userType, verifyEmployee }