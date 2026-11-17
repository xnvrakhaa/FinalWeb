
"use strict";

// ==========================================
// STEPUP - Assignment 5
// Store interactions and order form
// ==========================================

// ==========================================
// 1. SOUND FUNCTIONALITY
// ==========================================

const storeSound = {
  enabled: false,
  context: null,
  voice: null,

  async play() {
    if (!this.enabled) return;

    try {
      const AudioContext =
          window.AudioContext || window.webkitAudioContext;

      if (!AudioContext) return;

      if (!this.context) {
        this.context = new AudioContext();
      }

      await this.context.resume();

      if (this.voice) {
        try {
          this.voice.stop();
        } catch (error) {
          // Previous sound has already ended.
        }
      }

      const oscillator = this.context.createOscillator();
      const volume = this.context.createGain();

      oscillator.connect(volume);
      volume.connect(this.context.destination);

      oscillator.frequency.value = 660;

      volume.gain.setValueAtTime(
          0.06,
          this.context.currentTime
      );

      volume.gain.exponentialRampToValueAtTime(
          0.001,
          this.context.currentTime + 0.12
      );

      oscillator.start();
      oscillator.stop(this.context.currentTime + 0.13);

      this.voice = oscillator;

      oscillator.onended = () => {
        oscillator.disconnect();
        volume.disconnect();

        if (this.voice === oscillator) {
          this.voice = null;
        }
      };

    } catch (error) {
      console.warn("Sound is unavailable:", error);
    }
  }
};

const soundToggle = document.getElementById("sound-toggle");

if (soundToggle) {
  soundToggle.addEventListener("click", function () {
    storeSound.enabled = !storeSound.enabled;

    this.setAttribute(
        "aria-pressed",
        String(storeSound.enabled)
    );

    this.textContent = storeSound.enabled
        ? "Sound: on"
        : "Sound: off";

    if (!storeSound.enabled && storeSound.voice) {
      try {
        storeSound.voice.stop();
      } catch (error) {
        // Sound already ended.
      }
    }

    storeSound.play();
  });
}

// ==========================================
// 2. KEYBOARD NAVIGATION
// ==========================================

const menuLinks = Array.from(
    document.querySelectorAll("#mainMenu .nav-link")
);

menuLinks.forEach((link, index) => {
  link.addEventListener("keydown", function (event) {
    let next;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (index + 1) % menuLinks.length;
        break;

      case "ArrowLeft":
      case "ArrowUp":
        next = (index - 1 + menuLinks.length)
            % menuLinks.length;
        break;

      case "Home":
        next = 0;
        break;

      case "End":
        next = menuLinks.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();
    menuLinks[next].focus();
  });
});

// ==========================================
// 3. ELEMENT ANIMATION
// ==========================================

function animateElement(element) {
  if (!element) return;

  if (
      window.matchMedia(
          "(prefers-reduced-motion: reduce)"
      ).matches
  ) {
    return;
  }

  if (typeof element.animate !== "function") {
    return;
  }

  element.getAnimations().forEach(animation => {
    animation.cancel();
  });

  element.animate(
      [
        {
          opacity: 0.35,
          transform: "translateY(10px)"
        },
        {
          opacity: 1,
          transform: "translateY(0)"
        }
      ],
      {
        duration: 260,
        easing: "ease-out"
      }
  );
}

// ==========================================
// 4. CATALOG FILTERS AND RATINGS
// ==========================================

