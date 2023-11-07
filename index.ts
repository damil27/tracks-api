import express, { Express } from "express";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import Cors from "cors";
import bodyParser from "body-parser";
import { Task } from "./src/tasks/Task.Entity";
import { taskRouter } from "./src/tasks/Task.Router";
// instanciate the express module
const app: Express = express();
dotenv.config();
app.use(bodyParser.json());
app.use(Cors());
//  define the  port number
const port = process.env.PORT;

export  const AppSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Task],
  synchronize: true,
});

AppSource.initialize()
  .then(() => {
    console.log("Conneted to Database Successful!");
    app.listen(port);
  })
  .catch((err) => console.log("error in connecting to database", err));

app.use("/", taskRouter);
