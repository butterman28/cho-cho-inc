const CATEGORIES = [
  { label: "Agriculture", slug: "agriculture" },
  { label: "Politics", slug: "politics" },
  { label: "Environment", slug: "environment" },
  { label: "Urban Development", slug: "urban-development" },
  { label: "Food Security", slug: "food-security" },
  { label: "Tourism", slug: "tourism" },
  { label: "Health", slug: "health" },
  { label: "Healthcare", slug: "healthcare" },
  { label: "Culture", slug: "culture" },
  { label: "Society", slug: "society" },
  { label: "Peace & Conflict", slug: "peace-and-conflict" }
];

export function renderNavbar() {
  const categoryLinks = CATEGORIES.map(
    c => `
      <a
        href="/post.html?category=${c.slug}"
        class="block px-4 py-2 hover:bg-gray-100"
      >
        ${c.label}
      </a>
    `
  ).join("");

  const mobileCategoryLinks = CATEGORIES.map(
    c => `
      <a
        href="/post.html?category=${c.slug}"
        class="block"
      >
        ${c.label}
      </a>
    `
  ).join("");

  const navbar = `
    <header class="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white">
      <nav class="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        <div class="text-lg font-semibold">Cho CHo inc.</div>

        <div class="hidden md:flex items-center space-x-6">
          <a href="/index.html" class="hover:underline">Home</a>
          <a href="/post.html" class="hover:underline">Articles</a>

          <div class="relative">
            <button id="categoriesBtn" class="hover:underline">
              Article Categories
            </button>

            <div
              id="categoriesMenu"
              class="absolute left-0 mt-2 w-56 bg-white text-black rounded shadow-lg hidden"
            >
              ${categoryLinks}
            </div>
          </div>
        </div>

        <button id="menuBtn" class="md:hidden">☰</button>
      </nav>

      <div
        id="mobileMenu"
        class="fixed inset-y-0 left-0 w-64 bg-blue-700 transform -translate-x-full transition-transform md:hidden"
      >
        <div class="p-4 space-y-4">
          <a href="/index.html" class="block">Home</a>
          <a href="/post.html" class="block">Articles</a>
          <div class="space-y-2">
            ${mobileCategoryLinks}
          </div>
        </div>
      </div>
    </header>
  `;

  document.body.insertAdjacentHTML("afterbegin", navbar);
  document.body.insertAdjacentHTML("afterbegin", `<div class="h-16"></div>`);

  bindNavbarEvents();
}


function bindNavbarEvents() {
  const categoriesBtn = document.getElementById("categoriesBtn");
  const categoriesMenu = document.getElementById("categoriesMenu");
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  categoriesBtn.addEventListener("click", e => {
    e.stopPropagation();
    categoriesMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", () => {
    categoriesMenu.classList.add("hidden");
  });

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("-translate-x-full");
  });

  mobileMenu.addEventListener("click", e => {
    if (e.target.tagName === "A") {
      mobileMenu.classList.add("-translate-x-full");
    }
  });
}
