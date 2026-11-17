# 👟 STEPUP — Sneaker Store

### Modern Responsive Sneaker Store | Web Technologies Final Project

STEPUP is a responsive, interactive sneaker store website developed as a university Web Technologies project. It demonstrates modern frontend development techniques using **HTML5, CSS3, Bootstrap, JavaScript, jQuery, Local Storage, and External API Integration**.

The website allows visitors to explore sneakers, search and filter products, view product ratings, submit demonstration order requests, and interact with a simulated user authentication system.

> **Academic Project Notice:** STEPUP is an educational frontend application. It does not process real purchases, payments, or customer orders. Authentication uses browser-based simulation and must only be tested with fictional credentials.

---

## 📌 Project Information

| Information | Details |
|---|---|
| Project Name | STEPUP Sneaker Store |
| University | Astana IT University |
| Course | Web Technologies |
| Group | SE-2508 |
| Developers | Tazhmaganbetov Rakhat and Tauekel Islam |
| Project Type | Multi-page Frontend Website |
| Technologies | HTML, CSS, JavaScript, Bootstrap, jQuery |
| Database | Browser localStorage (demo only) |
| External API | DummyJSON Products API |
| Hosting | GitHub Pages |

## 🌐 Live Website and Repository

**Live Website:** Add your new GitHub Pages URL here.

**GitHub Repository:** Add your new repository URL here.

These links should be updated after publishing the final version.

---

## 🎯 Project Purpose

The main purpose of STEPUP is to create an attractive, responsive, and interactive online sneaker-shopping experience.

### Project Objectives

- Build a responsive website for desktop, tablet, and mobile devices.
- Provide an intuitive shopping interface.
- Implement light and dark themes.
- Develop client-side form validation.
- Simulate registration, login, and user profiles.
- Implement dynamic product search and filtering.
- Retrieve product information from a public API.
- Apply animations and interactive UI effects.
- Deploy the completed project using GitHub Pages.
- Maintain clean, understandable, and organized source code.

### Target Audience

STEPUP is designed for sneaker enthusiasts, students, and customers interested in casual footwear, streetwear, and comfortable everyday shoes.

---

# 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Styling, responsive layouts, transitions |
| Bootstrap | Responsive grid, navigation, cards, forms |
| JavaScript ES6+ | DOM manipulation, events, validation |
| jQuery | Additional UI interactions and effects |
| localStorage | Theme preferences and demo authentication |
| Fetch API | External product data |
| Async/Await | Asynchronous API requests |
| Git & GitHub | Version control |
| GitHub Pages | Static website hosting |

---

# 📁 Project Structure

```text
STEPUP/
│
├── index.html
├── catalog.html
├── gallery.html
├── about.html
├── contact.html
│
├── signup.html
├── login.html
├── profile.html
│
├── css/
│   ├── style.css
│   ├── assignment5.css
│   ├── assignment6.css
│   ├── auth.css
│   └── api.css
│
├── js/
│   ├── script.js
│   ├── theme.js
│   ├── assignment5.js
│   ├── assignment6.js
│   ├── validation.js
│   ├── auth.js
│   ├── navigation.js
│   └── api.js
│
├── img/
│   └── sneaker and website images
│
├── vendor/
│   ├── bootstrap/
│   └── jquery/
│
└── README.md
```

### Main Pages

| Page | Description |
|---|---|
| `index.html` | Homepage, featured sneakers, benefits, FAQ |
| `catalog.html` | Products, search, filters, ratings, API content |
| `gallery.html` | Sneaker image gallery |
| `about.html` | Store information, mission, team members |
| `contact.html` | Contact information, forms, order simulation |
| `signup.html` | Demo account registration |
| `login.html` | Demo account login |
| `profile.html` | User information and logout |

---

# ✅ Assessment Criteria — 100 Points

## 1. Responsiveness — 10 Points

### Requirement

The website must display correctly across desktop, tablet, and mobile devices using responsive design techniques.

### Implementation

STEPUP combines:

