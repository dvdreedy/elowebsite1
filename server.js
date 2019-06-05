const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("api runnning"));
const PORT = process.envPORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
