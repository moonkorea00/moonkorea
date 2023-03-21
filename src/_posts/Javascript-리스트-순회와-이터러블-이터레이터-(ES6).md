---
title: '리스트 순회와 이터러블, 이터레이터(ES6)'
category: 'Javascript'
excerpt: 'es6에서는 리스트를 어떻게 순회하는지 명령적으로 기술하기 보다는 선언적으로 리스트안에 있는 값들을 순회합니다. es6에서 for문이 어떤식으로 추상화돼있고 어떻게 이터러블 / 이터레이터라는 규약을 따르는지 알아보겠습니다.'
description: 'ES6에서 for문의 추상화 간략하게 훑어보기'
tags: 'Iterable, Iterator, ES6, 반복문'
date: '2022-12-08'
---

es6에서는 리스트를 어떻게 순회하는지 명령적으로 기술하기 보다는 선언적으로 리스트안에 있는 값들을 순회합니다.

es6에서 for문이 어떤식으로 추상화돼있고 어떻게 이터러블 / 이터레이터라는 규약을 따르는지 알아보겠습니다.

우선 es6에서 새로 추가된 원시타입인 Symbol에 대해 보겠습니다.

```js
// undefined
// Null
// Boolean
// Number
// String
// Object
// Symbol

typeof Symbol(); // 'symbol'

let id1 = Symbol('id');
let id2 = Symbol('id');
console.log(id1 == id2); // false
```

Symbol은 객체에 유니크한 속상을 만들어내기 위해서 추가됐습니다. 원래 객체의 속성 이름은 문자열로 표현했으나 심볼형 키를 사용했을 때 유일성이 보장되므로 객체의 원천인 코드, 현재 작성 중인 스크립트, 기타 라이브러리 등과 식별자가 충돌하지 않습니다.

Symbol은 결국 어떤 객체의 키로 사용될 수 있는데 간단한 배열 arr의 예시로 Symbol의 사용과 반복문 내부를 살펴보겠습니다.

```js
const arr = [1, 2, 3];
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
// 1 2 3

for (const a of arr) {
  console.log(a);
}
// 1 2 3
arr[0]; // 1
arr[1]; // 2
arr[2]; // 3

const set = new Set([1, 2, 3]);

for (const a of arr) {
  console.log(a);
}
// 1 2 3
set[0]; // undefined
set[1]; // undefined
set[2]; // undefined
```

원시적인 예시의 for문과 for of문은 동일한 값을 출력합니다. 그렇다면 for of문도 es5에서의 for문 처럼 키로 접근해서 리스트의 값을 조회하는 걸까요? arr 배열에 arr[0], arr[1], arr[2]는 순차적으로 1, 2, 3의 값을 반환합니다. 하지만 Set(Map도 동일)의 리스트 값은 undefined가 출력됩니다. es6에서의 for of문은 내부적으로 es6 이전의 for문이 리스트의 키와 해당하는 키와 매핑되는 값들을 순회하면서 동작하는 방식, 즉 리스트의 length만큼 루프를 돌면서 인수를 증가하며 인수의 초기값부터 한 번씩 해당하는 값의 키로 접근해서 value를 순회하는 방식대로 동작하지 않는 다는 것을 알 수 있습니다.

es6에서는 어떻게 다를까요?

MDN에 따르면 반복문 순회는 이터러블/이터레이터 프로토콜을 따른다고 합니다.

> 이터러블/이터레이터 프로토콜은 이터러블을 for of, 전개 연산자 등과 함께 동작하도록한 규약입니다.
>
> **이터러블**은 이터레이터를 리턴하는 [Symbol.iterator] ( )를 가진 값입니다.
>
> **이터레이터**는 { value, done } 객체를 반환하는 next( ) 를 가진 값입니다.

정의만 봐서는 동작 원리를 이해하기가 어려운거 같습니다. 이터러블이 뭐고 그 안에서는 무슨 값을 반환하고 어떻게 이터레이터랑 연결이 돼서 반복문이 동작하는지를 정의에 나온 코드의 결과값으로 순차적으로 살펴보겠습니다.

자바스크립트 이터러블은 순회 가능한 객체, 즉 [Symbol.iterator]를 가지고 있는 객체입니다. 코드에서 arr 배열이 이터러블이 되겠네요.

```js
const arr = [1, 2, 3];
arr[Symbol.iterator];
// f values() { [navtive code] }
```

arr[Symbol.iterator]에는 f values() { [navtive code] } 라는 함수가 들어 있네요. 이 함수의 값을 null로 비워보겠습니다.