- Bootstrap's responsive grid system.
- CSS Flexbox.
- CSS Grid.
- Media queries.
- Responsive typography.
- Flexible images and product cards.

### Example: Bootstrap Product Grid

```html
<div class="row g-4">
  <article class="col-12 col-md-6 col-lg-4">
    <div class="card h-100">
      <img
        src="./img/nike-air-max.jpg"
        class="card-img-top"
        alt="Nike Air Max 270"
      >
      <div class="card-body">
        <h3>Nike Air Max 270</h3>
        <p>Comfortable everyday sneakers.</p>
      </div>
    </div>
  </article>
</div>
```

### Explanation

Bootstrap changes the number of columns according to screen width:

- Mobile: one column.
- Tablet: two columns.
- Desktop: three columns.

### Example: CSS Media Query

```css
@media (max-width: 576px) {
  .catalog-filters {
    padding: 1rem;
    gap: 0.75rem;
  }

  .catalog-filters > div {
    flex-basis: 100%;
  }
}
```

On smaller screens, catalog filters are arranged vertically to improve readability.

### Testing

The responsive layout was manually checked at representative widths:

| Device | Width |
|---|---|
| Mobile | 375px |
| Tablet | 768px |
| Desktop | 1440px |

**Related files:** `style.css`, `assignment5.css`, `assignment6.css`, `auth.css`, `api.css`.

---

## 2. Hosting — 5 Points

### Requirement

The completed website must be publicly accessible, and both the live website URL and GitHub repository URL must be submitted.

### Implementation

STEPUP uses **GitHub Pages**, which supports static HTML, CSS, and JavaScript websites.

### Deployment Procedure

1. Create a public GitHub repository.
2. Upload all project files.
3. Open repository **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select the main branch (`main` or `master`) and `/ (root)`.
6. Save the settings.
7. Open the generated GitHub Pages URL.
8. Test all website pages, links, images, and JavaScript functionality.

### Expected URL Format

```text
https://USERNAME.github.io/REPOSITORY/
```

### Hosting Verification

The final deployment should confirm:

- All eight HTML pages are accessible.
- Internal navigation links work.
- Images and stylesheets load.
- JavaScript files load without errors.
- The external API works on the hosted version.
- No missing-resource (404) errors occur.

**Deployment status:** Add verified live and repository links after final publication.

---

## 3. Light and Dark Modes — 5 Points

### Requirement

Users must be able to switch between light and dark modes, and their preference must persist between pages.

### Implementation

STEPUP includes a theme toggle managed by `js/theme.js`.

The selected mode is stored in the browser using `localStorage`.

### Example: Theme Switching

```javascript
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;

  document.documentElement.setAttribute(
    "data-bs-theme",
    theme
  );
}
```

### Example: Saving Theme Preference

```javascript
localStorage.setItem("stepup-theme", newTheme);
```

### Example: Restoring Theme

```javascript
const savedTheme =
  localStorage.getItem("stepup-theme") || "dark";

setTheme(savedTheme);
```

### Explanation

When the user selects a theme, JavaScript updates the website's theme attributes and saves the selection.

When another page loads, the saved preference is read from localStorage and reapplied.

Bootstrap components also use the appropriate theme attribute.

### User Experience

- Dark mode provides the primary STEPUP visual identity.
- Light mode offers an alternative high-contrast appearance.
- Theme selection persists after page navigation and refresh.

**Related files:** `js/theme.js` and CSS stylesheets.

---

## 4. Design & User Experience — 20 Points

### Requirement

The website must have an appealing, readable, and consistent visual design that matches its theme and target audience.

### Design Concept

STEPUP follows a modern sneaker-store visual style.

The primary design includes:

- Dark backgrounds.
- Orange and yellow accents.
- Large sneaker images.
- Consistent typography.
- Rounded product cards.
- Visible call-to-action buttons.
- Clear navigation.
- Responsive spacing.

### Example: Button Hover Animation

```css
.api-product-card {
  border-radius: 12px;
  overflow: hidden;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.api-product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
```

