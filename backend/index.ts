import express from "express";
import cors from "cors";
import "dotenv/config";

//Import routes
import { test, testDb } from "./routes/testing";
import { categories } from "./routes/customers/home";
import { register } from "./routes/account/register";
import { signIn } from "./routes/account/signIn";
import { getUserToken } from "./routes/account/signedInUsers";
import { getBikes } from "./routes/employees/bikes/getBikes";
import { updateBike } from "./routes/employees/bikes/updateBike";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.text());
app.use(express.json());

//Setting up all routes
//Testing
app.get("/api/test", test);
app.get("/api/testDb", testDb);

//Account
app.post("/api/register", register);
app.post("/api/signIn", signIn);
app.get("/api/getUserToken", getUserToken);

//Customer
app.get("/api/categories", categories);

//Employee
app.get("/api/bikes", getBikes);
app.post("/api/updateBike", updateBike);

app.listen(5000, () => console.log('Server running at port 5000'));