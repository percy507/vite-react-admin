/** 获取图片的实际尺寸比例 */
export function getImageAspect(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      const image = new Image();

      image.onload = () => {
        const width = image.width || image.naturalWidth;
        const height = image.height || image.naturalHeight;

        resolve(`${width}x${height}`);
      };

      image.src = data as string;
    };

    reader.readAsDataURL(file);
  });
}
