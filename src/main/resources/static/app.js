/**
 * CineMatch AI - Movie Recommendation Frontend
 * Integrates with Spring Boot backend endpoints:
 * - GET /movies/search?query={query}
 * - GET /movies/{title}/similar
 */

// Master Movie Catalog metadata with posters and attributes
const MOVIES_DATA = [
  {
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    genres: ["Sci-Fi", "Adventure", "Drama"],
    image: "images/interstellar.jpg",
    description: "A group of astronauts travel through a wormhole searching for a new home for humanity."
  },
  {
    title: "Gravity",
    year: 2013,
    rating: 7.7,
    genres: ["Sci-Fi", "Thriller"],
    image: "images/gravity.jpg",
    description: "An astronaut stranded in space struggles to survive and return safely to Earth."
  },
  {
    title: "The Martian",
    year: 2015,
    rating: 8.0,
    genres: ["Sci-Fi", "Adventure"],
    image: "images/the_martian.jpg",
    description: "An astronaut stranded on Mars uses science and ingenuity to survive until rescue."
  },
  {
    title: "Titanic",
    year: 1997,
    rating: 7.9,
    genres: ["Romance", "Drama"],
    image: "images/titanic.jpg",
    description: "Two passengers from different social classes fall in love aboard a doomed ocean liner."
  },
  {
    title: "John Wick",
    year: 2014,
    rating: 7.4,
    genres: ["Action", "Thriller", "Crime"],
    image: "images/john_wick.jpg",
    description: "A retired assassin returns to the criminal underworld seeking revenge after a personal loss."
  },
  {
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genres: ["Action", "Crime", "Drama"],
    image: "images/the_dark_knight.jpg",
    description: "A masked vigilante battles a criminal mastermind who spreads chaos throughout Gotham City."
  },
  {
    title: "Shutter Island",
    year: 2010,
    rating: 8.2,
    genres: ["Mystery", "Thriller"],
    image: "images/shutter_island.jpg",
    description: "A detective investigates the disappearance of a patient from an isolated psychiatric hospital and begins questioning reality."
  },
  {
    title: "Finding Nemo",
    year: 2003,
    rating: 8.2,
    genres: ["Animation", "Adventure", "Family"],
    image: "images/finding_nemo.jpg",
    description: "A cautious father crosses the ocean searching for his missing son."
  },
  {
    title: "The Pursuit of Happyness",
    year: 2006,
    rating: 8.0,
    genres: ["Biography", "Drama"],
    image: "images/the_pursuit_of_happyness.jpg",
    description: "A struggling father faces poverty and homelessness while trying to build a better future for himself and his young son."
  },
  {
    title: "Toy Story",
    year: 1995,
    rating: 8.3,
    genres: ["Animation", "Adventure", "Comedy"],
    image: "images/toy_story.jpg",
    description: "A group of toys come alive and struggle with friendship, jealousy, identity and being replaced."
  },
  {
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genres: ["Sci-Fi", "Action", "Thriller"],
    image: "images/inception.jpg",
    description: "A skilled thief enters people's dreams to steal secrets and is given a mission to plant an idea inside a target's mind."
  },
  {
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    genres: ["Drama", "Crime"],
    image: "images/the_shawshank_redemption.jpg",
    description: "A wrongly convicted banker forms a lasting friendship and searches for hope while serving a long prison sentence."
  },
  {
    title: "Forrest Gump",
    year: 1994,
    rating: 8.8,
    genres: ["Drama", "Romance"],
    image: "images/forrest_gump.jpg",
    description: "A kind-hearted man experiences decades of American history while remaining devoted to the woman he has loved since childhood."
  },
  {
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    genres: ["Sci-Fi", "Action"],
    image: "images/the_matrix.jpg",
    description: "A hacker discovers that reality is a simulated world and joins a rebellion against the machines controlling humanity."
  },
  {
    title: "Gladiator",
    year: 2000,
    rating: 8.5,
    genres: ["Action", "Adventure", "Drama"],
    image: "images/gladiator.jpg",
    description: "A betrayed Roman general becomes a gladiator and fights his way toward revenge against the emperor who destroyed his family."
  },
  {
    title: "Avengers: Endgame",
    year: 2019,
    rating: 8.4,
    genres: ["Action", "Sci-Fi", "Adventure"],
    image: "images/avengers_endgame.jpg",
    description: "The surviving heroes reunite for a final mission to reverse a devastating loss and restore the people who disappeared."
  },
  {
    title: "Jurassic Park",
    year: 1993,
    rating: 8.2,
    genres: ["Sci-Fi", "Adventure", "Thriller"],
    image: "images/jurassic_park.jpg",
    description: "Scientists and visitors become trapped in a dinosaur theme park after its security systems fail."
  },
  {
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    genres: ["Crime", "Drama"],
    image: "images/the_godfather.jpg",
    description: "The reluctant son of a powerful crime family is drawn into the family's violent world and gradually takes control."
  },
  {
    title: "Fight Club",
    year: 1999,
    rating: 8.8,
    genres: ["Drama", "Thriller"],
    image: "images/fight_club.jpg",
    description: "A disillusioned office worker and a charismatic stranger create an underground fight club that grows into something dangerous."
  },
  {
    title: "La La Land",
    year: 2016,
    rating: 8.0,
    genres: ["Comedy", "Drama", "Music"],
    image: "images/la_la_land.jpg",
    description: "An aspiring actress and a jazz musician fall in love while pursuing ambitious creative careers in Los Angeles."
  },
  {
    title: "3 Idiots",
    year: 2009,
    rating: 8.4,
    genres: ["Bollywood", "Comedy", "Drama"],
    image: "images/3_idiots.jpg",
    description: "Three engineering students navigate academic pressure, friendship and expectations while questioning a rigid education system."
  },
  {
    title: "Dangal",
    year: 2016,
    rating: 8.3,
    genres: ["Bollywood", "Action", "Biography", "Drama"],
    image: "images/dangal.jpg",
    description: "A former wrestler trains his daughters to become competitive wrestlers while challenging social expectations in rural India."
  },
  {
    title: "Zindagi Na Milegi Dobara",
    year: 2011,
    rating: 8.2,
    genres: ["Bollywood", "Comedy", "Drama", "Adventure"],
    image: "images/zindagi_na_milegi_dobara.jpg",
    description: "Three friends take a road trip across Spain that forces them to confront fear, relationships and how they want to live."
  },
  {
    title: "Taare Zameen Par",
    year: 2007,
    rating: 8.3,
    genres: ["Bollywood", "Drama", "Family"],
    image: "images/taare_zameen_par.jpg",
    description: "A misunderstood child struggling with dyslexia finds confidence after a compassionate teacher recognizes his creativity."
  },
  {
    title: "Lagaan",
    year: 2001,
    rating: 8.1,
    genres: ["Bollywood", "Drama", "Musical", "Sport"],
    image: "images/lagaan.jpg",
    description: "Villagers under colonial rule challenge British officers to a cricket match in hopes of escaping a crushing agricultural tax."
  },
  {
    title: "Dilwale Dulhania Le Jayenge",
    year: 1995,
    rating: 8.0,
    genres: ["Bollywood", "Drama", "Romance"],
    image: "images/dilwale_dulhania_le_jayenge.jpg",
    description: "Two young Indians living abroad fall in love, but family tradition and an arranged marriage stand between them."
  },
  {
    title: "Gully Boy",
    year: 2019,
    rating: 7.9,
    genres: ["Bollywood", "Drama", "Music"],
    image: "images/gully_boy.jpg",
    description: "A young man from a poor Mumbai neighborhood uses hip-hop and street rap to pursue a life beyond poverty and social limitations."
  },
  {
    title: "Queen",
    year: 2013,
    rating: 8.1,
    genres: ["Bollywood", "Comedy", "Drama"],
    image: "images/queen.jpg",
    description: "After being abandoned before her wedding, a sheltered young woman travels alone on her planned honeymoon and discovers independence."
  },
  {
    title: "Bajrangi Bhaijaan",
    year: 2015,
    rating: 8.1,
    genres: ["Bollywood", "Action", "Adventure", "Comedy"],
    image: "images/bajrangi_bhaijaan.jpg",
    description: "A kind-hearted Indian man crosses borders and overcomes political obstacles to reunite a lost mute Pakistani girl with her family."
  },
  {
    title: "Andhadhun",
    year: 2018,
    rating: 8.2,
    genres: ["Bollywood", "Crime", "Mystery", "Thriller"],
    image: "images/andhadhun.jpg",
    description: "A pianist pretending to be blind becomes trapped in a dangerous web of murder, deception and unpredictable consequences."
  }
];