### Explanation

The hover animation provides visual feedback and helps users recognize interactive content.

### UX Features

- Consistent header and footer.
- Accessible navigation labels.
- Clear product information.
- Search and filtering controls.
- Inline error messages.
- Feedback after user actions.
- Responsive layouts.
- Light and dark themes.

Every main page serves a specific purpose within the shopping experience.

---

## 5. Enhanced JavaScript Functionality — 25 Points

This criterion includes authentication simulation, form validation, and dynamic search/filtering.

### 5.1 Authentication Simulation

STEPUP implements a demonstration authentication system using `localStorage`.

#### Sign Up

The registration page collects:

- Full name.
- Email.
- Password.
- Password confirmation.

Input values are validated before registration.

Example:

```javascript
const account = {
  name: name,
  email: email,
  password: password
};

localStorage.setItem(
  "stepup-demo-account",
  JSON.stringify(account)
);
```

#### Explanation

The user data is converted into a JSON string and stored in the browser.

The educational implementation supports one demonstration account, which can be replaced by a new registration.

**Security note:** This simulation is not suitable for real authentication. Browser localStorage is not a secure password database. Only fictional credentials should be used.

#### Log In

The login page compares the entered credentials with previously saved demonstration data.

```javascript
const account = getStoredAccount();

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

localStorage.setItem(
  "stepup-demo-session",
  account.email
);

window.location.href = "profile.html";
```

#### Explanation

If the entered credentials match the demonstration account, JavaScript creates a local session indicator and redirects the user to the profile page.

#### Profile

The profile displays the saved name and email:

```javascript
document.getElementById("profile-name")
  .textContent = account.name;

document.getElementById("profile-email")
  .textContent = account.email;
```

The password is not displayed on the profile page.

#### Log Out

```javascript
localStorage.removeItem("stepup-demo-session");
window.location.replace("login.html");
```

After logout, the demo session indicator is removed.

#### Dynamic Navigation

The menu displays different account links depending on login status:

```javascript
const accountPage = isLoggedIn
  ? "profile.html"
  : "login.html";

const accountText = isLoggedIn
  ? "Profile"
  : "Log In";
```

**Related files:** `signup.html`, `login.html`, `profile.html`, `js/auth.js`, `js/navigation.js`.

### 5.2 Form Validation

STEPUP uses JavaScript-based form validation instead of relying on HTML browser validation.

Forms use the `novalidate` attribute:

```html
<form id="signup-form" novalidate>
```

#### Email Validation

```javascript
function validateEmail(email) {
  const regex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

  return (
    email.length > 0 &&
    !/\s/.test(email) &&
    regex.test(email)
  );
}
```

The validation rejects malformed addresses, missing `@` characters, and spaces.

#### Password Validation

```javascript
function validatePassword(password) {
  return (
    password.length >= 8 &&
    !/\s/.test(password) &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9\s]/.test(password)
  );
}
```

A valid password must include:

- At least eight characters.
- One uppercase letter.
- One lowercase letter.
- One number.
- One special character.
- No whitespace.

#### Phone Number Validation

The order request form supports Kazakhstan-format phone numbers.

```javascript
function validatePhone(value) {
  const cleaned = value.replace(/[\s()-]/g, "");

  return /^\+7\d{10}$/.test(cleaned);
}
```

Example of accepted format:

```text
+7 777 123 4567
```

#### Inline Error Messages

```javascript
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(
    fieldId + "-error"
  );

  field.setAttribute(
    "aria-invalid",
    String(Boolean(message))
  );

  error.textContent = message;
}
```

#### Explanation

Each validation function checks a specific type of input.

When a value is invalid:

1. The form submission is prevented.
2. The field receives an invalid state.
3. A user-friendly error appears near the field.
4. The user can correct the input.

This provides more control and clearer feedback than default browser alerts.

#### Multi-Step Order Form

The contact page includes a three-step demonstration order request.

| Step | Validation |
|---|---|
| Step 1 | Name, email, phone number |
| Step 2 | Sneaker model and size |
| Step 3 | User confirmation |

