const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");

connectDB();
app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/match", require("./routes/api/match"));

app.use("/api/auth", require("./routes/api/auth"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("/client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
  });
}
const PORT = process.envPORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
