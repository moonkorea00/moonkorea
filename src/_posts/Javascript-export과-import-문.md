---
title: 'export, import 문'
category: '자바스크립트'
excerpt: '자바스크립트 모듈은 관심사 별로 코드를 나눈 단위를 말하는데요, export과 import 문으로 모듈 간 코드를 공유합니다. 이번 글에서는 export과 import 문을 사용해서 모듈을 내보내고 가져오는 방법과 사용 문법에 대해 알아봅니다.'
description: '자바스크립트 모듈과 문법 정리'
tags: '모듈, 트리 쉐이킹'
date: '2023-10-15'
---

<b>TL;DR</b>

- 자바스크립트 모듈은 관심사 별로 코드를 나눈 단위를 말한다.
- 모듈 간 코드를 공유하기 위해 export과 import 문을 사용한다.
- 트리 쉐이킹의 이점을 살리기 위해 가능하면 명시적으로 엔티티들을 import 하는 게 좋다.
  &emsp;<details><summary><i>정리 더 보기</i></summary>

  ### export 문

  - named export은 선언부에 export 키워드를 사용하거나 엔티티를 묶어서 내보낼 수 있다
  - default export은 하나의 개체만 모듈에서 내보낸다
    - export &#91;default&#93; function () {}
    - export { foo &#91;as bar&#93;, x &#91;as y&#93; }
  - default export은 식별자 없이 익명으로 내보낼 수 있다 (named export은 X)
    - export default function() {}
  - 여러 모듈을 불러와 다시 내보낼 수 있다
    - export { foo, bar, baz }
    - export \* &#91;as Foo&#93; from './module.js'; (named export만 내보내짐)
    - export { default &#91;as Foo&#93; } from './module.js'; (default export만 내보내짐)

  ### import 문

  - named export 가져오기
    - import { foo &#91;as bar&#93;, baz } from './module.js';
  - default export 가져오기
    - import Foo from './module.js';
    - import { default as Bar } from './module.js';
  - 네임스페이스 사용 한 번에 가져오기
    - import \* as Foo from './module.js';

</details>

<br>

## export과 import 문

ES6에서 소개된 export과 import 문은 여러 개의 코드 단위, 즉 모듈들로 하여금 서로 의존하고 코드를 공유할 수 있게 합니다. 두 문을 사용하면 코드를 모듈로 분리하고 다른 모듈에서 필요한 기능이나 변수를 불러와 사용할 수 있습니다.

### export

export 문을 사용해 변수, 함수, 객체, 클래스 등의 엔티티를 외부로 내보낼 수 있습니다.

```javascript
// html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script type="module" src="./main.js"></script>
    <title>moonkorea</title>
  </head>
  <body>
    <h1>moonkorea</h1>
  </body>
</html>;
// main.js
// ...

// calc.js
export const oddNumbers = [1, 3, 5, 7];
export const sum = (a, b) => a + b;
export const sub = (a, b) => a - b;
```

export 키워드는 선언부 앞에 사용할 수도 있고 먼저 엔티티를 정의한 후 내보낼 엔티티들을 묶어 내보낼 수도 있습니다.

```javascript
// calc.js
const oddNumbers = [1, 3, 5, 7];
const sum = (a, b) => a + b;
const sub = (a, b) => a - b;
export { oddNumbers, sum, sub };
```

위와 같은 형태의 export 문법은 named export이라고 하는데요, named export 말고도 개체를 내보낼 수 있는 default export가 있습니다.

```javascript
// user.js
export default class User { // 선언부에 export default
  constructor(name) {
    this.name = name;
  }
}
// 또는
class User {
  constructor(name) {
    this.name = name;
  }
}
export default User // 선언 후 export default
// 또는
class User {
  constructor(name) {
    this.name = name;
  }
}
export { User as default }; // 선언 후 export { as default}
```

export default 문법으로 모듈을 내보내면 해당 모듈에는 하나의 개체만 있다는 것을 나타낼 수 있습니다.

> 모듈 내에 named export과 default export을 같이 사용해도 문제는 없습니다. 다만 export default는 모듈당 하나만 정의할 수 있습니다.

default export은 모듈에서 개체 하나만 내보낸다는 것을 의미하기 때문에 식별자 없이 익명으로 내보낼 수 있습니다.

```javascript
// greet.js
export default class {
  constructor(message) {
    this.message = message;
  }
  greet() {
    console.log(this.message);
  }
}
// someModule.js
export default {
  name: "moon",
  age: 31
};
```

> named export은 식별자 없이 익명으로 내보낼 수 없습니다.

<br>

### import

export 문으로 엔티티를 내보내면 import 문으로 다른 모듈에서 현재 모듈로 불러와 사용할 수 있습니다.

```javascript
// main.js
console.log('hello world');
import { oddNumbers, sum } from './calc.js';
console.log(oddNumbers);
console.log(sum(1, 10));
```

만약 import 해올 엔티티들이 많아지면 <b>import \* as &lt;obj &gt;</b>처럼 모든 것들을 네임스페이스(객체 형태)로 가져올 수 있습니다.

```javascript
// main.js
import * as calc from './calc.js';
console.log(calc.oddNumbers);
console.log(calc.sum(1, 10));
```

> 네임스페이스를 사용해서 더 적은 코드로 모든 것들을 불러올 수 있지만 가능하면 불러오는 모듈에서 사용될 엔티티들을 명시해 주는 것이 좋습니다. 이와 관련해서는 아래 내용에서 더 다루겠습니다.

named export으로 내보낸 엔티티는 불러올 때 규칙이 중괄호와 함께 정확한 엔티티명으로 불러와야 하는데 default export으로 내보낸 경우 문법이 조금 다릅니다.

```javascript
// user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}
// main.js
import User from './user';
// 또는
import Participant from './user'; // 다른 이름으로 불러오기
// 또는
import { default as Participant } from './user'; // 명시적으로 다른 이름으로 불러오기
// 또는
import { default as User } from './user'; // 명시적으로 불러오기
new User('moonkorea');
```

default export로 내보낸 경우 중괄호 없이 임의의 이름으로 불러오거나 { default as SomeName }으로 불러올 수 있습니다.

위 예제처럼 default export로 내보낸 엔티티를 import 할 때는 새로운 이름으로 엔티티를 모듈에서 불러올 수 있어 자유도가 높은데 name export이라고 해서 안되는 건 아닙니다.

named export으로 내보내진 엔티티의 경우 불러올 때 as 키워드로 이름을 새로 지정할 수 있습니다.

```javascript
// main.js
import { sum as plus } from './calc';
import { add } from './someLibrary1';
import { add as sum } from './someLibrary2';
console.log(plus(1, 2));
console.log(add(1, 2));
console.log(sum(1, 2));
```

두 개의 다른 라이브러리나 코드베이스에서 동일한 이름의 함수를 하나의 모듈에서 사용할 경우 이름을 유연하게 지정해서 사용할 수 있습니다.

> 문법과 명명 규칙이 다양해서 일관된 컨벤션으로 사용하는 것이 바람직합니다.

> - import와 export 문은 모듈의 맨 위나 맨 아래 정의할 수 있고 동작에는 차이가 없습니다.
>
> ```javascript
> // main.js
> // import { getName } from './user.js'; // 스크립트 위에 정의하던
> getName();
> import { getName } from './user.js'; // 스크립트 아래에 정의하던 동일하게 동작
> ```
>
> - 정적 import와 export 문은 중괄호 안에서 동작하지 않습니다.
>
> ```javascript
> // main.js
> if (condition) {
>   import { getName } from './user.js';
> }
> ```

<br>

## 모듈 다시 내보내기

위에서 다룬 예제들은 하나의 모듈에서 몇 개의 함수들만 불러와 사용했는데 10개, 20개의 모듈에서 함수를 불러와 사용할 경우에는 어떻게 불러올까요?

```javascript
// main.js
import { func1 } from './module1.js';
import { someFunc1, someFunc2 } from './module2.js';
import { func3 } from './module3.js';
import { func4 } from './module4.js';
// import ..
// import ..
import { func20 } from './module20.js';
```

main.js에서 여러 함수를 20개의 모듈에서 불러오게 되면 코드가 길어지고 개발자에 따라 보기에 지저분할 수 있습니다.

<br>

### export .. from ..

<b>export from</b> 문을 사용하면 하나의 모듈에서 여러 함수, 변수 등의 엔티티들을 불러와 해당 모듈에서 모두 불러오고 내보낼 수 있습니다.

```javascript
// combinedModule.js
export { func1 } from './module1.js';
export { someFunc1, someFunc2 } from './module2.js';
// export .. from ..
export { func20 } from './module20.js';
```

그리고 함수들을 불러와 사용하는 모듈에서는 아래와 같이 사용할 수 있겠죠.

```javascript
import { func1, someFunc2, ... , func20 } from './combinedModule.js';
// 또는
import * as someNamespace from './combinedModule.js';
```

참고로 위 combinedModule.js는 아래와 동일하게 동작합니다.

```javascript
// combinedModule.js
import { func1 } from './module1.js';
export { func1 };
import { someFunc1, someFunc2 } from './module2.js';
export { someFunc1, someFunc2 };
// ..
import { func20 } from './module20.js';
export { func20 };
```

named export의 경우 위와 같이 작성할 수 있는데요, default export의 경우 조금 다릅니다.

```javascript
// user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}
// combinedModule.js
export User from './user'; // 에러
export { default as User } from './user'; // OK
// 또는
export { default } from './user'; // OK
```

그리고 불러오는 모듈에서 사용할 때는 아래와 같이 사용할 수 있겠죠.

```js
// main.js
import User from './combinedModule.js';
// 또는
import SomeOtherName from './combinedModule.js'; // 다른 이름으로 불러오기
// 또는
import { default as User } from './combinedModule.js'; // 명시적으로 불러오기
```

<br>

## 동적으로 모듈 가져오기

export과 import 문은 모듈 간 코드를 공유하고 코드 구조의 중심을 잡아주는 뼈대를 구축한다고 볼 수 있는데요, 브라우저는 import 문을 만나면 해당 모듈을 가져오기 전에 모든 의존성을 먼저 불러오고 번들러를 사용하는 경우 빌드 타임에 코드가 번들링 됩니다. 두 문은 정적으로 빌드 타임에 동작하기 때문에 런타임이나 조건부로 모듈을 불러올 수 없습니다.

모듈을 동적으로 불러오기 위해서는 <b>import()</b> 표현식을 사용합니다.

<br>

### import()

import() 문이 실행되면 모듈에서 내보내는 엔티티들을 객체로 담은 프로미스를 반환합니다.

```javascript
let path = prompt('모듈 경로를 입력하세요');
import(path)
  .then(obj => console.log('모듈 객체 : ', obj))
  .catch(err => console.log(err));
// 또는
let module = await import(modulePath);
```

동적으로 모듈을 불러올 때 다음과 같이 사용할 수 있겠죠.

```javascript
// index.html
<!doctype html>
<script>
  async function load() {
    const blog = await import('./blog.js');
    blog.hi(); // 안녕하세요.
    blog.bye(); // 안녕히 가세요.
  }
</script>
<button onclick='load()'>클릭</button>
// blog.js
export function getName() {
  console.log('moonkorea');
}
export function getUrl() {
  console.log('www.moonkorea.dev');
}
```

동적으로 불러올 때 모듈을 조건문에서도 사용할 수 있습니다.

```javascript
// main.js
const { getUrl } = await import('/blog.js');
if (condition) {
  getUrl();
}
```

import()를 사용해서 다수의 모듈을 동적으로 불러올 수도 있습니다.

```javascript
// main.js
const promises = Promise.all([
  import('/module1.js'),
  import('module2.js'),
]);
promises.then(res => console.log('promises:', res));
```

<br>

## 트리 쉐이킹

앞서 모듈을 불러올 때 네임스페이스를 사용해서 내보내진 모든 엔티티들을 한 번에 불러오는 것보다 구체적으로 불러올 엔티티들을 명시하는 것이 바람직하다고 했는데요, 네임스페이스를 활용하면 코드가 간결해지고 짧아지지만 몇 가지 트레이드오프가 있습니다 : 과도한 중첩, 네이밍, 트리 쉐이킹 등.

번들러를 사용해서 빌드 할 경우 번들러는 최종 번들에서 사용되지 않는 코드를 빌드 과정에서 제거하는 트리 쉐이킹 과정을 거치게 됩니다.

트리 쉐이킹은 사용되지 않는 코드를 제거하고 최종 번들의 크기를 최소화합니다. 사용되지 않는 변수, 함수 등의 코드는 번들링 과정에서 제거되고 브라우저가 다운로드 받아야 하는 리소스의 크기를 줄입니다.

> Webpack, Rollup 등 번들러는 모듈 간 의존성을 파악하고 하나 또는 여러 파일(번들)로 병합하고 최적화합니다. 이 과정에서 사용되지 않는 코드를 제거하고 최신 자바스크립트 문법을 다른 버전의 브라우저에서도 호환되게 변환하는 트랜스파일 과정 등의 번들링 작업을 수행합니다.

<br>

<img src="/assets/markdown-image/Javascript-모듈/웹팩.png" alt="웹팩" width="650" height="400"/>

<span>1.1 웹팩</span>

<br>

```javascript
// heavyModule.js
export function foo() {}
export function bar() {}
// ..
export function funcT() {}
// module1.js
import * as SomeNamespace from './heavyModule.js';
const result1 = SomeNamespace.foo();
const result2 = SomeNamespace.bar();
```

module1에서는 네이스페이스로 foo 함수와 bar 함수만 사용하고 있습니다. 실제로 모듈 간 의존성이 없는 코드도 최종 번들에 포함될 수 있어 트리 쉐이킹의 이점을 살리지 못할 수 있습니다.

> 출처
>
> - <a href="https://ko.javascript.info/import-export" target="_blank" rel="noopener">모듈 내보내고 가져오기 - javascript.info</a>
>
> - <a href="https://ko.javascript.info/modules-dynamic-imports" target="_blank" rel="noopener">동적으로 모듈 가져오기 - javascript.info</a>
