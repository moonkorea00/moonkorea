---
title: 'VSCode 익스텐션 개발 경험 (Korean Grammar Checker 맞춤법 검사기)'
category: '오픈 소스'
excerpt: 'Korean Grammar Checker는 vscode에서도 한글 맞춤법 검사를 할 수 있는 익스텐션입니다. 이번 글에서는 익스텐션을 만든 과정과 만들며 고민했던 점 등 개발 과정에 대해 알아보겠습니다.'
description: '맞춤법 검사 익스텐션 생성기'
tags: '오픈 소스, 개발 경험, 블로그'
date: '2023-03-12'
---

> Korean Grammar Checker는 <a href="https://marketplace.visualstudio.com/items?itemName=moonkorea.vscode-korean-grammar-checker" target="_blank">마켓플레이스</a> 또는 vscode-확장에서 검색 후 설치가 가능합니다.

&emsp;저는 블로그 포스트를 쓸 때 vscode에서 마크다운 파일로 글을 전부 관리하는데요, 발행하기 전 혹시 모를 맞춤법 오류를 <a href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EB%A7%9E%EC%B6%A4%EB%B2%95+%EA%B2%80%EC%82%AC%EA%B8%B0" target="_blank">네이버 맞춤법 검사기</a>로 확인합니다. 브라우저와 에디터를 번갈아 가면서 이동하는 게 가끔 번거로워서 에디터에서도 간편하게 사용할 수 있는 검사 익스텐션이 있으면 좋겠다는 생각에 만들게 되었습니다.

&emsp;저처럼 마크다운으로 글을 쓰는 사용자들이 적지 않기 때문에 시장 조사를 해보니 이미 배포된 익스텐션들이 있었는데요, 쏘카 기술 블로그팀은 자동화에 중점을 둬서 PR이 생성된 후 코멘트에 <b>/맞춤법</b>을 입력하면 Github Action이 실행되는 <a href="https://tech.socarcorp.kr/data/2023/02/15/how-to-organize-tech-blog.html#61-%EB%B0%98%EB%B3%B5%EC%A0%81%EC%9D%B8-%ED%94%BC%EB%93%9C%EB%B0%B1" target="_blank" rel="noopener">프로세스</a>를 구축했어요. 다만 마켓플레이스에 배포된 익스텐션들을 사용해 본 결과 검사 글자 제한이 있는 점, 검사 알고리즘이 태그 속성값이나 html의 영문 문자열까지 교정하는 패턴이 있어서 마크다운으로 글을 관리하는 사용자들에게는 적합하지 않을 수 있겠다고 생각한 점, 에디터 내(글 작성 단계)에서 바로 맞춤법 오류를 확인하고 교정할 수 있는 편의가 제공되면 좋겠다고 생각한 점 등을 이유로 새롭게 만들어봤습니다.

<br>

## 네이버 맞춤법 검사기 살펴보기

&emsp;익스텐션 개발에 앞서, 네이버 맞춤법 검사기가 원문을 어떻게 검사해서 교정 결과를 화면에 출력하는지 먼저 파악했어요.

<div style="max-width:700px; margin: auto">

![네이버 맞춤법 검사기](/assets/markdown-image/vscode-맞춤법-검사-extension-생성기/서버-응답.png)

</div>

<span>1.1 네이버 맞춤법 검사기 응답</span>

&emsp;네이버 맞춤법 검사기는 검사 요청을 서버에 보내면 HTML 마크업을 응답으로 받습니다. 응답은 &lt;p&gt;태그 콘텐츠로 파싱된 후 교정 결과로 출력되는데요, 맞춤법 오류에 대한 스타일도 <b>&lt;em class=&quot;red_text&quot;&gt;장난꾼&lt;/em&gt;</b>형태인 마크업으로 전달돼서 클라이언트에서는 별도로 응답을 가공할 필요 없이 바로 파싱된 결과만 보여주면 되는 거였어요. 따라서 동일한 흐름으로 에디터에서 검사 요청을 보내고 응답으로 받은 마크업을 파싱한 후 html로 에디터에 출력해 주는 흐름으로 구상해 봤어요.

<br>

## Korean Grammar Checker

&emsp;vscode 공식 문서에는 <a href="https://code.visualstudio.com/api" target="_blank">초기 설정부터 배포 가이드</a>가 개발 친화적으로 정리돼 있는데요,

<video url='/assets/markdown-image/vscode-맞춤법-검사-extension-생성기/flow-diagram.webm' width='100%' height='auto'><video />

<span>1.2 flow diagram</span>

<details><summary><i>Demo 보기</i></summary>

<video url='/assets/markdown-image/vscode-맞춤법-검사-extension-생성기/전체-검사.webm' width='100%' height='auto'><video />

<span>2.1 전체 검사</span> 
 
<video url='/assets/markdown-image/vscode-맞춤법-검사-extension-생성기/선택-검사.webm' width='100%' height='auto'><video /> 
 
<span>2.2 선택 검사</span> 
 
<video url='/assets/markdown-image/vscode-맞춤법-검사-extension-생성기/수정.webm' width='100%' height='auto'><video /> 
 
<span>2.3 수정</span>

