import { execSync } from 'child_process';
import fs from 'fs';

const input = 'src/assets/images/master_car_clean_1791442831136.jpg';
const output = 'src/assets/images/master_car_dirty_1791442831136.jpg';

console.log('Generating heavy dirt and mud with native ImageMagick...');

// 1. Create a dull, hazy, oxidized base of the car with reduced gloss highlights
// Decrease saturation, decrease brightness slightly, add chalky contrast
execSync(`convert "${input}" -modulate 78,40,100 -level 10%,90% /tmp/car_dull.png`);

// 2. Road grime gradient: heavy dark brown from bottom up
execSync(`convert -size 1376x768 gradient:"rgba(45,30,18,0.92)-rgba(120,95,70,0.15)" -rotate 180 /tmp/grime_grad.png`);

// 3. Heavy mud splatter and dirt clumps using multi-frequency noise
execSync(`convert -size 1376x768 xc:black +noise Random -threshold 98.2% -morphology Dilate Disk:5 /tmp/big_mud_mask.png`);
execSync(`convert -size 1376x768 xc:black +noise Random -threshold 97.5% -morphology Dilate Disk:2 /tmp/med_mud_mask.png`);

// Colorize big mud clumps with dark wet mud color #362213
execSync(`convert /tmp/big_mud_mask.png \\( +clone -fill "#362213" -colorize 100% \\) -compose In -composite /tmp/big_mud.png`);

// Colorize medium mud clumps with dried brown mud color #5a3f28
execSync(`convert /tmp/med_mud_mask.png \\( +clone -fill "#5a3f28" -colorize 100% \\) -compose In -composite /tmp/med_mud.png`);

// 4. Generate water spots and chalky mineral etching
execSync(`convert -size 1376x768 xc:black +noise Random -threshold 98.9% -morphology EdgeIn Disk:2 /tmp/water_ring_mask.png`);
execSync(`convert /tmp/water_ring_mask.png \\( +clone -fill "#d4c8b6" -colorize 100% \\) -compose In -composite /tmp/water_spots.png`);

// 5. Generate fine road dust and salt haze
execSync(`convert -size 1376x768 xc:gray50 +noise Multiplicative -colorspace Gray -level 30%,70% /tmp/dust_film.png`);

// 6. Draw hundreds of heavy mud splatter dots across lower rocker panels and wheels
let drawCmds = [];
const rng = (seed) => {
  let s = seed % 2147483647;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};
const rand = rng(777);

for (let i = 0; i < 350; i++) {
  const x = 120 + rand() * 1150;
  const y = 380 + rand() * 320;
  const r = 2 + Math.pow(rand(), 2) * 16;
  const colors = ['#23160c', '#3c2715', '#4f351e', '#674729', '#7f5a35'];
  const c = colors[Math.floor(rand() * colors.length)];
  drawCmds.push(`fill "${c}" circle ${Math.round(x)},${Math.round(y)} ${Math.round(x + r)},${Math.round(y)}`);
}

// Wheel brake dust heavy dark spots
drawCmds.push(`fill "rgba(18,12,8,0.7)" circle 360,550 490,550`);
drawCmds.push(`fill "rgba(18,12,8,0.7)" circle 1020,540 1150,540`);

const drawFile = '/tmp/draw_cmds.txt';
fs.writeFileSync(drawFile, drawCmds.join(' '));

execSync(`convert -size 1376x768 xc:transparent -draw "@${drawFile}" -blur 0x1 /tmp/hand_splatters.png`);

// 7. Composite all layers onto the car
execSync(`
convert /tmp/car_dull.png \\
  \\( /tmp/dust_film.png -alpha set -channel A -evaluate multiply 0.28 \\) -compose Overlay -composite \\
  \\( /tmp/grime_grad.png -alpha set -channel A -evaluate multiply 0.72 \\) -compose Multiply -composite \\
  \\( /tmp/hand_splatters.png \\) -compose Over -composite \\
  \\( /tmp/big_mud.png -alpha set -channel A -evaluate multiply 0.85 \\) -compose Over -composite \\
  \\( /tmp/med_mud.png -alpha set -channel A -evaluate multiply 0.80 \\) -compose Over -composite \\
  \\( /tmp/water_spots.png -alpha set -channel A -evaluate multiply 0.70 \\) -compose Over -composite \\
  -quality 95 "${output}"
`);

console.log('Successfully created heavily stained dirty car image:', output);
