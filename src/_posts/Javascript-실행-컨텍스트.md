---
title: '실행 컨텍스트'
category: 'Javascript'
excerpt: '실행 컨텍스트는 자바스크립트 코드의 실행부터 종료까지 전부 관리하기 때문에 자바스크립트에서 핵심 개념입니다. 브라우저는 자바스크립트 코드를 해석하고 실행하기에 앞서 자바스크립트가 실행될 수 있도록 특별한 환경인 실행 컨텍스트를 생성합니다.'
description: '자바스크립트 코드의 실행부터 관리와 종료까지'
tags: '렉시컬 환경, 클로저, 스코프, 호이스팅, this'
date: '2022-12-03'
---

# 실행 컨텍스트
&emsp;브라우저는 자바스크립트 코드를 해석하고 실행하기에 앞서 자바스크립트가 실행될 수 있도록 특별한 환경인 **실행 컨텍스트**를 생성합니다. 여기서 환경이란 변수, 객체, 함수, this 등 실행할 코드에 제공할 정보들을 모아놓은 객체를 의미하고 이러한 정보들을 실행 컨텍스트에 모아 두는 이유는 자바스크립트 엔진이 소스코드를 평가하고 실행하기 위함입니다. 이 중 식별자, 스코프, this 등은 실행 컨텍스트의 **렉시컬 환경**을 기반으로 관리가 되며 코드의 실행 순서는 **실행 컨텍스트 스택**을 통해서 관리가 됩니다. 실행 컨텍스트는 자바스크립트 코드의 실행부터 종료까지 전부 관리하기 때문에 자바스크립트에서 핵심 개념입니다.
실행 컨텍스트의 종류로는 크게 전역 실행 컨텍스트와 함수 실행 컨텍스트가 있습니다.

## 전역 실행 컨텍스트 (Global Execution Context)

&emsp;전역 실행 컨텍스트는 브라우저에서 자바스크립트 파일이 로드되고 코드가 처음 실행됐을 때 생성되는 디폴트 실행 컨텍스트입니다. 이 실행 컨텍스트에서는 전역에서 관리되는 값들(특정 함수나 객체에 담겨있지 않는 값)을 관리합니다. 자바스크립트 엔진은 단일 스레드로 실행되기 때문에 단 하나의 전역 환경을 갖습니다.

## 함수 실행 컨텍스트 (Functional Execution Context)

&emsp;함수 실행 컨텍스트는 함수가 **호출**이 됐을 때마다 생성되는 실행 컨텍스트이며 각 함수는 독립적인 실행 컨텍스트를 갖습니다. 모든 함수 실행 컨텍스트는 전역 실행 컨텍스트 코드에 대한 접근/참조가 가능합니다.

그 외에 eval 컨텍스트 등이 있습니다.

</br>

&emsp;그렇다면 위 두 실행 컨텍스는 어떻게 만들어지는 걸까요? 실행 컨텍스트의 **생성 과정**을 **실행 컨텍스트 스택**을 통해서 알아보겠습니다. 브라우저가 HTML 코드를 해석하다가 script 태그나 코드 내 onClick과 같은 attribute를 만나게 되면 제어 권한을 렌더링 엔진에서 자바스크립트 엔진에게 넘깁니다. 다음의 자바스크립트 코드를 예시로 자바스크립트 엔진이 소스코드를 해석한다고 가정해 보겠습니다.

```javascript
var a = 10; // a라는 변수를 선언하고 10의 값을 할당
function functionA() {
   // functionA 함수 선언
 console.log('Start function A'); // console.log 함수 호출
 functionB(); // functionB 함수 호출

 function functionB() {
    // functionB 함수 선언
  console.log('In function B'); // console.log 함수 호출
  }
 }
 functionA(); // functionA 함수 호출
 ```

</br>

<img src="/assets/markdown-image/Javascript-실행-컨텍스트/execution-context-stack.gif" alt="실행 컨텍스트 스택" width="700" height="300"/>

<span>1.1 실행 컨텍스트 스택, https://medium.com/@happymishra66/execution-context-in-javascript-319dd72e8e2c</span>

