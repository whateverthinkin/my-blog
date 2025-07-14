window.addEventListener('load', function() {
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
}); 