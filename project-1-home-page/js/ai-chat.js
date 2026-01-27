/**
 * AI Chat Demo Module
 * Simulates an AI chatbot interaction for the AI page
 */

const AIChat = {
  responses: {
    default: [
      "That's an interesting question! While I'm just a simulated AI, real AI assistants can provide much more detailed answers.",
      "Great question! AI technology is constantly evolving to better understand and respond to queries like this.",
      "I appreciate your curiosity! The field of AI is fascinating and full of possibilities.",
    ],
    web: [
      "Web development has evolved tremendously! Modern frameworks like React, Vue, and vanilla JavaScript with ES6+ modules make building interactive sites easier than ever.",
      "HTML5, CSS3, and modern JavaScript form the foundation of web development. Tools like TypeScript add type safety, while bundlers help optimize performance.",
    ],
    javascript: [
      "JavaScript is incredibly versatile! It runs in browsers, servers (Node.js), mobile apps, and even desktop applications with Electron.",
      "ES6+ brought amazing features: arrow functions, destructuring, modules, async/await, and more. It's a great time to be a JavaScript developer!",
    ],
    programming: [
      "Programming is about problem-solving at its core. Choose a language that fits your goals - Rust for systems, Python for data science, JavaScript for web!",
      "The best way to learn programming is by building projects. Start small, iterate often, and don't be afraid to make mistakes!",
    ],
    ai: [
      "AI and machine learning are transforming industries! From language models to computer vision, the applications are endless.",
      "Modern AI is powered by neural networks trained on vast amounts of data. The key is finding the right architecture for each problem.",
    ],
    rust: [
      "Rust is amazing for systems programming! Its ownership model prevents memory bugs at compile time while maintaining C-level performance.",
      "I love Rust too! The community is welcoming, the tooling (cargo) is excellent, and it's great for WebAssembly projects.",
    ],
    hello: [
      "Hello there! How can I help you today?",
      "Hi! Feel free to ask me about web development, programming, or AI!",
    ],
  },

  thinkingTime: { min: 800, max: 2000 },

  init() {
    this.form = document.getElementById("chat-form");
    this.input = document.getElementById("chat-input");
    this.messagesContainer = document.getElementById("chat-messages");

    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    }
  },

  handleSubmit(event) {
    event.preventDefault();
    const message = this.input.value.trim();

    if (!message) return;

    // Add user message
    this.addMessage(message, "user");
    this.input.value = "";

    // Show thinking indicator
    const thinkingEl = this.showThinking();

    // Simulate AI thinking
    const thinkTime =
      Math.random() * (this.thinkingTime.max - this.thinkingTime.min) +
      this.thinkingTime.min;

    setTimeout(() => {
      thinkingEl.remove();
      const response = this.generateResponse(message);
      this.addMessage(response, "ai");
    }, thinkTime);
  },

  addMessage(text, type) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${type}-message`;

    const icon = type === "user" ? "\u{1F464}" : "\u{1F916}";

    messageDiv.innerHTML = `
      <span class="message-icon">${icon}</span>
      <div class="message-content">
        <p>${this.escapeHtml(text)}</p>
      </div>
    `;

    this.messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
  },

  showThinking() {
    const thinkingDiv = document.createElement("div");
    thinkingDiv.className = "chat-message ai-message";
    thinkingDiv.innerHTML = `
      <span class="message-icon">&#129302;</span>
      <div class="message-content">
        <div class="thinking-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;

    this.messagesContainer.appendChild(thinkingDiv);
    this.scrollToBottom();
    return thinkingDiv;
  },

  generateResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Check for keywords and return appropriate response
    const keywords = [
      { keys: ["hello", "hi", "hey"], category: "hello" },
      { keys: ["web", "html", "css"], category: "web" },
      { keys: ["javascript", "js", "node"], category: "javascript" },
      { keys: ["program", "code", "learn"], category: "programming" },
      { keys: ["ai", "artificial", "machine", "neural"], category: "ai" },
      { keys: ["rust", "cargo", "memory"], category: "rust" },
    ];

    for (const { keys, category } of keywords) {
      if (keys.some((key) => lowerMessage.includes(key))) {
        return this.getRandomResponse(category);
      }
    }

    return this.getRandomResponse("default");
  },

  getRandomResponse(category) {
    const responses = this.responses[category] || this.responses.default;
    return responses[Math.floor(Math.random() * responses.length)];
  },

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  },

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  },
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  AIChat.init();
});

export { AIChat };
