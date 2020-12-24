// @see http://jsonplaceholder.typicode.com
const postsContainerEl = document.getElementById("posts-container");
const loadingEl = document.querySelector(".loader");
const filterEl = document.getElementById("filter");

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

// Show posts in DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>
    `;

    postsContainerEl.appendChild(postEl);
  });
}

// Show loader & fetch more posts
function showLoading() {
  loadingEl.classList.add("show");

  setTimeout(() => {
    loadingEl.classList.remove("show");

    setTimeout(() => {
      page += 1;

      showPosts();
    }, 300);
  }, 1000);
}

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const postEls = document.querySelectorAll(".post");

  postEls.forEach((postEl) => {
    const title = postEl.querySelector(".post-title").innerText.toUpperCase();
    const body = postEl.querySelector(".post-body").innerText;

    ~title.indexOf(term) || ~body.indexOf(term)
      ? (postEl.style.display = "flex")
      : (postEl.style.display = "none");
  });
}

// Show initial posts
showPosts();

// @see
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 3) {
    showLoading();
  }
});

filterEl.addEventListener("input", filterPosts);
