import * as p5 from 'p5';

function arrayShuffle<T>(array: T[]) {
  for (let i = array.length - 1; 0 < i; i--) {
    // 0〜(i+1)の範囲で値を取得
    const r = Math.floor(Math.random() * (i + 1));

    // 要素の並び替えを実行
    const tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}

const sketch = (p: p5) => {
  const animals = [
    "🙈",
    "🙉",
    "🙊",
    "🐵",
    "🦁",
    "🐯",
    "🐱",
    "🐶",
    "🐺",
    "🐻",
    "🐻‍❄️",
    "🐨",
    "🐼",
    "🐹",
    "🐭",
    "🐰",
    "🦊",
    "🦝",
    "🐮",
    "🐷",
    "🐽",
    "🐗",
    "🦓",
    "🦄",
    "🐴",
    "🐸",
    "🐲",
    "🦎",
    "🐉",
    "🦖",
    "🦕",
    "🐢",
    "🐊",
    "🐍",
    "🐁",
    "🐀",
    "🐇",
    "🐈",
    "🐈‍⬛",
    "🐩",
    "🐕",
    "🦮",
    "🐕‍🦺",
    "🐅",
    "🐆",
    "🐎",
    "🐖",
    "🐄",
    "🐂",
    "🐃",
    "🦬",
    "🐏",
    "🐑",
    "🐐",
    "🦌",
    "🦙",
    "🦥",
    "🦘",
    "🐘",
    "🦣",
    "🦏",
    "🦛",
    "🦒",
    "🐒",
    "🦍",
    "🦧",
    "🐪",
    "🐫",
    "🐿️",
    "🦫",
    "🦨",
    "🦡",
    "🦔",
    "🦦",
    "🦇",
    "🪶",
    "🦅",
    "🦉",
    "🐓",
    "🐔",
    "🐣",
    "🐤",
    "🐥",
    "🐦",
    "🦜",
    "🕊️",
    "🦤",
    "🦢",
    "🦩",
    "🦚",
    "🦃",
    "🦆",
    "🐧",
    "🦭",
    "🦈",
    "🐬",
    "🐋",
  ];
  let img: p5.Image;
  const canvasWidth = 768;
  const canvasHeight = 1024;
  let imageWidth: number;
  let imageHeight: number;
  let ratio: number;
  var fontSizeMax = 12;
  const fontSizeMin = 8;
  const spacing = 11; // line height
  const kerning = 0.2; // between letters
  let fontSizeStatic = false;
  let blackAndWhite = false;
  let font: p5.Font;

  p.preload = () => {
    img = p.loadImage(
      './assets/ak-tree.jpg'
    );

    p.loadFont('./assets/NotoEmoji-Bold.ttf', (f) => {
      font = f;
    });
  };

  p.setup = () => {
    ratio = Math.min(canvasWidth / img.width, canvasHeight / img.height);
    imageWidth = img.width * ratio;
    imageHeight = img.height * ratio;
    p.createCanvas(canvasWidth, canvasHeight);
    p.textFont(font);
    p.textAlign(p.LEFT, p.CENTER);
    p.print(img.width + ' ・ ' + img.height);
  };

  p.draw = () => {
    p.background(255);

    let x = 0;
    let y = 10;
    let counter = 0;

    img.loadPixels();

    while (y < p.height) {
      const imgX = p.round(p.map(x, 0, imageWidth, 0, img.width));
      const imgY = p.round(p.map(y, 0, imageHeight, 0, img.height));
      const c = p.color(img.get(imgX, imgY));
      const greyscale = p.round(
        p.red(c) * 0.222 + p.green(c) * 0.707 + p.blue(c) * 0.071
      );

      p.push();
      p.translate(x, y);

      if (fontSizeStatic) {
        p.textSize(fontSizeMax);
        if (blackAndWhite) {
          p.fill(greyscale);
        } else {
          p.fill(c);
        }
      } else {
        // greyscale to fontsize
        let fontSize = p.map(greyscale, 0, 255, fontSizeMax, fontSizeMin);
        fontSize = p.max(fontSize, 1);
        p.textSize(fontSize);
        if (blackAndWhite) {
          p.fill(0);
        } else {
          p.fill(c);
        }
      }

      const letter = animals[counter];
      p.text(letter, 0, 0);
      const letterWidth = p.textWidth(letter) + kerning;
      x += letterWidth;

      p.pop();

      // linebreaks
      if (x + letterWidth >= p.width) {
        x = 0;
        y += spacing;
      }

      counter++;
      if (counter >= animals.length) {
        counter = 0;
      }
    }

    p.noLoop();
  };
};

new p5(sketch);