1. 초기의 실행 컨텍스트 스택은 비어있습니다.
2. 자바스크립트 코드가 실행이 되면 전역 실행 컨텍스트가 생성이 됩니다. 전역 실행 컨텍스트에서는 전역 스코프에 선언된 변수(변수 a)와 함수 등의 정의가 진행됩니다.
3. functionA가 호출되면서 functionA에 대한 함수 실행 컨텍스트가 생성되고 스택에 추가됩니다. functionB에 대한 평가와 실행이 진행됩니다.
4. functionB가 호출되면서 functionB에 대한 함수 실행 컨텍스트가 생성되고 스택에 추가됩니다.
5. functionB, functionA 함수 실행 컨텍스트가 순차적으로 스택에서 제거됩니다.
6. 전역 실행 컨텍스가 스택에서 제거됩니다.

&emsp;실행 컨텍스트는 스택이라는 자료구조로 만들어져 있기 때문에 콜스택과 동일한 구조를 가지고 있습니다. 실행 컨텍스트 스택은 먼저 들어오는 컨텍스트가 가장 마지막에 나가는 First In Last Out의 성질을 갖기 때문에 소스코드 실행 초기에 전역 실행 컨텍스트가 생성이 되고 함수가 **호출되는 시점**마다 함수 실행 컨텍스트가 생성이 되면서 함수의 동작이 완료되면 순차적으로 스택에서 제거가 되고 최종적으로 모든 코드의 실행이 종료되면 전역 실행 컨텍스가 스택에서 제거됩니다. 이처럼 자바스크립트 엔진은 실행 컨텍스트 스택을 유지하면서 코드의 실행 순서를 파악하고 코드의 실행이 종료되면 어느 코드로 돌아가서 동작을 이어가야 하는지를 관리합니다.

실행 컨텍스트 스택을 통해서 실행 컨텍스트의 생성 과정을 알아보았다면 실행 컨텍스트 종류별로 세부적인 생성과 관리 과정에 대해 살펴보겠습니다.

자바스크립트 엔진은 **평가 과정**과 **실행 과정**을 통해서 모든 실행 컨텍스트를 생성하고 관리합니다.

## 평가과정(Creation Phase)

&emsp;실행 컨텍스트의 평가 과정에서는 자바스크립트 엔진이 실행 컨텍스트를 생성하고 변수와 함수의 식별자를 실행 컨텍스트에 등록(호이스팅)을 합니다. 다시 말해 평가 과정에서는 자바스크립트 코드를 읽고 컴파일 과정을 거치면서 변수, 함수 등의 선언문을 파악하되 코드를 실행하지는 않습니다.

## 실행 과정(Execution Phase)

&emsp;실행 컨텍스트의 실행 과정에서는 자바스크립트 엔진이 소스코드를 실행합니다. 이 과정에서는 소스코드 실행에 필요한 변수나 함수의 참조값을 실행 컨텍스트에서 탐색을 하고 변수값의 변경 등은 다시 실행 컨텍스트에 등록됩니다.

다음 코드가 실행될 때 평가 과정에서 생성되는 전역 실행 컨텐스트와 함수 실행 컨텍스트 내부에는 어떤 프로퍼티들이 있고 어떤 형태로 구성돼있는지 보겠습니다.

``` javascript
var x = 10;
const a = '20';
function funcA() {
   const b = '30';
 funcB();

 function funcB() {
    const c = 'c';
  console.log(`funcB ran, var x : ${x}`);
  }
 }

funcA();
```

먼저 자바스크립트 코드가 실행되면서 **전역 객체**가 생성이 됩니다.

```javascript
const global = {
   console: {
   log() {},
 },
};
```

전역 객체는 자바스크립트에 기본적으로 포함돼 있는 빌트인 객체(Math, Date, Object, Array 등), 함수를 포함합니다. 개발자가 따로 선언하지 않고 Math, Object, String 등의 내장 객체를 즉시 사용할 수 있는 이유가 실행 컨텍스트 생성 초기에 전역 객체가 만들어지기 때문입니다.

