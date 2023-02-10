const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({
    secret: "xixixi123",
    resave: false,
    saveUninitialized: false,
    cookie: { sameSite: true, secure: false },
  })
);
app.use(require("./routes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
