import { getTrendingContent, searchContent } from "./api.js";
import { displayCards } from "./display.js";

async function loadTrending() {
    try {
        const data = await getTrendingContent();

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

const discoverContainer = document.querySelector('#discover-content');

if (discoverContainer) {
    loadTrending();
}

const searchForm = document.querySelector('#search-form');

if (searchForm) {
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const searchInput = document.querySelector('#search-input');
        const query = searchInput.value.trim();

        if (query) {

            const title = document.querySelector('#search-title');
            
            if (title) {
                title.textContent = `Search Results for "${query}"`;
            }

            try {
                const data = await searchContent(query);

                console.log('Search results:', data.results);

                displayCards(data.results, '#search-results');
            } catch (error) {
                console.error('Error searching TMDB:', error);

                const container = document.querySelector('#search-results');

                if (container) {
                    container.innerHTML = `
                        <p>Unable to search movies and TV shows.</p>
                    `;
                }
            }
        }
    });
}