전역 객체가 생성되면 전역 코드가 평가되며 <b>Global Execution Context(전역 실행 컨텍스트)</b>가 생성되고 내부에 **Global Lexical Environment**가 생성됩니다. 자바스크립트 엔진은 **Lexical Environment**에서 변수, 함수의 정의와 값들을 저장하고 스코프를 관리하는 역할을 수행합니다.

**평가 과정**에서는 **식별자를 생성**, **this값 binding** 그리고 **참조할 외부 환경을 결정**합니다.

Lexical Environment는 크게 두가지 프로퍼티를 갖습니다:

1. Environment Record : 식별자를 등록하고 관리하는 역할을 합니다.
2. Outer Lexical Environment Reference : 상위의 스코프를 참조하는 역할을 수행합니다. 지역 스코프에서 식별자를 찾을 수 없다면 상위 Lexical Environment를 참조해 식별자를 탐색합니다. 전역 환경에서는 null입니다.

그중 Global Lexical Environment에서의 Environment Record는 두 가지 프로퍼티를 갖습니다:

1. Declarative Environment Record : let, const로 선언한 변수를 관리합니다.
2. Object Environment Record : 그 외 var, 전역 함수, 빌트인 프로퍼티 등을 관리합니다.

```javascript
const global = {
   console: {
   log() {},
 },
 x: undefined, // var로 선언하여 선언과 초기화까지 이루어집니다.
 funcA: '<function object>', // funcA가 평가됩니다.
};

const GlobalExecutionContext = {
   GlobalLexicalEnvironment: {
   GlobalEnvironmentRecord: {
   ObjectEnvironmentRecord: {
   BindingObject: global, // 전역 객체를 참조합니다.
 },
 DeclarativeEnvironmentRecord: {
   a: '<uninitialized>', // 초기화전까지 TDZ에 빠지게 됩니다.
 },
 },
 },
};
```

전역 실행 컨텍스트가 생성되면서 ObjectEnvironmentRecord와 DeclarativeEnvironmentRecord가 만들어졌습니다.

**ObjectEnvironmentRecord**의 BindingObject 프로퍼티는 전역 객체(global)를 참조합니다. var로 선언된 변수, 전역 함수 등은 BindingObject를 통해서 전역 객체의 프로퍼티에 등록되게 됩니다.

**DeclarativeEnvironmentRecord**에서는 식별자와 값을 직접적으로 연결해 주는 함수와 변수 선언, 즉 const로 선언된 a 식별자에 대한 정보가 등록됩니다. let과 const의 성질에 따라 선언과 초기화 과정이 분리돼서 실행되기 때문에 초기화 전까지는 접근할 수 없고 TDZ에 빠지게 됩니다.

평가 과정에서의 식별자 생성 단계를 마쳤습니다.

이제 **this 값에 대한 참조가 결정**됩니다.

```javascript
const GlobalExecutionContext = {
   GlobalLexicalEnvironment: {
   GlobalEnvironmentRecord: {
   ObjectEnvironmentRecord: {
   BindingObject: global,
 },
 DeclarativeEnvironmentRecord: {
   a: '<uninitialized>',
 },
 GlobalThisValue: global, // 전역 코드의 this는 global을 가리킵니다.
 },
 },
};
```

전역 실행 컨텍스트에서 this 값에 대한 참조는 GlobalThisValue라는 프로퍼티에 저장됩니다. 전역 코드의 this는 전역 객체를 가리키기 때문에 GlobalThisValue는 global이 됩니다.

평가 과정에서의 this 값이 결정됐습니다. 마지막으로 **외부 환경에 대한 참조가 결정**됩니다.

전역 실행 컨텍스트에서의 스코프는 최상위의 스코프이기 때문에 외부 환경에 대한 참조값은 null입니다.

```javascript
const GlobalExecutionContext = {
   GlobalLexicalEnvironment: {
   GlobalEnvironmentRecord: {
   ObjectEnvironmentRecord: {
   BindingObject: global,
 },
 DeclarativeEnvironmentRecord: {
   a: '<uninitialized>',
 },
 GlobalThisValue: global,
 },
 OuterLexicalEnvironmentReference: null, // 전역 상태에서는 null 입니다.
 },
};
```

