const FIREWORKS_API_KEY = "fw_CnWVx1kSQZNsxdTQGemjp8";
const modeSelector = document.getElementById("mode-selector");
const newChatBtn = document.querySelector(".new-chat");
const messageArea = document.getElementById("message-area");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const fireworksCanvas = document.getElementById("fireworks-canvas");

const CHAT_MODEL = "accounts/fireworks/models/llama-v3p3-70b-instruct";
const IMAGE_MODEL = "accounts/fireworks/models/stable-diffusion-xl-1024-v1-0";

let currentMode = modeSelector?.value || "chat";
let fireworksCtx = null;
let fireworksAnimationId = null;
const particles = [];
const colors = ["#f08a1d", "#ffba08", "#3b82f6", "#ec4899", "#10b981"];

/**
 * Array to store conversation history and persist it via LocalStorage
 */
let chatHistory = JSON.parse(localStorage.getItem("chat_history")) || [];

/**
 * Entry point of the application.
 * Initializes event listeners, canvas settings, and loads existing chat history.
 */
function init() {
  bindEvents();
  if (fireworksCanvas) {
    setupFireworksCanvas();
  }
  loadHistory();
  switchMode(currentMode);
}

/**
 * Assigns event listeners to interactive DOM elements.
 */
function bindEvents() {
  modeSelector?.addEventListener("change", (event) => {
    switchMode(event.target.value);
    launchFireworks();
  });

  newChatBtn?.addEventListener("click", () => {
    resetChat();
    launchFireworks();
  });

  sendBtn?.addEventListener("click", handleSend);

  userInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  });
}

/**
 * Updates the application state and UI placeholders based on the selected mode.
 * @param {string} mode - The active mode ('chat' or 'image').
 */
function switchMode(mode) {
  currentMode = mode;
  if (modeSelector) modeSelector.value = mode;

  if (mode === "chat") {
    userInput.placeholder = "Ask Me Anything...";
    renderSystemMessage("Chat mode enabled. Ask any question.");
  } else {
    userInput.placeholder = "Describe the image you want...";
    renderSystemMessage("Image mode enabled. Describe your image.");
  }
}

/**
 * Clears the chat history from the state, LocalStorage, and the UI.
 */
function resetChat() {
  chatHistory = [];
  localStorage.removeItem("chat_history");
  messageArea.innerHTML = "";
  userInput.value = "";
  switchMode(currentMode);
}

/**
 * Displays a system-level notification message in the chat area.
 * @param {string} text - The content of the notification.
 */
function renderSystemMessage(text) {
  const note = document.createElement("div");
  note.className = "system-note";
  note.textContent = text;
  messageArea.appendChild(note);
}

/**
 * Creates and appends a text message bubble to the chat container.
 * @param {string} role - The sender type ('user' or 'assistant').
 * @param {string} content - The message text.
 */
