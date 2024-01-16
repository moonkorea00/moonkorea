---
title: '이미지 메타 정보로 레이아웃 변경 개선하기'
category: '리액트'
description: '사용자 상호작용이나 미디어 콘텐츠가 로드될 때 예기치 않게 레이아웃의 변경이 발생하는 경우가 있다. 이번 글에서는 이미지 크기를 서버에서 계산해 CLS(Cumulative Layout Shift)를 개선할 수 있는 방법에 대해 알아보겠다.'
excerpt: '서버에서 이미지 크기 내려주기'
tags: '블로그, Next.js, 성능, 개발 경험'
date: '2024-01-16'
---

<b>TL;DR</b>

- CLS는 레이아웃의 시각적 안정성을 측정하는 항목이다
- 레이아웃 변경은 일반적으로 크기가 제공되지 않는 이미지, iframe 등의 동적으로 렌더하는 콘텐츠에서 발생한다
- 서버에서 이미지 크기를 클라이언트에 제공해 레이아웃 변경을 개선할 수 있다

페이지의 서론을 읽다가 중간에 광고가 삽입되는 경우나 버튼을 클릭하려고 했는데 버튼의 위치가 이동하는 경우가 종종 발생한다. 일반적으로 사이트의 콘텐츠가 비동기로 로드되거나 DOM 요소가 동적으로 변경될 때 예기치 않게 레이아웃의 변경이 발생한다.

<div style="min-height:300px;">

<video url='/assets/markdown-image/이미지-메타-정보로-CLS-개선/cls-example.webm' width='100%' height='300px'></video>

</div>

<span>1.1 레이아웃 변경, https://web.dev/articles/cls?hl=ko#user-initiated_layout_shifts</span>

CLS(Cumulative Layout Shift)는 이 레이아웃의 변경을 점수로 환산한 값인데 이전 렌더 프레임에서 다음 렌더 프레임으로 위치가 이동할 때마다 측정되는 값은 커진다. 코어 웹 바이탈의 LCP, FID와 다르게 CLS는 측정된 시간을 기준으로 평가하는 항목이 아닌 레이아웃의 이동 정도를 기준으로 시각적 안정성을 평가하는 항목이다.

<div style="max-width:300px; margin: auto">

![누적 레이아웃 변경(CLS)](/assets/markdown-image/이미지-메타-정보로-CLS-개선/cls점수.webp)

</div>

<span>1.2 점수가 낮을수록(레이아웃 변경이 적을 수록) GOOD, https://www.corewebvitals.io/core-web-vitals/cumulative-layout-shift</span>

> 페이지 초기 렌더 이후에도 레이아웃 변경은 흔히 발생하기 때문에 모든 형태의 레이아웃 변경이 나쁜 것은 아니다. 예를 들어 사용자 상호 작용으로 발생한 0.5초 이내의 레이아웃 변경은 CLS 점수에서 제외된다.

일반적으로 CLS는 사용자 상호작용을 포함해 크기를 지정하지 않은 미디어 콘텐츠, 늦게 로딩되는 콘텐츠, 웹 폰트 등의 이유로 발생하는데 이미지의 경우 다양한 해결 방법이 있다.

1. 이미지의 크기 지정
2. 표시 영역 공간 확보
3. object-fit 등의 css

그 외에도 늦게 출력되는 콘텐츠를 최초 렌더 영역(페이지 상단)에 되도록이면 배치하지 않는 방법 등의 전략으로 레이아웃을 구축할 수 있다.

<br>

## 이미지 lazy loading으로 발생하는 CLS

본 블로그에는 페이지 하단의 댓글란으로 스크롤이 이동하는 버튼이 있다. 지정한 위치로 스크롤이 이동할 때 지연 로딩 처리된 이미지가 순차적으로 그려지게 되는데 화면에서의 이미지의 크기(render width)는 브라우저에 의해 계산되고 렌더 전까지는 공간이 비어 있거나 종횡비가 다른 높이를 갖게 된다. 즉, 로딩 시점에는 레이아웃의 변경이 발생해 의도한 DOM 요소 위치로 이동하지 않는다.

<video url='/assets/markdown-image/이미지-메타-정보로-CLS-개선/지연-로딩.webm' width='100%' height='auto'></video>

<span>1.3 레이아웃 변경으로 인한 잘못된 스크롤 위치</span>