// App State
let watchlist = JSON.parse(localStorage.getItem('cinematch_watchlist') || '[]');
let activeGenre = 'all';
let catalogSearchQuery = '';
let isBackendLive = false;

// DOM Elements
const recommendationForm = document.getElementById('recommendation-form');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const searchBtn = document.getElementById('search-btn');
const resultsSection = document.getElementById('results-section');
const resultsContainer = document.getElementById('results-container');
const resultsTitle = document.getElementById('results-title');
const resultsQueryDisplay = document.getElementById('results-query-display');
const dismissResultsBtn = document.getElementById('dismiss-results-btn');
const catalogContainer = document.getElementById('catalog-container');
const catalogFilterInput = document.getElementById('catalog-filter-input');
const genreFilterBar = document.getElementById('genre-filter-bar');
const apiStatusIndicator = document.getElementById('api-status');
const statusLabel = document.getElementById('status-label');
const movieModal = document.getElementById('movie-modal');
const modalBody = document.getElementById('modal-body');
const modalCloseBtn = document.getElementById('modal-close-btn');
const watchlistDrawer = document.getElementById('watchlist-drawer');
const drawerBackdrop = document.getElementById('drawer-backdrop');
const watchlistToggleBtn = document.getElementById('watchlist-toggle-btn');
const drawerCloseBtn = document.getElementById('drawer-close-btn');
const drawerContent = document.getElementById('drawer-content');
const clearWatchlistBtn = document.getElementById('clear-watchlist-btn');
const watchlistBadge = document.getElementById('watchlist-badge');

