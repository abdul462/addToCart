const express = require("express");
const { join: pathJoin } = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use("/", express.static(pathJoin(__dirname, "../client/public/")));

app.get("/", function (_, res) {
  res.sendFile(pathJoin(__dirname, "../client/Index.html"));
});

app.listen(port, function callback() {
  console.log(`Server is up & running on port ${port}`);
});