function initializeCatalog() {
  const filters = document.getElementById("catalog-filters");

  if (!filters) return;

  const brand = document.getElementById("brand-filter");
  const budget = document.getElementById("price-filter");
  const search = document.getElementById("sneaker-search");

  if (!brand || !budget || !search) return;

  const products = Array.from(
      document.querySelectorAll(
          "#catalog-products .product-card"
      )
  ).map(card => ({
    card: card,

    name: card.querySelector("h2")
        .textContent.trim(),

    brand: card.querySelector(".product-brand")
        .textContent.trim(),

    price: Number(
        card.querySelector(".product-price")
            .textContent.replace(/\D/g, "")
    ),

    rating: 0
  }));

  function matchesBudget(product) {
    switch (budget.value) {
      case "under60":
        return product.price < 60000;

      case "from60":
        return product.price >= 60000;

      default:
        return true;
    }
  }

  function applyFilters() {
    const query = search.value.trim().toLowerCase();

    const matches = products.filter(product => {
      return (
          (brand.value === "all" ||
              product.brand === brand.value) &&
          matchesBudget(product) &&
          product.name.toLowerCase().includes(query)
      );
    });

    products.forEach(product => {
      product.card.hidden = !matches.includes(product);
    });

    const count = document.getElementById("catalog-count");
    const empty = document.getElementById("catalog-empty");

    if (count) {
      count.textContent =
          `${matches.length} of ${products.length} sneakers shown`;
    }

    if (empty) {
      empty.hidden = matches.length !== 0;
    }

    animateElement(
        document.getElementById("catalog-products")
    );
  }

  filters.addEventListener("input", applyFilters);
  filters.addEventListener("change", applyFilters);

  filters.addEventListener("submit", event => {
    event.preventDefault();
  });

  filters.addEventListener("reset", event => {
    event.preventDefault();

    brand.value = "all";
    budget.value = "all";
    search.value = "";

    applyFilters();
  });

  // Product ratings
  products.forEach((product, index) => {
    const rating = document.createElement("div");

    rating.className = "product-rating";
    rating.setAttribute("role", "group");
    rating.setAttribute("aria-label", `Rate ${product.name}`);

    const message = document.createElement("p");

    message.className = "rating-message";
    message.id = `rating-message-${index}`;
    message.setAttribute("role", "status");
    message.textContent = "Your rating: not rated";

    for (let value = 1; value <= 5; value++) {
      const star = document.createElement("button");

      star.type = "button";
      star.className = "rating-star";
      star.textContent = "★";

      star.setAttribute(
          "aria-label",
          `${value} out of 5 stars for ${product.name}`
      );

      star.setAttribute("aria-pressed", "false");

      star.addEventListener("click", function () {
        product.rating = value;

        rating.querySelectorAll("button")
            .forEach((button, position) => {
              button.classList.toggle(
                  "is-selected",
                  position < product.rating
              );

              button.setAttribute(
                  "aria-pressed",
                  String(position + 1 === product.rating)
              );
            });

        message.textContent =
            `Your rating: ${product.rating} / 5 (this visit)`;

        animateElement(message);
        storeSound.play();
      });

      rating.append(star);
    }

    const cardBody = product.card.querySelector(".card-body");

    if (cardBody) {
      cardBody.append(rating, message);
    }
  });

  applyFilters();
}

// ==========================================
// 5. MULTI-STEP ORDER FORM
// ==========================================

