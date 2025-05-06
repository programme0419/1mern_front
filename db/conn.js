const mongoose = require("mongoose");
const db = process.env.DATABASE;

console.log(db);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully Connected to MongoDB");
  })
  .catch((e) => {
    console.log("Error connected to MongoDB");
  });
