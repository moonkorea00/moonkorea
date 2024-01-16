import sharp from 'sharp';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { visit } from 'unist-util-visit';

export type ImageProps = Record<string, ImageData>;

interface ImageData {
  width: number;
  height: number;
  blurDataURL: string;
  priority: boolean;
}

// https://github.com/joe-bell/plaiceholder/blob/main/packages/plaiceholder/src/index.ts#L293-L304
const getBase64 = async (src: string) => {
  const { info, data } = await sharp(src)
    .resize(65)
    .blur()
    .toBuffer({ resolveWithObject: true });

  return `data:image/${info};base64,${data.toString('base64')}`;
};

export const processImage = async (
  src: string
): Promise<Omit<ImageData, 'priority'>> => {
  const { width, height } = await sharp(src).metadata();
  const blurDataURL = await getBase64(src);

  if (!width || !height) throw new Error('Failed processing image dimensions');

  return {
    width,
    height,
    blurDataURL,
  };
};

export const extractIntrinsicImageSize = async (markdown: string) => {
  const tree = fromMarkdown(markdown);
  const imageProps: ImageProps = {};
  const imageSources: string[] = [];

  visit(tree, 'image', node => imageSources.push(node.url));

  const imageSizePromises = imageSources.map(async (url, i) => {
    const { width, height, blurDataURL } = await processImage('public' + url);
    if (width && height) {
      imageProps[url] = {
        width,
        height,
        blurDataURL,
        priority: i === 0 ? true : false,
      };
    }
  });
  await Promise.all(imageSizePromises);

  return imageProps;
};
