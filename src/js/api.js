const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3';

export async function getTrendingContent() {
    const response = await fetch(
        `${BASE_URL}/trending/all/day?api_key=${API_KEY}`
    );

    if (!response.ok) {
        throw new Error(`TMDB API Error: ${response.status}`);
    }

    return await response.json();
}

export async function searchContent(query) {
    const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error(`TMDB API Error: ${response.status}`);
    }

    return await response.json();
}

export async function getDetails(id, type) {
    const response = await fetch(
        `${BASE_URL}/${type}/${id}?api_key=${API_KEY}`
    );

    if (!response.ok) {
        throw new Error(`TMDB API Error: ${response.status}`);
    }

    return await response.json();
}

export async function getTrailer(id, type) {
    const response = await fetch(
        `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`
    );

    if (!response.ok) {
        throw new Error(`TMDB API Error: ${response.status}`);
    }

    return await response.json();
}

export async function getYouTubeTrailer(title) {
    const response = await fetch(
        `${YOUTUBE_URL}/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(title + " official trailer")}&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
        throw new Error(`YouTube API Error: ${response.status}`);
    }

    return await response.json();
}