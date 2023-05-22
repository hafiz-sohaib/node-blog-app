const post_form = document.getElementById('post_form')


// ==================== Add New Blog Post ====================
post_form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const data = new FormData(this);

    myDropzone.files.forEach(file => data.append('file', file));

    try {
        const response = await fetch('/api/v1/posts', {
            method: 'POST',
            body: data
        });

        const result = await response.json();

        if (result.post) {
            showSuccessToast("Blog Published Successfully")
        }

        if (result.errors) {
            alert(result.errors.post_title);
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
});