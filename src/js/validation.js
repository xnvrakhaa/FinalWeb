
"use strict";

// STEPUP - Shared Form Validation
// All validation is handled with JavaScript.

window.STEPUPValidation = {

  // Validate full name
  name(value) {
    return (
        typeof value === "string" &&
        value.trim().length >= 2
    );
  },

  // Validate email
  // No @ or spaces = invalid
  email(value) {
    if (typeof value !== "string") {
      return false;
    }

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
        value.length > 0 &&
        !/\s/.test(value) &&
        emailRegex.test(value)
    );
  },

  // Validate password
  password(value) {
    if (typeof value !== "string") {
      return false;
    }

    return (
        value.length >= 8 &&
        !/\s/.test(value) &&
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[^A-Za-z0-9\s]/.test(value)
    );
  },

  // Kazakhstan phone number
  phone(value) {
    if (typeof value !== "string") {
      return false;
    }

    const cleaned = value.replace(/[\s()-]/g, "");

    return /^\+7\d{10}$/.test(cleaned);
  },

  // Required field validation
  required(value) {
    return (
        typeof value === "string" &&
        value.trim().length > 0
    );
  },

  // Display validation errors
  showError(fieldId, message, errorId = fieldId + "-error") {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);

    if (!field || !error) {
      return;
    }

    field.setAttribute(
        "aria-invalid",
        String(Boolean(message))
    );

    error.textContent = message;
  }
};
