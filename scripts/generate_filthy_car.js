import { execSync } from 'child_process';
import fs from 'fs';

const input = 'src/assets/images/master_car_clean_1791442831136.jpg';
const output = 'src/assets/images/master_car_dirty_1791442831136.jpg';
const width = 1376;
const height = 768;

console.log('Generating heavy dirt, mud splatters, and stains...');

// 1. Create a dull, hazy, oxidized base of the car with reduced reflections
execSync(`convert "${input}" -modulate 85,55,100 -gamma 0.9 -contrast-stretch 2%x95% /tmp/car_base_dull.png`);

// 2. Generate a procedural SVG containing realistic heavy mud splatters, drip streaks, brake dust, and water spots
const seedRandom = (seed) => {
  let s = seed % 2147483647;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const rng = seedRandom(42);

let svgElements = [];

// A. Road grime gradient covering lower 60% of the vehicle
svgElements.push(`
  <defs>
    <linearGradient id="roadGrime" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3d2a1b" stop-opacity="0" />
      <stop offset="45%" stop-color="#44301e" stop-opacity="0.35" />
      <stop offset="70%" stop-color="#382517" stop-opacity="0.65" />
      <stop offset="100%" stop-color="#24170d" stop-opacity="0.90" />
    </linearGradient>
    <linearGradient id="dustHaze" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a89a88" stop-opacity="0.20" />
      <stop offset="50%" stop-color="#73624e" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#3d2d1d" stop-opacity="0.4" />
    </linearGradient>
    <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" />
    </filter>
  </defs>
  <!-- General road dust film -->
  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#dustHaze)" />
  <!-- Lower body heavy road grime -->
  <rect x="0" y="${height * 0.35}" width="${width}" height="${height * 0.65}" fill="url(#roadGrime)" />
`);

// B. Front and Rear Wheel Brake Dust Grime (wheels are roughly at x: 260-460 and x: 920-1140, y: 440-660)
svgElements.push(`
  <!-- Front Wheel Brake Dust -->
  <ellipse cx="360" cy="550" rx="140" ry="130" fill="#18120d" opacity="0.68" filter="url(#blurFilter)" />
  <!-- Rear Wheel Brake Dust -->
  <ellipse cx="1020" cy="540" rx="150" ry="140" fill="#18120d" opacity="0.65" filter="url(#blurFilter)" />
`);

// C. Heavy mud splatters (clumps, droplets, spray arcs)
const mudColors = ['#23160b', '#3b2614', '#4e341c', '#604325', '#785633', '#8f6840'];

// Cluster 1: Front bumper and front wheel arch (X: 150-480, Y: 400-680)
for (let i = 0; i < 240; i++) {
  const cx = 150 + rng() * 340;
  const cy = 380 + rng() * 290;
  const r = 1.5 + Math.pow(rng(), 2.5) * 26;
  const col = mudColors[Math.floor(rng() * mudColors.length)];
  const opacity = (0.55 + rng() * 0.4).toFixed(2);
  svgElements.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${col}" opacity="${opacity}" />`);
  
  // Splatter satellite drops
  if (r > 8) {
    for (let s = 0; s < 4; s++) {
      const angle = rng() * Math.PI * 2;
      const dist = r + 4 + rng() * 18;
      const sx = cx + Math.cos(angle) * dist;
      const sy = cy + Math.sin(angle) * dist;
      const sr = 1 + rng() * 4;
      svgElements.push(`<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${sr.toFixed(1)}" fill="${col}" opacity="${opacity}" />`);
    }
  }
}

// Cluster 2: Lower door rocker panels and sill (X: 450-950, Y: 460-690)
for (let i = 0; i < 320; i++) {
  const cx = 420 + rng() * 540;
  const cy = 440 + rng() * 240;
  const r = 1.5 + Math.pow(rng(), 2) * 24;
  const col = mudColors[Math.floor(rng() * mudColors.length)];
  const opacity = (0.6 + rng() * 0.38).toFixed(2);
  svgElements.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${col}" opacity="${opacity}" />`);

  if (r > 6) {
    for (let s = 0; s < 3; s++) {
      const angle = rng() * Math.PI * 2;
      const dist = r + 3 + rng() * 14;
      const sx = cx + Math.cos(angle) * dist;
      const sy = cy + Math.sin(angle) * dist;
      const sr = 1 + rng() * 3.5;
      svgElements.push(`<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${sr.toFixed(1)}" fill="${col}" opacity="${opacity}" />`);
    }
  }
}

// Cluster 3: Rear quarter panel and wheel arch (X: 920-1250, Y: 400-680)
for (let i = 0; i < 240; i++) {
  const cx = 920 + rng() * 320;
  const cy = 390 + rng() * 280;
  const r = 1.5 + Math.pow(rng(), 2) * 25;
  const col = mudColors[Math.floor(rng() * mudColors.length)];
  const opacity = (0.55 + rng() * 0.4).toFixed(2);
  svgElements.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${col}" opacity="${opacity}" />`);

  if (r > 8) {
    for (let s = 0; s < 4; s++) {
      const angle = rng() * Math.PI * 2;
      const dist = r + 4 + rng() * 16;
      const sx = cx + Math.cos(angle) * dist;
      const sy = cy + Math.sin(angle) * dist;
      const sr = 1 + rng() * 4;
      svgElements.push(`<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${sr.toFixed(1)}" fill="${col}" opacity="${opacity}" />`);
    }
  }
}

// D. Mud spray streaks (slanted upward road spray marks)
for (let i = 0; i < 35; i++) {
  const x1 = 200 + rng() * 950;
  const y1 = 580 + rng() * 110;
  const length = 25 + rng() * 75;
  const angle = -0.3 - rng() * 0.4; // slanted spray direction
  const x2 = x1 + Math.cos(angle) * length;
  const y2 = y1 + Math.sin(angle) * length;
  const strokeWidth = 2 + rng() * 6;
  const col = mudColors[Math.floor(rng() * mudColors.length)];
  const opacity = (0.45 + rng() * 0.45).toFixed(2);
  svgElements.push(`
    <line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${col}" stroke-width="${strokeWidth.toFixed(1)}" stroke-linecap="round" opacity="${opacity}" />
  `);
}

// E. Water droplet rings & rain spots on hood, windshield, and roof (X: 250-1150, Y: 220-480)
for (let i = 0; i < 180; i++) {
  const cx = 250 + rng() * 880;
  const cy = 210 + rng() * 260;
  const r = 3 + rng() * 12;
  const ringCol = '#d1c7b8';
  const opacity = (0.35 + rng() * 0.4).toFixed(2);
  svgElements.push(`
    <!-- Water spot ring -->
    <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="#c2b49e" fill-opacity="${(opacity * 0.25).toFixed(2)}" stroke="${ringCol}" stroke-width="1.6" opacity="${opacity}" />
  `);
}

// F. Vertical water runoff dirt streaks from mirrors and door handles
const streakXs = [420, 520, 610, 690, 780, 860];
streakXs.forEach((sx) => {
  const yStart = 380 + rng() * 40;
  const length = 60 + rng() * 120;
  svgElements.push(`
    <line x1="${sx}" y1="${yStart}" x2="${sx + (rng() * 4 - 2)}" y2="${yStart + length}" stroke="#3d2c1c" stroke-width="3" stroke-linecap="round" opacity="0.55" />
    <line x1="${sx + 2}" y1="${yStart + 5}" x2="${sx + 2}" y2="${yStart + length - 15}" stroke="#523b26" stroke-width="1.8" stroke-linecap="round" opacity="0.45" />
  `);
});

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  ${svgElements.join('\n')}
</svg>
`;

fs.writeFileSync('/tmp/dirty_overlay.svg', svgContent);

// 3. Render SVG overlay to PNG
execSync(`convert -background transparent /tmp/dirty_overlay.svg /tmp/dirty_overlay.png`);

// 4. Composite the dirty overlay with the dull car base image
execSync(`
convert /tmp/car_base_dull.png /tmp/dirty_overlay.png -compose Over -composite -quality 95 "${output}"
`);

console.log('Successfully created heavily stained and muddy car image:', output);
