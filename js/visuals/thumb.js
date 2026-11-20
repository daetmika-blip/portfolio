/* draws the little chart picture on each card, different for each project */

function paintThumb(cv, seed) {
  const css = getComputedStyle(document.documentElement);
  const col = n => css.getPropertyValue(n).trim() || "#d6457e";
  const W = cv.width, H = cv.height, g = cv.getContext("2d");
  const rand = mulberry32(seed * 977 + 5);
  const main = [col("--a1"), col("--a2"), col("--a3"), col("--a4")];
  const c1 = main[Math.floor(rand() * 4)], c2 = main[Math.floor(rand() * 4)];

  g.fillStyle = col("--field"); g.fillRect(0, 0, W, H);

  // soft color glow
  const glow = g.createRadialGradient(W * (0.2 + rand() * 0.6), H * (0.1 + rand() * 0.4), 2, W * 0.5, H * 0.5, W * 0.75);
  glow.addColorStop(0, c1 + "66"); glow.addColorStop(1, "transparent");
  g.fillStyle = glow; g.fillRect(0, 0, W, H);

  // faint horizontal guide lines
  g.strokeStyle = col("--border"); g.lineWidth = 1;
  for (let i = 1; i < 4; i++) { const y = Math.round(H * i / 4) + 0.5; g.beginPath(); g.moveTo(4, y); g.lineTo(W - 4, y); g.stroke(); }

  // rounded bars
  const n = 7, gap = 3, bw = (W - 12 - gap * (n - 1)) / n;
  const tops = [];
  for (let i = 0; i < n; i++) {
    const h = H * (0.22 + rand() * 0.55), x = 6 + i * (bw + gap), y = H - 5 - h;
    g.fillStyle = (i % 2 ? c1 : c2) + "cc";
    g.beginPath(); g.roundRect ? g.roundRect(x, y, bw, h, 2) : g.rect(x, y, bw, h); g.fill();
    tops.push([x + bw / 2, y - 3]);
  }

  // trend line over the bars
  g.strokeStyle = col("--text"); g.globalAlpha = 0.55; g.lineWidth = Math.max(1.5, W / 60);
  g.beginPath(); tops.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]))); g.stroke();
  g.globalAlpha = 1;
}
