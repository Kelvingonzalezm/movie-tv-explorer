const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export function createCard(item, showRemove = false) {
    const title = item.title || item.name || 'Unknown Title';
    const date = item.release_date || item.first_air_date || 'N/A';
    const type = item.media_type === 'movie' ? 'Movie' : 'TV Show';

    const image = item.poster_path
        ? `${IMAGE_BASE_URL}${item.poster_path}`
        : '';

    return `
        <article class="movie-card" data-id="${item.id}" data-type="${item.media_type}">
            ${image
            ? `<img src="${image}" alt="${title} poster">`
            : `<div class="no-image">No image available</div>`
        }

            <div class="card-content">
                <h3>${title}</h3>
                <p>Rating: ${(item.vote_average ?? item.rating ?? 0).toFixed(1)}</p>
                <p>Type: ${type}</p>
                <p>Release Date: ${date}</p>

                ${showRemove ? `<button class="remove-btn">Remove</button>` : ""}
            </div>
        </article>
    `;
}