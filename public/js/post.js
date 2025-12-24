import { articles } from "./postdata.js";

// Read category from URL
const params = new URLSearchParams(window.location.search);
console.log(params);
const category = params.get("category");
console.log(category)

// Elements
const pageTitle = document.getElementById("pageTitle");
const postGrid = document.getElementById("postGrid");

// Decide title
if (category) {
  pageTitle.textContent =
    category.charAt(0).toUpperCase() + category.slice(1);
} else {
  pageTitle.textContent = "All Articles";
}


console.log("Category from URL:", category);
console.log(
  "Categories in data:",
  articles.map(a => a.category)
);

// Filter logic
const normalize = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-");

const filteredArticles = category
  ? articles.filter(
      post => normalize(post.category) === normalize(category)
    )
  : articles;

//console.log(filteredArticles);



// Render
if (filteredArticles.length === 0) {
  postGrid.innerHTML = `
    <p class="text-gray-500 col-span-full text-center">
      No articles found for this category.
    </p>
  `;
} else {
  postGrid.innerHTML = filteredArticles.map(post => `
    <div class="w-full max-w-sm border rounded-lg shadow-sm p-4 flex flex-col">
      <h2 class="text-lg font-semibold mb-2">${post.title}</h2>

      <p class="text-gray-600 text-sm line-clamp-3 mb-4">
        ${post.content}
      </p>

      <a
        href="/post-detail.html?id=${post.id}"
        class="mt-auto text-blue-600 hover:underline font-medium"
      >
        Read More
      </a>
    </div>
  `).join("");
}