전역 실행 컨텍스트에서의 평가 과정이 모두 완료되고 자바스크립트 엔진은 실행 과정으로 넘어갑니다. 실행 과정에서는 식별자들에 대한 값들이 할당됩니다.

```javascript
const global = {
   console: {
   log() {},
 },
 x: 10,
 funcA: '<function object>',
};

const GlobalExecutionContext = {
   GlobalLexicalEnvironment: {
   GlobalEnvironmentRecord: {
   ObjectEnvironmentRecord: {
   BindingObject: global,
 },
 DeclarativeEnvironmentRecord: {
   a: '20',
 },
 GlobalThisValue: global,
 },
 OuterLexicalEnvironmentReference: null,
 },
};
```

실행 과정을 통해서 전역 객체에 있는 전역 변수에 대한 값이 할당되고 Declarative Environment Record에서 관리되는 식별자에 대한 값도 할당됐습니다.

자바스크립트 엔진은 이어서 소스코드를 실행합니다.

``` javascript
var x = 10;
const a = '20';
function funcA() {
   const b = '30';
 funcB();

 function funcB() {
    const c = 'c';
  console.log(`funcB ran, var x : ${x}`);
  }
 }

funcA();
 ```

자바스크립트 코드를 실행하던 중 funcA 함수가 호출이 됩니다. 서두에 언급했듯 브라우저는 함수가 **호출**이 될 때 함수 실행 컨텍스트를 생성하고 스택에 추가합니다.

함수 실행 컨텍스트의 Lexical Environment Record에서는 **Function Environment Record**가 생성됩니다. Function Environment Record에서는 함수 내부에서 생성된 지역 변수, 함수, 매개변수가 저장됩니다.

```javascript
const FuncAFunctionExecutionContext = {
   LexicalEnvironment: {
   FunctionEnvironmentRecord: {
   // 지역 변수, 함수, 매개변수가 등록됩니다.
 b: '<uninitialized>',
 funcB: '<function object>',
 ThisValue: global, // this값은 전역 객체를 가리킵니다.
 },
 OuterEnvironmentReference: GlobalExecutionContext.GlobalLexicalEnvironment, // 외부 환경 참조값은 전역 실행 컨텍스트의 Lexical Environment가 됩니다.
 },
};
```

함수 실행 컨텍스트 생성 과정에서도 동일하게 변수에 대한 정보, this 값, 외부 환경에 대한 참조가 결정됩니다. 내부에서 함수의 this 참조값은 함수가 호출되는 상황에 따라 결정되기 때문에 funcA는 일반 함수로 호출되었으므로 this 값은 전역 객체(global)을 가리킵니다.

<!-- TODO : this 결정 시점에 대한 설명 -->

전역 실행 컨텍스트에서 외부 환경 참조값은 전역 객체를 가리켰는데 함수 실행 컨텍스트의 외부 환경 참조값은 **해당 함수가 평가될 시점에서 실행중인 실행 컨텍스트입니다**. funcA 함수는 전역 실행 컨텍스트가 실행됐을 때 평가되었으므로 funcA의 외부 환경 참조값은 전역 실행 컨텍스트의 Lexical Environment가 됩니다.

함수의 실행 컨텍스트는 그 함수의 호출 시점에서 결정이 되지만 **함수의 외부 환경 참조값은 호출 시점이 아닌 평가 시점에 따라 결정됩니다**. 다시 말해 자바스크립트 엔진은 함수 정의를 평가하여 함수 객체를 생성할 때 실행중이던 실행 컨텍스트의 Lexical Environment를 함수 객체 내부 슬롯 [[Environment]]에 저장하고 함수의 외부 환경 참조값은 함수 객체 내부 슬롯 [[Environment]]에 저장된 Lexical Environment에 대한 값이 됩니다. 따라서 **클로저**의 동작 원리에 의해서 실행 컨텍스트 스택에서 실행 컨텍스트가 제거가 되더라도 Lexical Environment는 참조가 되며 참조값이 유지가 됩니다.

