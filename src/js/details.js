import { getDetails, getYouTubeTrailer } from "./api.js";

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function loadDetails() {
    const params = new URLSearchParams(window.location.search);

    const id = params.get('id');
    const type = params.get('type');

    try {
        const data = await getDetails(id, type);

        displayDetails(data, type);
    } catch (error) {
        console.error('Error loading details:', error);
    }
}

function displayDetails(item, type) {
    const container = document.querySelector('#details-container');

    if (!container) {
        console.error('Details container not found.');
        return;
    }

    const title = item.title || item.name;
    const date = item.release_date || item.first_air_date || 'N/A';

    const image = item.poster_path
        ? `${IMAGE_BASE_URL}${item.poster_path}`
        : '';

    container.innerHTML = `
        <article class="details-card">

            ${image
            ? `<img src="${image}" alt="${title} poster">`
            : ''
        }

            <div>
                <h2>${title}</h2>

                <p><strong>Rating:</strong> ${item.vote_average}</p>

                <p><strong>Type:</strong> ${type === 'movie' ? 'Movie' : 'TV Show'}</p>

                <p><strong>Release Date:</strong> ${date}</p>

                <p><strong>Description:</strong></p>
                
                <p>${item.overview}</p>

            </div>
        </article>
    `;

    const favoriteButton = document.querySelector('#favorite-button');

    if (favoriteButton) {
        favoriteButton.addEventListener('click', () => {
            saveFavorite(item, type);
        });
    }

    const trailerButton = document.querySelector('#trailer-button');

    if (trailerButton) {
        trailerButton.addEventListener('click', async () => {
            try {
                const data = await getYouTubeTrailer(title);

                const trailer = data.items.find(video => 
                    video.snippet.title.toLowerCase().includes("official trailer")
                ) || data.items[0];

                if (trailer) {
                    const trailerContainer = document.querySelector('#trailer-container');

                    trailerContainer.innerHTML = `
                        <iframe
                            src="https://www.youtube.com/embed/${trailer.id.videoId}"
                            title="${title}"
                            allowfullscreen>
                        </iframe>
                    `;
                } else {
                    alert("Trailer not available.")
                }

            } catch (error) {
                console.error("Error loading trailer:", error);
            }
        });
    }
}

loadDetails();

function saveFavorite(item, type) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const exists = favorites.some(favorite => favorite.id === item.id);

    if (exists) {
        alert('Already in Favorites');
        return;
    }

    const favorite = {
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        media_type: type,
        vote_average: item.vote_average,
        release_date: item.release_date || item.first_air_date || 'N/A'
    };

    favorites.push(favorite);

    localStorage.setItem('favorites', JSON.stringify(favorites));

    alert('Added to Favorites');
}