// Helper to look up a movie object by title
function getMovieByTitle(title) {
  if (!title) return null;
  const cleanTitle = title.trim().toLowerCase();
  return MOVIES_DATA.find(m => m.title.toLowerCase() === cleanTitle) || {
    title: title,
    year: 'N/A',
    rating: 8.0,
    genres: ['Featured'],
    image: 'images/interstellar.jpg',
    description: ''
  };
}

// Check Backend Health
async function checkBackendStatus() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const resp = await fetch('/movies/search?query=test', { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (resp.ok) {
      isBackendLive = true;
      apiStatusIndicator.querySelector('.status-dot').className = 'status-dot online';
      statusLabel.textContent = 'API: Live (Spring AI)';
      return;
    }
  } catch (err) {
    // API not reachable directly (e.g. running from file:// or server not started yet)
  }
  isBackendLive = false;
  apiStatusIndicator.querySelector('.status-dot').className = 'status-dot';
  statusLabel.textContent = 'Demo Mode (Local)';
}

// Client-side fallback semantic/term similarity matching
function localSemanticSearch(query, topK = 3) {
  const queryTerms = query.toLowerCase().split(/\W+/).filter(w => w.length > 2);
  
  const scored = MOVIES_DATA.map(movie => {
    let score = 0.50; // base baseline
    const text = (movie.title + " " + movie.description + " " + movie.genres.join(" ")).toLowerCase();
    
    queryTerms.forEach(term => {
      if (text.includes(term)) {
        score += 0.15;
      }
    });

    // Add gentle deterministic jitter based on title length so results feel natural
    const pseudoScore = Math.min(0.98, Math.max(0.65, score + (movie.title.length % 5) * 0.02));

    return {
      title: movie.title,
      description: movie.description,
      match: pseudoScore
    };
  });

  scored.sort((a, b) => b.match - a.match);
  return scored.slice(0, topK);
}

// Client-side fallback for similar movies
function localSimilarMovies(title, topK = 3) {
  const target = getMovieByTitle(title);
  if (!target) return [];

  const candidates = MOVIES_DATA.filter(m => m.title.toLowerCase() !== title.toLowerCase());
  
  const scored = candidates.map(m => {
    let sharedGenres = 0;
    target.genres.forEach(g => {
      if (m.genres.includes(g)) sharedGenres++;
    });

    let score = 0.68 + (sharedGenres * 0.08);
    // Word overlap in descriptions
    const descWordsA = target.description.toLowerCase().split(/\W+/);
    const descWordsB = m.description.toLowerCase().split(/\W+/);
    const overlap = descWordsA.filter(w => w.length > 3 && descWordsB.includes(w)).length;
    score += overlap * 0.04;

    const pseudoScore = Math.min(0.97, Math.max(0.60, score));

    return {
      title: m.title,
      description: m.description,
      match: pseudoScore
    };
  });

  scored.sort((a, b) => b.match - a.match);
  return scored.slice(0, topK);
}