> 실행 컨텍스트와 렉시컬 환경은 별도의 객체입니다. 렉시컬 환경은 실행 컨텍스트에서 참조하고 있지만 실행 컨텍스트가 제거가 되더라도 렉시컬 환경이 참조가 되고 있다면 렉시컬 환경은 가비지 컬렉팅 대상에서 제외가 됩니다.

```javascript
const FuncAFunctionExecutionContext = {it add
 LexicalEnvironment: {
   FunctionEnvironmentRecord: {
   b: '30',
 funcB: '<function object>',
 ThisValue: global,
 },
 OuterEnvironmentReference: GlobalExecutionContext.GlobalLexicalEnvironment,
 },
};
```

funcA에 대한 평가 과정이 끝나며 실행 과정에서 식별자에 대한 값이 할당됩니다. funcA 함수의 실행 과정에서 funcB 함수가 호출되었으므로 funcB 함수에 대한 함수 실행 컨텍스트도 생성됩니다.

```javascript
const FuncAFunctionExecutionContext = {
   LexicalEnvironment: {
   FunctionEnvironmentRecord: {
   b: '30',
 funcB: '<function object>',
 ThisValue: global,
 },
 OuterEnvironmentReference: GlobalExecutionContext.GlobalLexicalEnvironment,
 },
};

const FuncBFunctionExecutionContext = {
   LexicalEnvironment: {
   FunctionEnvironmentRecord: {
   c: 'c',
 ThisValue: global,
 },
 OuterEnvironmentReference: FuncAFunctionExecutionContext.LexicalEnvironment,
 },
};
```

funcB 함수에 대한 함수 실행 컨텍스트가 생성되고 실행 컨텍스트 콜스택에 추가됩니다.

평가 과정이 완료되고 실행 과정 단계에서 console.log 함수가 실행됩니다. funcB의 지역 스코프에는 console 객체에 대한 정의가 없어 funcB 함수 실행 컨텍스트의 OuterEnvironmentReference 프로퍼티 참조값에 접근해 상위의 스코프인 FuncAFunctionExecutionContext의 Lexical Environment에서 식별자를 탐색합니다. 상위 스코프에도 식별자에 대한 정보가 없기 때문에 자바스크립트 엔진은 순차적으로 **스코프 체인**을 타고 외부 함수 참조값에 접근하며 해당 식별자를 찾습니다. console 객체는 전역 객체를 BindingObject로 참조하고 있는 전역 실행 컨텍스트에서 참조할 수 있기 때문에 최종적으로 전역 실행 컨텍스트 내부에서 식별자 정보를 찾아 console 객체의 log 메소드를 실행합니다. 

이러한 외부 환경 참조값의 동작 원리를 통해서 자바스크립트 스코프가 형성되고 만약 최상위 스코프인 전역 객체까지 도달해서 참조값이 null이 되면 ReferenceError를 반환합니다.

> ### 함수 내부에 중첩 호출
> &emsp;실행 컨텍스트는 함수 호출 한 번 당 하나의 실행 컨텍스트가 생성됩니다. 함수 내부에 중첩 호출이 발생했을 때는 현재 함수의 실행이 일시 중지되고 중지된 함수와 연관된 실행 컨텍스트는 실행 컨텍스트 스택에 저장됩니다. 중첩 호출의 실행이 끝나면 자바스크립트 엔진은 스택에서 중단된 함수의 실행 컨텍스트를 불러오고 다시 실행을 이어갑니다.

&emsp;정리하자면 실행 컨텍스트는 함수 실행에 대한 세부 정보를 담고 있는 내부 데이터 구조이고 식별자의 현재 값, this 값등이 컨텍스트에 저장됩니다. 자바스크립트 엔진은 스코프와 클로저의 동작 원리에 따라 전역 실행 컨텍스트와 함수 실행 컨텍스트를 생성해 평가 과정과 실행 과정을 거치면서 자바스크립트 코드가 실행될 수 있는 환경을 제공합니다.

