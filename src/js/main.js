const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function getTrendingContent() {
    try {
        const response = await fetch(
            `${BASE_URL}/trending/all/day?api_key=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`TMDB API Error: ${response.status}`);
        }

        const data = await response.json();

        console.log('TMDB results:', data.results);

        displayCards(data.results);

    } catch (error) {
        console.error('Error connecting to TMDB:', error);

        const container = document.querySelector('#discover-content');

        if (container) {
            container.innerHTML = `
                <p>Unable to load movies and TV shows.</p>
            `;
        }
    }
} 

function displayCards(items) {
    const container = document.querySelector('#discover-content');

    if (!container) {
        console.error('Discover content container not found.');
        return;
    }

    container.innerHTML = items
        .map(item => createCard(item))
        .join('');
}

function createCard(item) {
    const title = item.title || item.name || 'Unknown Title';
    const date = item.release_date || item.first_air_date || 'N/A';
    const type = item.media_type === 'movie' ? 'Movie' : 'TV Show';

    const image = item.poster_path
        ? `${IMAGE_BASE_URL}${item.poster_path}`
        : '';
    
    return `
        <article class="movie-card">
            ${image
            ? `<img src="${image}" alt="${title} poster">`
            : `<div class="no-image">No image available</div>`
        }

            <div class="card-content">
                <h3>${title}</h3>
                <p>Rating: ${item.vote_average.toFixed(1)}</p>
                <p>Type: ${type}</p>
                <p>Release Date: ${date}</p>
            </div>
        </article>
    `;
}

getTrendingContent();
