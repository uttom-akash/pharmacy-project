var express = require("express");
var router = require("./apiRequest");


const app = express();


app.use(express.json({ limit: "25mb" }));
app.use("/api", router);

// app.use(express.static("uploads"));


const port = 8000

app.listen(port, () => console.log(`localhost:${port}`));