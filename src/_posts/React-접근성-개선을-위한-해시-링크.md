---
title: '접근성 개선을 위한 해시 링크'
category: '리액트'
excerpt: '웹 페이지에 방문했을 때 사용자는 통상적으로 문서 상단에 위치한 콘텐츠를 먼저 접하게 됩니다. 때로는 페이지의 특정 부분으로 이동해야 하는 경우가 필요한데요, 해시 링크를 사용하면 페이지의 특정 부분으로 바로 이동이 가능합니다.'
description: 'url에 콘텐츠 담기'
tags: '블로그, 개발 경험, 튜토리얼'
date: '2023-12-16'
---

웹 페이지에 방문했을 때 사용자는 통상적으로 문서 상단에 위치한 콘텐츠를 먼저 접하게 됩니다. 때로는 페이지의 특정 부분으로 이동해야 하는 경우가 필요한데요, 해시 링크를 사용하면 페이지의 특정 부분으로 바로 이동이 가능합니다. 특히 기술 문서나 기술 블로그처럼 구조화된 콘텐츠를 다룰 때 특정 섹션으로 직접 접근이 가능한 점, 스크린 리더에 의존하는 사용자들을 위해 접근성을 개선할 수 있는 점, 페이지의 특정 섹션을 url로 공유할 수 있는 점 등을 이유로 유용하게 사용됩니다. 

최근 제목과 부제목이 여러 개 있는 글을 쓰면서 독자에게 콘텐츠를 쉽게 파악하고 탐색할 수 있도록 목차와 해시 링크를 추가하게 되었는데요, 이번 글에서는 문서에 해시 링크를 생성하는 방법과 적용기에 대해 알아봅니다.

<br>

<div style="max-width:500px; margin: auto">

![해시 링크](/assets/markdown-image/React-해시-링크/해시-링크.png)

</div>

<span>1.1 해시 링크</span>

<br>

## 해시 링크

링크 태그의 href 속성에 해시 문자(#)와 함께 id값을 명시하면 브라우저는 해당 id를 갖는 요소의 위치로 페이지를 스크롤합니다.

```html
index.html
<a href="#section-id">특정 섹션으로 이동</a>

<h2 id="section-id">이동할 섹션</h2>
```

<iframe height="450" style="width: 100%;" scrolling="no" title="hash-link" src="https://codepen.io/moonkorea00/embed/abXrBEm?default-tab=result&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

<br>

## 블로그에 적용하기

본 블로그는 정적 사이트 생성기로 빌드 타임에 각 페이지를 생성하는데요, _posts 폴더에서 관리하는 마크다운 파일을 읽고 마크다운 파서로 콘텐츠를 화면에 그립니다.

```tsx
[postId].tsx
interface PostPageProps {
  content: string;
}

const PostPage = ({ content }: PostPageProps) => {
  return <Reactmarkdown components={}>{content}</Reactmarkdown>;
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<PostParams>) => {
  const { content } = await getPostById(params.postId);

  return {
    props: { content },
  };
};
```

```tsx
getPostById.tsx;
export const getPostById = async (id: string) => {
  const postsDir = join(process.cwd(), '/src/_posts');
  const filePath = join(postsDir, `${id}.md`);
  const metaData = fs.readFileSync(filePath, 'utf8');

  const { content } = matter(metaData);

  return {
    content,
  };
};
```

<br>

### 링크 컴포넌트 생성

React-markdown과 같은 마크다운 파서는 HTML 요소들을 커스텀 컴포넌트로 사용할 수 있게 지원하는데요, 해시 링크 컴포넌트를 각 heading 태그와 매핑되는 컴포넌트로 정의할 수 있어요.

```tsx
[postId].tsx
const PostPage = ({ content }: PostPageProps) => {
  const customComponents = {
    h1: props => <h1 {...props} />,
    h2: props => <h2 {...props} />,
    h3: props => {
      console.log('props : ', props);
      return <h3 {...props} />;
    },
  };
  return <Reactmarkdown components={customComponents}>{content}</Reactmarkdown>;
};
```

마크다운을 파싱하고 전달되는 props를 출력해 보면,

<br>

<div style="max-width:650px; margin: auto">

![마크다운 props](/assets/markdown-image/React-해시-링크/마크다운-props.png)

</div>

<span>1.2 heading 요소 props</span>

<br>

heading 요소가 h1, h2, h3, h4, h5, h6인지를 나타내는 **level**, 제목의 문자열인 **children** 그리고 요소에 대한 정보가 담긴 **node**가 반환됩니다. 앞서 요소를 해시 링크로 만들기 위해서는 id와 href 속성이 필요하다고 했는데요, level과 children을 가공해 id와 href로 사용해 보겠습니다.

children을 slug 형태인 문자열로 변환한 후 해시 링크의 id로 주고,

```tsx
[postId].tsx
const convertToSlug = (str: string) => {
  return decodeURI(str).toLowerCase().trim().replaceAll(' ', '-');
};
// ..
h1: ({ level, children }) => (
  <a id={convertToSlug(children.join())}>
    <h1>{children.join()}</h1>
  </a>
);
```

해시 문자를 추가해 href로 사용합니다.

```tsx
[postId].tsx;
h1: ({ level, children }) => (
  <a id={convertToSlug(children.join())} href={`#${children.join()}`}>
    <h1>{children.join()}</h1>
  </a>
);
```

각 h1, h2, h3와 매핑되는 해시 링크 컴포넌트를 아래와 같이 사용할 수 있는데요,

```tsx
[postId].tsx
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: string[];
}

