---
title: '자바스크립트 모듈'
category: '자바스크립트'
excerpt: '자바스크립트 모듈은 관심사 별로 코드를 나눈 단위를 말하는데요, export과 import 문으로 모듈 간 코드를 공유합니다. 이번 글에서는 모듈이 갖는 특징과 사용 문법에 대해 알아봅니다.'
description: '자바스크립트 모듈에 대해'
tags: '모듈'
date: '2023-10-15'
---

## TL;DR

- 자바스크립트 모듈은 관심사 별로 코드를 나눈 단위를 말한다
- 모듈 간 코드를 공유하기 위해 export와 import 문을 사용한다
- 모듈 시스템을 사용하면 개별적인 스코프를 갖는 모듈 간 의존성을 파악하고 기능을 공유할 수 있다
- 모듈은 defer 속성을 추가한 스크립트처럼 HTML 파싱이 완료된 후에 실행된다

<br>

자바스크립트 코드의 모듈화는 코드를 효율적이고 조직적으로 구성할 수 있게 합니다. 쓰임새별로 잘 정돈된 서랍장처럼 코드를 쓰임새 별로 정리하면 코드를 읽을 때도 논리적이고 재사용하기도 용이합니다. 코드의 모듈화라고 하면 소스코드를 모듈 단위로 나누는 것을 의미하는데요, 자바스크립트 모듈은 기능 별로 코드를 나눈 단위를 말합니다.

본 글에서는 모듈이 갖는 특징과 사용법에 대해 알아봅니다.

<br>

## 모듈

코드 에디터에서 작성한 자바스크립트 스크립트 파일 하나가 모듈 하나입니다. 개발자는 export과 import 문을 사용해서 모듈 간 코드를 공유하죠. 우리는 어쩌면 이미 모듈 시스템으로 개발을 하고 있고 소스코드의 뼈대를 모듈로 구축하고 있죠.

- export 키워드로 함수, 변수, 객체, 클래스 등을 외부 모듈로 내보낼 수 있습니다.
- import 키워드로 외부 모듈에서 내보내진 엔티티들을 가져와 모듈에서 사용할 수 있습니다.

> export과 import 문과 관련해서는 <a href="https://www.moonkorea.dev/Javascript-export과-import-문" target="_blank" rel="noopener">이 글</a> 참고.

<br>

<img src="/assets/markdown-image/Javascript-모듈/모듈.png" alt="자바스크립트 모듈" width="650" height="400"/>

<span>1.1 모듈</span>

<br>

브라우저 환경에서 모듈을 사용하기 위해서는 script 태그에 type="module" 속성을 추가해 사용될 스크립트가 모듈이라는 걸 알려줍니다.

```javascript
// index.html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script type="module" src="./main.js"></script> // 모듈 추가
    <title>moonkorea</title>
  </head>
  <body>
    <h1>moonkorea</h1>
  </body>
</html>
```

```javascript
// main.js
import { categories } from './blog.js';
console.log(categories.length);
// blog.js
export const categories = ['자바스크립트', '리액트'];
```

> 모듈은 http 또는 https 프로토콜을 통해서만 실행되고 file:// 프로토콜을 사용하는 로컬 파일에서는 동작하지 않습니다.

<br>

### 지연 실행

브라우저 환경에서 type="module" 속성이 추가된 스크립트와 일반 스크립트는 다르게 동작합니다.

모듈은 외부 스크립트, 인라인 스크립트와 관계없이 일반 스크립트에 defer 속성을 추가한 것처럼 동작합니다.

> #### 외부 모듈 스크립트
>
> - src 값이 동일한 외부 모듈 스크립트는 한 번만 실행됩니다.
>
> ```javascript
> <script type="module" src="module.js"></script>
>
> <script type="module" src="module.js"></script>
> ```
>
> - 다른 오리진에서 모듈을 불러올 때는 CORS 헤더가 필요합니다.
>
> ```javascript
> <script type="module" src="http://foo.com/module.js"></script>
> ```

따라서 브라우저는 외부 모듈 스크립트를 병렬적으로 불러오고 HTML 처리를 멈추지 않고 HTML 문서가 만들어진 후 실행됩니다. 스크립트의 실행 순서 또한 정의된 순서대로 차례로 실행됩니다.

