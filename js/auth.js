
"use strict";

// ==========================================
// STEPUP - Demo Authentication
// Sign Up, Log In, Profile and Log Out
// Educational use only
// ==========================================

// Use fictional credentials only.
// Never use real passwords in this demo.

const ACCOUNT_KEY = "stepup-demo-account";
const SESSION_KEY = "stepup-demo-session";

// ==========================================
// 1. VALIDATION FUNCTIONS
// ==========================================

// Email must contain @, a valid domain,
// and no spaces or consecutive domain dots.
function validateEmail(email) {
    if (typeof email !== "string") {
        return false;
    }

    const regex =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

    return (
        email.length > 0 &&
        !/\s/.test(email) &&
        regex.test(email)
    );
}

// Password:
// - Minimum 8 characters
// - Uppercase letter
// - Lowercase letter
// - Number
// - Special character
// - No spaces
function validatePassword(password) {
    if (typeof password !== "string") {
        return false;
    }

    return (
        password.length >= 8 &&
        !/\s/.test(password) &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9\s]/.test(password)
    );
}

// Name:
// - At least 2 characters
// - Cannot contain only spaces
// - Cannot contain consecutive spaces
// - Must include a letter
function validateName(name) {
    if (typeof name !== "string") {
        return false;
    }

    const cleaned = name.trim();

    return (
        cleaned.length >= 2 &&
        !/\s{2,}/.test(cleaned) &&
        /[\p{L}]/u.test(cleaned)
    );
}

// ==========================================
// 2. DISPLAY FIELD ERRORS
// ==========================================

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "-error");

    if (!field || !error) {
        return;
    }

    field.setAttribute(
        "aria-invalid",
        String(Boolean(message))
    );

    error.textContent = message;
}

// Display success or error message
function showResult(element, message, isSuccess) {
    if (!element) {
        return;
    }

    element.textContent = message;

    element.className = isSuccess
        ? "auth-result-success"
        : "auth-result-error";
}

// ==========================================
// 3. LOCAL STORAGE
// ==========================================

// Retrieve the saved demo account.
function getStoredAccount() {
    try {
        const data = localStorage.getItem(ACCOUNT_KEY);

        if (!data) {
            return null;
        }

        const account = JSON.parse(data);

        if (
            !account ||
            typeof account.name !== "string" ||
            typeof account.email !== "string" ||
            typeof account.password !== "string"
        ) {
            return null;
        }

        return account;

    } catch (error) {
        return null;
    }
}

// ==========================================
// 4. SIGN UP
// ==========================================

const signupForm = document.getElementById("signup-form");

if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document
            .getElementById("signup-name")
            .value.trim();

        const email = document
            .getElementById("signup-email")
            .value.toLowerCase();

        const password = document
            .getElementById("signup-password")
            .value;

        const confirmPassword = document
            .getElementById("signup-confirm")
            .value;

        const result = document
            .getElementById("signup-result");

        result.textContent = "";
        result.className = "";

        // Validate all fields.
        const errors = {
            "signup-name": validateName(name)
                ? ""
                : "Enter a valid name with at least 2 characters.",

            "signup-email": validateEmail(email)
                ? ""
                : "Enter a valid email without spaces.",

            "signup-password": validatePassword(password)
                ? ""
                : "Password must have 8+ characters, uppercase, lowercase, number and symbol. No spaces.",

            "signup-confirm":
                confirmPassword &&
                confirmPassword === password
                    ? ""
                    : "Passwords do not match."
        };

        // Display errors below each input.
        Object.entries(errors).forEach(([id, message]) => {
            showFieldError(id, message);
        });

        // Focus on the first invalid field.
        const firstInvalid = Object.keys(errors)
            .find(id => errors[id] !== "");

        if (firstInvalid) {
            showResult(
                result,
                "Please correct the highlighted errors.",
                false
            );

            document.getElementById(firstInvalid).focus();
            return;
        }

        // Save one educational demo account.
        // A new registration replaces the previous one.
        const account = {
            name: name,
            email: email,
            password: password
        };

        try {
            localStorage.setItem(
                ACCOUNT_KEY,
                JSON.stringify(account)
            );

            // Require login after registration.
            localStorage.removeItem(SESSION_KEY);

        } catch (error) {
            showResult(
                result,
                "Unable to save the demo account.",
                false
            );
            return;
        }

        showResult(
            result,
            "Account created successfully! You can now log in.",
            true
        );

        signupForm.reset();

        // Clear validation errors.
        Object.keys(errors).forEach(id => {
            showFieldError(id, "");
        });
    });
}

// ==========================================
// 5. LOG IN
// ==========================================

const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document
            .getElementById("login-email")
            .value.toLowerCase();

        const password = document
            .getElementById("login-password")
            .value;

        const result = document
            .getElementById("login-result");

        result.textContent = "";
        result.className = "";

        // Validate login fields.
        const errors = {
            "login-email": validateEmail(email)
                ? ""
                : "Please enter a valid email without spaces.",

            "login-password": password.length > 0
                ? ""
                : "Please enter your password."
        };

        Object.entries(errors).forEach(([id, message]) => {
            showFieldError(id, message);
        });

        const firstInvalid = Object.keys(errors)
            .find(id => errors[id] !== "");

        if (firstInvalid) {
            showResult(
                result,
                "Please correct the highlighted errors.",
                false
            );

            document.getElementById(firstInvalid).focus();
            return;
        }

        // Retrieve registered demo account.
        const account = getStoredAccount();

        // Compare credentials.
        if (
            !account ||
            account.email !== email ||
            account.password !== password
        ) {
            showResult(
                result,
                "Incorrect email or password.",
                false
            );
            return;
        }

        // Start demo session.
        try {
            localStorage.setItem(
                SESSION_KEY,
                account.email
            );

        } catch (error) {
            showResult(
                result,
                "Unable to start the demo session.",
                false
            );
            return;
        }

        // Redirect to profile.
        window.location.href = "profile.html";
    });
}

// ==========================================
// 6. PROFILE PAGE
// ==========================================

const profileCard = document.getElementById("profile-card");

if (profileCard) {
    const account = getStoredAccount();

    let sessionEmail = null;

    try {
        sessionEmail = localStorage.getItem(SESSION_KEY);
    } catch (error) {
        sessionEmail = null;
    }

    // Redirect users who have not logged in.
    if (
        !account ||
        !sessionEmail ||
        account.email !== sessionEmail
    ) {
        window.location.replace("login.html");

    } else {
        // Show user details.
        const profileName =
            document.getElementById("profile-name");

        const profileEmail =
            document.getElementById("profile-email");

        const profileWelcome =
            document.getElementById("profile-welcome");

        if (profileName) {
            profileName.textContent = account.name;
        }

        if (profileEmail) {
            profileEmail.textContent = account.email;
        }

        if (profileWelcome) {
            profileWelcome.textContent =
                "Welcome, " + account.name + "!";
        }

        // Show the profile card.
        profileCard.hidden = false;
    }
}

// ==========================================
// 7. LOG OUT
// ==========================================

const logoutButton =
    document.getElementById("logout-button");

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        try {
            localStorage.removeItem(SESSION_KEY);
        } catch (error) {
            console.warn("Unable to clear demo session.");
        }

        // Return to login page.
        window.location.replace("login.html");
    });
}
