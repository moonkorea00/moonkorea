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

## 1. 설치 및 실행

#### 1.1 설치

```shell
$ git clone https://github.com/moonkorea00/moonkorea.git
$ npm install
```

#### 1.2 실행

```shell
# 개발 환경 실행
$ npm run dev
# http://localhost:8000에서 실행

# 배포 환경 실행
$ npm run build
$ npm run start
# http://localhost:8000에서 실행
```

#### 1.3 마크다운 포스트 템플릿 생성

```shell
$ npm run template <블로그-제목>
# src/_posts/블로그-제목.md
```

<br>

## 2. 기술 스택

- React 18.2.0
- Next.js 14.0.4
- TypeScript 4.9.3
- Styled-Components

- React Markdown
- gray-matter
- TanStack Query
- Prisma
- Supabase
- NextAuth.js
- Nodemailer
- Vercel
- Google Analytics
- Google Search Console
- Sentry

<br>

## 3. 포스트 발행 과정 및 front matter

- [포스트 발행 과정](https://github.com/moonkorea00/moonkorea/wiki/%ED%8F%AC%EC%8A%A4%ED%8A%B8-%EB%B0%9C%ED%96%89-%EA%B3%BC%EC%A0%95)
- [마크다운 포스트 및 front matter 컨벤션](https://github.com/moonkorea00/moonkorea/wiki/%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4-%ED%8F%AC%EC%8A%A4%ED%8A%B8-%EB%B0%8F-front-matter-%08%EC%BB%A8%EB%B2%A4%EC%85%98)

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

- Utterances에서 자체 댓글 시스템으로 전환

<b>[2.2.0]</b>

- SNS에 포스트 공유하기

<b>[2.3.0]</b>

- 부제목 해시 링크 추가

<b>[2.4.0]</b>

- 목차

<b>[2.5.0]</b>

- 포스트 페이지네이션

<b>[2.6.0]</b>

- 포스트 필터링

<b>[2.7.0]</b>

- Sentry

<b>[2.8.0]</b>

- app router 마이그레이션

<br>

## License

[MIT License](https://github.com/moonkorea00/moonkorea/blob/main/LICENSE) © 2023 Jeewon Moon
