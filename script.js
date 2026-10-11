const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

const stars = [];
const clouds = [];

function drawEmoji(x, y, size, emoji, alpha = 1) {
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.globalAlpha = alpha;
  ctx.font = `${size}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
  ctx.fillText(emoji, x, y);
  ctx.restore();
}

function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

  stars.length = 0;
  clouds.length = 0;

  const starCount = Math.max(80, Math.floor(window.innerWidth / 12));
  const starEmoji = ['⭐', '✨', '🌟'];
  for (let i = 0; i < starCount; i += 1) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.6,
      size: 10 + Math.random() * 18,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.3 + 0.08,
      emoji: starEmoji[Math.floor(Math.random() * starEmoji.length)],
      phase: Math.random() * Math.PI * 2,
    });
  }

  const cloudEmoji = ['☁️', '⛅', '🌤️'];
  const cloudCount = 6;
  for (let i = 0; i < cloudCount; i += 1) {
    clouds.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.45,
      size: 22 + Math.random() * 36,
      speed: 0.12 + Math.random() * 0.18,
      alpha: 0.18 + Math.random() * 0.22,
      emoji: cloudEmoji[Math.floor(Math.random() * cloudEmoji.length)],
      phase: Math.random() * Math.PI * 2,
    });
  }
}

function drawBackground(time) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  const sky = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
  sky.addColorStop(0, '#7ecbff');
  sky.addColorStop(0.6, '#9bd7ff');
  sky.addColorStop(1, '#bfe7ff');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  const sunX = window.innerWidth * 0.85;
  const sunY = window.innerHeight * 0.18;
  const sunGlow = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 130);
  sunGlow.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  sunGlow.addColorStop(0.2, 'rgba(255, 212, 59, 0.85)');
  sunGlow.addColorStop(1, 'rgba(255, 212, 59, 0)');
  ctx.fillStyle = sunGlow;
  ctx.beginPath();
  ctx.arc(sunX, sunY, 130, 0, Math.PI * 2);
  ctx.fill();

  drawEmoji(sunX, sunY + 3, 54, '☀️', 0.92);

  for (const star of stars) {
    const twinkle = 0.6 + Math.sin(time * 0.0018 + star.phase) * 0.5;
    drawEmoji(star.x, star.y, star.size, star.emoji, star.alpha * twinkle);
  }

  for (const cloud of clouds) {
    const x = (cloud.x + time * cloud.speed * 0.03) % (window.innerWidth + 200) - 100;
    const y = cloud.y + Math.sin(time * 0.001 + cloud.phase) * 10;
    drawEmoji(x, y, cloud.size, cloud.emoji, cloud.alpha);
  }

  ctx.fillStyle = 'rgba(94, 168, 227, 0.18)';
  ctx.beginPath();
  ctx.moveTo(0, window.innerHeight * 0.82);
  for (let x = 0; x <= window.innerWidth; x += 60) {
    const y = window.innerHeight * 0.82 + Math.sin(x * 0.01 + time * 0.001) * 16;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(window.innerWidth, window.innerHeight);
  ctx.lineTo(0, window.innerHeight);
  ctx.closePath();
  ctx.fill();
}

function animate(time) {
  drawBackground(time);
  requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
requestAnimationFrame(animate);
