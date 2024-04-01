import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import db from "./models";
import { initTables } from "./models/tables";
import { initRouters } from "./routes";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/assets", express.static(path.join(__dirname, "public")));

app.get("/api", (req, res) => {
    res.send({ message: "Welcome to Grid API!" });
});

/** init Table */
initTables();
db.sequelize;

/** init Router */
initRouters(app);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});

server.on("error", console.error);