The user cannot continue until the current step is valid.

**Related files:** `js/validation.js`, `js/auth.js`, `js/script.js`, `js/assignment5.js`, `contact.html`.

### 5.3 Search and Filtering Functionality

The catalog includes dynamic filtering by:

- Brand.
- Price range.
- Search text.

### Example

```javascript
const matches = products.filter(product => {
  return (
    (brand.value === "all" ||
      product.brand === brand.value) &&
    matchesBudget(product) &&
    product.name.toLowerCase().includes(query)
  );
});
```

### Explanation

The `.filter()` array method selects products that match the user's chosen conditions.

JavaScript updates visible cards without refreshing the webpage.

The catalog also provides a **Reset Filters** button.

### Product Rating System

Users can select ratings from one to five stars.

The visual star states and rating messages update dynamically through JavaScript.

These ratings are temporary demonstration values.

**Related files:** `catalog.html`, `js/assignment5.js`, `js/assignment6.js`.

---

## 6. Animated Button & UI Effects — 5 Points

### Requirement

The interface must include meaningful hover transitions and smooth animations.

### Implemented Features

- Button hover effects.
- Product-card hover animations.
- Interactive star ratings.
- FAQ expansion.
- Smooth transitions.
- Sound effects with user controls.
- Scroll progress indicator.
- UI feedback after actions.
- Reduced-motion support.

### Example: CSS Animation

```css
.rating-star {
  transition:
    color 0.15s,
    transform 0.15s;
}

.rating-star:hover {
  transform: scale(1.15);
}
```

### JavaScript Animation Example

```javascript
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
```

### Accessibility

Animations respect reduced-motion preferences.

```css
@media (prefers-reduced-motion: reduce) {
  .rating-star {
    transition: none;
  }

  .rating-star:hover {
    transform: none;
  }
}
```

These effects enhance interaction without being necessary to understand the content.

---

## 7. External API Integration — 10 Points

### Requirement

The website must retrieve dynamic data from at least one public API using JavaScript.

It must provide:

- Asynchronous requests.
- Loading feedback.
- Error handling.
- Dynamic content rendering.

### Selected API

**DummyJSON Products API**

Documentation: https://dummyjson.com/docs/products

Endpoint used:

```text
https://dummyjson.com/products/category/mens-shoes?limit=6
```

### Implementation

STEPUP includes an additional section titled **More Sneakers** on the catalog page.

The original six STEPUP products remain unchanged.

### Example: Fetch and Async/Await

```javascript
async function loadProducts() {
  status.textContent = "Loading sneakers...";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(
        `API returned status ${response.status}`
      );
    }

    const data = await response.json();

    data.products.forEach(product => {
      container.appendChild(
        createProductCard(product)
      );
    });

    status.textContent =
      `${data.products.length} additional sneakers loaded.`;

  } catch (error) {
    status.textContent =
      "Unable to load sneakers. Please try again.";

    retryButton.hidden = false;
  }
}
```

### Explanation

1. The browser sends an HTTP request using `fetch()`.
2. `async/await` handles asynchronous execution.
3. The response is converted from JSON to JavaScript data.
4. Product cards are generated dynamically.
5. Each card displays product information.
6. The user receives a loading message.
7. Network failures are handled using `try/catch`.
8. A **Try Again** button allows another request.

### Dynamic Product Cards

JavaScript creates DOM elements using:

```javascript
const card = document.createElement("article");

const title = document.createElement("h3");
title.textContent = product.title;

const price = document.createElement("p");
price.textContent = `$${product.price.toFixed(2)} USD`;

card.append(title, price);
```

Using `textContent` helps avoid treating API-provided strings as executable HTML.

### Design Integration

External API products:

- Appear in a separate section.
- Use responsive Bootstrap columns.
- Support both light and dark modes.
- Include images, descriptions, and prices.
- Are clearly labeled as demonstration data.

**Related files:** `catalog.html`, `js/api.js`, `css/api.css`.

