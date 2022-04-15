import express from "express";
import cors from "cors";
import "dotenv/config";
import connection from "./database";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.text());
app.use(express.json());

// async function query(query: string) {
//     connection.query(query, (err, queryRes) => {
//         if (err) return err;
//         else {
//             console.log(queryRes);
//             return queryRes;
//         }
//     })
// }

// function query(query: string) {
//     connection.query(query, (err, queryRes) => {
//         if (err) return err;
//         else return queryRes;
//     })
// }

//To test the API
app.get("/api/test", (req, res) => {
    res.send("Its working!");
})

//To test connection with the database
app.get("/test", (req, res) => {
    connection.query("INSERT INTO `categories` (category) VALUES ('test')", (err, queryRes) => {
        if (err) res.send(err);
        else {
            res.send(queryRes);
        }
    });
})

app.get("/api/categories", (req, res) => {
    connection.query("SELECT `category`,`bike_amount` FROM `categories`", (err, queryRes) => {
        if (err) res.send(err);
        else {
            res.send(queryRes);
        }
    });
})

app.get("/api/bikes", (req, res) => {
    connection.query("SELECT * FROM `bikes`", (err, queryRes) => {
        if (err) res.send(err);
        else {
            res.send(queryRes);
        }
    });
})

app.listen(5000, () => console.log('Server running at port 5000'));