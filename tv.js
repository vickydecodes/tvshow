const form = document.querySelector('#tvsearch');
const input = document.querySelector('#search');
const rgbbtn = document.querySelector('#change');
const movieContainer = document.querySelector('.movie-container');
const h1 = document.querySelector('#h1');

// Toggle between light and dark mode
rgbbtn.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
});

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = input.value.toUpperCase();
    const config = { params: { q: searchTerm } };
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    
    h1.innerText = searchTerm ? searchTerm : 'TV SHOW APP';
    input.value = "";
    
    makeImages(res.data);
});

const makeCard = (details) => {
    const card = document.createElement('div');
    card.classList.add('card', 'my-3'); 
    card.style.width = '600px'

    card.innerHTML = `
        <div class="row g-0 w-100">
            <div class="col-md-4 d-flex justify-content-center">
                <img src="${details.img}" class="img-fluid rounded-start" alt="${details.title}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title"><b>${details.title}</b></h5>
                    <p class="card-text">Rating: ${details.rating || 'N/A'}</p>
                    <p class="card-text">Language: ${details.language}</p>
                    <p class="card-text">Genre: ${details.genres.join(', ')}</p>
                    <p class="card-text">Premiered: ${details.premiered || 'N/A'}</p>
                    <p class="card-text">Status: ${details.status}</p>
                </div>
            </div>
        </div>
    `;
    return card;
}

const makeImages = (shows) => {
    movieContainer.innerHTML = '';

    shows.forEach(result => {
        if (result.show.image) {
            const show = result.show;
            const details = {
                img: show.image.medium,
                title: show.name,
                rating: show.rating.average || 'N/A',
                language: show.language,
                genres: show.genres,
                premiered: show.premiered,
                status: show.status
            };
            
            const card = makeCard(details);
            movieContainer.append(card);
        }
    });
}
