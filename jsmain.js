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

// 鼠标跟随小点动画
(function() {
  const canvas = document.getElementById('mouse-dots');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let mouse = { x: width/2, y: height/2 };
  let dots = [];
  const DOTS_NUM = 18;
  const DOTS_SIZE = 6;
  const DOTS_COLOR = 'rgba(41,128,185,0.7)';

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < DOTS_NUM; i++) {
    dots.push({ x: mouse.x, y: mouse.y });
  }

  document.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);
    let x = mouse.x, y = mouse.y;
    dots.forEach((dot, i) => {
      dot.x += (x - dot.x) * 0.18;
      dot.y += (y - dot.y) * 0.18;
      x = dot.x;
      y = dot.y;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, DOTS_SIZE - i * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = DOTS_COLOR;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();
