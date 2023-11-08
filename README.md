<br>
<p align="center">
<a href="https://moonkorea.dev" target="_blank" rel="noopener">
<img width="539" alt="moonkorea" src="https://github.com/moonkorea00/moonkorea/assets/78708082/407f7c5c-12ab-4bde-a036-fef8d02fa0fa">
</a>

</p>

<div align="center">
  
  [![GitHub Release](https://img.shields.io/github/release/moonkorea00/moonkorea)](https://github.com/moonkorea00/moonkorea/releases)
  [![GitHub commit activity the past week, 4 weeks](https://img.shields.io/github/commit-activity/y/moonkorea00/moonkorea)](https://github.com/moonkorea00/moonkorea/commits/main)
  
</div>

<br>
<br>

## 1. 로컬에서 실행하기

#### 1.1 설치

```shell
$ git clone https://github.com/moonkorea00/moonkorea.git
$ cd moonkorea
$ npm install
```

#### 1.2 실행

```shell
# 브라우저에서 http://localhost:8000 열기
$ npm run dev
```

#### 1.3 포스트 md 파일 생성

```shell
# src/_posts에 md 파일 생성 스크립트 실행
$ npm run template
```

- [예시 보기](https://github.com/moonkorea00/moonkorea/wiki/front-matter-%ED%98%95%EC%8B%9D)

#### 1.4 사이드바 데이터 생성

```shell
# json 데이터 생성 스크립트 실행
$ npm run sider
```

<br>

## 2. 기술 스택

- React 18.2.0
- Next.js 13.0.6
- TypeScript 4.9.3
- Prisma
- Supabase
- Styled-Components
- NextAuth.js
- TanStack Query
- React Markdown
- gray-matter
- Nodemailer
- Vercel
- Google Analytics
- Google Search Console

<details><summary><i>dependencies 더 보기</i></summary>

```json
"dependencies": {
        "@next-auth/prisma-adapter": "^1.0.5",
        "@prisma/client": "^4.9.0",
        "@tanstack/react-query": "^5.4.3",
        "@vercel/analytics": "^0.1.6",
        "axios": "^1.3.0",
        "gray-matter": "^4.0.3",
        "next": "^13.0.6",
        "next-auth": "^4.20.1",
        "nodemailer": "^6.9.1",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-markdown": "^8.0.3",
        "react-player": "^2.12.0",
        "react-share": "^4.4.1",
        "react-syntax-highlighter": "^15.5.0",
        "rehype-raw": "^6.1.1",
        "sharp": "^0.31.3",
        "styled-components": "^5.3.5",
        "web-vitals": "^2.1.4"
      },
      "devDependencies": {
        "@next/bundle-analyzer": "^13.2.4",
        "@tanstack/eslint-plugin-query": "^5.0.5",
        "@tanstack/react-query-devtools": "^5.4.3",
        "@types/gtag.js": "^0.0.12",
        "@types/node": "^18.11.9",
        "@types/nodemailer": "^6.4.7",
        "@types/react": "^18.0.25",
        "@types/react-dom": "^18.0.9",
        "@types/react-syntax-highlighter": "^15.5.5",
        "@types/styled-components": "^5.1.26",
        "@typescript-eslint/eslint-plugin": "^5.47.0",
        "@typescript-eslint/parser": "^5.47.0",
        "babel-plugin-styled-components": "^2.0.7",
        "eslint": "^8.30.0",
        "eslint-plugin-react": "^7.31.11",
        "file-loader": "^6.2.0",
        "next-sitemap": "^3.1.43",
        "prisma": "^4.9.0",
        "typescript": "^4.9.3"
      }
```

</details>

<br>

## 3. 포스트 발행 프로세스
[Wiki에서 보기](https://github.com/moonkorea00/moonkorea/wiki/%ED%8F%AC%EC%8A%A4%ED%8A%B8-%EB%B0%9C%ED%96%89-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4)

<br>

## 4. Changelog

<b>[1.0.0]</b>
- 초기 버전 배포

<b>[1.1.0]</b>
- TypeScript 마이그레이션

<b>[2.0.0]</b>
- Next.js 마이그레이션
- UI 개편

<b>[2.1.0]</b>
- utterances에서 자체 댓글 시스템으로 전환

<b>[2.2.0]</b>
- SNS에 포스트 공유하기 기능 추가

<b>[2.2.2]</b>
- TanStack Query v5 업그레이드

<b>[2.3.0]</b>
- Heading 요소 해시 링크 추가

<b>[2.4.0]</b>
- 목차 컴포넌트

<br>

## License

[MIT License](https://github.com/moonkorea00/moonkorea/blob/main/LICENSE) © 2023 Jeewon Moon

