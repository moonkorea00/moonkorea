import { writeFileSync } from 'fs';

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const date = String(currentDate.getDate()).padStart(2, '0');

const parsedDate = `${year}-${month}-${date}`;

const templateContent = `---
title: '제목'
category: '자바스크립트'
excerpt: 'meta description'
description: '한 줄 요약'
tags: '블로그, 마크다운'
date: '${parsedDate}'
---

# heading 1

> 포스트 내용입니다.

## heading 2

### heading 3

### heading 4
`;

writeFileSync('src/_posts/TEMPLATE.md', templateContent);

console.log('src/_posts 에서 내용을 수정해 보세요.');
