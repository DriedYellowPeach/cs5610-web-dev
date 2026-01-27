import "./project_game_release/restart-audio-context.js";
import game_init from "./project_game_release/project_game.js";

// Show Game window
const game_canvas = document.getElementById("project-game");
game_init();

let once = false;
const observer_callback = (_mutations, _observer) => {
  if (!once) {
    game_canvas.style.display = "block";
    game_canvas.style.width = "100%";
    game_canvas.style.aspectRatio =
      game_canvas.attributes.width.value / game_canvas.attributes.height.value;
    once = true;
  }
};
const observer = new MutationObserver(observer_callback);
const config = { attributeFilter: ["width", "height"] };
observer.observe(game_canvas, config);
