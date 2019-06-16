const express = require("express");
const app = express();
const connectDB = require("./config/db");

connectDB();
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("api runnning"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/match", require("./routes/api/match"));

app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.envPORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
