exports.home = (request, response) => {
    const path = request.path;
    response.render('site/pages/home/home', {title: "Home", path});
}

exports.about = (request, response) => {
    const path = request.path;
    response.render('site/pages/about/about', {title: "About", path});
}

exports.blogs = async (request, response) => {
    const path = request.path;
    const slug = (request.params.slug) ? request.params.slug : '';
    response.render('site/pages/blogs/blogs', {title: "Blogs", path, slug});
}

exports.contact = (request, response) => {
    const path = request.path;
    response.render('site/pages/contact/contact', {title: "Contact", path});
}

exports.feedback = (request, response) => {
    const path = request.path;
    response.render('site/pages/feedback/feedback', {title: "Feedback", path});
}