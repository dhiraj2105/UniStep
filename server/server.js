import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import HabitRoute from "./routes/HabitRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

// mongodb
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(chalk.bgGreen("connected to db"));
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(chalk.bgBlue(`server is running on port ${PORT}`));
    });
  })
  .catch((e) => {
    console.log(e);
  });

//Routers
app.use("/", AuthRoute);
app.use("/user", UserRoute);
app.use("/habit", HabitRoute);
