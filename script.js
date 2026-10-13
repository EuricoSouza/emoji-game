const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

const stars = [];
const clouds = [];

function drawEmoji(x, y, size, emoji, alpha = 1) {
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.globalAlpha = alpha;
  ctx.font = `${size}px "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
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
  const starEmoji = ['⭐', '🌟', '✳', '·', '✦', '✫', '*', '˚', '+', 
    '🟉', '🟄', '✴', '🟎' , '✹', '⚝','❂', '✨','💫','✸'];
  for (let i = 0; i < starCount; i += 1) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.6,
      size: 6 + Math.random() * 12,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.3 + 0.08,
      emoji: starEmoji[Math.floor(Math.random() * starEmoji.length)],
      phase: Math.random() * Math.PI * 2,
    });
  }

  const cloudEmoji = ['☁️', '☁', '🌧'];
  const cloudCount = 10;
  for (let i = 0; i < cloudCount; i += 1) {
    clouds.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.45,
      size: 36 + Math.random() * 44,
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
  sky.addColorStop(0, '#3e7ec9');
  sky.addColorStop(0.55, '#1f5597');
  sky.addColorStop(1, '#062a5f');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  const sunX = window.innerWidth * 0.85;
  const sunY = window.innerHeight * 0.18;
  const sunGlow = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 130);
  sunGlow.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  sunGlow.addColorStop(0.2, 'rgba(247, 213, 74, 0.8)');
  sunGlow.addColorStop(1, 'rgba(247, 213, 74, 0)');
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
function animateHeroCharacter() {
  const character = document.querySelector('.hero-mini');
  if (!character) return;

  const face = character.querySelector('.hero-head');
  const leftHand = character.querySelector('.hero-hand-left');
  const rightHand = character.querySelector('.hero-hand-right');
  const leftArm = character.querySelector('.hero-limb-left');
  const rightArm = character.querySelector('.hero-limb-right');
  const poses = [
    { face: '🙂', left: '🤛', right: '🤛', leftHandAngle: -22, rightHandAngle: -22, leftArmAngle: 42, rightArmAngle: -42 },
    { face: '😎', left: '✋', right: '👍', leftHandAngle: -38, rightHandAngle: 12, leftArmAngle: 52, rightArmAngle: -26 },
    { face: '😮', left: '🤚', right: '✌️', leftHandAngle: -5, rightHandAngle: 24, leftArmAngle: 28, rightArmAngle: -48 },
    { face: '😜', left: '👋', right: '🤟', leftHandAngle: -48, rightHandAngle: 36, leftArmAngle: 58, rightArmAngle: -56 },
    { face: '😍', left: '🤛', right: '✋', leftHandAngle: -16, rightHandAngle: 18, leftArmAngle: 36, rightArmAngle: -30 },
  ];
  let poseIndex = 0;

  function showNextPose() {
    const pose = poses[poseIndex];
    face.textContent = pose.face;
    leftHand.textContent = pose.left;
    rightHand.textContent = pose.right;
    leftHand.style.transform = `rotate(${pose.leftHandAngle}deg)`;
    rightHand.style.transform = `scaleX(-1) rotate(${pose.rightHandAngle}deg)`;
    leftArm.style.transform = `rotate(${pose.leftArmAngle}deg)`;
    rightArm.style.transform = `rotate(${pose.rightArmAngle}deg)`;
    poseIndex = (poseIndex + 1) % poses.length;
  }

  showNextPose();
  window.setInterval(showNextPose, 1800);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animateHeroCharacter();
requestAnimationFrame(animate);
