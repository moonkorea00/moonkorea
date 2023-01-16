---
title: '자바스크립트에서 this에 대해'
category: 'Javascript'
excerpt: 'this는 모든 함수 스코프 내에 자동으로 생성되는 특수한 식별자이자 자기 자신이 속한 객체를 가리키는 식별자를 참조할 수 있는 키워드입니다. 처음 접할 때(물론 계속 접하더라도) 난해하지만 이름만큼은 직관적으로 지은 것 같습니다.'
description: '함수 호출 방법에 따른 this 바인딩'
tags: 'this'
date: '2023-01-04'
---

# 자바스크립에서 this에 대해

&emsp;this는 모든 함수 스코프 내에 자동으로 생성되는 특수한 식별자이자 자기 자신이 속한 객체를 가리키는 식별자를 참조할 수 있는 키워드입니다. 처음 접할 때(물론 계속 접하더라도) 난해하지만 이름만큼은 직관적으로 지은 것 같습니다. this는 대부분의 경우에서 언제나 객체를 가리키며 함수가 정의되는 시점이 아닌 **함수가 호출되는 시점**, 즉 <a href='https://www.moonkorea.dev/Javascript-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8' target="_blank">실행 컨텍스트</a>가 생성되는 평가 과정에서 값이 결정됩니다. 따라서 자바스크립트에서의 this는 다른 객체지향 언어들의 this와는 다르게 런타임에서 값이 동적으로 정해지기 때문에 간혹 혼란을 일으키는 존재로 다가오는 거 같습니다.

## this는 언제 정해질까요?

&emsp;일급 객체인 자바스크립트에서의 함수는 변수나 데이터에 저장을 하거나, 함수의 인수로 전달을 하거나, 함수의 반환 값으로도 사용될 수 있습니다. 이러한 특징들 때문에 자바스크립트에서의 함수는 다양한 환경과 상황에서 호출됩니다. 따라서 같은 함수라도 여러 가지 방식으로 호출될 수 있고 함수를 호출하는 대상과 호출하는 시점 등에 따라 this값은 런타임에서 동적으로 결정됩니다.

> 일급 객체란 다른 객체들에 일반적으로 적용 가능한 연산을 모두 지원하는 객체를 가리킵니다. 변수에 할당할 수 있고, 다른 함수를 인자로 전달받을 수 있고, 다른 함수의 결과로서 리턴될 수 있습니다.

```js
const someVariable = bar(); // 변수에 저장
function foo(bar) {
  // ..
} // 함수의 인자로 전달
function foo() {
  return foo;
} // 반환 값으로 사용
foo(); // 단독 호출
object.foo(); // 객체에 의해 호출
object2.foo(); // 객체에 의해 호출
```

함수는 단독으로 호출이 될 수도 있고 어떤 객체에 의해 호출이 될 수도 있기 때문에 **함수를 호출한 객체**라는 정의를 갖는 this는 같은 함수를 호출했음에도 불구하고 언제나 같은 값을 갖지는 않습니다.

자바스크립트에서 모든 함수는 this를 가지고 있고 함수가 호출되는 시점에 this가 가리키는 객체가 결정됩니다. 이렇게 함수가 호출되며 this값이 할당되는 것을 바인딩이라고 합니다. this값이 다양한 상황에서 함수가 호출되는 시점과 방식에 따라 어떤 값으로 바인딩 되는지 알아보겠습니다.

### 일반 함수 호출에서 this

&emsp;자바스크립트에서 this에 대한 참조는 소스코드 어느 곳에서든 가능합니다. 따라서 단독 실행되는 일반 함수로 호출된 this값은 언제나 **전역객체**(브라우저 환경에서는 window객체)를 가리키며 **기본 바인딩**이 적용됩니다. 엄격모드에서는 전역 객체가 바인딩 대상에서 제외되기 때문에 바인딩 될 객체가 없는 this는 undefined 값을 갖습니다.

