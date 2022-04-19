import express from "express";
import cors from "cors";
import "dotenv/config";

//Import routes
import { test, testDb } from "./routes/testing";
import { categories } from "./routes/home";
import { register } from "./routes/account/register";
import { signIn } from "./routes/account/signIn";
import { getSignedInUser } from "./routes/account/signedInUser";

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

//Home
app.get("/api/categories", categories);

//Account
app.post("/api/register", register);
app.post("/api/signIn", signIn);
app.get("/api/getSignedInUser", getSignedInUser)

app.listen(5000, () => console.log('Server running at port 5000'));