```html
<script type="module">
  alert(typeof button); // object
</script>

<script>
  alert(typeof button); // undefined
</script>

<button id="button">클릭</button>
```

위 HTML에서는 페이지가 출력되기 전에 undefined가 출력되고 페이지가 모두 그려진 후에 object가 출력됩니다.

따라서 페이지 내에 특정 기능이 모듈에 의존적일 경우 모듈이 불러오기 전까지 UI를 로더(loader)나 투명 오버레이 등으로 처리하는 것이 사용자 경험에 좋습니다.

앞서 모듈은 외부 스크립트, 인라인 스크립트와 관계없이 defer 속성을 추가한 것처럼 동작한다고 했는데요, async 속성으로 비동기 로드할 경우 인라인 스크립트는 제대로 동작하지 않지만 모듈 스크립트에서는 async 속성을 인라인 스크립트에도 적용할 수 있습니다.

```html
// 외부 스크립트, ok
<script async src="module.js"></script>

// 인라인 모듈 스크립트, ok
<script async type="module">
  import { counter } from 'module1.js';
  counter();
</script>

// 인라인 스크립트, bad
<script async>
  import { counter } from 'module1.js';
  counter();
</script>
```

모듈에 async를 사용하면 스크립트가 다운로드되고 실행되기 때문에 스크립트의 실행 순서에 영향을 받지 않는 광고나 모듈에 의존성이 없는 기능을 사용할 경우 적절하게 사용할 수 있습니다.

<br>

### 엄격 모드로 실행

모듈은 코드가 안전하고 예측 가능하게 실행될 수 있도록 항상 엄격 모드로 실행됩니다. 따라서 변수 선언 없이 변수에 값을 할당하거나 엄격 모드에서 오류라고 판단되는 코드는 제대로 동작하지 않습니다.

```javascript
// module.js
undeclaredVariable = 'moonkorea'; // 에러

function foo(x, x) {
  // ..
}
```

<br>

### 모듈 레벨 스코프

모듈은 모듈마다 자신의 스코프를 갖습니다. 따라서 모듈을 내보내고(export) 가져올 때(import) 정의되지 않은 변수나 함수 등의 엔티티에 접근하거나 스코프밖에 있는 개체를 사용할 수 없습니다.

```javascript
// index.html
<script type="module">
  let user = "John";
</script>

<script type="module">
  alert(user); // 에러
</script>
```

<br>

### 모듈 평가는 한 번만

내보내진 모듈을 여러 모듈에서 사용하더라도 최초 호출에 한 번만 실행됩니다.

```javascript
// module1.js
alert('hello world');
// module2.js
import 'module1.js'; // 'hello world' 출력
// module3.js
import 'module1.js'; // 아무것도 실행되지 않음
```

위 코드에서는 두 개의 다른 모듈에서 module1을 가져오는데요, module2.js에서 가져온 모듈은 한 번 평가되고 alert 창이 출력되기 때문에 동일한 모듈을 가져오는 module3.js에서는 평가가 이루어지지 않습니다.

모듈의 이러한 특징은 모듈에서 내보내진 데이터 구조를 재사용할 때도 동일한데요,

```javascript
// user.js
export let user = {};
export function greet() {
  alert(`${user.name}`);
}
```

```javascript
// init.js
import { user } from './user.js';
user.name = 'moonkorea';
// module1.js
import { user, greet } from './user.js';
alert(user.name); // 'moonkorea'
greet(); // 'moonkorea'
```

최초 실행되는 모듈 init.js에서 user 변수에 name 프로퍼티를 추가합니다. user 변수를 사용하는 module1.js에서 user에 대한 정보를 사용해 값을 출력하면 최초 실행되는 모듈에서 변경된 값의 user가 사용되는 걸 확인할 수 있습니다.

<br>

### 모듈의 this 값

앞서 모듈은 엄격 모드에서 실행된다고 했는데요, 비엄격 모드에서 실행되는 일반 스크립트와 다르게 엄격 모드에서 this 값은 undefined입니다.

```javascript
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

<br>

> 출처 : <a href="https://ko.javascript.info/modules-intro#ref-225" target="_blank" rel="noopener">모듈 소개 - javascript.info</a>