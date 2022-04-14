import express from "express";
import cors from "cors";
import "dotenv/config";
import connection from "./database";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.text());
app.post("/api/query", (req, res) => {
    console.log(req.body);
    connection.query(req.body, (err, queryRes) => {
        if (err) res.send(err);
        else res.send(queryRes);
    });
})

app.get("/api/test", (req, res) => {
    res.send("Its working!");
})

app.listen(5000, () => console.log('Server running at port 5000'));