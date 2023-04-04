const express = require("express");
const cors = require("cors");
const studentRouters = require("./src/students/routers");
const app = express();
const port = 5000;

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/students", studentRouters);

app.listen(port, () => console.log(`listening to port ${port}`));