```javascript
function foo() {
  console.log(this);
}
function fooInStrictMode() {
  'use strict';
  console.log(this);
}
foo(); // Window {0: Widnow, ...}
fooInStrictMode(); // undefined
window.fooInStrictMode(); // Window {0: Widnow, ...}

var name = 'moon';
console.log(this); // Window {0: Widnow, ...}
console.log(this.name); // moon
```

중첩함수, 콜백함수 등에서의 호출도 모두 일반 함수 호출로 동작합니다.

```javascript
function foo() {
  console.log(this); // Window {0: Widnow, ...}
  function bar() {
    console.log(this); // Window {0: Widnow, ...}
  }
  bar();
}
foo();
```

### 객체 메소드 호출에서 this

&emsp;일반 함수로 단독 호출되는 함수가 아닌 객체의 메소드로 호출이 될 경우 this는 **함수를 호출한 객체**를 값으로 **암시적으로 바인딩**됩니다.

```javascript
const object = {
  name: 'moon',
  foo: function () {
    console.log(this);
  },
};

object.foo(); // {name: 'moon', foo: ƒ}
```

this는 함수를 호출한 객체이기 때문에 this값은 object 객체를 가르킵니다.

&emsp;객체의 함수를 변수에 할당하거나 다른 함수의 인자로 전달해 호출하면 this는 같은 값을 보장하지 않습니다. 점연산자나 대괄호연산자로 객체에 접근하더라도 그 값은 참조되는 객체의 포로퍼티, 즉 일종의 포인터 역할을 해 함수의 참조값으로만 전달되기 때문에 일반 함수로 단독 실행됩니다.

> this값은 함수를 선언한 객체가 아닌 호출한 객체에 따라 결정됩니다.

```javascript
const object = {
  name: 'moon',
  foo() {
    console.log(this);
  },
};
function someFunc(cb) {
  return cb();
}
object.foo(); // {name: 'moon', foo: ƒ}
someFunc(object.foo); // Window {0: Widnow, ...}

const bar = object.foo;
bar(); // Window {0: Widnow, ...}
```

foo 함수를 콜백으로 전달받은 someFunc는 object 객체에서 foo 프로퍼티의 값만 전달받아 호출이 되기 때문에 someFunc가 호출되는 시점에서의 this값은 전역 객체로 바인딩됩니다.

object에 있는 foo 함수를 bar에 할당하여 호출하면 bar 함수를 호출한 대상은 더 이상 객체가 호출한 함수가 아닌 전역적으로 호출된 함수입니다. 따라서 this는 object.foo() 값이 가르키는 object 객체가 아닌 전역 객체를 가리킵니다.

&emsp;서두에 언급했듯 this는 실행 컨텍스트가 생성이 되는 평가 과정, 즉 호출 시점에서 값이 결정되기 때문에 this는 함수가 정의된 **위치**에 영향을 받지 않습니다.

```javascript
function foo() {
  console.log(this);
}
const object = {
  name: 'moon',
  foo,
};

object.foo(); // {name: 'moon', foo: ƒ}
foo(); // Window {0: Widnow, ...}
```

함수 foo는 object 객체가 정의되기 전에 선언이 되었고 object 객체에 프로퍼티로 값을 할당했으나 함수가 호출되는 시점에서 함수를 호출한 대상이 object 객체가 되기 때문에 this값은 함수가 정의된 위치에 영향을 받지 않습니다.

### 생성자 함수 호출에서 this

&emsp;자바스크립트 함수를 객체를 생성하는 생성자 함수로서 호출할 수 있습니다. 이 생성자 함수 내부에 this값은 생성자 함수로부터 만들어지는 **인터스턴스로 바인딩**됩니다.

```javascript
function User(name) {
  this.name = name;
}
const User1 = new User('moon');
console.log(User1.name); // moon
```

생성자 함수 User가 가리키는 this값은 new 연산자로 생성된 인스턴스를 가리킵니다. 따라서 this는 새로 생성한 객체로 반환된 인스턴스인 User1이 되고 인자로 전달받은 값이 생성된 객체 프로퍼티의 값으로 할당됩니다.

> new 연산자를 사용하지 않고 일반 함수로 호출이 되면 this값은 전연객체로 바인딩됩니다.

