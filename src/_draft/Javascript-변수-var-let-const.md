---
title: '변수 var let const'
category: '자바스크립트'
excerpt: '변수는 하나의 값을 저장하기 위해 확보한 메모리 공간 또는 그 메모리 공간을 식별하기 위해 붙인 이름을 말합니다. 변수의 이름을 식별자라고도 합니다. 식별자는 어떤 값을 구별해서 식별할 수 있는 고유한 이름을 말하고 어떤 값을 구별하기 위해서 식별자는 값이 아니라 메모리 주소를 기억하고 있습니다.'
description: '선언, 할당, 스코프와 호이스팅의 관점에서 변수 간략하게 알아보기'
tags: 'ES6, 변수'
date: '2022-07-10'
---

&emsp;변수는 하나의 값을 저장하기 위해 확보한 **메모리 공간** 또는 그 메모리 공간을 식별하기 위해 붙인 **이름**을 말합니다. 변수의 이름을 **식별자**라고도 합니다. 식별자는 어떤 값을 구별해서 식별할 수 있는 고유한 이름을 말하고 **어떤 값을 구별하기 위해서 식별자는 값이 아니라 메모리 주소**를 기억하고 있습니다.

## 변수의 선언

변수의 선언은 변수를 생성하는 것을 말하고 구체적으로 하나의 값을 저장하기 위해 메모리 공간 자체를 확보한 뒤 변수 이름과 메모리 공간의 주소를 연결해 값을 저장하는 것입니다. 변수를 사용하려면 선언을 반드시 해야하고 선언에는 var, let, const 키워드가 사용됩니다.

> ### 변수의 생명주기
>
> 변수는 선언에 의해 생성되고 할당을 통해 값을 갖게 됩니다. 전역 변수의 생명주기는 앱의 생명주기와 동일하며 함수내부에서 선언된 지역변수는 함수가 호출되는 시점부터 종료되는 시점까지 유효합니다.

## var, let, const

&emsp;var, let, const는 전부 변수를 선언할때 사용하는 키워드입니다. 키워드란 자바스크립트 코드를 해석하고 실행하는 엔진이 수행할 동작을 규정한 명령어입니다. 자바스크립트 엔진은 키워드를 만나면 자신이 수행해야 할 약속된 동작을 수행하고 선언 키워드는 각각의 고유 특성을 갖습니다.

# var

## 변수 재선언 / 재할당 허용

&emsp;var로 선언된 변수는 같은 스코프 내에서 중복 선인이 허용됩니다. 다만 중복선언이 되면 값이 재할당되어 의도치않게 부작용을 발생시킵니다.

```js
function foo() {
  var varVariable = 20;
  var varVariable = 30;
  var varVariable = null;
  console.log(varVariable);
}
foo(); // null
```

## 함수 레벨 스코프

&emsp;var로 선언된 변수는 함수 레벨 스코프를 지역 스코프로 인정합니다.

```js
var varVariable = 20;
if (true) {
  var varVariable = 30;
}
console.log(varVariable); // 30;
```

## 변수 호이스팅

&emsp;var로 선언된 키워드는 **선언과 동시에 초기화 단계가 실행**이 되어 변수의 호이스팅이 일어납니다. 런타임(평가단계)에서 스코프에 등록되기 때문에 실행 단계에서 값이 할당되지 않더라도 undefined를 가지고 있습니다.

```js
// 선언과 초기화가 이루어집니다
console.log(varVariable); // undefined
varVariable = 10; // 할당이 이루어집니다
console.log(varVariable); // 10
var varVariable;
```

# let

## 변수의 재선언 금지 / 재할당 허용

&emsp;let 키워드는 var와 다르게 변수의 중복 선언이 허용되지 않습니다. 변수를 재선언할 경우 문법 에러가 발생합니다.

```js
let letVariable = 10;
letVariable = 20;
console.log(letVariable); // 20
let letVariable = 30; // SyntaxError: Identifier 'letVariable' has already been declared
```

## 블록 레벨 스코프

&emsp;let 키워드로 선언된 변수는 블록 레벨 스코프를 지역 스코프로 인정합니다.

```js
let foo = 10; // 전역 변수
{
  let foo = 20; // 지역 변수
  let bar = 30; // 지역 변수
}
console.log(foo); // 10
console.log(bar); // ReferenceError: bar is not defined
```

## 변수 호이스팅

&emsp;let으로 선언한 변수는 var로 선언된 변수와 달리 호이스팅이 발생하지 않는 것처럼 동작합니다. **let은 선언 단계, 초기화 단계 그리고 할당 단계가 분리되어 실행됩니다.** 선언 단계는 런타임(평가단계)에서 실행이 되지만 초기화 단계는 선언문에 도달했을때 실행이 됩니다.

```js
console.log(letVariable); // Uncaught ReferenceError: letVariable is not defined
let letVariable;
```

&emsp;let 키워드는 호이스팅이 발생하지만 코드를 선언하는 구문에 도달하기 전에는 변수를 사용할 수 없도록 동작합니다.

> ### 일시적 사각지대(Temporal Dead Zone)
>
> let 키워드로 변수의 선언 단계부터 초기화 단계(선언문)가 이루어지기 전까지 참조할 수 없는 구간을 **일시적 사각지대**라고 합니다.
>
> ```js
> // 런타임 이전에 선언 단계 실행
> console.log(letVariable); // Uncaught ReferenceError: letVariable is not defined
> let letVariable; // 선언문 도달에 초기화 단계 실행
> console.log(letVariable); // undefined
> letVariable = 10; // 할당문에 할당 단계 실행
> console.log(letVariable); // 10
> ```

<!-- </br> -->

<img src="/assets/markdown-image/Javascript-변수-var-let-const/tdz.png" alt="변수 일시적 사각지대 TDZ" width='650' height='270'>

<span>1.1 다시 처음부터 JavaScript || 변수생명주기, var, let, const 키워드, https://velog.io/@vlrtpfdkxm/다시-처음부터-JavaScript-스코프-nicii94x</span>

# const

## 변수의 재선언 / 재할당 금지

&emsp;const 키워드는 재선언과 재할당이 허용되지 않으며 **선언, 초기화, 할당 단계가 같이 실행**됩니다.

```js
const constVariable // SyntaxError: Missing initializer in const declaration.
const constVariable = 10 // 10
constVariable = 20  // TypeError: Assignment to constant variable
```

&emsp;const로 선언한 변수에 원시 값을 할당한 경우 변수 값을 변경할 수 없습니다. 이러한 특성을 활용해 const 키워드로 상수를 표현하는 데 사용됩니다.

```js
const DISCOUNT_RATE = 0.25;
let price = 1000;
let discountPrice = price * DISCOUNT_RATE;
```

> const는 let과 공통적인 특징이 많습니다. const로 선언하면 해당 식별자가 재할당되지 않을 것을 의미하기 때문에 반복문 등과 같이 변수의 값이 변할 경우 let을 사용하고 그 외 경우에는 const의 사용이 일반적으로 권고됩니다.

## 블록 레벨 스코프

&emsp;const로 선언된 변수는 반드시 선언과 동시에 초기화를 하지 않으면 문법 에러가 발생합니다.

## const와 객체

&emsp;const로 선언한 변수의 원시값을 할당한 경우 값을 변경할 수 없지만 변수에 객체를 할당한 경우 값을 변경할 수 있습니다.

```js
const constVariable = {
  name: 'john',
};
constVariable.name = 'jane';
console.log(constVariable.name); // 'jane'
```
