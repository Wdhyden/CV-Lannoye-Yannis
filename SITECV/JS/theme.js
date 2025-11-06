// ===============================
// Thème clair / sombre + effet néon
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const root = document.documentElement;

  // --- Charger le thème enregistré ---
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
    themeToggle.textContent = savedTheme === "light" ? "🌞" : "🌙";
  } else {
    // Si pas de thème enregistré → adapter à la préférence système
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    root.setAttribute("data-theme", prefersLight ? "light" : "dark");
    themeToggle.textContent = prefersLight ? "🌞" : "🌙";
  }

  // --- Bouton toggle ---
  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = newTheme === "light" ? "🌞" : "🌙";
  });
});