이미지에 대한 요청이 빠르게 처리되면 의도한 대로 댓글 컴포넌트 위치로 가겠지만 이미지마다 용량이 다르고 응답이 빠르게 전달될 거란 보장이 없다. 또한 이미지를 감싸는 부모 요소나 반복적으로 출력되는 카드 컴포넌트의 경우 고정 높이와 너비를 줄 수 있지만 블로그 포스트나 기사와 같은 페이지에 출력되는 이미지는 각각의 렌더 크기가 달라 예약된 공간에 맞춰 출력하는 것도 적합하지 않다.

레이아웃 변경은 특정 DOM 위치로 스크롤이 이동하는 경우뿐만 아니라 사용자가 해시 링크를 타고 사이트에 방문했을 때도 시각적으로 불안정해 보일 수 있다.

<br>

## 서버에서 이미지 크기 내려주기

앞서 이미지의 실제 크기는 브라우저에 의해 계산된다고 했는데 출력된 이미지를 확인해 보면 브라우저에 그려진 실제 크기(render width), 전송된 이미지의 크기(intrinsic width) 그리고 종횡비(aspect ratio)를 확인할 수 있다.

<div style="max-width:700px; margin: auto">

![브라우저 이미지 크기](/assets/markdown-image/이미지-메타-정보로-CLS-개선/실제-이미지-크기.png)

</div>

<span>1.4 render size, intrinsic size, aspect ratio</span>

Next.js 기반의 yceffort님 블로그는 빌드 타임에 페이지를 만들고 이미지 노드들을 실제 이미지 크기로 <a href="https://github.com/yceffort/yceffort-blog-v2/blob/fd093125f2126ff33369aa7221b8044d327f5d92/src/utils/imageMetadata.ts#L31-L81" target="_blank" rel="noopener">업데이트</a>한다. 구체적으로 설명하자면 서버에서 마크다운 파서가 마크다운을 읽기 전에 각 이미지 크기를 추출해서 추상 구문의 이미지 노드들을 추출한 크기로 업데이트하는 흐름으로 동작한다. 같은 맥락에서 빌드 타임에 이미지 크기를 구해 브라우저에게 렌더 크기를 알려주면 레이아웃 변경 없이 콘텐츠를 그릴 수 있다.

본 블로그의 블로그 포스트는 마크다운으로 관리하고 있다. 마크다운으로 관리하지 않더라도 큰 틀에서는 다음과 같은 흐름으로 이미지 크기를 활용해 안정적인 레이아웃을 구축할 수 있다.

1. 사용되는 이미지(들) 파악
2. 이미지 메타 정보 추출
3. 컴포넌트에서 렌더 크기 정의

<br>

### 마크다운 추상 구문 생성

우선 마크다운에 어떤 이미지들이 있는지 파악하기 위해 마크다운 추상 구문을 생성해야 한다. 정규식으로도 이미지 태그들을 찾을 수도 있지만 수고와 안정성을 위해 추상 구문 생성기를 사용하겠다. 마크다운은 대략적으로 <a href="https://github.com/moonkorea00/moonkorea/blob/3179a18f153c6295b2158e828b50d8bc1fc6aa94/src/_posts/React-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EC%84%B1%EB%8A%A5-%EC%B8%A1%EC%A0%95%ED%95%98%EA%B3%A0-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0.md?plain=1" target="_blank" rel="noopener">이러한 형태</a>를 가지고 있다.

```ts
image.ts
import { fromMarkdown } from 'mdast-util-from-markdown';

const extractIntrinsicImageSize = async (markdown: string) => {
  const tree = fromMarkdown(markdown);
};
```

<br>

### 이미지 소스 URL 추출

반환된 트리를 순회하며 이미지 노드들의 소스 URL을 구한다. 이미지의 메타 정보를 추출하기 위해서는 이미지에 직접 접근해야 되기 때문이다.

```ts
image.ts
import { fromMarkdown } from 'mdast-util-from-markdown';
import { visit } from 'unist-util-visit';

const extractIntrinsicImageSize = async (markdown: string) => {
  const tree = fromMarkdown(markdown);
  const imageSources: string[] = [];

  visit(tree, 'image', node => imageSources.push(node.url));
};
```

URL들은 public 폴더나 다른 리모트 저장소에 따라 이런 형태를 가지고 있을 것이다.

```ts

console.log(imageSources);
// ['public/assets/markdown-image/blog-img1.png']
```

