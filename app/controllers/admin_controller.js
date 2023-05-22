exports.dashboard = (request, response) => {
    const path = request.path;
    response.render('admin/pages/dashboard/dashboard', {title: "Dashboard", path});
}

exports.manage_blogs = (request, response) => {
    const path = request.path;
    response.render('admin/pages/manage-blogs/show-blogs/show-blogs', {title: "Manage Blogs", path});
}

exports.add_blog = (request, response) => {
    const path = request.path;
    response.render('admin/pages/manage-blogs/add-blog/add-blog', {title: "Add New Blog", path});
}

// exports.blogs = async (request, response) => {
//     const path = request.path;
//     const slug = (request.params.slug) ? request.params.slug : '';
//     response.render('site/pages/blogs/blogs', {title: "Blogs", path, slug});
// }

// exports.contact = (request, response) => {
//     const path = request.path;
//     response.render('site/pages/contact/contact', {title: "Contact", path});
// }

// exports.feedback = (request, response) => {
//     const path = request.path;
//     response.render('site/pages/feedback/feedback', {title: "Feedback", path});
// }