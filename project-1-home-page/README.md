# Neil's Personal Homepage

A personal homepage built with vanilla HTML5, CSS3, and ES6+ JavaScript for CS5610 Web Development.

## Author

**Neil Wang**

## Class Link

CS5610 Web Development - Northeastern University

## Project Objective

Create a personal homepage that showcases who I am, my interests, and my work samples. The project demonstrates proficiency in:

- Semantic HTML5 markup
- Modern CSS3 with flexbox and grid layouts
- ES6+ JavaScript modules
- Responsive design principles
- Accessibility best practices

## Features

- **About Me Page**: Introduction, interests, and skills showcase
- **Work Samples Page**: Portfolio of projects including an embedded game
- **AI-Generated Page**: Demonstrates AI-human collaboration with an interactive chat demo
- **Dark Theme**: Modern dark color scheme following the pine-heads design
- **Typing Effect**: Terminal-style typing animation (original JS functionality)
- **Interactive Chat Demo**: Simulated AI assistant conversation

## Screenshot

![Homepage Screenshot](images/screenshot.png)

## Project Structure

```
project-1-home-page/
├── css/
│   ├── variables.css    # CSS custom properties
│   ├── main.css         # Base styles
│   ├── navbar.css       # Navigation styles
│   ├── pages.css        # Page-specific styles
│   └── ai-page.css      # AI page styles
├── js/
│   ├── main.js          # Main functionality (theme, typing effect)
│   └── ai-chat.js       # AI chat demo functionality
├── images/
│   ├── favicon.svg      # Site favicon
│   └── profile.jpg      # Profile photo
├── game/                # Brow Control game embed
│   ├── index.html
│   ├── style.css
│   ├── scripts/
│   └── third-party/
├── index.html           # Home/About Me page
├── work.html            # Work samples page
├── ai-page.html         # AI-generated page
├── package.json
├── .eslintrc.json
├── .prettierrc
├── LICENSE
└── README.md
```

## Instructions to Build

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd project-1-home-page
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run linting:

   ```bash
   npm run lint
   ```

4. Format code:
   ```bash
   npm run format
   ```

### Running Locally

Since this is a static site, you can use any local server. For example:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using VS Code Live Server extension
# Right-click on index.html and select "Open with Live Server"
```

Then open `http://localhost:8000` in your browser.

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Custom Properties)
- JavaScript ES6+ (Modules, Classes, Arrow Functions, Template Literals)
- ESLint for code linting
- Prettier for code formatting

## GenAI Tools Usage

This project was developed with assistance from Claude (Anthropic). The AI was used for:

- **Model**: Claude Opus 4.5 (claude-opus-4-5-20251101)
- **Usage**:
  - Code structure and organization suggestions
  - CSS styling based on reference design (pine-heads)
  - AI page content generation
  - Chat demo response generation
  - README documentation

The AI-generated page (`ai-page.html`) explicitly demonstrates AI-human collaboration and includes a disclaimer about AI assistance.

All final decisions, refinements, and code reviews were made by the human developer.

## License

MIT License - See [LICENSE](LICENSE) file for details.
