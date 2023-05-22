const mongoose = require('mongoose');

require('../config/config');

const postsSchema = new mongoose.Schema(
    {
        post_title: {
            type: String,
            required: [true, "Post Title is missing"],
            minlength: [3, "Post Title must be minimum 10 characters long"],
            unique: [3, "This Post already exist"],
        },
        post_slug: {
            type: String,
        },
        post_category: {
            type: String,
            required: [true, "Post Category is missing"],
        },
        post_description:{
            type: String,
            required: [true, "Post Description is missing"],
            minlength: [true, "Post Description must e minimum 20 characters long"]
        },
        post_imgUrl:{
            type: String,
            required: [true, "Post Image URL is missing"]
        },
        post_status: {
            type: String,
            enum: ['Published', 'Draft'],
            default: 'Published'
        },
        posted_by: {
            type: String,
            // type: mongoose.Schema.Types.ObjectId,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('posts', postsSchema);