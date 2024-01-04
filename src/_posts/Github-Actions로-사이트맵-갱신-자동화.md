---
title: 'Github Actions로 sitemap 갱신 자동화'
category: '튜토리얼 / 트러블슈팅'
description: '구글은 정기적으로 웹사이트를 크롤링하고 사이트맵을 확인합니다. SEO와 빠른 색인화를 위해 검색 엔진에 사이트맵을 갱신할 수 있는 방법에 대해 알아봅니다.'
excerpt: '구글 검색 콘솔에 보다 빠르게 알리기'
tags: 'CI/CD, SEO, 블로그, 개발 경험'
date: '2023-12-28'
---

> 본 글은 Google Search Console에 도메인을 등록하는 내용을 다루지 않습니다.

구글은 정기적으로 웹을 탐색하여 웹사이트와 관련된 페이지들을 찾아서 검색 엔진에 인덱싱하는데요, 웹사이트 운영자들은 인덱싱 작업을 돕기 위해 사이트맵을 웹 마스터에 제공합니다. 하지만 인덱싱 주기는 페이지마다 다르고 변경된 콘텐츠가 빠르게 인덱싱될 것이라는 보장은 없습니다.

이번 글에서는 GitHub Actions를 활용해서 Google 검색 콘솔에 사이트맵을 갱신하는 방법에 대해 알아보겠습니다.

<br>

## 쉘 스크립트 생성

사이트맵이 업데이트되었다는 것을 Google 검색 콘솔에 알리기 위해 쉘 스크립트를 만들어보겠습니다.

"/scripts" 폴더에 다음과 같이 스크립트를 작성합니다.

```shell
ping_google_search_console.sh
echo "running shell script"
curl "https://google.com/ping?sitemap=https://[도메인]/sitemap.xml"
echo "request sent to google"
```

위 스크립트는 구글의 사이트맵 알림 서비스 URL로 GET 요청을 보내 사이트맵 업데이트를 알립니다. 사이트맵을 robots.txt에 포함시켜 검색 엔진에게 웹 사이트의 구성을 알려주는 데 도움을 줄 수 있지만 ping 요청을 통해 "새로운 콘텐츠가 있으니 인덱싱 해달라"고 새로 알릴 수도 있습니다. 쉘 스크립트를 실행하지 않고 직접 브라우저에서 해당 url로 요청을 보내더라도 사이트맵 접수가 가능한데요, 요청을 보내보면 대기열에 추가되었다고 알려줍니다.

<br>

<div style="max-width:650px; margin: auto">

![ping google](/assets/markdown-image/Github-Actions로-sitemap-갱신-자동화/ping-google.png)

</div>

<span>1.1 ping google</span>

<br>

## Github Actions Workflow 생성

쉘 스크립트를 생성한 후, Pull Request가 main 브랜치에 머지될 때마다 해당 스크립트가 실행되도록 Workflow를 구축해 보겠습니다.

```yml
ping-google.yml
name: post merge workflow

on:
  pull_request:
    branches:
      - main
    types: [closed]

jobs:
  post-merge-job:
    # merge 후
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
        # 코드 베이스에 접근할 수 있도록 가상 환경 생성
      - name: Checkout Repository
        uses: actions/checkout@v2

        # 쉘 스크립트 실행
      - name: Run Ping Google Script
        run: sh scripts/ping_google_search_console.sh

        # 기타 명령 수행
```

위 Workflow는 main 브랜치로 Pull Request가 닫힐 때 정의된 작업들을 실행하게 되는데요, "ping_google_search_console.sh" 스크립트를 실행해 Google에 사이트맵이 업데이트되었음을 알립니다.

> main 브랜치나 pull request나 아닌 다른 작업을 감지해 실행하고자하는 경우 해당 조건에 맞게 설정합니다.

<br>

## 결과 확인

main 브랜치 업데이트 후, Actions 탭에서 Workflow가 성공적으로 실행되었는지 확인합니다.

<br>

<div style="max-width:650px; margin: auto">

![github actions workflow](/assets/markdown-image/Github-Actions로-sitemap-갱신-자동화/post-merge-workflow.png)

</div>

<span>1.2 post merge workflow</span>

<br>

성공적으로 실행됐으면 검색 콘솔은 sitemap을 다시 크롤링하도록 대기열에 추가합니다.

<br>

<div style="max-width:650px; margin: auto">

![색인 생성 결과](/assets/markdown-image/Github-Actions로-sitemap-갱신-자동화/성공.png)

</div>

<span>1.3 색인 결과</span>

<br>

다만 너무 잦은 "pinging"은 구글에서 악성 요청으로 간주하거나 정책에 위반될 수 있기 때문에 이 점 유의해 주세요.

> 참고 : <a href="https://searchnatural.co.uk/google-ping-sitemap/" target="_blank" rel="noopener">Google Ping Sitemap URL Tool</a>