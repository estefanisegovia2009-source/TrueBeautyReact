export function resolveImage(image) {
  if (!image) {
    return "/images/placeholder-product.svg";
  }

  if (
    /^(https?:|data:|blob:)/i.test(
      image
    )
  ) {
    return image;
  }

  if (image.startsWith("/")) {
    return image;
  }

  const filename =
    image
      .split(/[\\/]/)
      .pop();

  return `/images/${filename}`;
}