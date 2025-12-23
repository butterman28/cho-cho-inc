import { articles } from "./postdata.js";

// Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"), 10);

const loader = document.getElementById("loader");
const postContent = document.getElementById("postContent");

// Form state (localStorage)
let name = localStorage.getItem("name") || "";
let email = localStorage.getItem("email") || "";
let website = localStorage.getItem("website") || "";
let commentText = "";

// Find post
const item = articles.find(a => a.id === id);

if (!item) {
  loader.innerHTML = "<p class='text-gray-500'>Post not found.</p>";
  throw new Error("Post not found");
}

loader.classList.add("hidden");
postContent.classList.remove("hidden");

// Render post
postContent.innerHTML = `
  <h1 class="text-3xl font-bold">${item.title}</h1>

  <div class="flex items-center gap-4">
    <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
      ${(item.author?.username || "D")[0].toUpperCase()}
    </div>
    <div>
      <p class="font-semibold">
        By ${item.author?.username || ""}
      </p>
      <p class="text-sm text-gray-500">
        Category: ${item.category || "Uncategorized"}
      </p>
    </div>
  </div>

  <div class="space-y-4 text-gray-800">
    ${item.content
      .split("\r\n")
      .map(p => `<p>${p}</p>`)
      .join("")}
  </div>

  <section class="pt-6 border-t">
    <h2 class="text-2xl font-semibold mb-4">
      Comments (${item.comments?.length || 0})
    </h2>

    <div id="comments" class="space-y-4 mb-6">
      ${
        item.comments?.length
          ? item.comments.map(c => `
            <div class="border rounded p-4">
              <p>${c.content}</p>
              <p class="text-sm text-gray-500 mt-2">By ${c.name}</p>
            </div>
          `).join("")
          : "<p class='text-gray-500'>No comments yet.</p>"
      }
    </div>

    <h3 class="text-xl font-semibold mb-2">Add a Comment</h3>

    <form id="commentForm" class="space-y-4">
      <textarea
        id="comment"
        rows="4"
        placeholder="Write your comment..."
        class="w-full border rounded p-3"
        required
      ></textarea>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          id="name"
          placeholder="Name *"
          class="border rounded p-2"
          required
          value="${name}"
        />

        <input
          id="email"
          placeholder="Email *"
          class="border rounded p-2"
          required
          value="${email}"
        />

        <input
          id="website"
          placeholder="Website"
          class="border rounded p-2"
          value="${website}"
        />
      </div>

      <button
        type="submit"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Submit Comment
      </button>

      <p id="error" class="text-red-600 text-sm hidden"></p>
    </form>
  </section>
`;

// Handle input persistence
["name", "email", "website"].forEach(field => {
  const input = document.getElementById(field);
  input.addEventListener("input", e => {
    localStorage.setItem(field, e.target.value);
  });
});

// Submit comment
document.getElementById("commentForm").addEventListener("submit", async e => {
  e.preventDefault();

  const errorEl = document.getElementById("error");

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    website: document.getElementById("website").value.trim(),
    content: document.getElementById("comment").value.trim()
  };

  if (!data.name || !data.email || !data.content) {
    errorEl.textContent = "Name, email, and comment are required.";
    errorEl.classList.remove("hidden");
    return;
  }

  errorEl.classList.add("hidden");

  try {
    const res = await fetch(`http://127.0.0.1:8000/post/comment/${item.id}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Failed");

    alert("Comment submitted successfully!");
    document.getElementById("comment").value = "";

  } catch (err) {
    errorEl.textContent = "Network error. Please try again.";
    errorEl.classList.remove("hidden");
  }
});
