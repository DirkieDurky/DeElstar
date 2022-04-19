import query from "./database";

enum UserType {
    customer,
    employee
}

class User {
    id: number;
    username: string;
    email: string;
    hash: string;
    type: UserType;

    constructor(id: number, username: string, email: string, hash: string, type: UserType) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.hash = hash;
        this.type = type;
    }

    static async getCustomerById(id: number) {
        const rows = await query("SELECT * FROM `customers` WHERE `id` = ?", [id]);
        if (rows.length < 1) {
            return null;
        } else {
            const user = rows[0];
            return new User(user.id, user.username, user.email, user.hash, UserType.customer);
        }
    }
}

export { UserType }
export default User;