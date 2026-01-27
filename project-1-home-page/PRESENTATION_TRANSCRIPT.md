# Homepage Presentation Transcript

**Estimated Duration: 5 minutes**

---

## Opening (30 seconds)

Hi everyone, my name is Neil Wang, and today I'll be walking you through my personal homepage that I built for this web development course.

This site is built entirely with vanilla HTML, CSS, and JavaScript - no frameworks like React. I wanted to demonstrate that you can create a modern, interactive website using just the fundamentals.

---

## Homepage Overview (30 seconds)

As you can see, the site has a clean, dark theme inspired by terminal aesthetics. At the top, we have a navigation bar with my brand logo and links to the two main pages: "Me" and "Game".

There's also a theme toggle button here - let me click it to show you the light mode. And back to dark. This preference is saved in localStorage, so it persists between visits.

---

## About Me Section (1 minute)

The homepage is organized into expandable panels. This first one, "General Introduction," is expanded by default.

Here you can see my profile photo and a brief introduction. I'm a full-stack developer with experience at Alibaba and Bot Auto, and I'm currently pursuing my Master's in Computer Science at Northeastern.

Let me expand the "Experience" panel. You can see my work history here - my internship at Bot Auto working on autonomous driving simulation, my two years at Alibaba building cloud infrastructure and developer tools, and my current graduate studies.

The panels use CSS transitions for smooth expand/collapse animations, and the state is managed with vanilla JavaScript.

---

## My Projects Section (2 minutes)

Now let's look at my projects. I have three main showcases here, each with an image carousel.

**Neovim IDE**

First is my Neovim IDE configuration. I'm a big fan of terminal-based development. This carousel shows my custom ASCII art dashboard that greets me when I open Neovim, and the full IDE setup with syntax highlighting, LSP integration, and auto-completion.

You can navigate the carousel using these arrow buttons or by clicking the dots below. On mobile, you can also swipe.

**Arch Linux Ricing**

Next is my Arch Linux desktop customization - what we call "ricing" in the Linux community. The first image shows my overall desktop environment, and the second shows my application launcher styled with Apple's liquid glass aesthetic.

I spent countless hours configuring every aspect of my system - the window manager, status bar, notifications, and more.

**Ray Tracer**

Finally, here's a ray tracer I built from scratch in Rust. The carousel shows different rendering techniques: diffuse materials for matte surfaces, mirror reflections with recursive ray bouncing, glass refraction using Snell's law, and specular highlights using the Phong model.

This project taught me a lot about computer graphics and the math behind realistic lighting.

---

## Game Page (1 minute)

Now let me navigate to the Game page. This is where it gets interesting.

This is "Brow Control" - a game I originally wrote in Rust using the Bevy game engine. What makes it special is that I brought it to the web using WebAssembly, and integrated MediaPipe for facial recognition.

So instead of using keyboard controls, you play with your facial expressions! Raise your eyebrows to jump, lower them to duck. The machine learning model runs entirely in your browser - no data is sent to any server.

The game page has its own color scheme - Tokyo Night - which gives it a distinct gaming feel while maintaining consistent header and footer styling with the main page.

---

## Technical Highlights (30 seconds)

A few technical highlights of this project:

- Pure vanilla HTML, CSS, and JavaScript with ES6 modules
- CSS custom properties for theming with three color schemes
- Responsive design that works on desktop, tablet, and mobile
- Accessible markup with proper ARIA labels
- MediaPipe face mesh running in the browser for the game controls

---

## Closing (30 seconds)

That's my personal homepage. I tried to balance showcasing my personality and interests while demonstrating solid web development fundamentals.

The expandable panels and carousels add interactivity without relying on heavy frameworks, and the game page shows how you can integrate advanced technologies like WebAssembly and machine learning into a web project.

Thank you for your time. I'm happy to answer any questions about the implementation.

---

**Total: ~5 minutes**
