import { createCard } from "./cardUtils.js";

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const container = document.querySelector('#favorites-content');

    if (!container) {
        console.error('Favorites container not found.');
        return;
    }

    if (favorites.length === 0) {
        container.innerHTML = `
            <p>No favorites added yet.</p>
        `;
        return;
    }

    container.innerHTML = favorites
        .map(item => createCard(item, true))
        .join('');

    const removeButtons = container.querySelectorAll(".remove-btn");

    removeButtons.forEach(button => {
        button.addEventListener("click", removeFavorite);
    });
}


function removeFavorite(event) {
    const card = event.target.closest(".movie-card");
    const id = Number(card.dataset.id);

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favorites = favorites.filter(item => item.id !== id);

    localStorage.setItem('favorites', JSON.stringify(favorites));

    loadFavorites();
}

loadFavorites();
