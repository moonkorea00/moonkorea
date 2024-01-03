import sharp from 'sharp';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { visit } from 'unist-util-visit';

export type ImageSizes = Record<
  string,
  { intrinsicWidth: number; intrinsicHeight: number }
>;

export const fetchImageMetadata = (src: string) => sharp(src).metadata();

export const extractIntrinsicImageSize = async (markdown: string) => {
  const tree = fromMarkdown(markdown);
  const imageSizes: ImageSizes = {};
  const imageSources: string[] = [];

  visit(tree, 'image', node => imageSources.push(node.url));

  const imageSizePromises = imageSources.map(async url => {
    const { width, height } = await fetchImageMetadata('public' + url);
    if (width && height) {
      imageSizes[url] = {
        intrinsicWidth: width,
        intrinsicHeight: height,
      };
    }
  });
  await Promise.all(imageSizePromises);

  return imageSizes;
};
