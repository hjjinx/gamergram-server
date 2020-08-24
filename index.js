const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/users");
const posts = require("./routes/posts");
const secret = require("./secret.json");
mongoose
  .connect(secret.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

const app = express();

app.use(express.json());
app.use(require("body-parser").urlencoded({ extended: false }));

app.use("/api/users", users);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
