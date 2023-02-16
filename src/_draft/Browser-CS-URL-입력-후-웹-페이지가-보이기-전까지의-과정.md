---
title: 'URL 입력 후 웹 페이지가 보이기 전까지의 과정'
category: 'Browser-CS'
excerpt: ''
description: '렌더링 전까지 브라우저가 수행하는 5단계'
tags: '브라우저 렌더링'
date: '2023-01-08'
---

# URL 입력 후 웹 페이지가 보이기 전까지의 과정

&emsp; 개발자는 화면에 출력될 것들을 그리는 과정을 담당하고 특히 프론트엔드 개발자에게 브라우저의 렌더링 과정은 핵심 요소라고 생각합니다.

실제 문제가 발생할 수 있는 위치와 성능 문제를 찾을 수 있는 위치를 파악하고 사용자에게 안전한 경험을 제공하고 있는지 확인하는 것이 중요합니다.

 브라우저에 URL을 입력한 다음 사용자에게 웹 사이트가 보이기까지의 과정 중 페이지가 렌더링되기 직전까지의 렌더러 프로세스에게 데이터를 전달하기 직전까지의 과정에 대해 알아보겠습니다.

1. Handling Inputs
2. Start Navigation
3. Read Response
4. Find Renderer Process
5. Commit Navigation
첫 번째는 handling inputs이라는 과정입니다. 