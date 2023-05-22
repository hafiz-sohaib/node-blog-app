const slugify = require('slugify');
const Posts = require('../../models/posts-model');
const { errorHandler } = require('../../helper/helper');
const base_url = "http://localhost:3000/";


// ==================== Add New Post ====================
exports.addPost = async (request, response) => {
    try {
        const post_imgUrl = request.files.file.map(image=> `${base_url}posts/${image.originalname}`);
        const data = { ...request.body, post_slug: slugify(request.body.post_title), post_imgUrl: post_imgUrl[0] };
        const post = await Posts.create(data);
        response.json({ post });
    } catch (error) {
        const errors = errorHandler(error, 'posts');
        response.json({ errors });
    }
}



// ==================== Get Posts ====================
exports.getPosts = async (request, response) => {
    const sortOrder = request.query.sortOrder === "desc" ? -1 : 1;
    let query = {};
    let sort = {};

    if (request.query && request.query.search) {
        query = { post_title: {$regex: request.query.search, $options: "i" }};
    }else {
        query = request.query;
    }

    if (request.query && request.query.sortOrder) {
        sort = {post_title: sortOrder};
        query = {}
    }

    try {
        const posts = await Posts.find(query).sort(sort).exec();
        (posts.length > 0) ? response.json({ posts }) : response.json({ message: "No Post Found" });
    } catch (error) {
        console.log(error);
    }
}









// ==================== Delete Category ====================
exports.deletePost = async (request, response) => {
    try {
        await Posts.findByIdAndDelete(request.query._id);
        response.json({message: "Post deleted successfully"});
    } catch (error) {
        response.json({error});
    }
};