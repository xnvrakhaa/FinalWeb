
"use strict";


const themeButton = document.getElementById("theme-toggle");

function setTheme(theme) {
  const selectedTheme = theme === "light" ? "light" : "dark";

  // Apply theme to HTML
  document.documentElement.dataset.theme = selectedTheme;

  // Apply theme to Bootstrap
  document.documentElement.setAttribute(
      "data-bs-theme",
      selectedTheme
  );

  document.querySelectorAll("[data-bs-theme]").forEach(element => {
    element.setAttribute("data-bs-theme", selectedTheme);
  });

  // Reset any custom background color
  document.body.style.backgroundColor = "";

  // Update theme button
  if (themeButton) {
    themeButton.textContent =
        selectedTheme === "light"
            ? "Night mode"
            : "Day mode";

    themeButton.setAttribute(
        "aria-pressed",
        String(selectedTheme === "light")
    );
  }
}

// Load saved preference
let savedTheme = "dark";

try {
  savedTheme = localStorage.getItem("stepup-theme") || "dark";
} catch (error) {
  // Storage may be unavailable.
}

// Apply saved theme
setTheme(savedTheme);

// Handle theme switching
if (themeButton) {
  themeButton.addEventListener("click", function () {
    const currentTheme =
        document.documentElement.dataset.theme;

    const newTheme =
        currentTheme === "light" ? "dark" : "light";

    setTheme(newTheme);

    try {
      localStorage.setItem("stepup-theme", newTheme);
    } catch (error) {
      // Theme still works for this page.
    }
  });
}

