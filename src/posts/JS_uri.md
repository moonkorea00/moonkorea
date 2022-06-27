---
title: 한글 URI가 깨져서 나와요 decodeURI()
category: Javascript
date: 2022년 6월 26일
---

> ### 한글 uri가 깨져서 나와요 decodeURI()

간혹 브라우저 uri에 **%20**가 포함된 경우를 보셨을겁니다. 브라우저는 문자간 공백문자를 인코딩하는 과정에서 치환합니다.

uri값을 사용하거나 인코딩된 uri를 한글로 다시 디코딩해야하는 경우가 있습니다.

**decodeURI()**는 encodeURI 또는 비슷한 루틴으로 생성된 uri를 디코딩 해줍니다.

```javascript
const uri = 'https://somesite.com/리액트';
const encoded = encodeURI(uri);
console.log(encoded);
// expected output: "https://somesite.com/%EB%A6%AC%EC%95%A1%ED%8A%B8"
console.log(window.location.pathname)
// expected output: "https://somesite.com/%EB%A6%AC%EC%95%A1%ED%8A%B8"

try {
  console.log(decodeURI(encoded));
  // expected output: "https://somesite.com/리액트"
} catch (e) {
  console.error(e);
}
```

window객체나 훅으로 uri나 리소스에 접근하실때 사용해보면 되겠습니다.