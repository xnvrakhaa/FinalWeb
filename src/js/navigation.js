
"use strict";

// STEPUP - Shared Account Navigation
// Adds Log In or Profile to every website page.
// Existing navigation links remain unchanged.

(function initializeAccountNavigation() {

    const ACCOUNT_KEY = "stepup-demo-account";
    const SESSION_KEY = "stepup-demo-session";

    // Find the existing Bootstrap menu.
    const navigation = document.querySelector(
        "#mainMenu .navbar-nav"
    );

    if (!navigation) return;

    // Check whether the user has an active demo session.
    let isLoggedIn = false;

    try {
        const accountData = localStorage.getItem(ACCOUNT_KEY);
        const sessionEmail = localStorage.getItem(SESSION_KEY);

        if (accountData && sessionEmail) {
            const account = JSON.parse(accountData);

            isLoggedIn =
                account !== null &&
                typeof account.email === "string" &&
                account.email === sessionEmail;
        }
    } catch (error) {
        isLoggedIn = false;
    }

    // Avoid duplicate account links on the new pages.
    const accountPages = [
        "signup.html",
        "login.html",
        "profile.html"
    ];

    navigation.querySelectorAll("a[href]").forEach(link => {
        const url = new URL(link.href, window.location.href);
        const filename = url.pathname.split("/").pop();

        if (accountPages.includes(filename)) {
            link.closest("li")?.remove();
        }
    });

    // Select the destination according to login state.
    const accountPage = isLoggedIn
        ? "profile.html"
        : "login.html";

    const accountText = isLoggedIn
        ? "Profile"
        : "Log In";

    // Determine the current page.
    const currentPage =
        window.location.pathname.split("/").pop() ||
        "index.html";


    // Create a new Bootstrap navigation item.
    const listItem = document.createElement("li");
    listItem.className = "nav-item";

    const accountLink = document.createElement("a");
    accountLink.className = "nav-link";
    accountLink.href = accountPage;
    accountLink.textContent = accountText;

    // Preserve the existing active-link styling.
    if (currentPage === accountPage) {
        accountLink.classList.add("active", "fw-bold");
        accountLink.setAttribute("aria-current", "page");
    }

    listItem.appendChild(accountLink);
    navigation.appendChild(listItem);

})();
