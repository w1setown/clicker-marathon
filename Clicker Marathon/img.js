export default function img(file) {
    const image = new Image();
    image.src = "img/" + file;
    return image;
  }
  