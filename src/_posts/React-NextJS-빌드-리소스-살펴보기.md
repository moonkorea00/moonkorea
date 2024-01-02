---
title: 'Next.js의 빌드 리소스 살펴보기'
category: '리액트'
excerpt: 'NextJS에서는 서버 사이드 렌더 전략에 따라 리소스가 빌드타임에 생성된 정적 파일로 클라이언트에게 제공되거나 매 요청마다 서버에서 생성되어 클라이언트에게 전달됩니다. NextJS에서 빌드 시에 생성되는 이 리소스들에 대해 살펴보고 이 리소스들이 서버로부터 클라이언트 브라우저에게 어느 시점 전달되어 사용되는지 알아보겠습니다.'
description: 'next build로 생성된 빌드 폴더 훑어보기'
tags: 'React.js, Next.js, 블로그'
date: '2023-02-28'
---

> 본 블로그 포스트는 13.0.6버전의 내용을 담고 있습니다.

&emsp;Next.js는 서버 사이드 렌더 전략에 따라 리소스가 빌드 타임에 생성된 정적 파일로 제공되거나 매 요청마다 서버에서 생성되어 클라이언트에게 전달됩니다. 빌드 타임에 생성되는 리소스들에 대해 살펴보고 이 리소스들이 서버로부터 클라이언트에게 어느 시점 전달되어 어떻게 사용되는지 간략하게 알아보겠습니다.

## 빌드

현재 읽고 있는 블로그의 소스코드가 업로드된 레포로 빌드 디렉토리를 만들어보겠습니다.

```shell
shell
npm run build
```

<!-- <img src="/assets/markdown-image/React-NextJS-빌드-리소스/build-output.png" alt="NextJS 빌드" width="560" height="330"> -->
<div style="max-width:560px; margin: auto">

![asdf](/assets/markdown-image/React-NextJS-빌드-리소스/build-output.png)

</div>

<span>1.1 빌드 결과</span>

&emsp;빌드 폴더를 살펴보기 전 터미널에 각 라우트에 대한 정보가 출력됐네요. 빌드 결과를 살펴보겠습니다. 빌드 결과는 세 개의 테이블로 구성돼 있습니다 : <b>Route (pages), Size, First Load JS</b>. Route와 Size는 이름이 직관적이네요. Route는 각 페이지 라우트를, Size는 각 페이지에서만 사용되는 자바스크립트 번들의 크기를 나타냅니다.

> <b>Route</b> : 동적 라우트를 포함한 페이지의 라우트
>
> <b>Size</b> : 클라이언트 브라우저에서 페이지에 접근했을 때 필요한 자바스크립트 번들의 크기
>
> <b>First Load JS</b> : 각 페이지마다 필요한 자바스크립트 번들 크기 + Fist Load JS shared by all(앱 전반에 사용되는 공용 코드, 프레임워크 코드, 웹팩 코드, CSS 등)의 크기

First Load JS테이블은 리소스의 크기가 더 큰 것으로 보아 다양한 번들이 포함돼 있는 것으로 보입니다. First Load JS는 각 페이지가 필요로 하는 자바스크립트 번들과 앱 전반에 사용되는 코드인 First Load JS shared by all 번들들을 포함합니다. 앱 전반에 사용되는 공용 코드면 \_app.js 파일이 될 수 있겠네요. \_app.js는 서버로 요청이 들어왔을 때 가장 먼저 실행되는 공통 컴포넌트기 때문에 First Load JS shared by all의 크기랑도 같네요.

각 테이블이 의마하는 바를 살펴봤으니 범례(λ, ○, ●)랑 같이 페이지 별로 살펴보겠습니다. 메인 페이지와 동적 라우트를 사용하는 페이지는 getStaticProps로 페이지를 그려서 ● 로 표기가 됐습니다. 404 페이지는 ○ 로 표기된 걸로 보아 외부 데이터를 사용하지 않고 정적 HTML로 빌드 된 걸로 보입니다. API Route로 만들어진 API 엔드포인트는 서버 사이드 번들로 간주되어 λ 범례로 구분되었네요.

<!-- How is First Load JS calculated -->
<!-- https://stackoverflow.com/questions/71323979/what-does-first-load-js-in-next-bundle-analyzer-actually-measure -->

<br>

## .next 폴더

다음으로 폴더 루트에 생성된 빌드 폴더를 살펴보겠습니다.

<!-- <img src="/assets/markdown-image/React-NextJS-빌드-리소스/build-directory.png" alt="빌드 폴더" width="400" height="100"> -->

<div style="max-width:400px; margin: auto">

![dw](/assets/markdown-image/React-NextJS-빌드-리소스/build-directory.png)

</div>

<span>1.2 빌드 폴더</span>

최상위 디렉토리에 <b>.next</b>라는 디렉토리가 만들어졌습니다. next build는 Next 서버에 올라갈 정적 빌드 파일들을 생성합니다. 빌드 과정에서 NextJS는 웹팩을 통해서 최적화된 CSS 번들, 서버 사이드/클라이언트 사이드 자바스크립트 번들을 만듭니다. <b>cache, server, static</b> 등 이름이 직관적이어서 각각 캐시, 서버 리소스, 정적 리소스와 관련된 파일들이 관리되는 것 같습니다.

> NextJS build api로 생성된 표준 빌드 파일들은 기본적으로 다음과 같습니다 : HTML 파일, CSS 파일, 서버 사이드 Javascript, 클라이언트 사이드 Javascript.

<br>

### .next/cache 폴더

