---
title: 'a 태그의 noreferrer, noopener, nofollow'
category: 'Browser'
excerpt: 'HTML의 a 태그는 링크를 만드는 데 주로 사용됩니다. rel 속성 값에 따라 보안에 미치는 영향과 검색 엔진이 링크를 읽는 방식, 그리고 언제 어떤 값을 사용해야 하는지에 알아보겠습니다.'
description: '언제 어떤 걸 써야 하나요?'
tags: '링크 태그, 보안, SEO'
date: '2023-05-18'
---

### TL;DR

- noreferrer: 트래픽 정보를 숨기고 싶어요.
- noopener: 피싱과 같은 악성 공격에 대비해서 보안에 신경 쓰고 싶어요.
- nofollow: 링크로만 활용하고 싶고 검색 엔진이 크롤링하지 않았으면 좋겠어요.

<br>

&emsp;HTML의 a 태그는 링크를 만드는 데 주로 사용됩니다. rel 속성의 noreferrer, noopener, nofollow가 어떤 역할을 하고 언제 사용할지에 대해 알아보겠습니다.

<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel" target="_blank" rel="noopener noreferrer">mdn</a>에 따르면 a 태그의 rel 속성은 HTML에서 두 문서 간의 관계를 명시할 때 사용합니다. 페이지의 구조와 내비게이션을 정의할 때 사용하는 "prev" 또는 "next", 중복 콘텐츠와 원본 페이지를 나타내는 "canonical" 등 rel 속성은 다양한 값을 가질 수 있고 이를 통해 링크의 동작과 의미를 나타낼 수 있습니다. 링크를 클릭해서 새 창이나 탭에서 페이지를 열 때는 "noreferrer"와 "noopener"의 값을 목적에 맞게 사용합니다.

## noreferrer

&emsp;noreferrer는 링크에 연결된 외부 페이지에게 사용자가 온 경로에 대한 정보를 마스킹 처리합니다. 페이지 A에서 B로 이동할 때 브라우저는 페이지 B의 페이지를 렌더링하고자 서버에 요청을 보내게 되는데 HTTP 요청 헤더에 리퍼러(referer) 정보를 포함해서 요청을 전송합니다. 이 때 리퍼러 정보는 이전 페이지의 url을 비롯한 정보를 말합니다. 페이지 B의 웹마스터는 통상 이러한 정보를 사용자 통계, 추적, 분석 등에 활용합니다.

<img src="/assets/markdown-image/Browser-a-태그의-a 태그의 noopener-noreferrer-nofollow/request-header.png" alt="HTTP 요청 헤더" width="500" height="500"/>

<span>1.1 HTTP 요청 헤더</span>

&emsp;링크를 클릭하고 요청 헤더를 확인해 보니 사용자가 어느 경로를(referer: http://localhost:3000/) 통해서 왔는지를 보여주네요. 하지만 리퍼러 정보는 사용자의 세션 ID나 개인정보가 포함될 수 있기 때문에 noreferrer를 사용해서 민감한 정보가 외부로 노출되지 않게 방지할 수 있습니다. 구글 애널리틱스와 연동이 돼있다면 애널리틱스는 noreferrer를 타고 온 사용자를 Direct 트래픽으로 인식해요, 즉 해당 사이트의 웹마스터는 사용자가 어느 링크 경로로 유입됐는지를 알 수 없어요.

## noopener

&emsp;noopener는 보안 목적으로 사용돼요. 사용자가 링크를 클릭해서 새 창이나 탭에서 열 때 window.opener 속성으로 원래 페이지에 부분적으로 접근할 수 있어요. 이때 피싱 공격으로 어떤 개인정보든 탈취해 갈 수 있기 때문에 링크를 noopener와 사용하면 자바스크립트 실행 문맥이 원래 페이지와 분리돼요. 과거 링크에 target="_blank"를 사용했을 때는 피싱 공격에 노출이 됐었는데 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/noopener" target="_blank" rel="noopener noreferrer">mdn</a>에 따르면 target="_blank" 사용 시 기본값으로 rel="noopener"가 같이 사용됩니다. 다만 모든 사용자가 최신 버전의 브라우저로 사이트에 방문하는 것은 아니기 때문에 링크에 추가적으로 noopener를 명시하는 것이 바람직합니다.

## nofollow

&emsp;nofollow는 noreferrer와 반대의 역할을 해요. 리퍼럴 트래픽 정보는 유지한 채 페이지 내 링크에 대한 검색엔진의 크롤링을 막아요. nofollow를 사용하면 검색 엔진 크롤러가 링크를 따라가지 않고 해당 링크를 통해 전달되는 페이지의 순위에도 영향을 주지 않습니다. 신뢰할 수 없는 링크, 댓글란에 사용자가 남긴 url과 같은 성격의 링크에 사용할 수 있을 거 같아요.

<img src="/assets/markdown-image/Browser-a-태그의-a 태그의 noopener-noreferrer-nofollow/nofollow.png" alt="스팸" width="500" height="500"/>

<span>1.2 스팸, https://clever-solution.com/everything-you-need-to-know-about-rel-noopener-noreferrer-tags-purpose-benefits-and-seo-impact<span/>

## 결론

&emsp;nofollow와 다르게 noreferrer와 noopener는 직접적으로 SEO에 영향을 주지는 않습니다. 주로 피싱과 같은 공격을 막기 위한 보안 수단과 트레픽 데이터를 은닉하기 위한 목적으로 사용됩니다. 블로그나 사이트 내부적으로 사용자를 이동시키는 링크는 사용자를 페이지로부터 보호할 이유가 없기 때문에 noreferrer, noopener를 쓰는 게 적합하지 않아요. 그뿐만 아니라 트래픽이 어느 경로로 발생하는지를 지속적으로 파악하는 것이 좋겠죠? 마케팅 전략에 따라 다르겠지만 구글은 링크 빌딩(link-building)을 권장하고 있습니다. 도메인 소유주 간 백 링크(backlink)를 활용해서 트래픽 관계를 형성할 수 있기 때문이죠.