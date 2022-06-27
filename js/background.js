const images = [
  "IMG_0924.jpeg",
  "IMG_1019.jpeg",
  "IMG_2095.jpeg",
  "IMG_2097.jpeg",
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage);