&emsp;먼저 순서대로 <b>.next/cache</b> 폴더부터 살펴보겠습니다. cache 폴더에는 빌드 캐시와 서버 사이드 렌더링 파일(이미지, 페이지 등)들의 캐시가 관리됩니다. 빌드 캐시는 추후 빌드 시에 재사용되기 때문에 일정 인터벌을 두고 매번 빌드를 요청하는 앱같은 경우 잘 활용하면 효율적으로 빌드 전략을 구축할 수 있을 거 같습니다.

<!-- <img src="/assets/markdown-image/React-NextJS-빌드-리소스/cache-folder.png" alt="cache 폴더" width="400" height="150"> -->

<div style="max-width:400px; margin: auto">

![asd](/assets/markdown-image/React-NextJS-빌드-리소스/cache-folder.png)

</div>

<span>1.3 .next/cache</span>

<br>

### .next/server 폴더

&emsp;<b>.next/server</b> 폴더에는 컴파일된 서버 사이드 코드, 즉 서버 사이드 렌더링, 라우팅, API 엔드포인트를 담당하는 서버 사이드 로직의 파일들로 구성돼 있습니다. 서버 사이드 코드는 Next 서버에서 페이지 콘텐츠를 그릴 pre-rendering에 사용됩니다. 따라서 클라이언트 브라우저로는 전송되지 않습니다.

<!-- <img src="/assets/markdown-image/React-NextJS-빌드-리소스/server-folder.png" alt="server 폴더" width="400" height="150"> -->

<div style="max-width:400px; margin: auto">

![dfv](/assets/markdown-image/React-NextJS-빌드-리소스/server-folder.png)

</div>

<span>1.4 .next/server</span>

해당 앱은 api route를 사용하고 있어서 api 폴더가 따로 만들어졌네요. 클라이언트에서 api가 호출되면 Next 서버는 해당 디렉토리에 있는 서버 사이드 코드를 실행해서 응답을 생성하는 것으로 보입니다.

폴더 루트에는 서버에서 요청 간에 다뤄질 미들웨어 로직이 담긴 자바스크립트와 자바스크립트 chunk의 로딩과 실행을 관리하는 웹팩 런타임 파일들도 생성됐네요.

<br>

### .next/static 폴더

&emsp;<b>.next/static</b> 폴더입니다. static 폴더는 앱에서 사용될 이미지, 폰트, CSS, 자바스크립트와 같은 정적 파일들로 구성돼 있습니다. 해당 리소스들은 빌드 타임에 이미지 최적화, 코드 스플리팅 등으로 다양한 최적화 작업을 거치게 됩니다.

- 이미지 최적화 : 이미지 리소스는 resize, compress 등 WebP와 같은 포맷으로 변환해서 저장됩니다.
- 코드 스플리팅 : 자바스크립트 코드는 빌드 타임에 작은 단위(chunk)로 나뉘어 번들링됩니다. 클라이언트에서 렌더링에 필요한 자원들을 그때그때 요청에 따라 받아서 사용합니다.

<!-- <img src="/assets/markdown-image/React-NextJS-빌드-리소스/static-folder.png" alt="static 폴더" width="400" height="100"> -->

<div style="max-width:400px; margin: auto">

![sd](/assets/markdown-image/React-NextJS-빌드-리소스/static-folder.png)

</div>

<span>1.5 .next/static</span>

위에 언급했듯 '서버 사이드 자바스크립트는 브라우저로 전송되지 않는다'라고 했는데 자바스크립트 코드가 클라이언트에게 전달되지 않으면 hydration은 어떻게 이루어질까요? 서버는 클라이언트에게 자바스크립트 코드를 전달합니다, 전달하지 않으면 페이지가 깡통이나 다름없으니까요. 다만 서버와 클라이언트에서 사용하는 자바스크립트는 구분이 되어 번들링됩니다. .next/server 폴더는 서버 사이드 Javascript 파일들을 관리하지만 .next/static 폴더는 클라이언트 사이드 Javascript 코드가 저장돼 있는 디렉토리입니다. 따라서 페이지 콘텐츠를 그릴 때 사용되는 서버 사이드 자바스크립트는 서버에서만 활용이 되고 클라이언트 브라우저는 페이지 콘텐츠와 함께 응답으로 받은 클라이언트 사이드 자바스크립트 chunk를 통해서 'hydrate'합니다.

&emsp;NextJS는 어떤 페이지에 어떤 자바스크립트 Chunk가 필요한지를 빌드 타임에 생성된 <b>build-manifest파일</b>을 통해서 파악합니다. 페이지 간 이동이 발생하면 NextJS는 manifest 파일에서 페이지와 매핑된 Chunk를 찾아 클라이언트에게 전달합니다. 웹팩 런타임 파일들은 manifest 파일에 의존해서 클라이언트 사이드에 자바스크립트 chunk를 로드하고 실행합니다.

<!-- <img src="/assets/markdown-image/React-NextJS-빌드-리소스/manifest-json.png" alt="build-manifest" width="400" height="100"> -->

<div style="max-width:400px; margin: auto">

![sdf](/assets/markdown-image/React-NextJS-빌드-리소스/manifest-json.png)

</div>

<span>1.6 build-manifest.json</span>

클라이언트는 웹팩 코드뿐만 아니라 static 폴더에서 프레임워크가 제공하는 기능들을 수행할 프레임워크 코드와 컴포넌트 렌더링에 사용될 리액트 코드를 서빙 받습니다.

빌드 타임에 어떤 파일들이 생성되었고 목적에 따라 어떻게 구분돼어 저장되는지 간략하게 알아봤는데 <a href='https://www.moonkorea.dev/React-클라이언트-관점에서-NextJS-빌드-리소스-살펴보기' target="_blank">이어지는 글</a>에서는 클라이언트 브라우저에서 어떤 리소스들이 응답으로 서빙되는지 살펴보겠습니다.
