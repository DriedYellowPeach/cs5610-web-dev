# Neil's Personal Homepage

A personal homepage built with vanilla HTML5, CSS3, and ES6+ JavaScript for CS5610 Web Development.

## Author

**Neil Wang**

## Class Link

CS5610 Web Development - Northeastern University

## Project Objective

Create a personal homepage that showcases who I am, my interests, and my projects. The project demonstrates proficiency in:

- Semantic HTML5 markup
- Modern CSS3 with flexbox and grid layouts
- ES6+ JavaScript modules
- Responsive design principles
- Accessibility best practices

## Features

- **About Me Page**: Introduction with expandable panels showcasing experience and projects
- **Project Showcases**: Carousels displaying Neovim IDE, Arch Linux Ricing, and Ray Tracer projects
- **Game Page**: Interactive Brow Control game using MediaPipe facial recognition
- **Dark/Light Theme Toggle**: Switch between dark and light color schemes
- **Tokyo Night Theme**: Special theme for the game page
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Screenshot

![Homepage Screenshot](images/screenshot.png)

## Project Structure

```
project-1-home-page/
├── css/
│   ├── variables.css    # CSS custom properties and themes
│   ├── main.css         # Base styles and footer
│   ├── navbar.css       # Navigation styles
│   ├── panels.css       # Expandable panels and carousels
│   └── game-nav.css     # Game page navigation styles
├── js/
│   └── main.js          # Theme toggle, panels, carousels
├── images/
│   ├── icons/           # Header/footer icons (SVG)
│   ├── neovim/          # Neovim project screenshots
│   ├── arch/            # Arch Linux ricing screenshots
│   ├── ray-tracer/      # Ray tracer renders
│   ├── favicon.svg      # Site favicon
│   └── profile.jpg      # Profile photo
├── game/                # Brow Control game
│   ├── style.css
│   ├── scripts/
│   │   ├── game.js      # Game logic (Bevy WASM)
│   │   └── mediapipe.js # Face mesh detection
│   └── third-party/     # MediaPipe libraries
├── assets/              # Game assets (WASM, textures)
├── index.html           # Home/About Me page
├── work.html            # Game page
├── package.json
├── .eslintrc.json
├── .prettierrc
├── LICENSE
├── REQUIREMENTS.md
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

**Note**: The game page requires HTTPS to access the camera for facial recognition. Deploy to GitHub Pages or use a local HTTPS server for full functionality.

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Custom Properties)
- JavaScript ES6+ (Modules, Classes, Arrow Functions, Template Literals)
- MediaPipe Face Mesh for facial recognition
- Bevy Game Engine (compiled to WebAssembly)
- ESLint for code linting
- Prettier for code formatting

## GenAI Tools Usage

This project was developed with assistance from Claude (Anthropic). The AI was used for:

- **Model**: Claude Opus 4.5 (claude-opus-4-5-20251101)
- **Usage**:
  - Code structure and organization suggestions
  - CSS styling based on reference design (pine-heads)
  - Expandable panel and carousel implementation
  - Game integration with MediaPipe facial recognition
  - README documentation

### Prompts Used

- "Help me create a personal homepage with dark/light theme toggle"
- "Create expandable panels with smooth CSS transitions for my about page"
- "Make a webpage to embed my Bevy game compiled to WebAssembly"
- "Integrate MediaPipe face mesh detection to control the game with eyebrow movements"
- "Style the page using Tokyo Night color scheme for the game section"

All final decisions, refinements, and code reviews were made by the human developer.

## Presentation

- **Video**: [Project Presentation on YouTube](https://youtu.be/4HEZj_j-IJQ)
- **Slides**: [Google Slides Presentation](https://docs.google.com/presentation/d/1EIAJgt50r9dKVxeADwdfB63w4kWrgj3-AmmgUyXTYAM/edit?usp=sharing)

## License

MIT License - See [LICENSE](LICENSE) file for details.
