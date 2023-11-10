
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchButton').addEventListener('click', function() {
        var query = document.getElementById('searchInput').value;
        if(query) {
            console.log(`Searching for: ${query}`);
            window.location.href = `/api/recipe/search?query=${encodeURIComponent(query)}`;
        }
    });
});

