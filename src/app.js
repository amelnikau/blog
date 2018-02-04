const express = require('express');
const path = require('path');
const config = require("./config/config");

const requestLogging = require("./middlewares/request_logging_middleware");
const errorHandler = require("./middlewares/error_handler_middleware");

const blogRoute = require("./routes/blog_route");
const loginRoute = require("./routes/login_route");

const passport = require("./auth/passport_jwt_strategy");
require("./db/db");

let app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(passport.initialize());
app.use('/', express.json());
app.use('/', requestLogging);
app.use("/", loginRoute);
app.use("/", blogRoute);
app.use("/", errorHandler);

app.get("*", function (req, res) {
    res.status(404).render("not-found", {url: req.url});
});

app.listen(config.server.port);

module.exports = app;