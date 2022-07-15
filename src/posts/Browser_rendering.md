---
title: 브라우저 렌더링
category: Browser&CS
date: 2022년 7월 6일
---
# 브라우저 렌더링

&emsp;웹 브라우저는 프론트엔드 개발자들이 만든 앱이 실행되는 환경이자 우리가 일상생활에서 가장 많이 사용하는 소프트웨어일 것입니다. 사용자에게 웹 페이지를 그려주는 일을 하기 위해 주소창에 url이 입력된 시점부터 웹 페이지가 보여지기까지 화면 뒤에서 무수히 많은 작업들을 합니다. 

<img src="https://readmedata.github.io/data/Screen%20Shot%202022-07-07%20at%209.40.49%20AM.png" width="560" height="330">

<span>1.1 브라우저에 google.com을 입력하면 어떻게 될까요?</span>

&emsp;사용자가 주소 표시줄에 url을 입력하면 브라우저는 url 중 도메인 이름에 해당하는 주소를 dns 서버에서 검색을 합니다. dns 서버는 도메인 주소와 일치하는 ip 주소를 찾아서 브라우저에게 전달을 하고 브라우저는 이 ip 주소를 가진 서버에 HTML, CSS, 자바스크립트가 담긴 소스코드에 대한 http 요청을 보냅니다. 브라우저는 응답으로 받은 데이터를 화면에 출력하기에 앞서 웹 표준화 기구인 w3c 명세에 따라 데이터를 해석하는 작업을 합니다. 요청받은 내용을 브라우저 화면에 표시하는 역할을 하는 렌더링 엔진은 다음과 같이 동작합니다.

>### 렌더링
>렌더링은 HTML, CSS, 자바스크립트로 작성된 문서를 파싱하여 브라우저에 시각적으로 출력하는 것을 의미합니다.

>### 파싱
>파싱은 프로그래밍 언어의 문법에 맞게 작성된 텍스트 문서를 읽어 들여 실행하기 위해 **텍스트 문서의 문자열을 토큰 단위로 분해**하고, 토큰의 문법적 의미와 구조를 반영하여 트리 구조의 자료구조인 파스 트리를 생성하는 일련의 과정을 말한다.

&emsp;브라우저의 렌더링 엔진은 HTML을 파싱하여 HTML문서 에 대한 DOM트리를 생성합니다. 파싱 과정 중에 렌더링 엔진이 style 태그를 만나면 HTML 파싱 작업을 중지하고 CSS 파싱을 통해 CSSOM트리를 생성합니다. 각 HTML과 CSS 인풋은 document에 적용 될 콘텐츠와 스타일을 규정합니다. 

<img src="https://readmedata.github.io/data/domcssom.png" width="800" height="350">

<span>1.2 Render-tree Construction, Layout, and Paint, https://web.dev/critical-rendering-path-render-tree-construction/</span>

&emsp;CSSOM 트리 생성을 마치면 렌더링 엔진은 HTML 파싱을 중단한 지점부터 재개하고 script tag를 만나면 자바스크립트 엔진에게 제어 권한을 넘깁니다. 자바스크립트 엔진은 script 태그 내의 자바스크립트 코드 또는 자바스크립트 파일을 읽고 실행 하는 것을 담당합니다. 자바스크립트의 실행이 완료가 되면 다시 렌더링 엔진으로 제어 권한이 넘어와 파싱을 중지했던 지점부터 마저 DOM을 생성합니다.

> 브라우저는 동기적으로 HTML, CSS, 자바스크립트를 처리합니다. 따라서 style 태그와 script 태그의 위치에 따라 각 요소들의 파싱을 지연시킵니다. 브라우저는 CSSOM트리가 생성될 때까지 페이지 렌더링을 차단시키기 때문에 style 태그는 body 요소 위에 위치시키며 DOM이 완성되지 않은 상태에서의 DOM 조작은 에러를 발생시키기 때문에 script 태그는 body 요소 아래에 위치시킵니다.

&emsp;렌더링 엔진은 본격적으로 화면에 웹 페이지를 그리기 위해 DOM트리와 CSSOM트리를 합쳐 렌더트리를 생성합니다. 렌더트리는 document 객체부터 각 노드들을 순회하면서 화면에 표시되어야 할 모든 콘텐츠, 스타일 정보와 함께 렌더에 필요한 노드만 선택해서 포함시킵니다. meta 태크 또는 display: none 속성을 가진 노드들은 렌더되는 출력값에 포함되지 않기 때문에 렌더트리에서 제외됩니다.

<img src="https://readmedata.github.io/data/render%20tree.png" width="750" height="330">

<span>1.3 Render-tree Construction, Layout, and Paint, https://web.dev/critical-rendering-path-render-tree-construction/</span>

&emsp;렌더트리까지 생성하는 작업이 완료가 되면 렌더링 엔진은 노드들의 크기와 뷰포트에 배치될 정확한 위치를 계산하는 layout 단계로 넘어갑니다. 이때 CSS에서 사용된 모든 상대적인 단위는 사용자 디바이스에 맞춰서 픽셀 단위로 변환됩니다. 브라우저에 출력될 노드와 해당 노드에 대한 스타일 정보까지 계산이 완료가 되면 최종적으로 paint 단계에서 각 노드들을 픽셀로 변환하여 화면에 출력합니다.

&emsp;데이터를 파싱하여 DOM트리와 CSSOM트리의 생성, 배치(layout), 그리고 UI를 그리는 과정(pain)을 critical rendering path라고 합니다. Critical rendering path의 동작 순서를 정리하자면 :

> 1. HTML 마크업을 파싱하여 DOM트리 생성
> 2. CSS 마크업을 파싱하여 CSSOM트리 생성
> 3. DOM과 CSSOM을 합쳐 렌더트리 생성
> 4. 렌더트리에 대한 layout 작업으로 각 노드의 위치와 크기 계산
> 5. 각 노드를 브라우저에 paint

&emsp;사용자에 의해 자바스크립트가 실행되어 DOM이나 CSSOM에 조작이 발생할 경우 브라우저는 변경 요소에 따라 1번부터 5번까지 다시 작업을 실행합니다. Critical rendering path의 최적화는 해당 sequence에 할애되는 비용을 최소화하는 프로세스이며 렌더링 최적화는 초기 렌더링부터 리렌더링까지 얼마나 원활한 사용자 경험을 제공할 것인지를 결정짓습니다.
