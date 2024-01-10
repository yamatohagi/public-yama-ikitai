import {Area} from 'react-easy-crop';

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

export const getRadianAngle = (degreeValue: number) => (degreeValue * Math.PI) / 180;

export const rotateSize = (width: number, height: number, rotation: number) => {
  const rotRad = getRadianAngle(rotation);

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};

export const getCroppedImg = async (imageSrc: string, pixelCrop: Area, rotation: number, fileName: string): Promise<File> => {
  const image = await createImage(imageSrc);

  const canvas = document.createElement('canvas');
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(data, 0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x, 0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y);

  return new Promise((resolve) => {
    ctx.canvas.toBlob(
      (blob) => {
        const file = new File([blob as Blob], fileName, {
          type: 'image/jpg',
        });
        const resultReader = new FileReader();

        resultReader.readAsDataURL(file);

        resultReader.addEventListener('load', () => resolve(file));
      },
      'image/jpg',
      1
    );
  });
};
