document.addEventListener("DOMContentLoaded", function() {
    const url = 'https://scientiac.space/blog/';

    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const article = doc.querySelector('article.listing');
            
            if (article) {
                const firstLink = article.querySelector('a');
                
                if (firstLink) {
                    const dynamicLink = document.getElementById('dynamic-link');
                    dynamicLink.href = firstLink.href;
                    dynamicLink.textContent = `➥ ${firstLink.textContent || firstLink.href}`;
                } else {
                    console.error('No link found inside the first <article class="listing">');
                }
            } else {
                console.error('No <article class="listing"> element found');
            }
        })
        .catch(error => console.error('Error fetching the URL:', error));
});
