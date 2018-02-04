const blogModel = require("../models/blog_model");

async function getAllBlogs() {
    return await blogModel.find({}).exec();
}

async function getBlogById(id) {
    let blog = await blogModel.findById(id).exec();
    if (!blog) {
        throw Error(`No blog with id ${id} found`);
    }
    return blog;
}

async function updateBlog(blog) {
    let id = blog ? blog._id : undefined;
    let existingBlog = await blogModel.findById(id).exec();
    if (!existingBlog) {
        throw Error(`No blog with id ${id} found`);
    }
    await existingBlog.update(blog);
    return await blogModel.findById(id).exec();
}

async function deleteBlog(id) {
    let blog = await blogModel.findById(id).exec();
    if (!blog) {
        throw Error(`No blog with id ${id} found`);
    }
    await blog.remove();
}

async function createBlog(new_blog) {
    let id = new_blog ? new_blog._id : undefined;
    if (!id) {
        throw Error("Cannot create undefined blog or blog with undefined id");
    }
    if (await blogModel.findById(id).exec()) {
        throw Error("Blog already exists, please try update api");
    }
    return await blogModel.create(new_blog);
}

module.exports = {
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    createBlog
};