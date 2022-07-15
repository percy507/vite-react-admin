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

export function copyText(str) {
  if (!document.queryCommandSupported('copy')) {
    throw new Error('document.execCommand method not support copy command');
  }
  let input = document.createElement('input');
  input.style.cssText = `display: block;
                         position: fixed;
                         left: -10000px;
                         z-index: -1;
                         width: 10px;
                         height: 10px;
                         opacity: 0;`;
  document.body.appendChild(input);
  input.value = str;
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}
