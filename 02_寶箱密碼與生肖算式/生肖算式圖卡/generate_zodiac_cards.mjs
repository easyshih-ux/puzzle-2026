import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const artifactEntry = require.resolve("@oai/artifact-tool");
const { FileBlob, PresentationFile } = await import(pathToFileURL(artifactEntry));

const ROOT = path.resolve(import.meta.dirname, "../..");
const SOURCE_OUT = path.join(ROOT, "07_寶箱密碼與生肖算式", "生肖算式圖卡");
const OUT = path.join(ROOT, "07_寶箱密碼與生肖算式", "生肖算式圖卡_加大圖示版");
const ASSETS = path.join(SOURCE_OUT, "素材");
const SINGLE = path.join(OUT, "01_單題圖");
const GROUPS = path.join(OUT, "02_各組五題總表");
const SOURCE_PPTX = path.join(ROOT, "08_可編輯製作原稿", "言辵米、角刀牛 做圖.pptx");
const PIG_SOURCE = "C:/Users/easys/AppData/Local/Temp/codex-clipboard-cfb55131-0543-45b4-99ce-35523b49788d.png";

const animals = ["鼠", "牛", "虎", "兔", "龍", "蛇", "馬", "羊", "猴", "雞", "狗", "豬"];
const animalValues = Object.fromEntries(animals.map((animal, index) => [animal, index + 1]));
const clues = [
  ["馬²－牛÷鼠＋狗×豬", "猴²＋鼠×鼠－蛇÷鼠", "兔²－蛇÷鼠＋雞×蛇", "兔³÷鼠＋虎×兔－蛇", "（虎＋虎）²÷牛＋虎×猴"],
  ["（猴＋龍）²÷馬＋豬×兔", "羊²＋虎×牛－蛇÷蛇", "馬²－牛÷牛＋雞×虎", "龍²－兔÷牛＋兔×鼠", "馬²＋狗×兔－虎÷虎"],
  ["馬²＋馬×牛－豬÷虎", "狗²－蛇÷蛇＋龍×猴", "馬²－猴÷猴＋蛇×兔", "（羊＋羊）²÷牛＋馬×龍", "兔²－豬÷鼠＋豬×龍"],
  ["蛇²＋猴×虎－雞÷雞", "蛇³÷羊＋兔×龍－馬", "（兔＋虎）²÷馬＋牛×牛", "牛²－龍÷鼠＋猴×牛", "雞²＋蛇×虎－馬÷馬"],
  ["牛²＋兔×雞－龍÷鼠", "馬²－馬÷鼠＋雞×牛", "龍²＋兔×虎－牛÷牛", "豬²－兔÷兔＋龍×馬", "雞²－兔÷牛＋猴×兔"],
  ["牛²－狗÷鼠＋蛇×龍", "虎³÷虎＋馬×鼠－牛", "（兔＋牛）²÷牛＋猴×猴", "（龍＋狗）²÷兔＋雞×雞", "猴²－羊÷羊＋蛇×狗"],
  ["蛇²－羊÷兔＋兔×狗", "馬³÷馬＋鼠×豬－虎", "龍²＋兔×蛇－牛÷鼠", "（虎＋牛）²÷龍＋鼠×狗", "兔²－龍÷龍＋牛×羊"],
  ["蛇²－羊÷牛＋龍×蛇", "龍³－猴×龍＋雞÷龍", "牛³÷羊＋狗×狗－牛", "蛇³÷豬＋雞×龍－馬", "猴²＋馬×雞－兔÷牛"],
  ["（牛＋羊）²÷兔＋鼠×豬", "羊²－雞÷牛＋牛×馬", "牛²－猴÷鼠＋雞×兔", "（虎＋蛇）²÷猴＋蛇×兔", "虎²－馬÷馬＋羊×雞"],
  ["（龍＋兔）²÷虎＋雞×狗", "牛²＋龍×牛－羊÷牛", "（猴＋虎）²÷鼠＋馬×虎", "羊²＋狗×龍－猴÷虎", "虎²＋狗×馬－狗÷鼠"],
  ["牛³÷羊＋狗×狗－雞", "（虎＋虎）²÷蛇＋馬×牛", "虎³÷猴＋兔×豬－蛇", "龍²＋兔×龍－豬÷蛇", "（猴＋鼠）²÷龍＋牛×羊"],
  ["馬²－馬÷鼠＋牛×牛", "（虎＋豬）²÷虎＋蛇×鼠", "蛇²＋猴×鼠－豬÷虎", "羊²－羊÷鼠＋雞×羊", "雞²＋蛇×馬－猴÷鼠"],
  ["（牛＋羊）²÷雞＋牛×蛇", "兔³－馬×兔＋兔÷牛", "豬²＋豬×牛－羊÷兔", "猴²＋牛×鼠－馬÷馬", "兔³－鼠×兔＋虎÷虎"],
];

const clueLetters = ["A", "B", "C", "D", "E"];
const clueColors = ["#D93B45", "#E78324", "#C69A00", "#169C72", "#3156A3"];
const fontFamily = "Microsoft JhengHei, Noto Sans TC, Arial, sans-serif";

