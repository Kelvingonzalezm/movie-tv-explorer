import { createCard } from "./cardUtils.js";

export function displayCards(items, containerId = '#discover-content') {
    const container = document.querySelector(containerId);

    if (!container) {
        console.error(`${containerId} container not found.`);
        return;
    }

    container.innerHTML = items
        .map(item => createCard(item))
        .join('');

    addCardEvents(containerId);
}

function addCardEvents(containerId) {
    const cards = document.querySelectorAll(`${containerId} .movie-card`);

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            const type = card.dataset.type;

            window.location.href = `/movie-tv-explorer/details.html?id=${id}&type=${type}`;
        });
    });
}