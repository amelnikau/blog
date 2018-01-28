const blogs = {};

function getAllBlogs() {
    let result = [];
    for(let blogId in blogs) {
        result.push(blogs[blogId]);
    }
    return result;
}

function getBlogById(id) {
    if (blogs[id]) {
        return blogs[id];
    }
    throw Error(`No blog with id ${id} found`);
}

function updateBlog(blog) {
    let id = blog ? blog.id : undefined;
    if (blogs[id]) {
        blogs[id] = blog;
        return blog;
    }
    throw Error(`No blog with id ${id} found`);
}

function deleteBlog(id) {
    if (blogs[id]) {
        delete blogs[id];
        return;
    }
    throw Error(`No blog with id ${id} found`);
}

function createBlog(blog) {
    let id = blog ? blog.id : undefined;
    if (!id) {
        throw Error("Cannot create undefined blog or blog with undefined id");
    }
    if (blogs[id]) {
        throw Error("Blog already exists, please try update api");
    }
    blogs[id] = blog;
    return blogs[id];
}

module.exports = {
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    createBlog
};