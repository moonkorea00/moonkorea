---
title: '클라이언트 관점에서 NextJS 빌드 리소스 살펴보기'
category: 'React'
excerpt: '앞서 NextJS 빌드 리소스 살펴보기 에서는 빌드 결과와 빌드 디렉토리에 어떤 파일들이 만들어졌는지 간략하게 알아봤습니다. 이어서 클라이언트 브라우저에서 어떤 리소스들이 응답으로 서빙되는지 살펴보겠습니다.'
description: '클라이언트는 Next 서버에서 어떤 리소스들을 응답으로 받는지 알아보기'
tags: 'NextJS, 서버 사이드 렌더링, 개발자 도구'
date: '2023-03-01'
---

# 클라이언트 관점에서 NextJS 빌드 리소스 살펴보기

> 본 블로그 포스트는 13.0.6버전의 내용을 담고 있습니다.

&emsp;앞서 <a href='https://www.moonkorea.dev/React-NextJS-빌드-리소스-살펴보기' target="_blank">NextJS 빌드 리소스 살펴보기</a>에서는 빌드 결과와 빌드 디렉토리에 어떤 파일들이 만들어졌는지 간략하게 알아봤습니다. 이어서 클라이언트 브라우저에서 어떤 리소스들이 응답으로 서빙되는지 살펴보겠습니다.

캐시를 지우고 메인 페이지의 서버 응답을 확인해 보겠습니다.

<img src="/assets/markdown-image/React-NextJS-빌드-리소스/initial-render.gif" alt="서버 응답" width="550" height="120">

<span>1.1 서버 응답</span>

서버에서는 HTML, 이미지 파일 등 몇 가지 스크립트를 보내주네요. 페이지 렌더에 필요한 클라이언트 사이드 코드인 것으로 보입니다.

먼저 HTML 응답을 확인해 보겠습니다.

<img src="/assets/markdown-image/React-NextJS-빌드-리소스/html-prerender.png" alt="HTML" width="550" height="100">
<img src="/assets/markdown-image/React-NextJS-빌드-리소스/html-prerender-response.png" alt="HTML" width="550" height="100">

<span>1.2 HTML</span>

서버 렌더링 단계에서 컴포넌트가 HTML로 렌더링 된 마크업으로 브라우저에 전달됐습니다.

클라이언트에게 전달된 첫 번째 스크립트인 웹팩 코드를 살펴보겠습니다. 앞서 서버에서 그려진 HTML이 클라이언트에게 전달된 후 브라우저는 웹팩 스크립트를 실행하면서 번들 manifest에 페이지와 매핑된 청크를 불러오고 실행한다고 했습니다. 직접 확인해 보니 페이지 라우트와 매핑된 자바스크립트 chunk를 가져오고 있네요.

> 해당 페이지의 청크가 로딩되면 런타임 코드는 해당 스크립트를 실행하고 동적으로 자바스크립트 객체를 생성합니다. 클라이언트는 넘겨받은 결과 HTML를 읽으며 이벤트 리스너가 달려야 하는 DOM위치를 찾아 'hydrate'된 컴포넌트로 페이지를 업데이트합니다.

<img src="/assets/markdown-image/React-NextJS-빌드-리소스/webpack-manifest(index).png" alt="페이지 chunk" width="550" height="80">

<img src="/assets/markdown-image/React-NextJS-빌드-리소스/browser-webpack-manifest(index).png" alt="페이지 chunk" width="550" height="120">

<span>1.3 페이지, chunk 매핑</span>

서버는 웹팩 런타임 코드 외에도 프레임워크 스크립트(framework.js)와 리액트 스크립트(main.js)도 응답에 실어서 보내네요. 전부 빌드 타임에 생성된 static 디렉토리에서 전송되고 있습니다.

<img src="/assets/markdown-image/React-NextJS-빌드-리소스/next-static.gif" alt="서버 응답" width="550" height="120">

<span>1.4 서버 응답</span>

