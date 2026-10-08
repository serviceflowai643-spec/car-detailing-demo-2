import { execSync } from 'child_process';
import fs from 'fs';

const input = 'src/assets/images/master_car_clean_1791442831136.jpg';
const output = 'src/assets/images/master_car_dirty_1791442831136.jpg';

// 1. Create a dull base of the car with reduced gloss highlights and slight haze
// modulate: brightness, saturation, hue
execSync(`convert "${input}" -modulate 90,70,100 -gamma 0.95 -level 5%,92% /tmp/car_dull.png`);

// 2. Generate procedural mud and road grime textures
// Heavy road grime gradient from bottom sills upward
execSync(`convert -size 1376x768 gradient:"#2a1e12-#00000000" -rotate 180 /tmp/grime_grad.png`);

// Heavy mud splatters pattern using plasma noise + threshold + blur
execSync(`convert -size 1376x768 plasma:fractal -colorspace Gray -contrast-stretch 10%x70% -threshold 65% -blur 0x1.5 /tmp/splatter_mask.png`);

// Combine splatter mask with brown mud color
execSync(`convert /tmp/splatter_mask.png \\( +clone -fill "#483624" -colorize 100% \\) -compose In -composite /tmp/mud_splatters.png`);

// Fine dirt & road dust film texture
execSync(`convert -size 1376x768 xc:gray +noise Multiplicative -colorspace Gray -modulate 100,0,100 -gamma 1.2 /tmp/dust_noise.png`);

// Water spots droplet mask
execSync(`convert -size 1376x768 xc:black +noise Random -threshold 98.8% -morphology Dilate Disk:3 -blur 0x1 /tmp/water_spots.png`);

// Create water spot stain overlay (chalky translucent ring effect)
execSync(`convert /tmp/water_spots.png \\( +clone -fill "#a89f91" -colorize 100% \\) -compose In -composite -matte -channel A -evaluate multiply 0.45 /tmp/water_spots_overlay.png`);

// 3. Composite everything together onto the car:
// - Start with dull car
// - Overlay dirt noise with opacity
// - Overlay mud splatters with opacity
// - Overlay bottom road spray with opacity
// - Overlay water spots on hood and windshield
execSync(`
convert /tmp/car_dull.png \\
  \\( /tmp/dust_noise.png -alpha set -channel A -evaluate multiply 0.15 \\) -compose HardLight -composite \\
  \\( /tmp/grime_grad.png -alpha set -channel A -evaluate multiply 0.65 \\) -compose Multiply -composite \\
  \\( /tmp/mud_splatters.png -alpha set -channel A -evaluate multiply 0.55 \\) -compose Over -composite \\
  \\( /tmp/water_spots_overlay.png \\) -compose Over -composite \\
  -quality 95 "${output}"
`);

console.log('Successfully generated dirty version from same source car:', output);
