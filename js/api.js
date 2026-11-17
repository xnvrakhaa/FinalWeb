
"use strict";

// ==========================================
// STEPUP - External Products API
// ==========================================

(function initializeProductsAPI() {

    const API_URL =
        "https://dummyjson.com/products/category/mens-shoes?limit=6";

    const container =
        document.getElementById("api-products");

    const status =
        document.getElementById("api-status");

    const retryButton =
        document.getElementById("api-retry");

    // Only run on the page with an API section.
    if (!container || !status || !retryButton) {
        return;
    }

    // ========================================
    // CREATE PRODUCT CARD
    // ========================================

    function createProductCard(product) {

        const column = document.createElement("div");
        column.className = "col-12 col-md-6 col-lg-4";

        const card = document.createElement("article");
        card.className = "api-product-card";

        const image = document.createElement("img");
        image.className = "api-product-image";
        image.loading = "lazy";
        image.alt = product.title || "Sneaker";

        if (
            typeof product.thumbnail === "string" &&
            product.thumbnail.startsWith("https://")
        ) {
            image.src = product.thumbnail;
        }

        const content = document.createElement("div");
        content.className = "api-product-content";

        const brand = document.createElement("p");
        brand.className = "api-product-brand";
        brand.textContent = product.brand || "Sneakers";

        const title = document.createElement("h3");
        title.className = "api-product-title";
        title.textContent = product.title;

        const description = document.createElement("p");
        description.className = "api-product-description";
        description.textContent =
            product.description || "Discover more sneakers.";

        const price = document.createElement("p");
        price.className = "api-product-price";

        price.textContent = Number.isFinite(product.price)
            ? `$${product.price.toFixed(2)} USD`
            : "Price unavailable";

        const label = document.createElement("span");
        label.className = "api-demo-label";
        label.textContent = "External API Demo";

        content.append(
            brand,
            title,
            description,
            price,
            label
        );

        card.append(image, content);
        column.appendChild(card);

        return column;
    }

    // ========================================
    // LOAD DATA FROM API
    // ========================================

    async function loadProducts() {

        status.textContent = "Loading sneakers...";
        status.setAttribute("role", "status");

        retryButton.hidden = true;
        container.replaceChildren();

        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(
                    `API returned status ${response.status}`
                );
            }

            const data = await response.json();

            if (
                !data ||
                !Array.isArray(data.products)
            ) {
                throw new Error("Invalid API response");
            }

            if (data.products.length === 0) {
                status.textContent =
                    "No additional sneakers are available.";
                return;
            }

            const fragment = document.createDocumentFragment();

            data.products.forEach(product => {
                fragment.appendChild(
                    createProductCard(product)
                );
            });

            container.appendChild(fragment);

            status.textContent =
                `${data.products.length} additional sneakers loaded.`;

        } catch (error) {

            console.error(
                "STEPUP API Error:",
                error
            );

            status.textContent =
                "Unable to load sneakers. Please try again.";

            retryButton.hidden = false;
        }
    }

    // ========================================
    // RETRY BUTTON
    // ========================================

    retryButton.addEventListener("click", loadProducts);

    // ========================================
    // INITIALIZE
    // ========================================

    loadProducts();

})();
