import sharp from "sharp";
import fs from "fs";
import path from "path";

const RAW = "/tmp/vsfit-raw";
const OUT = "/home/z/my-project/public/images";

const files = [
  "hero",
  "about-main",
  "about-portrait",
  "facility-strength",
  "facility-cardio",
  "facility-functional",
  "facility-freeweights",
  "gallery-1",
  "gallery-2",
  "gallery-3",
  "gallery-4",
  "gallery-5",
  "gallery-6",
  "og-image",
];

const maxWidth = 1920;

async function run() {
  for (const name of files) {
    const src = path.join(RAW, `${name}.png`);
    const dst = path.join(OUT, `${name}.jpg`);
    if (!fs.existsSync(src)) {
      console.error(`MISSING: ${src}`);
      continue;
    }
    const img = sharp(src);
    const meta = await img.metadata();
    await img
      .resize(meta.width && meta.width > maxWidth ? { width: maxWidth } : undefined)
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(dst);
    const kb = Math.round(fs.statSync(dst).size / 1024);
    console.log(`${name}.jpg  ${kb}KB`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
