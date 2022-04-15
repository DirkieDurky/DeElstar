import express from "express";
import cors from "cors";
import "dotenv/config";
import query from "./database";

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
// app.get("/test", (req, res) => {
//     connection.query("INSERT INTO `categories` (category) VALUES ('test')", (err, queryRes) => {
//         if (err) res.send(err);
//         else {
//             res.send(queryRes);
//         }
//     });
// })

app.get("/test", async (req, res) => {
    res.send(await query("INSERT INTO `categories` (category) VALUES ('test')"));
})

// app.get("/api/categories", (req, res) => {
//     let categoriesWithImage: { category: string, img: any }[] = [];
//     connection.query("SELECT * FROM `categories`", (err, result: { id: number, category: string, bikeAmount: number }[]) => {
//         if (err) {
//             res.send(err);
//             return;
//         }
//         if (!Array.isArray(result)) {
//             res.send("Something went wrong");
//             return;
//         }
//         // const categories: { category: string }[] = result.sort(category => category.bikeAmount);
//         result.forEach(async category => {
//             await connection.query(
//                 "SELECT `bikes`.`picture` FROM `bikes`,`bike_categories`\
//                 WHERE `bike_categories`.`bikeId` = `bikes`.`id`\
//                 AND `bike_categories`.`categoryId` = ?\
//                 ORDER BY `bikes`.`purchaseAmount` DESC", category.id, (err, result) => {
//                 if (err) {
//                     res.send(err);
//                     return;
//                 }
//                 if (!Array.isArray(result)) {
//                     res.send("Something went wrong");
//                     return;
//                 }
//                 // const img = result[0] as BinaryData;
//                 const img = result[0];
//                 categoriesWithImage.push({ category: category.category, img: img });
//                 console.log(categoriesWithImage.length);
//             })
//         })
//     });
//     console.log(categoriesWithImage.length);
//     categoriesWithImage.map(x => console.log(x));
//     res.send(categoriesWithImage);
// })

app.get("/api/categories", async (req, res) => {
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
})

// app.get("/api/bikes", (req, res) => {
//     connection.query("SELECT * FROM `bikes`", (err, queryRes) => {
//         if (err) res.send(err);
//         else {
//             res.send(queryRes);
//         }
//     });
// })

app.listen(5000, () => console.log('Server running at port 5000'));