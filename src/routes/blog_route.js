let express = require('express');
let blogController = require("../controllers/blog_controller");

let blogRouter = new express.Router();

blogRouter.get("/blogs", function (req, res) {
    res.status(200).json(blogController.getAllBlogs());
});

blogRouter.get("/blog/:id", function (req, res) {
    res.status(200).json(blogController.getBlogById(req.params.id));
});

blogRouter.post("/blog", (req, res) => {
    res.status(201).json(blogController.createBlog(req.body));
});

blogRouter.delete("/blog/:id", function (req, res) {
    blogController.deleteBlog(req.params.id);
    res.status(204).send();
});

blogRouter.put("/blog", function (req, res) {
    res.status(200).json(blogController.updateBlog(req.body));
});


module.exports = blogRouter;