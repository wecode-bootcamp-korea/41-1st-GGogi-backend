require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const appDataSource = require("./models/appDataSource");

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const start = async () => {
  appDataSource
    .initialize()
    .then(() => {
      console.log("initialized Successfully");
    })
    .catch((err) => {
      console.log("Error occurred during Data Source initalizaion!", err);
      appDataSource.destroy();
    });
  try {
    app.listen(PORT, () => console.log(`서버시작합니다.`));
  } catch (err) {
    console.error(err);
  }
};

start();
