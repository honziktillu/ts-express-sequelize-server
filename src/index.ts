import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors = require("cors");
import db from "./models/index";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use(cors());

db.sequelize.sync({ force: false, alter: false });

app.use(`/api/v${process.env.API_VER}/user`, require("./routes/user"));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
