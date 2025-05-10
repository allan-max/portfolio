const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const numStars = 150;
const stars = [];

const cursor = { x: width / 2, y: height / 2 };

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.5 + 0.2,
  });
}

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

window.addEventListener("mousemove", e => {
  cursor.x = e.clientX;
  cursor.y = e.clientY;
});

function animate() {
  ctx.clearRect(0, 0, width, height);

  for (let star of stars) {
    const dx = star.x - cursor.x;
    const dy = star.y - cursor.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Se perto do cursor, afasta um pouco
    if (dist < 100) {
      const angle = Math.atan2(dy, dx);
      const move = (100 - dist) * 0.05;
      star.x += Math.cos(angle) * move;
      star.y += Math.sin(angle) * move;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();