function initializeOrderForm() {
  const form = document.getElementById("order-form");

  if (!form) return;

  const steps = Array.from(
      form.querySelectorAll(".order-step")
  );

  const back = document.getElementById("order-back");
  const next = document.getElementById("order-next");
  const submit = document.getElementById("order-submit");
  const result = document.getElementById("form-result");
  const name = document.getElementById("customer-name");

  if (
      !steps.length ||
      !back ||
      !next ||
      !submit ||
      !result ||
      !name
  ) {
    return;
  }

  let currentStep = 0;

  // ========================================
  // FORM VALIDATION
  // ========================================

  function validateStep(index, focusInvalid = true) {
    const V = window.STEPUPValidation;

    if (!V) {
      console.error("validation.js is not loaded.");
      return false;
    }

    const email =
        document.getElementById("customer-email");

    const phone =
        document.getElementById("customer-phone");

    const model =
        document.getElementById("sneaker-model");

    const size =
        form.querySelector('[name="size"]:checked');

    const agreement =
        document.getElementById("agreement");

    let rules = [];

    if (index === 0) {
      rules = [
        {
          id: "customer-name",
          valid: V.name(name.value),
          message:
              "Enter a name with at least 2 characters."
        },
        {
          id: "customer-email",
          valid: email && V.email(email.value),
          message:
              "Enter a valid email without spaces."
        },
        {
          id: "customer-phone",
          valid: phone && V.phone(phone.value),
          message:
              "Enter a valid phone number, e.g. +7 777 123 4567."
        }
      ];
    }

    if (index === 1) {
      rules = [
        {
          id: "sneaker-model",
          valid: model && V.required(model.value),
          message: "Please select a sneaker model."
        },
        {
          id: "size39",
          valid: Boolean(size),
          message: "Please select your sneaker size."
        }
      ];
    }

    if (index === 2) {
      rules = [
        {
          id: "agreement",
          valid: agreement && agreement.checked,
          message: "Please confirm your request."
        }
      ];
    }

    let firstInvalid = null;

    rules.forEach(rule => {
      V.showError(
          rule.id,
          rule.valid ? "" : rule.message
      );

      if (!rule.valid && !firstInvalid) {
        firstInvalid = rule.id;
      }
    });

    if (firstInvalid) {
      if (focusInvalid) {
        document.getElementById(firstInvalid)?.focus();
      }

      return false;
    }

    return true;
  }

  // ========================================
  // ORDER SUMMARY
  // ========================================

  const request = {
    getDetails() {
      const model =
          document.getElementById("sneaker-model");

      const selectedSize =
          form.querySelector('[name="size"]:checked');

      return {
        Name: name.value.trim(),

        Email:
            document.getElementById("customer-email")
                ?.value.trim() || "",

        Phone:
            document.getElementById("customer-phone")
                ?.value.trim() || "",

        Model:
            model?.selectedOptions[0]?.textContent || "",

        Size:
            selectedSize?.value || "Not selected",

        Color:
            document.getElementById("favorite-color")
                ?.value || "",

        Message:
            document.getElementById("customer-message")
                ?.value.trim() || "No message"
      };
    },

    renderSummary() {
      const summary =
          document.getElementById("order-summary");

      if (!summary) return;

      summary.replaceChildren();

      Object.entries(this.getDetails())
          .forEach(([label, value]) => {
            const term = document.createElement("dt");
            const description = document.createElement("dd");

            term.textContent = label;
            description.textContent = value;

            summary.append(term, description);
          });
    }
  };

  // ========================================
  // STEP NAVIGATION
  // ========================================

  function showStep(index, focus = true) {
    currentStep = index;

    steps.forEach((step, position) => {
      step.hidden = position !== index;
    });

    back.hidden = index === 0;
    next.hidden = index === steps.length - 1;
    submit.hidden = index !== steps.length - 1;

    const progress =
        document.getElementById("order-progress");

    if (progress) {
      const legend =
          steps[index].querySelector("legend");

      progress.textContent =
          `Step ${index + 1} of ${steps.length}: ` +
          (legend?.textContent || "");
    }

    if (index === steps.length - 1) {
      request.renderSummary();
    }

    result.textContent = "";

    animateElement(steps[index]);

    if (focus) {
      steps[index]
          .querySelector("input, select, textarea")
          ?.focus();
    }
  }

  function moveStep(direction, onStepChange) {
    if (
        direction > 0 &&
        !validateStep(currentStep)
    ) {
      return;
    }

    const target = currentStep + direction;

    if (target >= 0 && target < steps.length) {
      onStepChange(target);
    }
  }

  next.addEventListener("click", () => {
    moveStep(1, showStep);
  });

  back.addEventListener("click", () => {
    moveStep(-1, showStep);
  });

  // ========================================
  // SUBMIT ORDER
  // ========================================

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (currentStep < steps.length - 1) {
      moveStep(1, showStep);
      return;
    }

    // Validate all steps
    for (let index = 0; index < steps.length; index++) {
      if (!validateStep(index, false)) {
        showStep(index, false);
        validateStep(index, true);
        return;
      }
    }

    const customer = name.value.trim();

    const completeRequest = function () {
      result.textContent =
          `Thanks, ${customer}! Your request is valid. ` +
          "Demo only: no order was sent or saved.";

      animateElement(result);
      storeSound.play();
    };

    // Keep existing Assignment 6 submit effect.
    if (typeof window.submitDemo === "function") {
      window.submitDemo(
          form,
          submit,
          completeRequest
      );
    } else {
      // Fallback if Assignment 6 is not loaded.
      completeRequest();
    }
  });

  // ========================================
  // RESET ORDER
  // ========================================

  form.addEventListener("reset", function () {
    queueMicrotask(() => {
      const V = window.STEPUPValidation;

      if (V) {
        [
          "customer-name",
          "customer-email",
          "customer-phone",
          "sneaker-model",
          "size39",
          "agreement"
        ].forEach(id => {
          V.showError(id, "");
        });
      }

      const summary =
          document.getElementById("order-summary");

      if (summary) {
        summary.replaceChildren();
      }

      showStep(0, false);
    });
  });

  showStep(0, false);
}

// ==========================================
// 6. INITIALIZE PAGE FEATURES
// ==========================================

initializeCatalog();
initializeOrderForm();