const convertToSlug = (str: string) => {
  const slug = decodeURI(str).toLowerCase().trim().replaceAll(' ', '-');
  return slug;
};

const PostPage = ({ content }: PostPageProps) => {
  const customComponents = {
    h1: ({ children, ...rest }: HeadingProps) => (
      <a id={convertToSlug(children.join())} href={`#${children.join()}`}>
        <h1 {...rest}>{children.join()}</h1>
      </a>
    ),
    h2: ({ children, ...rest }: HeadingProps) => (
      <a id={convertToSlug(children.join())} href={`#${children.join()}`}>
        <h2 {...rest}>{children.join()}</h2>
      </a>
    ),
    h3: ({ children, ...rest }: HeadingProps) => (
      <a id={convertToSlug(children.join())} href={`#${children.join()}`}>
        <h3 {...rest}>{children.join()}</h3>
      </a>
    ),
  };
  return <Reactmarkdown components={customComponents}>{content}</Reactmarkdown>;
};
```

level과 props를 전달해 컴포넌트로 리팩토링할 수 있겠네요.

```tsx
[postId].tsx
const PostPage = ({ content }: PostPageProps) => {
  const customComponents = {
    h1: props => <HeadingComponent level={1} {...props} />,
    h2: props => <HeadingComponent level={2} {...props} />,
    h3: props => <HeadingComponent level={3} {...props} />,
    // h4 : ..
    // ..
  };

  return <Reactmarkdown components={customComponents}>{content}</Reactmarkdown>;
};
```

해시 링크를 추가하고 실행해 보면 다음과 같은데요,

<video url='/assets/markdown-image/React-해시-링크/링크-컴포넌트.webm' width='100%' height='auto'><video />

<span>1.3 해시 링크 적용</span>

<br>

### 스크롤 동작과 스크롤 위치 조정

해시 링크로 이동했을 때 다소 정적인 느낌이 있어서 페이지 내에서 부드럽게 이동하고 문서 상단의 header와 겹치지 않게 스크롤 위치를 조정해 보겠습니다.

```tsx
HeadingComponent.tsx
export const HeadingComponent = ({ level, children, ...props }) => {
  const content = children.join();
  const slug = convertToSlug(content);
  const Tag = `h${level}`;
  const hashLink = `#${slug}`;

  const onScrollWithOffset = e => {
    e.preventDefault();

    const elementWithHashLink = document.getElementById(slug); // 제목 요소
    if (elementWithHashLink) {
      const yOffset = -60; // 고정 offset 또는 동적으로 offset 계산
      const yPosition =
        elementWithHashLink.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };

  return (
    <a id={slug} href={hashLink} onClick={onScrollWithOffset}>
      <Tag {...props}>{content}</Tag>
    </a>
  );
};
```

<br>

<video url='/assets/markdown-image/React-해시-링크/링크-컴포넌트-스크롤.webm' width='100%' height='auto'><video />

<span>1.1 해시 링크 적용</span>

<br>

페이지의 특정 부분에 빠르게 접근하고 해당 섹션을 URL로 손쉽게 공유할 수 있도록 각 제목 요소에 해시 링크를 추가해 봤는데요, 페이지가 구조화된 콘텐츠로 구성된 경우 목차랑 같이 사용하면 더욱 사용자 친화적인 환경을 제공할 수 있습니다.

> 참고 : <a href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks#document_fragments" target="_blank" rel="noopener">Creating Hyperlinks - MDN</a>
