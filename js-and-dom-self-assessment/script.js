// Global state
let allListings = [];
let displayedListings = [];

// DOM elements
const listingsContainer = document.getElementById('listings-container');
const loadingElement = document.getElementById('loading');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');

// Fetch and display listings on page load
async function init() {
    try {
        const response = await fetch('./airbnb_sf_listings_500.json');
        if (!response.ok) {
            throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        allListings = data.slice(0, 50); // Get first 50 listings
        displayedListings = [...allListings];
        renderListings(displayedListings);
        loadingElement.style.display = 'none';
    } catch (error) {
        console.error('Error loading listings:', error);
        loadingElement.textContent = 'Error loading listings. Please try again.';
    }
}

// Parse price string to number
function parsePrice(priceStr) {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/[$,]/g, ''));
}

// Generate star rating HTML
function generateStars(rating) {
    if (!rating) return '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '\u2605';
    }
    if (hasHalfStar && fullStars < 5) {
        stars += '\u2606';
    }
    for (let i = stars.length; i < 5; i++) {
        stars += '\u2606';
    }
    return stars;
}

// Parse amenities from string to array
function parseAmenities(amenitiesStr) {
    if (!amenitiesStr) return [];
    try {
        // The amenities are stored as a JSON string representation
        return JSON.parse(amenitiesStr.replace(/'/g, '"'));
    } catch {
        return [];
    }
}

// Format date to readable string
function formatDate(dateStr) {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

// Strip HTML tags from description
function stripHtml(html) {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
}

// Create a listing card element
function createListingCard(listing) {
    const card = document.createElement('div');
    card.className = 'listing-card';

    const amenities = parseAmenities(listing.amenities);
    const displayedAmenities = amenities.slice(0, 5);
    const remainingCount = amenities.length - 5;

    const isSuperhost = listing.host_is_superhost === 't';
    const cleanDescription = stripHtml(listing.description);

    const imageUrl = listing.picture_url || '';
    const hostImageUrl = listing.host_thumbnail_url || listing.host_picture_url || '';
    const listingName = listing.name || 'Unnamed Listing';
    const hostName = listing.host_name || 'Unknown';
    const price = listing.price || 'N/A';
    const neighborhood = listing.neighbourhood_cleansed || listing.neighbourhood || 'San Francisco';

    // Create image element
    const img = document.createElement('img');
    img.className = 'listing-image';
    img.src = imageUrl;
    img.alt = listingName;
    img.onerror = function() {
        this.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="#ddd" width="100" height="100"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="#999">No Image</text></svg>');
    };
    card.appendChild(img);

    // Create content container
    const content = document.createElement('div');
    content.className = 'listing-content';

    // Header with name and price
    const header = document.createElement('div');
    header.className = 'listing-header';

    const nameEl = document.createElement('h3');
    nameEl.className = 'listing-name';
    nameEl.textContent = listingName;

    const priceEl = document.createElement('div');
    priceEl.className = 'listing-price';
    priceEl.innerHTML = price + '<span>/night</span>';

    header.appendChild(nameEl);
    header.appendChild(priceEl);
    content.appendChild(header);

    // Rating
    if (listing.review_scores_rating) {
        const ratingDiv = document.createElement('div');
        ratingDiv.className = 'rating';

        const starsSpan = document.createElement('span');
        starsSpan.className = 'stars';
        starsSpan.textContent = generateStars(listing.review_scores_rating);

        const ratingValue = document.createElement('span');
        ratingValue.className = 'rating-value';
        ratingValue.textContent = listing.review_scores_rating.toFixed(2);

        const reviewCount = document.createElement('span');
        reviewCount.className = 'review-count';
        reviewCount.textContent = '(' + (listing.number_of_reviews || 0) + ' reviews)';

        ratingDiv.appendChild(starsSpan);
        ratingDiv.appendChild(ratingValue);
        ratingDiv.appendChild(reviewCount);
        content.appendChild(ratingDiv);
    }

    // Description
    const descEl = document.createElement('p');
    descEl.className = 'listing-description';
    descEl.textContent = cleanDescription;
    content.appendChild(descEl);

    // Host info
    const hostInfo = document.createElement('div');
    hostInfo.className = 'host-info';

    const hostImg = document.createElement('img');
    hostImg.className = 'host-photo';
    hostImg.src = hostImageUrl;
    hostImg.alt = hostName;
    hostImg.onerror = function() {
        this.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle fill="#ddd" cx="50" cy="50" r="50"/><text x="50" y="55" text-anchor="middle" fill="#999" font-size="40">?</text></svg>');
    };

    const hostDetails = document.createElement('div');
    hostDetails.className = 'host-details';

    const hostNameEl = document.createElement('div');
    hostNameEl.className = 'host-name';
    hostNameEl.textContent = 'Hosted by ' + hostName;

    if (isSuperhost) {
        const badge = document.createElement('span');
        badge.className = 'superhost-badge';
        badge.textContent = 'SUPERHOST';
        hostNameEl.appendChild(badge);
    }

    const hostSince = document.createElement('div');
    hostSince.className = 'host-since';
    hostSince.textContent = 'Host since ' + formatDate(listing.host_since);

    hostDetails.appendChild(hostNameEl);
    hostDetails.appendChild(hostSince);
    hostInfo.appendChild(hostImg);
    hostInfo.appendChild(hostDetails);
    content.appendChild(hostInfo);

    // Amenities
    const amenitiesSection = document.createElement('div');
    amenitiesSection.className = 'amenities-section';

    const amenitiesTitle = document.createElement('h4');
    amenitiesTitle.textContent = 'Amenities';
    amenitiesSection.appendChild(amenitiesTitle);

    const amenitiesList = document.createElement('div');
    amenitiesList.className = 'amenities-list';
    amenitiesList.dataset.expanded = 'false';

    displayedAmenities.forEach(function(amenity) {
        const tag = document.createElement('span');
        tag.className = 'amenity-tag';
        tag.textContent = amenity;
        amenitiesList.appendChild(tag);
    });

    amenitiesSection.appendChild(amenitiesList);

    if (remainingCount > 0) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'amenities-toggle';
        toggleBtn.textContent = 'Show ' + remainingCount + ' more amenities';
        toggleBtn.onclick = function() {
            toggleAmenities(toggleBtn, amenities);
        };
        amenitiesSection.appendChild(toggleBtn);
    }

    content.appendChild(amenitiesSection);

    // Neighborhood
    const neighborhoodEl = document.createElement('div');
    neighborhoodEl.className = 'neighborhood';
    neighborhoodEl.textContent = neighborhood;
    content.appendChild(neighborhoodEl);

    card.appendChild(content);

    return card;
}

// Toggle amenities display
function toggleAmenities(button, amenities) {
    const amenitiesList = button.previousElementSibling;
    const isExpanded = amenitiesList.dataset.expanded === 'true';

    amenitiesList.innerHTML = '';

    if (isExpanded) {
        amenities.slice(0, 5).forEach(function(amenity) {
            const tag = document.createElement('span');
            tag.className = 'amenity-tag';
            tag.textContent = amenity;
            amenitiesList.appendChild(tag);
        });
        button.textContent = 'Show ' + (amenities.length - 5) + ' more amenities';
        amenitiesList.dataset.expanded = 'false';
    } else {
        amenities.forEach(function(amenity) {
            const tag = document.createElement('span');
            tag.className = 'amenity-tag';
            tag.textContent = amenity;
            amenitiesList.appendChild(tag);
        });
        button.textContent = 'Show less';
        amenitiesList.dataset.expanded = 'true';
    }
}

// Render listings to the page
function renderListings(listings) {
    listingsContainer.innerHTML = '';

    if (listings.length === 0) {
        const noResults = document.createElement('p');
        noResults.style.textAlign = 'center';
        noResults.style.gridColumn = '1/-1';
        noResults.style.padding = '2rem';
        noResults.style.color = '#666';
        noResults.textContent = 'No listings found matching your search.';
        listingsContainer.appendChild(noResults);
        return;
    }

    listings.forEach(function(listing) {
        const card = createListingCard(listing);
        listingsContainer.appendChild(card);
    });
}

// Filter listings based on search query
function filterListings(query) {
    const searchTerm = query.toLowerCase().trim();

    if (!searchTerm) {
        return allListings.slice();
    }

    return allListings.filter(function(listing) {
        const name = (listing.name || '').toLowerCase();
        const neighborhood = (listing.neighbourhood_cleansed || listing.neighbourhood || '').toLowerCase();
        const hostName = (listing.host_name || '').toLowerCase();

        return name.includes(searchTerm) ||
               neighborhood.includes(searchTerm) ||
               hostName.includes(searchTerm);
    });
}

// Sort listings
function sortListings(listings, sortBy) {
    const sorted = listings.slice();

    switch (sortBy) {
        case 'price-low':
            sorted.sort(function(a, b) {
                return parsePrice(a.price) - parsePrice(b.price);
            });
            break;
        case 'price-high':
            sorted.sort(function(a, b) {
                return parsePrice(b.price) - parsePrice(a.price);
            });
            break;
        case 'rating':
            sorted.sort(function(a, b) {
                return (b.review_scores_rating || 0) - (a.review_scores_rating || 0);
            });
            break;
        default:
            // Keep original order
            break;
    }

    return sorted;
}

// Update displayed listings based on search and sort
function updateDisplay() {
    const filtered = filterListings(searchInput.value);
    displayedListings = sortListings(filtered, sortSelect.value);
    renderListings(displayedListings);
}

// Event listeners
searchInput.addEventListener('input', updateDisplay);
sortSelect.addEventListener('change', updateDisplay);

// Initialize on page load
init();
