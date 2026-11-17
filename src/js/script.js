
"use strict";

// STEPUP - Main JavaScript
// Existing features + improved form validation

// ==========================================
// 1. CHANGE BACKGROUND
// ==========================================

const backgroundColors = [
  "#111111",
  "#172338",
  "#263329",
  "#302238"
];

const lightBackgroundColors = [
  "#fafafa",
  "#edf3ff",
  "#eef6ef",
  "#f8effa"
];

let colorIndex = 0;

const backgroundButton =
    document.getElementById("change-background");

if (backgroundButton) {
  backgroundButton.addEventListener("click", function () {
    colorIndex = (colorIndex + 1) % backgroundColors.length;

    const isLight =
        document.documentElement.dataset.theme === "light";

    document.body.style.backgroundColor = isLight
        ? lightBackgroundColors[colorIndex]
        : backgroundColors[colorIndex];
  });
}

// ==========================================
// 2. LOCAL DATE AND TIME
// ==========================================

function updateTime() {
  const clock = document.getElementById("current-time");

  if (!clock) return;

  const now = new Date();

  clock.textContent = now.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  clock.dateTime = now.toISOString();
}

updateTime();
setInterval(updateTime, 1000);

// ==========================================
// 3. FAQ ACCORDION
// ==========================================

const questions = document.querySelectorAll(".faq-question");

questions.forEach(function (question) {
  question.addEventListener("click", function () {
    const expanded =
        this.getAttribute("aria-expanded") === "true";

    const answerId = this.getAttribute("aria-controls");
    const answer = document.getElementById(answerId);

    if (!answer) return;

    this.setAttribute(
        "aria-expanded",
        String(!expanded)
    );

    answer.classList.toggle("is-open", !expanded);
    answer.inert = expanded;

    const indicator = this.querySelector("span");

    if (indicator) {
      indicator.textContent = expanded ? "+" : "−";
    }
  });
});

// ==========================================
// 4. SUBSCRIPTION DIALOG
// ==========================================

const subscriptionDialog =
    document.getElementById("subscription-dialog");

const openSubscription =
    document.getElementById("open-subscription");

const closeSubscription =
    document.getElementById("close-subscription");

if (
    subscriptionDialog &&
    openSubscription &&
    closeSubscription
) {
  openSubscription.addEventListener("click", function () {
    subscriptionDialog.showModal();
  });

  closeSubscription.addEventListener("click", function () {
    subscriptionDialog.close();
  });

  subscriptionDialog.addEventListener("click", function (event) {
    const bounds = subscriptionDialog.getBoundingClientRect();

    if (
        event.target === subscriptionDialog &&
        (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
        )
    ) {
      subscriptionDialog.close();
    }
  });
}

// ==========================================
// 5. SHARED VALIDATION HELPERS
// ==========================================

function showError(id, message) {
  const field = document.getElementById(id);
  const error = document.getElementById(id + "-error");

  if (!field || !error) return;

  error.textContent = message;

  field.setAttribute(
      "aria-invalid",
      String(Boolean(message))
  );
}

function validEmail(field) {
  if (!field || !window.STEPUPValidation) {
    return false;
  }

  return STEPUPValidation.email(field.value);
}

// ==========================================
// 6. CONTACT ACCOUNT FORM
// ==========================================

const accountForm = document.getElementById("account-form");

if (accountForm) {
  accountForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const V = window.STEPUPValidation;

    if (!V) {
      console.error("STEPUPValidation is not loaded.");
      return;
    }

    const name = document.getElementById("account-name");
    const email = document.getElementById("account-email");
    const password = document.getElementById("account-password");
    const confirm = document.getElementById("account-confirm");

    const result = document.getElementById("account-result");

    if (!name || !email || !password || !confirm || !result) {
      return;
    }

    showError(
        "account-name",
        V.name(name.value)
            ? ""
            : "Enter a name with at least 2 characters."
    );

    showError(
        "account-email",
        validEmail(email)
            ? ""
            : "Enter a valid email without spaces."
    );

    showError(
        "account-password",
        V.password(password.value)
            ? ""
            : "Use 8+ characters with uppercase, lowercase, number and symbol. No spaces."
    );

    showError(
        "account-confirm",
        confirm.value && confirm.value === password.value
            ? ""
            : "Passwords must match and cannot be empty."
    );

    const firstError =
        accountForm.querySelector('[aria-invalid="true"]');

    if (firstError) {
      result.textContent =
          "Please correct the fields above.";

      firstError.focus();
      return;
    }

    result.textContent =
        "Registration details are valid (demo only).";

    accountForm.reset();

    ["account-name", "account-email",
      "account-password", "account-confirm"]
        .forEach(function (id) {
          showError(id, "");
        });
  });
}

// ==========================================
// 7. SUBSCRIPTION FORM
// ==========================================

const subscriptionForm =
    document.getElementById("subscription-form");

if (subscriptionForm) {
  subscriptionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email =
        document.getElementById("subscription-email");

    const error =
        document.getElementById("subscription-error");

    const result =
        document.getElementById("subscription-result");

    if (!email || !error || !result) return;

    const valid = validEmail(email);

    error.textContent = valid
        ? ""
        : "Enter a valid email without spaces.";

    email.setAttribute(
        "aria-invalid",
        String(!valid)
    );

    result.textContent = valid
        ? "Valid email!"
        : "";

    if (!valid) {
      email.focus();
    }
  });
}