### apply, call, bind 메소드 호출에서 this

&emsp;함수를 호출하는 방법으로 직접적인 함수의 호출뿐만 아니라 Function.prototype의 메소드인 apply, call, bind 메소드로도 간접적으로 호출할 수 있습니다. 런타임에 동적으로 바뀌는 this값를 bind 메소드를 사용해서 호출하면 **명시적으로 바인딩**할 수 있습니다.

```javascript
function foo() {
  console.log(this);
}
const object = {
  name: 'moon',
  foo,
};
foo(); // Window {0: Widnow, ...}

const BindFoo = foo.bind(object);
BindFoo(); // {name: 'moon', foo: ƒ}
```

bind 함수는 인자로 값을 받고 this값이 정적으로 바인딩된 **새로운 함수**를 반환합니다. 이때 인자로 전달받은 값은 함수가 바라봐야 하는 this값이 됩니다.

> 한 번 바인딩 되어 반환된 함수를 다른 값으로 다시 바인딩하더라도 그 값은 무시되고 this는 처음 바인딩 된 값을 갖습니다.

&emsp;apply, call 메소드는 인자로 this값으로 사용할 객체와 원본 함수를 호출할 때 전달할 인자를 전달받아 **함수의 호출 결과**를 반환합니다.

```javascript
const object = {
  firstName: 'moon',
};
function logName(lastName) {
  console.log(`${this.firstName} ${lastName}`);
}
logName.apply(object, ['korea']); // moon korea
logName.call(object, 'korea'); // moon korea

function logArgs(a, b) {
  console.log(a, b);
}
logArgs.apply(null, [1, 2]); // 1 2
logArgs.call(null, 1, 2); // 1 2
```

> 메소드의 인자로 null값을 전달하고 호출하면 this값은 전역객체를 가리키며 기본 바인딩이 적용됩니다.

apply와 call 메소드로 외부함수의 this값을 내부함수의 this값과 일치하게 할당할 수도 있습니다.

```javascript
const object = {
  name: 'moon',
  foo() {
    function bar() {
      console.log(this);
    }
    bar();
  },
};
object.foo(); // Window {0: Widnow, ...}
const object = {
  name: 'moon',
  foo() {
    function bar() {
      console.log(this);
    }
    bar.call(this);
  },
};
object.foo(); // {name: 'moon', foo: ƒ}
```

> this값의 바인딩 우선순위는 new 바인딩, 명시적 바인딩, 암시적 바인딩, 기본 바인딩의 순서로 바인딩됩니다.

### 이벤트 처리기에서 this

&emsp;함수를 DOM요소에 이벤트 처리기로 사용할 때 this는 어떤 값으로 반환될까요?

```javascript
// html
<body>
  <button id="btn">click</button>
</body>;
// js
const button = document.getElementById('btn');
const returnValueOfThis = function (e) {
  console.log(e.target === this, this);
};

button.addEventListener('click', returnValueOfThis);
// 클릭 이벤트 발생
// true <button id="btn">click</button>
```

함수를 DOM요소에 이벤트처리기로 사용을 하면 this는 이벤트를 받은 HTML 요소를 값으로 갖습니다. HTML 요소인 button에 클릭 이벤트를 주고 클릭 이벤트가 발생했을 때 콜백함수로부터 반환되는 this값은 button 요소 자체가 됩니다.

### 화살표 함수에서 this

&emsp;function 키워드로 선언된 함수의 this값은 함수 호출 방식에 따라 동적으로 변하지만 화살표 함수는 자신의 this가 없습니다. 화살표 함수에서의 this는 함수가 **선언될 당시** 함수가 속해 있는 상위 스코프의 this값, 즉 렉시컬 스코프의 this값을 탐색해 계승받습니다.

> 렉시컬 스코프는 함수가 선언될 당시에 스코프가 결정되기 때문에 lexical this는 함수의 선언 시점에 따라 값이 정해집니다.

```javascript
function Person() {
  this.age = 45;

  setInterval(() => {
    this.age++; // this는 Person 객체를 참조
  }, 1000);
}
const olderPerson = new Person();
```
