handleActiveClass();


function handleActiveClass() {
    const nav_links = document.querySelectorAll('.links a');
    const path = document.querySelector('#current_path');
    const current_path = path.getAttribute('data-path');

    nav_links.forEach(link => {
        if (current_path === link.getAttribute('href')) {
            link.classList.add("active")
        }

        if (current_path === `${link.getAttribute('href')}/add-blog` || current_path === `${link.getAttribute('href')}/show-blogs`) {
            link.classList.add("active")
        }
    })
}


const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Post Description...'
});

quill.on('text-change', function (delta, oldDelta, source) {
    $('[name="post_description"]').val(quill.root.innerHTML);
});

Dropzone.autoDiscover = false;
const myDropzone = new Dropzone('#post_image', {
    url: '/api/v1/posts',
    parallelUploads: 1,
    uploadMultiple: false,
    acceptedFiles: '.png, .jpg, .jpeg',
    autoProcessQueue: false
})

$('.dropzone .dz-message .dz-button').html("Choose Post Image");





function truncateFormattedText(text, limit) {
    const strippedText = text.replace(/<[^>]+>/g, ''); // Remove HTML tags
    const words = strippedText.trim().split(/\s+/); // Split text into words

    if (words.length <= limit) {
        return text; // Return the original text if it's within the word limit
    }else {
        const truncatedWords = words.slice(0, limit); // Slice the words array up to the word limit
        const truncatedText = truncatedWords.join(' '); // Join the truncated words with spaces
        return truncatedText;
    }
}



// ==================== Show Confirm Dialog Box ====================
function showConfirmationDialog(message) {
    return new Promise((resolve) => {
        iziToast.question({
            close: false,
            overlay: true,
            displayMode: 'once',
            id: 'question',
            zindex: 999,
            message: message,
            position: 'center',
            buttons: [
                ['<button><b>YES</b></button>', function (instance, toast) {
                    resolve(true);
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                }, true],
                ['<button>No</button>', function (instance, toast) {
                    resolve(false);
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                }],
            ],
        });
    });
}


// ==================== Show Success Dialog Box ====================
function showSuccessToast(message) {
    iziToast.show({
        title: 'Success',
        titleSize: '17px',
        message: message,
        messageSize: '17px',
        theme: 'dark',
        icon: 'bi bi-check2',
        position: 'bottomRight'
    });
}


// ==================== Show Error Dialog Box ====================
function showErrorToast(message) {
    iziToast.show({
        title: 'Error',
        titleSize: '17px',
        message: message,
        messageSize: '17px',
        theme: 'dark',
        icon: 'bi bi-x-lg',
        position: 'bottomRight'
    });
}