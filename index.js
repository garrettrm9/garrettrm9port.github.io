const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

const mustacheExpress = require("mustache-express");

app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: true,
//     saveUninitialized: true
//   })
// );

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.listen(port, () => {
  console.log("Server started on " + port);
});

app.get("/", (req, res, next) => {
  res.render("./landing");
});

app.get("/about", (req, res, next) => {
  res.render("./about");
});

app.use((err, req, res, next) => {
  console.log("Error encountered:", err);
  res.status(500);
  res.send(err);
});
