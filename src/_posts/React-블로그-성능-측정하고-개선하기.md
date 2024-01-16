---
title: '블로그 성능 측정하고 개선하기'
category: '리액트'
description: 'Next.js 프레임워크가 여러 도구와 기능들로 다양한 최적화 작업을 대신해 주지만 구글 lighthouse와 서버에서 넘어오는 리소스들을 살펴보면서 블로그의 성능을 개선할 수 있는 부분들을 살펴보겠습니다.'
excerpt: '구글 lighthouse의 평가 메트릭들을 보고 개선할 수 있는 부분 살펴보기'
tags: 'React.js, Next.js, 블로그, 개발 경험, 성능'
date: '2023-03-25'
---

> lighthouse는 로컬 브라우저 환경(브라우저 익스텐션 등)과 네트워크 상태에 따라 측정 결과가 다를 수 있습니다.

&emsp;Next.js 프레임워크가 여러 도구와 기능들로 다양한 최적화 작업을 대신해 주지만 구글 lighthouse와 서버에서 넘어오는 리소스들을 살펴보면서 블로그의 성능을 개선할 수 있는 부분들을 살펴보겠습니다.

## 정적 리소스

### 미디어 파일 크기

&#9432;&emsp;개선 사항 : 정적 파일 용량 축소

서버에서 gif 파일을 전달받는 블로그 포스트 페이지의 성능 섹션부터 확인해 보겠습니다. 개선 사항으로 비디오 포맷의 사용을 권장하고 있습니다.

<div style="max-width:550px; margin: auto">

![lighthouse 성능](/assets/markdown-image/React-블로그-성능-측정/performance.png)

</div>

<span>1.1 Performance</span>

페이지 로딩 속도만큼 중요한 것이 사용자가 콘텐츠를 보고 읽는 시점에 미디어 데이터가 매끄럽게 준비되는거라고 생각해요. 이미지같은 경우 리소스를 다운로드하기 전까지 placeholder로 대체할 수 있겠지만 화면에 보여지기까지 시간을 더 필요로하는 미디어 파일들의 경우(파일 크기에 따라 상이하겠지만) 화면에 원활하게 출력되기까지 몇 초 기다려야 하는 경우가 있었어요.

<div style="max-width:700px; margin: auto">

![gif 서버 응답](/assets/markdown-image/React-블로그-성능-측정/서버-응답.png)

</div>

<span>1.2 gif 다운로드 시간</span>

WebM 포맷은 gif보다 훨씬 적은 용량으로 여러 브라우저 환경에서도 호환이 가능한 미디어 파일 포맷입니다. readme를 작성할 때 gif를 애용해서 사용해왔던지라 앱에서의 성능 고려는 해보지 않았었는데 WebM 포맷으로 변환 전과 후로 서버에서 넘어오는 응답을 확인해 보면 다음과 같은데요,

<div style="max-width:700px; margin: auto">

![gif 응답](/assets/markdown-image/React-블로그-성능-측정/gif-assets.png)

</div>

<span>1.3 포맷 변환 전</span>

<div style="max-width:700px; margin: auto">

![webM 응답](/assets/markdown-image/React-블로그-성능-측정/webM-assets.png)

</div>

<span>1.4 포맷 변환 후</span>

응답을 살펴보니 변환 후 평균적으로 90% 내외로 용량 크기가 줄어들었고 응답 시간도 그에 따라 단축됐는데요, 데이터 사용량이 더 중요한 모바일 기기 사용까지 고려해 보면 mb단위의 용량 축소는 렌더링에 있어서 유의미한 개선 같습니다.

이미지 리소스의 경우 srcset과 sizes 속성으로 사용자 디바이스 해상도에 따라 이미지를 제공할 수 있는데요, 메인 콘텐츠의 렌더 영역이 고정된 너비를 갖기 때문에 원본 이미지를 그에 맞는 크기의 이미지로 제공할 수 있어요.

<div style="max-width:700px; margin: auto">

![이미지 용량 축소](/assets/markdown-image/React-블로그-성능-측정/sizes-적용-전.png)

</div>

<span>1.5 용량 개선 전</span>

<div style="max-width:700px; margin: auto">

![이미지 용량 축소](/assets/markdown-image/React-블로그-성능-측정/sizes-적용-후.png)

</div>

<span>1.6 용량 개선 후</span>

<br>

### 레이아웃 변경

&#9432;&emsp;개선 사항 : 이미지 레이아웃 변경 최소화

본 블로그에는 페이지 하단의 댓글란으로 스크롤이 이동하는 버튼이 있는데요, 지정한 위치로 스크롤이 이동할 때 지연 로딩 처리된 이미지가 순차적으로 로딩되면서 그려져요. 렌더 시점에는 레이아웃 변경이 발생해 CLS뿐만 아니라 해시 링크를 타고 온 사용자들에게도 시각적으로 안정적이지 못한 경험을 제공할 수 있어요. 화면에서의 이미지 크기(render width)는 브라우저에 의해 계산되고 렌더 전까지는 공간이 비어 있거나 종횡비가 다른 높이를 갖기 때문에 의도한 DOM 요소 위치로 이동하지 않아요.

