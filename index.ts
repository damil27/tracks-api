import express, { Express, Request, Response } from "express";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import Cors from "cors"
import bodyParser from "body-parser";
import { Task } from "./src/tasks/Task.entity";
// instanciate the express module
const app: Express = express();
dotenv.config();
app.use(bodyParser.json())
app.use(Cors())
//  define the  port number
const port = process.env.PORT;

const AppSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities:[Task],
  synchronize: true,
});

app.get("/", (req: Request, res: Response) => {
  res.send("testing route");
});

AppSource.initialize()
  .then(() => {
    console.log("Conneted to Database Successful!")
    app.listen(port);
  })
  .catch((err) => console.log("error in connecting to database", err));

