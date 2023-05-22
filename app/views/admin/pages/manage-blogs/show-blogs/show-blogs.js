function table_loader() {
    return `<tr>
        <td colspan="7">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </td>
    </tr>`;
}



async function getBlogsData(event = "") {
    $('#blog_data').html(table_loader());
    let url;

    if (event!=="") {
        if (event.value!=="") {
            url = `http://localhost:3000/api/v1/posts?search=${event.value}`;
        }else{
            url = "http://localhost:3000/api/v1/posts";
        }
    }else{
        url = "http://localhost:3000/api/v1/posts";
    }

    const response = await fetch(url);
    const data = await response.json();
    let output = "";

    if (data.posts) {
        data.posts.map((post, index) => output += blogTable(post, index));
    }else{
        output += `<tr><td colspan="7">${data.message}</td></tr>`;
    }

    $('#blog_data').html(output);
}






getBlogsData();









function blogTable(post, index) {
    return `<tr>
        <td>${index+1}</td>
        <td><img src="${post.post_imgUrl}" class="rounded" style="width: 60px" /></td>
        <td>${post.post_title}</td>
        <td>
            <div class="alert alert-success mb-0 py-1" role="alert">
                <strong>${post.post_category}</strong>
            </div>
        </td>
        <td>${truncateFormattedText(post.post_description, 3)}...</td>
        <td>
            <div class="alert ${post.post_status==="Published" ? "alert-success" : "alert-danger"} mb-0 py-1" role="alert">
                <strong>${post.post_status}</strong>
            </div>
        </td>
        <td>
            <a href="javascript:void(0)" class="me-3" onclick="editBlog('${post._id}')">
                <i class="bi bi-pencil-square"></i>
            </a>
            <a href="javascript:void(0)" onclick="deleteBlog('${post._id}')">
                <i class="bi bi-trash"></i>
            </a>
        </td>
    </tr>`;
}



async function deleteBlog(id) {
    const confirmed = await showConfirmationDialog('Do you really want to delete this blog?');

    if (confirmed) {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/posts?_id=${id}`, { method: 'DELETE' });
            const data = await response.json();
            getBlogsData();
            showSuccessToast(data.message);
        } catch (error) {
            showErrorToast('An error occurred while deleting the category');
        }
    }
}