<br>

### 이미지 크기 추출

<a href="https://github.com/lovell/sharp" target="_blank" rel="noopener">sharp</a>는 이미지의 메타 정보를 반환한다. 그 외 <a href="https://github.com/image-size/image-size" target="_blank" rel="noopener">image-size</a>나 <a href="https://github.com/nodeca/probe-image-size" target="_blank" rel="noopener">probe-image-size</a>를 사용해 로컬 또는 리모트 저장소에 있는 이미지 크기를 추출할 수 있다. 프로젝트에는 이미 이미지 최적화를 위해 sharp가 설치돼있기 그대로 사용하겠다.

```ts
image.ts
interface Metadata {
  format?: 'avif' | 'png' | 'webp' | //.. ;
  size?: number;
  width?: number;
  height?: number;
  // ..
}

const fetchImageMetadata = (src: string): Promise<Metadata> => sharp(src).metadata();
```

메타 정보를 추출하는 과정은 의외로 간단하다. base64 형태의 이미지 placeholder를 생성해 주는 plaiceholder 라이브러리도 <a href="https://github.com/joe-bell/plaiceholder/blob/main/packages/plaiceholder/src/index.ts#L234-L242" target="_blank" rel="noopener">내부적으로 sharp를 사용해</a> 메타 정보를 추출한다.

소스 URL들을 순회하며 해당 이미지의 메타 정보를 병렬로 요청한다.

```ts
image.ts
type ImageSizes = Record<
  string,
  { intrinsicWidth: number; intrinsicHeight: number }
>;

const extractIntrinsicImageSize = async (markdown: string) => {
  const tree = fromMarkdown(markdown);
  const imageSizes: ImageSizes = {};
  const imageSources: string[] = [];

  visit(tree, 'image', node => imageSources.push(node.url));

  const imageSizePromises = imageSources.map(async url => {
    const { width, height } = await fetchImageMetadata(url);
    imageSizes[url] = {
      intrinsicWidth: width,
      intrinsicHeight: height,
    };
  });
  await Promise.all(imageSizePromises);

  return imageSizes;
};
```

imageSizes는 병렬 요청에 대한 반환값을 각 이미지 URL과 매핑한 객체이다.

```ts

console.log(imageSizes);
{
  'public/assets/markdown-image/blog-img1.png': {
    intrinsicWidth: 230,
    intrinsicHeight: 303,
  },
  'public/assets/markdown-image/blog-img2.png': {
    intrinsicWidth: 632,
    intrinsicHeight: 425,
  },
};
```

<br>

### 이미지 컴포넌트에서 사용

이미지가 어떤 종횡비와 크기로 브라우저에 출력돼야 할지를 파악했으니 이미지 컴포넌트에 해당 정보를 전달해 사용할 수 있다.

```tsx
[postId].tsx
const PostPage = ({ post, imageSizes }) => {
  const { content } = post;

  const markdownComponents = {
    img: props => {
      const { src, alt } = props;
      const { intrinsicWidth, intrinsicHeight } = imagesSizes[src];
      return (
        <Image
          src={src}
          alt={alt}
          width={intrinsicWidth}
          height={intrinsicHeight}
          // ..
        />
      );
    },
  };
  return (
    <Reactmarkdown components={markdownComponents}>{content}</Reactmarkdown>
  );
};

export default PostPage;

export const getStaticProps = async ({ params }) => {
  const post = await getPostById(params.postId);
  const imageSizes = await extractIntrinsicImageSize(post.content);
  return {
    props: { post, imageSizes },
  };
};
```

서버 사이드에서 이미지 크기를 미리 계산해 클라이언트에 알려주면 종횡비를 유지한 형태로 레이아웃 변경 없이 콘텐츠를 화면에 출력할 수 있다. 물론 srcset이나 sizes를 활용해 요청한 크기의 이미지 메타 정보를 받아올 수도 있다.

<br>

## 한계점

현재는 빌드 타임에 이미지 크기를 추출해 계산하고 있다. 만약 런타임에 요청해야 하는 경우 추가적인 비동기 요청이 발생해 콘텐츠 로딩 시간이 더 오래 걸릴 수 있다. 미디어 콘텐츠를 대량으로 보여줘야 하는 페이지의 경우 빌드 시간이 그만큼 커지기 때문에 다른 전략을 채택하는 것이 더 적합할 수도 있다.
