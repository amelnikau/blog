let express = require('express');
let blogController = require("../controllers/blog_controller");
const {to} = require("await-to-js");
const passport = require("../auth/passport_jwt_strategy");

let blogRouter = new express.Router();

blogRouter.use("*", passport.authenticate('jwt', { session: false }));

blogRouter.get("/blogs", async function (req, res, next) {
    let [err, blogs] = await to(blogController.getAllBlogs());
    if (err) next(err);
    else res.status(200).json(blogs);
});

blogRouter.get("/blog/:id", async function (req, res, next) {
    let [err, blog] = await to(blogController.getBlogById(req.params.id));
    if (err) next(err);
    else res.status(200).json(blog);
});

blogRouter.post("/blog", async (req, res, next) => {
    let [err, blog] = await to(blogController.createBlog(req.body));
    if (err) next(err);
    else res.status(201).json(blog);
});

blogRouter.delete("/blog/:id", async function (req, res, next) {
    let [err, blog] = await to(blogController.deleteBlog(req.params.id));
    if (err) next(err);
    else res.status(204).send();
});

blogRouter.put("/blog", async function (req, res, next) {
    let [err, blog] = await to(blogController.updateBlog(req.body));
    if (err) next(err);
    else res.status(200).json(blog);
});

module.exports = blogRouter;