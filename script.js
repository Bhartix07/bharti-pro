// Dark mode toggle
const darkToggle = document.getElementById("dark-toggle");

if (darkToggle) {
  const currentMode = localStorage.getItem("theme");
  if (currentMode === "dark") {
    document.body.classList.add("dark-mode");
  }

  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// =============================
//    Simple LLM-style Chatbot
// =============================

// Chatbot DOM elements
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSend = document.getElementById("chatbot-send");
const chatbotClose = document.getElementById("chatbot-close");

// Short profile context which bot will use
const bhartiContext = `
You are an AI assistant embedded in Bharti Kumari's portfolio website.
You answer as "Portfolio Assistant".

About Bharti:
- Name: Bharti Kumari
- Role: Fullstack Developer & AI Enthusiast
- Education: B.Tech Computer Science at CUSAT (2023–2027).
- Internship: IBM SkillBuild – AI Innovation Intern.
- Skills: React, JavaScript, Node.js, HTML, CSS, Java, DBMS & NoSQL, microprocessors 8085/8086, operating systems, software engineering.
- Projects: Doctor Appointment/Diabetes Tracker style health website, interactive portfolio website, Motivation website with AI features.
- She loves building user-friendly web apps with clean UI and working on AI/ML-powered ideas.

You should:
- Greet users warmly.
- Answer questions about Bharti, her skills, projects, and academics.
- Encourage the user to view sections like Projects, Blog, and Resume when relevant.
- Keep answers short and friendly for portfolio visitors.
`;

// Utility: add message to chat
function addMessage(text, sender = "bot") {
  if (!chatbotMessages) return;
  const msg = document.createElement("div");
  msg.classList.add("chatbot-message", sender);
  msg.textContent = text;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Toggle open/close
if (chatbotToggle && chatbotWindow) {
  chatbotToggle.addEventListener("click", () => {
    const isVisible = chatbotWindow.style.display === "flex";
    chatbotWindow.style.display = isVisible ? "none" : "flex";

    if (!isVisible && chatbotMessages && chatbotMessages.childElementCount === 0) {
      addMessage("Hi! 👋 I'm Bharti's portfolio assistant. Ask me about her skills, projects, or academics.");
    }
  });
}

if (chatbotClose && chatbotWindow) {
  chatbotClose.addEventListener("click", () => {
    chatbotWindow.style.display = "none";
  });
}

// ===============  Demo "LLM" logic (no real API)  ===============
async function fakeLLMResponse(userMessage) {
  const msg = userMessage.toLowerCase();

  if (msg.includes("project")) {
    return "Bharti has worked on a Doctor Appointment/Diabetes tracker website, a portfolio website, and a Motivation website with AI. You can see details in the Projects page.";
  }
  if (msg.includes("skill") || msg.includes("technology")) {
    return "She works with React, JavaScript, Node.js, HTML, CSS, Java, DBMS & NoSQL, and also has knowledge of operating systems and microprocessors.";
  }
  if (msg.includes("education") || msg.includes("college")) {
    return "Bharti is pursuing B.Tech in Computer Science at CUSAT (2023–2027) and has completed schooling from Gyan Bharti Public School, Gaya.";
  }
  if (msg.includes("intern") || msg.includes("experience")) {
    return "She has experience as an AI Innovation Intern at IBM SkillBuild, where she worked on chatbots and machine learning basics.";
  }
  if (msg.includes("hi") || msg.includes("hello")) {
    return "Hello! 😊 I’m an AI chatbot that can tell you about Bharti’s profile. What would you like to know?";
  }

  return "I'm Bharti's portfolio assistant 😊. I can tell you about her skills, projects, education, or internship. What are you curious about?";
}

// Handle send
async function handleSend() {
  if (!chatbotInput || !chatbotInput.value.trim()) return;
  const text = chatbotInput.value.trim();
  chatbotInput.value = "";
  addMessage(text, "user");

  // Show temporary "thinking" message
  const thinkingId = "thinking-" + Date.now();
  addMessage("Thinking...", "bot");
  const thinkingEl = chatbotMessages.lastChild;

  // ---- OPTION A: Frontend-safe demo (default) ----
  const reply = await fakeLLMResponse(text);

  // Replace thinking with real reply
  if (thinkingEl) {
    thinkingEl.textContent = reply;
  }

  /* 
  // ---- OPTION B: Real LLM via your backend (recommended) ----
  // 1. Create a backend endpoint (e.g., /api/chat) that calls the OpenAI API securely.
  // 2. From here, send fetch to your backend instead of directly to OpenAI.

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      context: bhartiContext,
      message: text
    })
  });
  const data = await response.json();
  const reply = data.reply;
  if (thinkingEl) {
    thinkingEl.textContent = reply;
  }
  */

}

if (chatbotSend) {
  chatbotSend.addEventListener("click", handleSend);
}
if (chatbotInput) {
  chatbotInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });
}