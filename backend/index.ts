import express from "express";
import cors from "cors";
import mysql2 from "mysql2";
import "dotenv/config";

const app = express();

const connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.text());
// app.post("/api/query", (req, res) => {
//     console.log(req.body);
//     connection.query(req.body, (err, queryRes) => {
//         if (err) res.send(err);
//         else res.send(queryRes);
//     });
// })

app.get("/api/test", (req, res) => {
    res.send("Its working!");
})

app.use(cors());

app.listen(5000, () => console.log('Server running at port 5000'));