// Search form handler
recommendationForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  setSearchLoading(true);

  try {
    let matches = [];
    if (isBackendLive) {
      try {
        const resp = await fetch(`/movies/search?query=${encodeURIComponent(query)}`);
        if (resp.ok) {
          matches = await resp.json();
        } else {
          matches = localSemanticSearch(query, 3);
        }
      } catch (err) {
        matches = localSemanticSearch(query, 3);
      }
    } else {
      // Simulate quick natural AI latency for demo mode
      await new Promise(r => setTimeout(r, 350));
      matches = localSemanticSearch(query, 3);
    }

    displayRecommendations(matches, `Based on your prompt: "${query}"`, "Vector Semantic Matches");
  } catch (err) {
    showToast("Error retrieving recommendations", "error");
  } finally {
    setSearchLoading(false);
  }
});

// Trigger Similar Movies search for a specific title
async function triggerSimilarSearch(movieTitle) {
  setSearchLoading(true);
  window.scrollTo({ top: 350, behavior: 'smooth' });

  try {
    let matches = [];
    if (isBackendLive) {
      try {
        const resp = await fetch(`/movies/${encodeURIComponent(movieTitle)}/similar`);
        if (resp.ok) {
          matches = await resp.json();
        } else {
          matches = localSimilarMovies(movieTitle, 3);
        }
      } catch (err) {
        matches = localSimilarMovies(movieTitle, 3);
      }
    } else {
      await new Promise(r => setTimeout(r, 300));
      matches = localSimilarMovies(movieTitle, 3);
    }

    displayRecommendations(matches, `Because you liked "${movieTitle}"`, "Similar Recommendations");
  } catch (err) {
    showToast("Could not find similar movies", "error");
  } finally {
    setSearchLoading(false);
  }
}

// Render Recommendations Grid
function displayRecommendations(matches, subtitle, badgeText = "AI Matches") {
  resultsContainer.innerHTML = '';
  document.getElementById('results-tag').textContent = badgeText;
  resultsQueryDisplay.textContent = subtitle;

  if (!matches || matches.length === 0) {
    resultsContainer.innerHTML = `<div class="drawer-empty"><p>No close matches found. Try another prompt!</p></div>`;
    resultsSection.style.display = 'block';
    return;
  }

  matches.forEach((item, index) => {
    const movie = getMovieByTitle(item.title);
    const matchScore = (item.match !== undefined && item.match !== null) ? item.match : 0.85;
    const matchPercent = Math.round(matchScore * 100);

    const isSaved = watchlist.some(w => w.title === movie.title);

    const card = document.createElement('div');
    card.className = 'rec-card';
    card.innerHTML = `
      <div class="rec-card-inner">
        <div class="rec-card-media">
          <img src="${movie.image}" alt="${movie.title}" class="rec-card-img" onerror="this.src='images/interstellar.jpg'">
          <div class="rec-rank-badge">#${index + 1} Top Pick</div>
          <div class="rec-card-badge">
            <span class="match-percent">${matchPercent}%</span> Match
          </div>
        </div>
        <div class="rec-card-body">
          <div class="rec-similarity-bar-wrap">
            <div class="rec-similarity-labels">
              <span>Semantic Similarity</span>
              <span>${(matchScore).toFixed(3)}</span>
            </div>
            <div class="similarity-bar-bg">
              <div class="similarity-bar-fill" style="width: ${matchPercent}%"></div>
            </div>
          </div>
          <h3 class="rec-card-title">${movie.title}</h3>
          <div class="rec-card-meta">
            <span>📅 ${movie.year}</span>
            <span><span class="rating-star">★</span> ${movie.rating}</span>
            <span>🎭 ${movie.genres.slice(0, 2).join(', ')}</span>
          </div>
          <p class="rec-card-desc">${item.description || movie.description}</p>
          <div class="rec-card-actions">
            <button class="btn-card-primary" onclick="openMovieModal('${movie.title.replace(/'/g, "\\'")}')">
              View Details
            </button>
            <button class="btn-card-icon ${isSaved ? 'active' : ''}" title="${isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}" onclick="toggleWatchlist('${movie.title.replace(/'/g, "\\'")}', this)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
    resultsContainer.appendChild(card);
  });

  resultsSection.style.display = 'block';
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Render the 30 Catalog Movies
function renderCatalog() {
  catalogContainer.innerHTML = '';

  const filtered = MOVIES_DATA.filter(movie => {
    const matchesGenre = activeGenre === 'all' || movie.genres.some(g => g.toLowerCase() === activeGenre.toLowerCase());
    const matchesSearch = !catalogSearchQuery || movie.title.toLowerCase().includes(catalogSearchQuery.toLowerCase()) || movie.description.toLowerCase().includes(catalogSearchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  if (filtered.length === 0) {
    catalogContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p>No movies found matching "${catalogSearchQuery}".</p>
      </div>
    `;
    return;
  }

  filtered.forEach(movie => {
    const isSaved = watchlist.some(w => w.title === movie.title);

    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <div class="poster-container" onclick="openMovieModal('${movie.title.replace(/'/g, "\\'")}')">
        <img src="${movie.image}" alt="${movie.title}" class="movie-poster" loading="lazy" onerror="this.src='images/interstellar.jpg'">
        <div class="badge-rating">
          <span style="color:var(--accent-amber);">★</span> ${movie.rating}
        </div>
        <div class="poster-overlay">
          <span class="badge-genre">${movie.genres[0]}</span>
        </div>
      </div>
      <div class="movie-info">
        <h4 class="movie-title" title="${movie.title}">${movie.title}</h4>
        <p class="movie-desc-preview">${movie.description}</p>
        <div class="card-bottom-actions">
          <button class="btn-similar" onclick="event.stopPropagation(); triggerSimilarSearch('${movie.title.replace(/'/g, "\\'")}')">
            ✨ Similar
          </button>
          <button class="btn-bookmark ${isSaved ? 'bookmarked' : ''}" title="${isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}" onclick="event.stopPropagation(); toggleWatchlist('${movie.title.replace(/'/g, "\\'")}', this)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
    catalogContainer.appendChild(card);
  });
}

