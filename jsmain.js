const postList = document.getElementById("post-list");
const content = document.getElementById("content");
const md = window.markdownit();

const posts = [
  { title: "第一次写博客", file: "posts/first-post.md" },
  { title: "另一个技术文章", file: "posts/another-post.md" }
];

function loadPostList() {
  for (let post of posts) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = post.title;
    a.href = `#${post.file}`;
    li.appendChild(a);
    postList.appendChild(li);
  }
}

function loadPostFromHash() {
  const hash = location.hash.slice(1); // 去掉 #
  if (!hash) return;

  fetch(hash)
    .then(res => res.text())
    .then(mdText => {
      content.innerHTML = md.render(mdText) + `<p><a href="index.html">← 返回首页</a></p>`;
    })
    .catch(() => {
      content.innerHTML = "<p>文章加载失败。</p>";
    });
}

window.addEventListener("hashchange", loadPostFromHash);
window.addEventListener("load", () => {
  if (location.hash) {
    loadPostFromHash();
  } else {
    loadPostList();
  }
});
