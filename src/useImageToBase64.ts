import { isString } from './utils';

function useImageToBase64(url: string): Promise<string>;
function useImageToBase64(image: HTMLImageElement): string;

function useImageToBase64(
  params: string | HTMLImageElement
): Promise<string> | string {
  if (isString(params)) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.onload = () => {
        resolve(getImageBase64(image));
      };
      image.onerror = () => {
        reject(new Error('load err'));
      };
      image.src = params;
    });
  } else {
    return getImageBase64(params);
  }
}

function getImageBase64(image: HTMLImageElement): string {
  let canvas: HTMLCanvasElement | null = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  let ctx: any = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, image.width, image.height);
  let dataURL = canvas.toDataURL();
  canvas = null;
  return dataURL;
}

export default useImageToBase64;
