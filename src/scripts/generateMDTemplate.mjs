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

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus, ex vitae volutpat semper, orci leo vulputate magna, vitae vestibulum tellus justo eget arcu. Suspendisse potenti. Etiam purus mauris, hendrerit quis velit in, maximus porttitor ante. Duis sit amet augue a nulla efficitur vulputate sed vitae sem. Aliquam erat volutpat. Nullam blandit velit nec accumsan posuere. Phasellus bibendum augue lorem, a rhoncus nibh hendrerit sit amet. Nullam tincidunt pulvinar tortor, quis feugiat mi congue ut. In nec molestie metus, ut mattis nunc.

### heading 3

### heading 4
`;

try {
  writeFileSync('src/_posts/TEMPLATE.md', templateContent);
  console.log('\x1b[32m', 'src/_posts 에서 내용을 수정해 보세요.', '\x1b[0m');
} catch (error) {
  console.error('\x1b[31m', 'Failed to create template:', error, '\x1b[0m');
}