await Promise.all([ASSETS, SINGLE, GROUPS].map((dir) => fs.mkdir(dir, { recursive: true })));

function textSvg(text, width, height, fontSize, color = "#161616", weight = 700, anchor = "middle") {
  const x = anchor === "middle" ? width / 2 : anchor === "end" ? width - 2 : 2;
  const textAnchor = anchor === "middle" ? "middle" : anchor;
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text x="${x}" y="${height * 0.72}" text-anchor="${textAnchor}"
        font-family="${fontFamily}" font-size="${fontSize}" font-weight="${weight}" fill="${color}">${escapeXml(text)}</text>
    </svg>`);
}

function escapeXml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

async function extractIcons() {
  const presentation = await PresentationFile.importPptx(await FileBlob.load(SOURCE_PPTX));
  const slidePng = await presentation.slides.items[1].export({ format: "png" });
  const slideBytes = Buffer.from(await slidePng.arrayBuffer());
  await fs.writeFile(path.join(ASSETS, "生肖參考表.png"), slideBytes);

  const boxes = [
    [46.05, 24.07, 138.25, 132.92],
    [209.69, 24.07, 136.01, 133.04],
    [371.10, 24.05, 128.60, 133.04],
    [525.10, 24.02, 137.50, 133.04],
    [688.00, 24.00, 138.55, 133.04],
    [851.95, 23.98, 137.73, 133.04],
    [46.05, 256.88, 132.03, 133.04],
    [203.29, 256.88, 138.07, 133.04],
    [366.56, 256.88, 138.11, 133.04],
    [529.88, 256.88, 137.57, 133.04],
    [692.66, 256.88, 138.67, 133.04],
  ];
  for (let index = 0; index < boxes.length; index += 1) {
    const [x, y, w, h] = boxes[index];
    const padding = 8;
    const left = Math.max(0, Math.floor(x - padding));
    const top = Math.max(0, Math.floor(y - padding));
    const right = Math.min(1024, Math.ceil(x + w + padding));
    const bottom = Math.min(768, Math.ceil(y + h + padding));
    const icon = await sharp(slideBytes)
      .extract({ left, top, width: right - left, height: bottom - top })
      .resize(210, 210, { fit: "contain", background: "#FFFFFF" })
      .extend({ top: 15, bottom: 15, left: 15, right: 15, background: "#FFFFFF" })
      .png()
      .toBuffer();
    await fs.writeFile(path.join(ASSETS, `${String(index + 1).padStart(2, "0")}_${animals[index]}.png`), icon);
  }

  const pig = await sharp(PIG_SOURCE)
    .extract({ left: 990, top: 65, width: 326, height: 326 })
    .resize(210, 210, { fit: "contain", background: "#FFFFFF" })
    .extend({ top: 15, bottom: 15, left: 15, right: 15, background: "#FFFFFF" })
    .png()
    .toBuffer();
  await fs.writeFile(path.join(ASSETS, "12_豬.png"), pig);
}

async function loadIcons() {
  const result = {};
  for (const animal of animals) {
    const number = animalValues[animal];
    result[animal] = await fs.readFile(path.join(ASSETS, `${String(number).padStart(2, "0")}_${animal}.png`));
  }
  return result;
}

function tokenWidth(token) {
  if (animals.includes(token)) return 230;
  if (["＋", "－", "×", "÷"].includes(token)) return 68;
  if (["（", "）"].includes(token)) return 42;
  if (["²", "³"].includes(token)) return 34;
  return 48;
}

async function equationRow(expression, icons, width = 1800, height = 330) {
  const tokens = Array.from(expression);
  const totalWidth = tokens.reduce((sum, token) => sum + tokenWidth(token), 0);
  let x = Math.max(40, Math.round((width - totalWidth) / 2));
  const layers = [];
  for (const token of tokens) {
    const w = tokenWidth(token);
    if (animals.includes(token)) {
      const enlargedIcon = await sharp(icons[token])
        .trim({ background: "#FFFFFF", threshold: 12 })
        .resize(218, 218, { fit: "contain", background: "#FFFFFF" })
        .png()
        .toBuffer();
      layers.push({ input: enlargedIcon, left: x + 6, top: 48 });
    } else if (["²", "³"].includes(token)) {
      layers.push({ input: textSvg(token, w, 72, 56, "#111111", 700), left: x - 5, top: 24 });
    } else {
      const size = ["（", "）"].includes(token) ? 108 : 86;
      layers.push({ input: textSvg(token, w, 145, size, "#111111", 700), left: x, top: 76 });
    }
    x += w;
  }
  return sharp({ create: { width, height, channels: 4, background: "#FFFFFF" } }).composite(layers).png().toBuffer();
}

async function createSingleCard(groupNumber, clueIndex, expression, icons) {
  const width = 1800;
  const height = 520;
  const color = clueColors[clueIndex];
  const row = await equationRow(expression, icons, width, 320);
  const title = textSvg(`第 ${groupNumber} 組　線索 ${clueLetters[clueIndex]}`, 520, 76, 42, "#FFFFFF", 700);
  const exact = textSvg(expression, 1500, 58, 34, "#424242", 600);
  const base = sharp({ create: { width, height, channels: 4, background: "#FFFFFF" } });
  return base
    .composite([
      { input: Buffer.from(`<svg width="1800" height="520" xmlns="http://www.w3.org/2000/svg"><rect width="1800" height="520" rx="32" fill="#FFFFFF"/><rect width="1800" height="82" rx="32" fill="${color}"/><rect y="50" width="1800" height="32" fill="${color}"/><rect x="18" y="18" width="1764" height="484" rx="24" fill="none" stroke="${color}" stroke-width="4"/></svg>`) },
      { input: title, left: 54, top: 4 },
      { input: row, left: 0, top: 80 },
      { input: exact, left: 150, top: 424 },
    ])
    .png()
    .toBuffer();
}

async function createGroupSheet(groupNumber, cards) {
  const width = 1800;
  const height = 2920;
  const layers = [];
  cards.forEach((card, index) => layers.push({ input: card, left: 0, top: 190 + index * 535 }));
  const header = textSvg(`第 ${groupNumber} 組｜生肖密碼五道線索`, width, 116, 62, "#243B3B", 800);
  const note = textSvg("完成五題後，將五個答案加總，得到三位數寶箱密碼。", width, 74, 38, "#4A5C5C", 600);
  return sharp({ create: { width, height, channels: 4, background: "#F4F0E6" } })
    .composite([
      { input: header, left: 0, top: 20 },
      { input: note, left: 0, top: 112 },
      ...layers,
    ])
    .png()
    .toBuffer();
}

async function createReferenceSheet(icons) {
  const width = 1800;
  const height = 980;
  const layers = [
    { input: textSvg("十二生肖數值對照", width, 110, 62, "#243B3B", 800), left: 0, top: 20 },
    { input: textSvg("鼠＝1，依生肖順序排列至豬＝12", width, 65, 34, "#536565", 600), left: 0, top: 112 },
  ];
  for (let index = 0; index < animals.length; index += 1) {
    const col = index % 6;
    const row = Math.floor(index / 6);
    const left = 105 + col * 280;
    const top = 220 + row * 350;
    layers.push({ input: await sharp(icons[animals[index]]).resize(210, 210).png().toBuffer(), left, top });
    layers.push({ input: textSvg(`${animals[index]}＝${index + 1}`, 210, 70, 40, "#1B1B1B", 700), left, top: top + 220 });
  }
  return sharp({ create: { width, height, channels: 4, background: "#FFFFFF" } }).composite(layers).png().toBuffer();
}

if (process.argv.includes("--refresh-assets")) {
  await extractIcons();
}
const icons = await loadIcons();
const manifest = [];

for (let groupIndex = 0; groupIndex < clues.length; groupIndex += 1) {
  const groupNumber = groupIndex + 1;
  const cards = [];
  for (let clueIndex = 0; clueIndex < clues[groupIndex].length; clueIndex += 1) {
    const expression = clues[groupIndex][clueIndex];
    const card = await createSingleCard(groupNumber, clueIndex, expression, icons);
    cards.push(card);
    const filename = `第${String(groupNumber).padStart(2, "0")}組_線索${clueLetters[clueIndex]}.png`;
    await fs.writeFile(path.join(SINGLE, filename), card);
    manifest.push(`${filename}\t${expression}`);
  }
  const sheet = await createGroupSheet(groupNumber, cards);
  await fs.writeFile(path.join(GROUPS, `第${String(groupNumber).padStart(2, "0")}組_五題總表.png`), sheet);
}

await fs.writeFile(path.join(OUT, "生肖數值對照.png"), await createReferenceSheet(icons));
await fs.writeFile(path.join(OUT, "圖檔清單.txt"), `${manifest.join("\n")}\n`, "utf8");

const previewWidth = 360;
const previewHeight = 584;
const previewGap = 24;
const previewColumns = 4;
const previewRows = 4;
const previewLayers = [];
for (let index = 0; index < clues.length; index += 1) {
  const filename = `第${String(index + 1).padStart(2, "0")}組_五題總表.png`;
  const thumbnail = await sharp(path.join(GROUPS, filename))
    .resize(previewWidth, previewHeight, { fit: "contain", background: "#FFFFFF" })
    .png()
    .toBuffer();
  const col = index % previewColumns;
  const row = Math.floor(index / previewColumns);
  previewLayers.push({
    input: thumbnail,
    left: previewGap + col * (previewWidth + previewGap),
    top: previewGap + row * (previewHeight + previewGap),
  });
}
await sharp({
  create: {
    width: previewGap + previewColumns * (previewWidth + previewGap),
    height: previewGap + previewRows * (previewHeight + previewGap),
    channels: 4,
    background: "#E9E4D8",
  },
}).composite(previewLayers).png().toFile(path.join(OUT, "13組總覽預覽.png"));

console.log(`Generated ${manifest.length} individual cards and ${clues.length} group sheets in ${OUT}`);