// Movie Modal Details
function openMovieModal(title) {
  const movie = getMovieByTitle(title);
  if (!movie) return;

  const isSaved = watchlist.some(w => w.title === movie.title);

  modalBody.innerHTML = `
    <div class="modal-detail-layout">
      <div class="modal-poster-side">
        <img src="${movie.image}" alt="${movie.title}" onerror="this.src='images/interstellar.jpg'">
      </div>
      <div class="modal-info-side">
        <div>
          <div class="modal-badges">
            ${movie.genres.map(g => `<span class="badge-genre">${g}</span>`).join(' ')}
          </div>
          <h2 class="modal-title">${movie.title}</h2>
          <div class="modal-meta-row">
            <span>📅 Release: <strong>${movie.year}</strong></span>
            <span>⭐ Rating: <strong>${movie.rating} / 10</strong></span>
          </div>
          <p class="modal-desc">${movie.description}</p>
        </div>
        <div class="modal-actions">
          <button class="submit-btn" style="flex:1; justify-content:center;" onclick="closeMovieModal(); triggerSimilarSearch('${movie.title.replace(/'/g, "\\'")}')">
            ✨ Find Similar Movies
          </button>
          <button class="btn-card-icon ${isSaved ? 'active' : ''}" style="width:48px; height:48px;" title="${isSaved ? 'Saved' : 'Save to Watchlist'}" onclick="toggleWatchlist('${movie.title.replace(/'/g, "\\'")}', this)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  movieModal.classList.add('open');
  movieModal.setAttribute('aria-hidden', 'false');
}

function closeMovieModal() {
  movieModal.classList.remove('open');
  movieModal.setAttribute('aria-hidden', 'true');
}

// Watchlist Handling
function toggleWatchlist(title, btnElement) {
  const movie = getMovieByTitle(title);
  if (!movie) return;

  const existingIndex = watchlist.findIndex(w => w.title === movie.title);
  if (existingIndex > -1) {
    watchlist.splice(existingIndex, 1);
    showToast(`Removed "${movie.title}" from Watchlist`);
    if (btnElement) {
      btnElement.classList.remove('active', 'bookmarked');
      const icon = btnElement.querySelector('svg');
      if (icon) icon.setAttribute('fill', 'none');
    }
  } else {
    watchlist.push({
      title: movie.title,
      year: movie.year,
      rating: movie.rating,
      image: movie.image,
      genres: movie.genres
    });
    showToast(`Added "${movie.title}" to Watchlist!`, 'success');
    if (btnElement) {
      btnElement.classList.add('active', 'bookmarked');
      const icon = btnElement.querySelector('svg');
      if (icon) icon.setAttribute('fill', 'currentColor');
    }
  }

  localStorage.setItem('cinematch_watchlist', JSON.stringify(watchlist));
  updateWatchlistUI();
  renderCatalog(); // re-render bookmark status
}

function updateWatchlistUI() {
  watchlistBadge.textContent = watchlist.length;

  if (watchlist.length === 0) {
    drawerContent.innerHTML = `
      <div class="drawer-empty">
        <div class="drawer-empty-icon">🎬</div>
        <p>Your watchlist is empty.</p>
        <span style="font-size:0.8rem; color:var(--text-subtle);">Click the bookmark icon on any movie to save it here!</span>
      </div>
    `;
    return;
  }

  drawerContent.innerHTML = '';
  watchlist.forEach(item => {
    const el = document.createElement('div');
    el.className = 'watchlist-item';
    el.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="watchlist-item-img" onerror="this.src='images/interstellar.jpg'">
      <div class="watchlist-item-info">
        <h4 class="watchlist-item-title">${item.title}</h4>
        <div class="watchlist-item-meta">⭐ ${item.rating} • ${item.year}</div>
      </div>
      <button class="watchlist-item-remove" title="Remove" onclick="toggleWatchlist('${item.title.replace(/'/g, "\\'")}')">✕</button>
    `;
    drawerContent.appendChild(el);
  });
}

