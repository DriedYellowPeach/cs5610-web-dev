# JS and DOM Self-Assessment

A web page that displays Airbnb San Francisco listings using JavaScript, DOM manipulation, and AJAX.

## Live Demo

[View the deployed application](https://driedyellowpeach.github.io/cs5610-web-dev/js-and-dom-self-assessment/)

## Features

- Displays the first 50 listings from the Airbnb SF dataset
- Each listing shows:
  - Listing thumbnail image
  - Name and price per night
  - Star rating with review count
  - Description (truncated)
  - Host name and photo
  - Superhost badge (when applicable)
  - Amenities (expandable list)
  - Neighborhood

### Creative Additions

- **Search functionality**: Filter listings by name, neighborhood, or host name
- **Sorting options**: Sort by price (low to high, high to low) or rating
- **Visual star ratings**: Ratings displayed as star characters
- **Superhost badges**: Visual indicator for superhost status
- **Expandable amenities**: Click to show/hide full amenities list
- **Responsive design**: Works on desktop and mobile devices

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Fetch API with async/await

## Data Source

The listing data comes from `airbnb_sf_listings_500.json`, which contains 500 Airbnb listings scraped from San Francisco.