```js
const arr = [1, 2, 3];
arr[Symbol.iterator];
// f values() { [navtive code] }

arr[Symbol.iterator] = null;

for (const a of arr) {
  console.log(a);
}
// Uncaught TypeError: arr is not iterable
```

[Symbol.iterator]의 값을 null로 할당하고 for문을 실행했더니 **arr is not iteratble**이라는 **TypeError**가 반환됩니다. 그렇다면 for of문의 동작에는 Symbol.iterator가 연관이 되어 있다고 추론이 가능하고 정의로만 이해하기에 어려웠던 순회 가능한 객체에 대한 설명도 이해가 됩니다.

반복문이 실행되고 [Sybmol.iterator] () 호출 이후에는 이터레이터를 반환합니다. 이터레이터는 next() 메소드를 가지고 있는 객체이며 이 내장 메소드는 순차적으로 원소들을 탐색하며 next()함수가 호출될 때마다 value : any와 done : boolean 키에 해당하는 값을 갖는 객체를 반환합니다.

```js
const arr = [1, 2, 3];
arr[Symbol.iterator];
// f values() { [native code]}

arr[Symbol.iterator]();
// Array Iterator {}

const iterator = arr[Symbol.iterator](); // 호출

iterator.next(); // 호출
// { value: 1, done: false}
iterator.next(); // 호출
// { value: 2, done: false}
iterator.next(); // 호출
// { value: 3, done: false}
iterator.next(); // 호출
// { value: undefined, done: true}
```

이터레이터에 next() 함수를 호출한 value의 값이 for of문을 실행했을 때 반환하는 값과 유사해 보입니다. 당연하게도 for of문으로 반환되는 리스트의 값들은 내부적으로 이터레이터가 반환하는 객체의 value 값입니다.

정의에 따르면 Array는 [Symbol.iterator]를 가지고 있습니다. 이 이터러블을 실행했을 때 이터레이터를 반환합니다. 이터레이터는 next()라는 메소드를 가지고 있고 이 이터레이터를 next() 메소드로 실행했을 때 value와 done 값을 갖는 객체를 반환합니다. 이터레이터라는 정의에 따라서 한 번 실행을 해보니 키와 매핑되는 값이 출력이 되고 마지막에 undefined의 value와 함께 true값의 done을 반환 하네요.

그렇다면 es6에서는 Array, Set, Map이 이터러블 / 이터레이터라는 프로토콜을 따른다고 하는데 무슨 말일까요?

정의만 보았을 때 이해하기 다소 어려웠으나 코드로 직접 실행을 해보니 Array에 [Symbole.iterator] ()를 호출하고 이터레이터의 next() 메소드 실행 결과에 따라 Array는 결국에 iterable이라는 것이 성립되고 이는 이터러테이터를 반환하기 때문에 for of문으로 순회할 수 있다... 따라서 이터러블 / 이터레이터 프로토콜을 따른다라는 말이 성립되네요.

<!-- 이터러블은 [symbol.iterator]()를 실행했을 때 이터레이터를 반환하게 돼있고 이터레이터는 value와 done을 갖는 객체를 next()를 통해서 반환 -->

정리를 해보자면 Array의 <b>[Symbol.iterator] ()</b>라는 내장 메소드로 결과를 평가해보면 이터러블의 [Symbol.iterator]은 f values() { [native code] }라는 함수를 가지고 있습니다. 평가 결과를 실행했을 때는 이터레이터인 Array Iterator {}가 반환됩니다. for of문의 동작 흐름과 함께 살펴보면 Iterator를 실행했을 때 반환되는 객체의 value값을 a에 담아서 결과를 출력하고 다음 value의 값을 출력하면서 순회하다가 마지막 순회에는 done의 값이 true가 되며 반복문에서 빠져나옵니다.

> set과 map 역시 마찬가지로 set[Symbol.iterator]로 전근하는 값과 map[Symbol.iterator]로 접근하는 내장 값이 있습니다.
>
> ```js
> const set = new Set([1, 2, 3]);
> set[Symbol.iterator];
> // f values() { [native code]}
> const setIterator = set[Symbol.iterator];
> setIterator.next();
> // { value: 1, done: false}
> setIterator.next();
> // { value: 2, done: false}
> setIterator.next();
> // { value: 3, done: false}
> iterator.next();
> // { value: undefined, done: true}
> const map = new Map([
>   ['a', 1],
>   ['b', 2],
>   ['c', 3],
> ]);
> map[Symbol.iterator];
> // f entries() { [native code]}
> ```
