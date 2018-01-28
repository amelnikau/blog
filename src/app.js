const express = require('express');
const path = require('path');
const requestLogging = require("./middlewares/request_logging_middleware");
const blogRoute = require("./routes/blog_route");
const errorHandler = require("./middlewares/error_handler_middleware");

let app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', express.json());
app.use('/', requestLogging);
app.use("/", blogRoute);
app.use("/", errorHandler);

app.get("*", function (req, res) {
    res.status(404).render("not-found", {url: req.url});
});

app.listen(3000);

module.exports = app;