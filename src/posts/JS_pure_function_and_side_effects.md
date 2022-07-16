---
title: 순수 함수
category: Javascript
date: 2022년 7월 10일
---

# 순수 함수와 비순수 함수

```js
function add(a, b) {
  const total = a + b;
  return total;
}
```

&emsp;순수 함수는 동일한 입력값을 전달했을때 언제나 동일한 결과값을 반환하는 함수입니다, 즉 외부 상태를 변경하지 않고 외부 상태에 의존하지도 않는 함수입니다.

```js
function addThenLog(a, b) {
  const total = a + b;
  console.log(total);
}

function getRandomColor() {
  const rgba = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += rgba[Math.floor(Math.random() * 16)];
  }
  return color;
}
```

&emsp;함수 addThenLog는 순수 함수처럼 보이지만 비순수 함수입니다. 비순수 함수는 console.log나 Math.random() 등 호출할때마다 값이 달라지거나 외부 상태에 의존하고 부수 효과가 있는 함수입니다. 하지만 부수 효과를 갖는다고 해서 언제나 비순 수함수가 나쁘고 순수 함수가 좋은 것은 아닙니다. 순수 함수를 통해 예기치 못한 부수효과와 오류를 피하고 앱의 안정성을 높이는 프로그랭 패러다임을 추구하는 것이지 의도대로 함수가 작동하게 하는 코드를 구현하는 것이 맞습니다.
