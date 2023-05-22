handleActiveClass();


function handleActiveClass() {
    const nav_links = document.querySelectorAll('.nav-link');
    const path = document.querySelector('#current_path');
    const current_path = path.getAttribute('data-path');

    nav_links.forEach(link => {
        if (current_path === link.getAttribute('href')) {
            link.classList.add("active")
        }
    })
}



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