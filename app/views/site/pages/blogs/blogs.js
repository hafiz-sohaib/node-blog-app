const skeleton = $('#blog_loader');
const slug = $('#slug').val();

// ==================== Check - the slug in URL is exist or not ====================
(slug !=="" ) ? getSpecificBlog(slug) : getBlogs();



// ==================== Loading Skeleton When Data is loading ====================
function locader() {
    let output = "";

    for (let index = 1; index <= 4; index++) {
        output += `<div class="col-lg-3">
            <div class="card placeholder-glow skeleton-card" aria-hidden="true">
                <div class="placeholder top-loader"></div>
                <div class="card-body">
                    <h5 class="card-title placeholder-glow mb-3">
                        <span class="placeholder rounded col-6"></span>
                    </h5>
                    <p class="card-text placeholder-glow mb-3">
                        <span class="placeholder rounded col-7"></span>
                        <span class="placeholder rounded col-4"></span>
                        <span class="placeholder rounded col-4"></span>
                        <span class="placeholder rounded col-6"></span>
                        <span class="placeholder rounded col-8"></span>
                        <span class="placeholder rounded col-4"></span>
                        <span class="placeholder rounded col-7"></span>
                    </p>
                </div>
            </div>
        </div>`;
    }

    return output;
}

function single_locader() {
    return `<div class="card placeholder-glow skeleton-card" aria-hidden="true">
        <div class="placeholder top-loader" style="height: 500px;"></div>
        <div class="card-body">
            <h5 class="card-title placeholder-glow mb-4">
                <span class="placeholder rounded py-2 col-4"></span>
            </h5>
            <p class="card-text placeholder-glow mb-3">
                <span class="placeholder rounded py-2 col-12"></span>
                <span class="placeholder rounded py-2 col-12"></span>
                <span class="placeholder rounded py-2 col-12"></span>
                <span class="placeholder rounded py-2 col-12"></span>
                <span class="placeholder rounded py-2 col-12"></span>
                <span class="placeholder rounded py-2 col-12"></span>
                <span class="placeholder rounded py-2 col-12"></span>
            </p>
        </div>
    </div>`;
}

function filterControls() {
    return `<div class="col-4 ms-auto">
        <div class="row">
            <div class="col-7 p-0">
                <select class="form-select category-select" name="post_category" onchange="sortByCategory(this)"></select>
            </div>
            <div class="col-5 p-0">
                <select class="form-select sort-select" name="sortOrder" onchange="sortByNameDate(this)">
                    <option selected disabled>Sort By</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>
        </div>
    </div>`;
}


// ==================== Get All Posts ====================
async function getBlogs(query = "") {
    $('#blog_data').html(locader());

    try {
        const url = (query !== "") ? `http://localhost:3000/api/v1/posts?${query.name}=${query.value}` : 'http://localhost:3000/api/v1/posts';
        const response = await fetch(url);
        const data = await response.json();
        let output = "";

        if (data.posts) {
            data.posts.map(post => {
                output += `<div class="col-lg-3">
                    <a href="/blogs/${post.post_slug}" class="text-dark">
                        <div class="card mb-3">
                            <img class="card-img-top" src="${post.post_imgUrl}" alt="Title">
                            <div class="card-body">
                                <h4 class="card-title">${post.post_title.slice(0,22)}..</h4>
                                <p class="card-text card-date mb-4">
                                    <i class="bi bi-clock me-1"></i>
                                    ${moment(post.createdAt).fromNow()}
                                </p>
                                <p class="card-text card-desc">${truncateFormattedText(post.post_description, 6)}... <a href="/blogs/${post.post_slug}">Show More</a></p>
                            </div>
                        </div>
                    </a>
                </div>`;
            })
        }else{
            output += `<div class="not-found my-5">
                <i class="bi bi-file-earmark-x"></i>
                <span>${data.message}</span>
            </div>`
        }

        $('#blog_data').html(output);
    } catch (error) {
        console.error(error);
    }
}


// ==================== Get Specific Post ====================
async function getSpecificBlog(slug) {
    $('#single_blog_data').html(single_locader());
    $('.sort-section').css('display', 'none');

    try {
        const response = await fetch(`http://localhost:3000/api/v1/posts?post_slug=${slug}`);
        const data = await response.json();
        let output = "";

        if (data.posts) {
            data.posts.map(post => {
                output += `<div class="card single-card">
                    <h1 class="card-title mb-5">${post.post_title}</h1>
                    <img class="card-img-top" src="${post.post_imgUrl}" alt="Title">
                    <div class="card-body">
                        <p class="card-text card-date mb-2">
                            <i class="bi bi-clock me-1"></i>
                            ${moment(post.createdAt).fromNow()}
                        </p>
                        <span class="badge px-2 py-2 mb-4">${post.post_category}</span>
                        <p class="card-text card-desc">${post.post_description}</p>
                    </div>
                </div>`;
            })
        }else{
            output += `<div class="not-found my-5">
                <i class="bi bi-file-earmark-x"></i>
                <span>${data.message}</span>
            </div>`
        }

        $('#single_blog_data').html(output);
    } catch (error) {
        console.error(error);
    }
}


// ==================== Get Post via Search ====================
async function getSearchBlog(event) {
    try {
        const keywords = event.value;
        const response = await fetch(`http://localhost:3000/api/v1/posts?search=${keywords}`);
        const data = await response.json();
        let output = "";

        if (keywords==="") return $('#search_result').html('');

        if (data.posts) {
            data.posts.map(post=> {
                output += `<a href="/blogs/${post.post_slug}">
                    <strong>${post.post_title.substr(0, keywords.length)}</strong>${post.post_title.substr(keywords.length)}
                </a>`;
            })
        }else{
            output += `<span>${data.message}</span>`;
        }

        $('#search_result').css('display','block').html(output);

    } catch (error) {
        console.error(error);
    }
}


// ==================== Get Categories ====================
async function getCategories() {
    try {
        const response = await fetch('http://localhost:3000/api/v1/posts');
        const data = await response.json();
        let output = "";
        output += `<option selected disabled>Select Category</option>`;
        output += `<option value="abc">abc</option>`;

        if (data.posts) {
            data.posts.map(post=> {
                output += `<option value="${post.post_category}">${post.post_category}</option>`;
            })
        }else{
            output += `<option selected disabled>${data.message}</option>`;
        }

        $('.category-select').html(output);

    } catch (error) {
        console.error(error);
    }
}


function sortByCategory(event) {
    getBlogs(event);
}


function sortByNameDate(event) {
    getBlogs(event);
}


getCategories();







//   const pickerOptions = { onEmojiSelect: console.log() }
//   const picker = new EmojiMart.Picker(pickerOptions)

//   $('.text-area').html(picker);