우리가 따로 구현하지 않아도 라우팅, pre-fetching, 코드 스플리팅 등의 기능은 프레임워크 코드인 framework.js가 대신해주는 것으로 보입니다. main.js는 클라이언트에서 사용할 리액트 코드로 페이지의 컴포넌트를 렌더링하고 클라이언트 상태를 관리할 클라이언트 사이드 스크립트입니다. framework.js는 앱 전반에 사용될 공통 코드인 반면 main.js는 페이지 요청에 따라 새로운 스크립트로 서빙됩니다. 다만 NextJS의 디폴트 캐싱 설정으로 전부 브라우저 메모리에 저장되어 캐시로 재사용됩니다.

<img src="/assets/markdown-image/React-NextJS-빌드-리소스/default-cache-control.png" alt="캐싱" width="550" height="120">
<img src="/assets/markdown-image/React-NextJS-빌드-리소스/memory-cache.png" alt="캐싱" width="550" height="120">

<span>1.5 캐싱</span>

HTML과 클라이언트 스크립트뿐만 아니라 이미지 데이터도 응답에 포함돼있습니다.

<img src="/assets/markdown-image/React-NextJS-빌드-리소스/image-response.png" alt="webP 이미지" width="550" height="120">

<span>1.6 이미지 데이터</span>

이미지 데이터 또한 프레임워크가 기본으로 캐싱하고 webP 형식으로 변환해서 보내줬습니다.

서버에서 전달되는 핵심 리소스들을 몇 가지 살펴봤는데 페이지를 좀 더 탐험해 보겠습니다.

<img src="/assets/markdown-image/React-NextJS-빌드-리소스/link-pre-fetch.gif" alt="링크 pre-fetch" width="550" height="120">

<span>1.7 link pre-fetch</span>

스크롤을 내렸더니 json 데이터가 서버에서 전송됐네요. 최초 뷰포트에서는 없던 응답이 보내진 걸로 보아 위에서 살펴본 framework.js가 물밑에서 링크 pre-fetching을 지원해 주는 것으로 보입니다. 해당 JSON 응답을 살펴보니 페이지에 대한 메타 데이터로 이루어져 있네요.

> Link pre-fetching은 뷰포트 내 next/Link 컴포넌트를 찾아 백그라운드에서 해당 라우트의 페이지 데이터를 미리 요청해서 받아옵니다.

<img src="/assets/markdown-image/React-NextJS-빌드-리소스/json-cache.png" alt="json 캐시" width="550" height="120">

<span>1.8 캐싱</span>

NextJS의 기본 cache-control 값이 must-revalidate로 설정돼 있어서 커서를 링크에 올렸을 때 무조건 서버에 revalidate 요청을 보내네요. 링크를 타고 이동해 보겠습니다.

<img src="/assets/markdown-image/React-NextJS-빌드-리소스/page-route.gif" alt="페이지 라우트" width="550" height="120">

<span>1.9 페이지 이동</span>

[Tutorial-이메일-전송하기-nodemailer]의 slug를 가진 페이지입니다. 하지만 응답에는 앞서 인덱스 라우트에 접근했을 때 서버에서 받은 클라이언트 사이드 리소스나 페이지와 매핑되는 자바스크립트 chunk가 없습니다. NextJS는 링크 pre-fetching을 통해서 next/Link 또는 next/Router로 이동한 경우 백그라운드에서 응답으로 받은 JSON 파일을 사용해 페이지를 그립니다. 따라서 최초 렌더에 전달받은 클라이언트 사이드 자바스크립트나 기타 정적 파일에 대한 추가 요청 없이 페이지를 그립니다.

심지어 페이지 메타 데이터가 브라우저 캐시에 저장돼서 재차 방문에는 캐시에서 불러와 사용되네요. 프레임워크가 서버에서 페이지를 만들어서 클라이언트에게 제공해 주는 최적화 작업들이 매우 인상적인 거 같습니다.

NextJS는 정적 리소스에 대한 응답을 기본으로 캐싱하지만 페이지 성격에 따라 추가 캐시 설정으로 서버에 revalidate 요청을 매번 보내지 않고 재사용 할 수 있을 것 같습니다.