</details>

저는 vscode가 제공하는 <a href="https://code.visualstudio.com/api/references/vscode-api" target="_blank">VS Code API</a>를 사용해서 교정 결과를 담을 패널(결과 화면), 클라이언트/서버 상태, 예외 처리 결과를 출력할 알림 등을 이렇게 처리했어요 :

### 1. 검사 요청

에디터에 있는 원문을 GET 요청에 담아서 서버에 검사 요청을 보냅니다. 네이버 맞춤법 검사기는 요청 당 500자 제한이 있기 때문에 요청 문자열이 500자 이상일 경우 원문을 500자 이내의 문자열로 나눈 후 병렬적으로 전송해요.

### 2. 응답

서버는 교정 결과가 담긴 응답을 클라이언트에게 전송합니다.

### 3. 교정 결과 출력 / 클라이언트 및 서버 상태 저장

클라이언트가 성공적인 응답을 받으면 파싱된 html을 Webview API로 새로운 탭에 출력해요. 성공적으로 출력하면 서버 상태를 워크스페이스 스토리지(workspaceState)에 저장하고 선택된 문자열에 대한 부분 검사일 경우 에디터 내에 있는 원문 글의 위치(Position)도 포함해서 저장해요.

### 4. 수정 요청

수정 요청이 발생하면 검사 유형(전체 검사/선택 검사)에 따라 원문을 수정해요. 선택 검사에 대한 수정 요청일 경우 원문 문자열의 위치와 교정 결과를 워크스페이스 스토리지에서 불러와 최초 선택된 문자열만 수정해요.

### 5. 스토리지 초기화

패널이 닫히거나 익스텐션이 사용 중지 상태가 되면 워크스페이스 스토리지를 초기화시켜요.

### 6. 예외 처리

위 과정(1~4)에서 발생하는 클라이언트 또는 서버 에러는 vscode 알림창으로 에러와 에러 내용을 출력해요.

<br>

## 고민했던 점과 익스텐션의 한계점

### 1. 글자 제한

&emsp;네이버 맞춤법 검사 API의 가장 큰 한계점이라고 볼 수 있는 것이 요청 당 500자의 글자 제한이에요. 사용자가 500자 이내의 문자열을 선택해서 반복적으로 부분 검사를 하는 경우가 아니라면 저처럼 짧지 않은 글의 블로그를 쓰는 사용자는 글자 제한이 사용자 경험 측면에서는 불편할 수 있어요.

&emsp;v1.2.0에서는 500자 이상에 대한 검사 요청이 발생하면 원문을 500자 이내의 문자열들로 나눈 후 병렬로 서버에 요청을 보내요. 이때 나뉘는 문자열이 마침표나 쉼표 등의 기준으로 구분될 경우 완전한 문장 단위로 나뉜다는 보장이 없어요. 따라서 병렬처리할 때 에디터에서 줄 바뀜이 발생한 지점을 기준으로 문자열들을 나눠서 요청하는데요, 성공적으로 응답을 받으면 각 응답을 병합한 후 교정 결과로 출력해요.

### 2. 원문이 변했을 경우의 수

&emsp;사용자가 최초에 검사 요청을 보내고 수정 요청을 할 때까지 원문이 바뀌었을 여지가 충분히 있는데요, 익스텐션이 원문의 변화를 지속적으로 추적할 수 없기 때문에 수정 명령이 발생하면 최초 검사 요청이 발생했을 때 스토리지에 저장한 문자열 위치를 사용해 요청 원문과 현재 원문의 일치 여부를 확인해요. 만약 원문과 일치하면 수정을 하고 그렇지 않은 경우에는 에러와 에러 내용을 vscode 알림으로 알려줘요.

### 3. API 의존성

&emsp;v1.2.3에서는 없었던 API 키 에러에 대응해야 했는데요, Korean Grammar Checker는 네이버 맞춤법 검사 API에 의존하기 때문에 사용 명세에 변경 사항이 생길 때마다 대응해야 한다는 단점이 있어요.

### 4. 다수의 맞춤법 오류

&emsp;본 익스텐션은 맞춤법 오류가 극단적으로 많으면 서버 응답까지의 소요 시간이 길어져요(최대 2초. 서버, 네트워크 상태에 따라 상이).

<div style="max-width:650px; margin: auto">

![Korean Grammar Checker 응답 시간](/assets/markdown-image/vscode-맞춤법-검사-extension-생성기/낮은-응답-시간.png)

</div>

<div style="max-width:650px; margin: auto">

![Korean Grammar Checker 응답 시간](/assets/markdown-image/vscode-맞춤법-검사-extension-생성기/높은-응답-시간.png)

</div>

<span>1.3 응답 시간</span>

다만 네이버 맞춤법 검사 페이지에서도 동일한 시간이 걸린다는 점, 기타 맞춤법 검사기와 비교했을 때 맞춤법 오류의 개수에 따라 모든 맞춤법 검사기의 응답 소요 시간이 길어졌다는 점, 그중 네이버 맞춤법 검사기가 가장 빠르게 교정 결과를 반환한다는 점에서 네이버 맞춤법 검사기를 채택했어요.