---

## 8. Feature Cohesion and Relevance — 10 Points

### Requirement

Every feature should support the main website purpose and contribute to a positive user experience.

### Feature Integration

| Feature | Relevance to STEPUP |
|---|---|
| Product Catalog | Allows users to explore sneakers |
| Search and Filters | Makes product discovery easier |
| Product Ratings | Supports interactive product evaluation |
| Order Request | Simulates the customer purchase process |
| Sign Up / Log In | Demonstrates a customer account workflow |
| Profile | Displays the current demo user |
| Light / Dark Mode | Improves viewing preferences |
| External API | Introduces additional sneaker styles |
| Gallery | Provides visual product browsing |
| FAQ | Answers common shopping questions |
| Responsive Design | Supports mobile shopping |

### Unified User Flow

```text
Home
  |
  v
Browse Catalog
  |
  +-- Search and Filter Products
  |
  +-- Explore External API Products
  |
  v
View Sneaker Details
  |
  v
Order Request (Demo)
```

The account workflow operates alongside the shopping interface:

```text
Sign Up
   |
   v
Log In
   |
   v
Profile
   |
   v
Log Out
```

These features demonstrate an integrated frontend experience rather than unrelated JavaScript exercises.

---

## 9. Overall Presentation — 5 Points

### Requirement

The team must clearly explain its project, demonstrate functionality, and stay within the presentation time limit.

### Suggested Presentation Plan

*Example for a five-minute presentation; adjust to the instructor's actual time limit.*

| Time | Presentation Topic |
|---|---|
| 0:00–0:30 | Introduction and website purpose |
| 0:30–1:00 | Responsive design and navigation |
| 1:00–1:30 | Light/dark themes and catalog |
| 1:30–2:30 | Sign Up, Log In, Profile |
| 2:30–3:15 | Form validation |
| 3:15–4:00 | External API |
| 4:00–4:30 | Architecture and hosting |
| 4:30–5:00 | Conclusion |

### Recommended Live Demonstration

1. Open the deployed website.
2. Show the responsive layout.
3. Switch between light and dark modes.
4. Filter products in the catalog.
5. Demonstrate registration with fictional data.
6. Log in and open the profile page.
7. Show an invalid email or password.
8. Open the API-powered product section.
9. Explain error handling.
10. Show the GitHub repository and file organization.

### Key Technical Concepts to Explain

- DOM manipulation.
- Event listeners.
- JavaScript form validation.
- JSON and localStorage.
- Asynchronous programming.
- `fetch()` and `async/await`.
- Responsive design.
- GitHub Pages hosting.

**Presentation status:** Complete after preparing and rehearsing the final demonstration.

---

## 10. Code Quality & File Organization — 5 Points

### Requirement

The project should have organized files, clear naming conventions, readable code, and comments for complex functionality.

### Implementation

STEPUP separates its frontend into three main areas:

**HTML**

Contains semantic page structure, navigation, forms, and content.

**CSS**

Contains the visual design, responsive layouts, themes, and animations.

**JavaScript**

Contains interactive functionality, validation, authentication simulation, filtering, and API calls.

### File Responsibilities

| File | Responsibility |
|---|---|
| `script.js` | Main page interactions, FAQ, subscription |
| `theme.js` | Light/dark theme management |
| `assignment5.js` | Catalog functionality and order form |
| `assignment6.js` | jQuery enhancements |
| `validation.js` | Shared validation functions |
| `auth.js` | Sign Up, Log In, Profile, Log Out |
| `navigation.js` | Account-aware navigation |
| `api.js` | External API data loading |

### Example: Functional Separation