function appendBubble(role, content) {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${role}`;
  bubble.textContent = content;
  messageArea.appendChild(bubble);
  messageArea.scrollTop = messageArea.scrollHeight;
}

/**
 * Iterates through the stored history and renders each item (text or image) on page load.
 */
function loadHistory() {
  chatHistory.forEach((item) => {
    if (item.type === "image") {
      displayGeneratedImage(item.text, false);
    } else {
      appendBubble(item.role, item.text);
    }
  });
}

/**
 * Synchronizes the current chat history array with the browser's LocalStorage.
 */
function saveToLocal() {
  localStorage.setItem("chat_history", JSON.stringify(chatHistory));
}

/**
 * Sets up the 2D drawing context for the fireworks animation.
 */
function setupFireworksCanvas() {
  fireworksCtx = fireworksCanvas.getContext("2d");
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

/**
 * Adjusts the canvas dimensions to match the current window size.
 */
function resizeCanvas() {
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
}

/**
 * Adds a burst of particles to the state to trigger a firework visual effect.
 */
function launchFireworks() {
  if (!fireworksCtx || !fireworksCanvas) return;
  for (let i = 0; i < 18; i += 1) {
    particles.push(createParticle());
  }
  if (!fireworksAnimationId) animateFireworks();
}

/**
 * Creates a single particle object with randomized physics properties.
 * @returns {Object} Particle configuration.
 */
function createParticle() {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 4 + 1.5;
  return {
    x: Math.random() * fireworksCanvas.width,
    y: Math.random() * fireworksCanvas.height * 0.5,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    alpha: 1,
    radius: Math.random() * 2.5 + 1.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}

/**
 * The main animation loop that draws, moves, and fades particles on the canvas.
 */
function animateFireworks() {
  fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  fireworksCtx.globalCompositeOperation = "lighter";

  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.04;
    p.alpha -= 0.02;

    if (p.alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }
    fireworksCtx.beginPath();
    fireworksCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    fireworksCtx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
    fireworksCtx.fill();
  }

  if (particles.length > 0) {
    fireworksAnimationId = requestAnimationFrame(animateFireworks);
  } else {
    fireworksAnimationId = null;
    fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  }
}

/**
 * Orchestrates the sending process: validates input, displays the user bubble,
 * and calls the relevant API.
 */
async function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  appendBubble("user", text);
  userInput.value = "";

  if (currentMode === "chat") {
    await callChatAPI(text);
  } else {
    await callImageAPI(text);
  }
  launchFireworks();
}

/**
 * Connects to the Fireworks AI Chat API to retrieve text responses.
 * Now includes full context from chatHistory.
 * @param {string} userMessage - The text input provided by the user.
 */
async function callChatAPI(userMessage) {
  const url = "https://api.fireworks.ai/inference/v1/chat/completions";
  const typingBubble = createLoadingBubble("...Thinking");

  try {
    /**
     * CONTEXT BUILDER:
     * We map our local chatHistory (excluding images) to the API format.
     * We slice the last 10-14 messages to keep the request size efficient.
     */
    const contextMessages = chatHistory
      .filter((item) => !item.type) // Exclude image entries from text context
      .slice(-12)
      .map((item) => ({
        role: item.role === "user" ? "user" : "assistant",
        content: item.text,
      }));

    // Add the current message to the conversation context
    contextMessages.push({ role: "user", content: userMessage });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIREWORKS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: contextMessages, // Sending the full conversation instead of just one message
      }),
    });

    const data = await response.json();
    removeLoadingBubble(typingBubble);

    if (!response.ok) throw new Error(data?.error?.message || "Chat Error");

    const content = data?.choices?.[0]?.message?.content;
    if (content) {
      appendBubble("assistant", content);
      chatHistory.push({ role: "user", text: userMessage });
      chatHistory.push({ role: "assistant", text: content });
      saveToLocal();
    }
  } catch (error) {
    removeLoadingBubble(typingBubble);
    appendBubble("assistant", `Error: ${error.message}`);
  }
}

/**
 * Connects to the Fireworks AI Image API to generate images based on a text prompt.
 * @param {string} prompt - The image description input.
 */
async function callImageAPI(prompt) {
  const url = `https://api.fireworks.ai/inference/v1/image_generation/${IMAGE_MODEL}`;
  const loadingBubble = createLoadingBubble("Generating...");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIREWORKS_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "image/png",
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        prompt: prompt,
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        steps: 30,
      }),
    });

    if (!response.ok) throw new Error("Image Generation Failed");

    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      removeLoadingBubble(loadingBubble);
      displayGeneratedImage(base64data, true);

      chatHistory.push({ role: "user", text: prompt });
      chatHistory.push({ role: "assistant", text: base64data, type: "image" });
      saveToLocal();
    };
  } catch (error) {
    removeLoadingBubble(loadingBubble);
    appendBubble("assistant", `Error: ${error.message}`);
  }
}

/**
 * Creates a visual indicator (loading bubble) to signal that a process is running.
 * @param {string} text - The loading status text.
 * @returns {HTMLElement} The created DOM element.
 */
function createLoadingBubble(text) {
  const bubble = document.createElement("div");
  bubble.className = "bubble assistant loading";
  bubble.textContent = text;
  messageArea.appendChild(bubble);
  messageArea.scrollTop = messageArea.scrollHeight;
  return bubble;
}

/**
 * Removes a specific loading bubble from the interface once the task is complete.
 * @param {HTMLElement} bubble - The DOM element to be removed.
 */
function removeLoadingBubble(bubble) {
  if (messageArea.contains(bubble)) messageArea.removeChild(bubble);
}

/**
 * Renders an image within a chat bubble and appends it to the chat container.
 * @param {string} url - The URL or Base64 data of the image.
 * @param {boolean} isNew - Indicates if the image was just generated.
 */
function displayGeneratedImage(url, isNew) {
  const container = document.createElement("div");
  container.className = "bubble assistant";
  const img = document.createElement("img");
  img.src = url;
  img.style.width = "100%";
  img.style.borderRadius = "8px";
  container.appendChild(img);
  messageArea.appendChild(container);
  messageArea.scrollTop = messageArea.scrollHeight;
}

/**
 * Converts a hexadecimal color string to an RGB triplet.
 * @param {string} hex - The hex color (e.g., "#FFFFFF").
 * @returns {string} The RGB string (e.g., "255, 255, 255").
 */
function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return `${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}`;
}

init();
