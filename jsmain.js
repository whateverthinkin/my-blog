const postList = document.getElementById("post-list");
const content = document.getElementById("content");
const md = window.markdownit();

// 自动化文章管理：自动扫描 posts 文件夹下所有 .md 文件
async function fetchPostList() {
  // 假设有一个 posts.json 文件，实际生产环境需后端支持或构建时生成
  try {
    const res = await fetch('posts/posts.json');
    const list = await res.json();
    return list;
  } catch {
    // Fallback: 兼容本地开发环境，手动列举
    return [
      { title: "我的第一篇博客", file: "posts/first-post.md" },
      { title: "我的第二篇博客", file: "posts/Desert.md" }
    ];
  }
}

async function loadPostList() {
  const posts = await fetchPostList();
  postList.innerHTML = '';
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

window.addEventListener('load', function() {
  // 彩色丝滑鼠标跟随小点动画
  (function() {
    const canvas = document.getElementById('mouse-dots');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouse = { x: width/2, y: height/2 };
    let dots = [];
    const DOTS_NUM = 24;
    const DOTS_SIZE = 8;

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
      for (let i = 0; i < DOTS_NUM; i++) {
        const dot = dots[i];
        dot.x += (x - dot.x) * 0.18;
        dot.y += (y - dot.y) * 0.18;
        x = dot.x;
        y = dot.y;
        const hue = (i * 360 / DOTS_NUM + Date.now() / 20) % 360;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, DOTS_SIZE - i * 0.25, 0, Math.PI * 2);
        ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
        ctx.shadowBlur = 16;
        ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      requestAnimationFrame(draw);
    }
    draw();
  })();
});