<video url='/assets/markdown-image/이미지-메타-정보로-CLS-개선/지연-로딩.webm' width='100%' height='auto'></video>

<span>1.7 레이아웃 변경으로 잘못된 스크롤 위치</span>

모든 포스트는 빌드 타임에 생성하기 때문에 빌드 타임에 이미지 크기를 계산해 요청 시점과 렌더 시점 간 <a href="https://moonkorea.dev/" target="_blank" rel="noopener">레이아웃 변경을 최소화</a>할 수 있어요.

<video url='/assets/markdown-image/이미지-메타-정보로-CLS-개선/지연-로딩-개선.webm' width='100%' height='auto'></video>

<span>1.8 레이아웃 변경 개선 후</span>

<br>

## 접근성

&#9432;&emsp;개선 사항 : UI 색채 대비

<div style="max-width:500px; margin: auto">

![접근성](/assets/markdown-image/React-블로그-성능-측정/접근성.png)

</div>

<span>1.9 색 대비</span>

lighthouse는 접근성 측면에서 헤더의 텍스트 색이 배경색과 충분한 대비를 갖지 않는다고 판단하고 있습니다. 다만 디자인을 고려한 점과 시각적으로 3.99 : 1의 비율은 기준에 적합하다고 생각하기 때문에 수정을 반영하지 않고 유지해도 될 거 같습니다.

> WCAG (Web Content Accessibility Guidelines)은 모든 사용자에게 콘텐츠 접근성을 보장합니다. 가이드라인 기준에 부합하려면 4.5 : 1 이상의 색 대비가 필요합니다.

> 대비 비율은 <a href="https://webaim.org/resources/contrastchecker" target="_blank">여기서</a> 계산할 수 있습니다.

<br>

## 보안

&#9432;&emsp;개선 사항 : 외부 api 관련 로컬 쿠키 사용 이슈

<div style="max-width:500px; margin: auto">

![쿠키 이슈](/assets/markdown-image/React-블로그-성능-측정/쿠키-이슈.png)

</div>

<span>1.10 쿠키 관련 이슈</span>

본 블로그는 챗봇 시스템으로 <a href="https://channel.io/ko" target="_blank">채널톡</a>을 사용하고 있어요. 검사 결과 로컬 쿠키와 관련된 이슈가 출력됐는데 제품 팀에 문의해 보니 로컬 쿠키는 사용자 인증과 판별에만 사용되고 보안적으로는 문제가 되지 않는다는 답변을 받았어요. 출력된 이슈는 추측건대 쿠키가 자바스크립트로 조작이 가능해서 lighthouse에서 유의하고 인지하라는 정도로 생각돼요.

<div style="max-width:350px; margin: auto">

![채널톡](/assets/markdown-image/React-블로그-성능-측정/문의.png)

</div>

<span>1.11 쿠키 관련 이슈</span>

<br>

## 컴포넌트 지연 로딩

&#9432;&emsp;개선 사항 : 초기 렌더에 필요한 필수 데이터만 서버에 요청

블로그의 성격상 많은 양의 데이터가 오가거나 잦은 api 호출이 발생하진 않지만 페이지 초기 렌더 시 댓글 데이터에 대한 요청을 보내고 클라이언트 사이드에서 댓글 컴포넌트를 렌더하고 있어요. 하지만 방문자가 언제나 글을 처음부터 끝까지 읽는 것은 아니기 때문에 페이지 최하단에 위치한 댓글 컴포넌트를 필요한 경우에만 렌더하고 서버에 관련 데이터를 요청하는 것이 바람직해요. 따라서 페이지 로드나 데이터 사용량을 고려해서 글 최하단과 교차가 감지됐을 때만 서버에 요청을 보내고 댓글 컴포넌트를 출력하기로 했어요.

<video url="/assets/markdown-image/React-블로그-성능-측정/지연-로딩.webm"  width="100%" height="auto"><video />

<span>1.12 댓글 지연 로딩</span>

<br>

## SEO

<div style="max-width:130px; margin: auto">

![SEO](/assets/markdown-image/React-블로그-성능-측정/SEO.png)

</div>

<span>1.13 SEO</span>

Next.js가 지원하는 기능 중 몇 가지가 서버 사이드 렌더링과 검색 엔진 최적화에요. 코어 웹 바이탈 메트릭, 메타 태그, sitemap, 검색 콘솔 활용 등으로 검색 엔진이 인덱싱하고 크롤링 할 수 있게 신경을 썼는데 독자의 흥미를 돋우고 도움이 되는 양질의 글을 발행하는 것이 최선의 SEO 개선이라고 생각돼요.