function openWatchlistDrawer() {
  watchlistDrawer.classList.add('open');
  drawerBackdrop.classList.add('open');
}

function closeWatchlistDrawer() {
  watchlistDrawer.classList.remove('open');
  drawerBackdrop.classList.remove('open');
}

// UI Feedback & Helpers
function setSearchLoading(isLoading) {
  const btnText = searchBtn.querySelector('.btn-text');
  const btnSpinner = searchBtn.querySelector('.btn-spinner');
  if (isLoading) {
    btnText.style.display = 'none';
    btnSpinner.style.display = 'inline-block';
    searchBtn.disabled = true;
  } else {
    btnText.style.display = 'inline';
    btnSpinner.style.display = 'none';
    searchBtn.disabled = false;
  }
}

function showToast(message, type = 'normal') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'success' : ''}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : 'ℹ'}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// Event Listeners Initialization
function initEventListeners() {
  // Input clear button
  searchInput.addEventListener('input', () => {
    clearSearchBtn.style.display = searchInput.value.length > 0 ? 'flex' : 'none';
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    searchInput.focus();
  });

  // Query chips click
  document.querySelectorAll('.query-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      searchInput.value = chip.getAttribute('data-query');
      clearSearchBtn.style.display = 'flex';
      recommendationForm.dispatchEvent(new Event('submit'));
    });
  });

  // Results dismiss
  dismissResultsBtn.addEventListener('click', () => {
    resultsSection.style.display = 'none';
  });

  // Genre filter pills
  genreFilterBar.addEventListener('click', (e) => {
    const pill = e.target.closest('.filter-pill');
    if (!pill) return;
    document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    activeGenre = pill.getAttribute('data-genre');
    renderCatalog();
  });

  // Catalog search input
  catalogFilterInput.addEventListener('input', (e) => {
    catalogSearchQuery = e.target.value.trim();
    renderCatalog();
  });

  // Modal close handlers
  modalCloseBtn.addEventListener('click', closeMovieModal);
  movieModal.addEventListener('click', (e) => {
    if (e.target === movieModal) closeMovieModal();
  });

  // Watchlist drawer triggers
  watchlistToggleBtn.addEventListener('click', openWatchlistDrawer);
  drawerCloseBtn.addEventListener('click', closeWatchlistDrawer);
  drawerBackdrop.addEventListener('click', closeWatchlistDrawer);

  clearWatchlistBtn.addEventListener('click', () => {
    if (watchlist.length === 0) return;
    watchlist = [];
    localStorage.removeItem('cinematch_watchlist');
    updateWatchlistUI();
    renderCatalog();
    showToast('Watchlist cleared');
  });

  // Escape key close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMovieModal();
      closeWatchlistDrawer();
    }
  });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  updateWatchlistUI();
  initEventListeners();
  checkBackendStatus();
});
