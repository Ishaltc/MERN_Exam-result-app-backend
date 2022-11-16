const express = require("express")
const cors = require ("cors")
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");

app.use(cors());
dotenv.config()
app.use(express.json());


//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));


//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connection successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

let PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
