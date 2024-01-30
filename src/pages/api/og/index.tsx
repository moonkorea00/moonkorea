import type { NextRequest } from 'next/server';

import { ImageResponse } from 'next/og';

import OpenGraphComponent from '@components/common/OpenGraph/OpenGraph';

export const runtime = 'edge';

export const contentType = 'image/png';
export const alt = 'moonkorea';
export const size = {
  width: 1200,
  height: 630,
};

const generateOpenGraphImage = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title');
    const type = searchParams.get('type');

    const font = await fetch(
      new URL('public/assets/fonts/Pretendard-ExtraBold.woff', import.meta.url)
    );
    const fontData = await font.arrayBuffer();

    return new ImageResponse(<OpenGraphComponent title={title} type={type} />, {
      ...size,
      fonts: [
        {
          name: 'Pretendard',
          data: fontData,
          style: 'normal',
          weight: 900,
        },
      ],
    });
  } catch (err) {
    console.log('Failed to generate og image : ', err);
    return new Response(`Failed to generate og image.`, {
      status: 500,
    });
  }
};

export default generateOpenGraphImage;