```javascript
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

Instead of repeating the same validation logic in every form, shared utility functions can be reused across pages.

### Code Quality Practices

- Descriptive class, ID, and variable names.
- Separate JavaScript and CSS files.
- Comments explaining important functionality.
- Minimal duplication.
- Checking for missing DOM elements.
- Error handling with `try/catch`.
- Semantic HTML.
- User-friendly feedback messages.
- Responsive and accessible components.

### Final Code Quality Verification

Before submission, check the following:

- JavaScript Console contains no unresolved errors.
- All HTML links reference existing pages.
- CSS and JavaScript assets load correctly.
- Unused or duplicate script declarations are removed.
- The latest code has been committed and pushed.
- README documentation matches the final implementation.

---

# ▶️ How to Run the Project Locally

### Option 1: IntelliJ IDEA

1. Clone or download the GitHub repository.
2. Open the project folder in IntelliJ IDEA.
3. Start a local development server.
4. Open `index.html` through the server.
5. Navigate through the website.

### Option 2: Python HTTP Server

From the project root directory:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

A local HTTP server is recommended for consistent testing of page navigation and API requests.

### Requirements

- A modern web browser.
- Internet connection for external API data.
- No Node.js installation required.
- No backend server or database required.

---

# 🧪 Testing Checklist

### Functional Testing

- [ ] All pages load correctly.
- [ ] Navigation links work.
- [ ] Sign Up validates user input.
- [ ] Log In checks saved demo credentials.
- [ ] Profile displays saved details.
- [ ] Log Out removes the demo session.
- [ ] Email validation rejects malformed addresses.
- [ ] Password complexity validation works.
- [ ] Phone number validation works.
- [ ] Multi-step order validation works.
- [ ] Product search and filtering work.
- [ ] Product ratings respond to clicks.
- [ ] Light/dark mode persists across pages.
- [ ] External API products load correctly.
- [ ] API loading and error messages work.
- [ ] Retry functionality works.
- [ ] No JavaScript Console errors occur.

### Responsive Testing

- [ ] Mobile layout.
- [ ] Tablet layout.
- [ ] Desktop layout.
- [ ] Navigation does not overlap content.
- [ ] Images are responsive.
- [ ] Forms remain readable.
- [ ] Both themes have sufficient contrast.

### Hosting Testing

- [ ] All eight pages load through GitHub Pages.
- [ ] Images and stylesheets load correctly.
- [ ] No broken links.
- [ ] No 404 errors.
- [ ] API works on the deployed site.
- [ ] Repository URL is included in README.
- [ ] Live URL is included in README.

---

# 📊 Assessment Summary

| # | Assessment Criterion | Maximum Points |
|---|---|---:|
| 1 | Responsiveness | 10 |
| 2 | Hosting | 5 |
| 3 | Light and Dark Modes | 5 |
| 4 | Design & User Experience | 20 |
| 5 | Enhanced JavaScript Functionality | 25 |
| 6 | Animated Button & UI Effects | 5 |
| 7 | External API Integration | 10 |
| 8 | Feature Cohesion and Relevance | 10 |
| 9 | Overall Presentation | 5 |
| 10 | Code Quality & File Organization | 5 |
| | **TOTAL** | **100** |

*This table describes the assessment requirements and their implementation in STEPUP. It is not an official score or a guarantee of full marks.*

---

# 👨‍💻 Development Team

### Tazhmaganbetov Rakhat

Frontend Developer

Contributions to the original STEPUP website include:

- Homepage.
- Catalog page.
- Product cards.
- Product comparison table.

### Tauekel Islam

Frontend Developer

Contributions to the original STEPUP website include:

- About Us page.
- Contact page.
- Team information.
- Customer contact form.

The final project also includes additional authentication, validation, navigation, and API functionality. Update the team contribution descriptions if you need to document who implemented each new feature.

---

# 🚀 Conclusion

STEPUP demonstrates how a multi-page static website can provide a dynamic, interactive, and responsive user experience without a traditional backend.

The project combines practical frontend development concepts, including responsive design, DOM manipulation, JavaScript validation, browser storage, asynchronous API requests, and accessible user interfaces.

It was developed as an educational project to demonstrate the technical skills required by the Web Technologies assessment.

**STEPUP — Find Your Perfect Pair.**

---

© 2026 STEPUP Sneaker Store — Astana IT University, Group SE-2508.