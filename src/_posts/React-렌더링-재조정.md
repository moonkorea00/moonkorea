---
title: '재조정'
category: '리액트'
excerpt: '리액트는 렌더링 간 효율적으로 DOM을 업데이트하고자 재조정 과정을 거치게 되는데요, 재조정이 무엇이고 어떤 경우에 재조정이 이루어지는지 알아봅니다.'
description: '리액트가 효율적으로 렌더링하는 방법'
tags: 'React.js, 렌더링'
date: '2023-08-24'
---

<b>TL;DR</b>

- 리액트는 재조정으로 두 가상 DOM 트리 간 최소한의 변경사항을 찾고 실제 DOM을 업데이트한다.
- DOM 요소와 컴포넌트의 타입에 따라 재조정은 다르게 동작한다.

<br>

&emsp;리액트는 상태가 변경될 때마다 전체 UI를 다시 렌더링하는 것처럼 개발자에게 보이지만 실제로는 최소한의 변경만으로 DOM을 업데이트하려고 합니다. 이 최소한의 변경과 비용으로 DOM을 업데이트하는 과정을 재조정(Reconciliation)이라고 하는데요, 재조정 과정에서 리액트는 이전의 가상 DOM 트리와 새로운 가상 DOM 트리를 비교해 실제 DOM에 어떤 변경이 필요한지를 판단합니다.

<br>

<div style="max-width:650px; margin: auto">

![재조정](/assets/markdown-image/React-렌더링-재조정/재조정-과정.png)

</div>

<span>1.1 재조정</span>

<br>

&emsp;이 두 DOM 트리 간 차이점을 찾는 단계에서 리액트의 비교(diffing) 알고리즘을 통해서 최소한의 연산만으로 실제 DOM을 업데이트하는 것이죠. 그러다면 리액트는 두 트리를 비교할 때 어떤 것들을 비교하고 그에 따라 어떤 변경 사항들을 실제 DOM에 반영하는지 살펴보겠습니다.

<br>

## 가상 DOM 비교 과정

&emsp;다음 컴포넌트 트리와 같은 코드가 있다고 가정하고 가상 DOM과 실제 DOM의 관점에서 렌더링 과정을 보겠습니다.

```jsx
index.js
function Content(props) {
  return <div className="child">{props.children}</div>;
}

function Footer() {...}

function Main() {
  return (
    <main style={{ backgroundColor: 'red' }}>
      <h1 className="title">Title</h1>
      <Content>
        <span>Some Content</span>
        // ..
      </Content>
      <Footer ... />
    </main>
  );
}
ReactDOM.render(<Main />, document.getElementById('root'));
```

앱이 실행되면 리액트는 주어진 컴포넌트 트리를 순회하면서 JSX를 변환하고 가상 DOM 노드를 생성하는데요, 생성된 가상 DOM 트리는 다음과 같이 만들어집니다.

<div style="max-width:600px; margin: auto">

![가상돔](/assets/markdown-image/React-렌더링-재조정/가상DOM.png)

</div>

<span>1.2 가상 DOM</span>

<details><summary><i>생성된 가상 DOM 객체 보기</i></summary>

- 가상 DOM 트리는 실제 DOM의 단순화된 자바스크립트 객체인데 간략하게 객체로 그려보면 다음과 같이 구성됩니다.

```javascript
index.js
const virtualDOM = {
  type: 'main', // 요소의 타입
  props: {
    style: { backgroundColor: 'red' }, // 요소의 속성
    // ..
  },
  children: [
    {
      type: 'h1',
      props: {
        className: 'title',
      },
      children: ['Title'],
      // ..
    },
    {
      type: Content, // 해당 컴포넌트의 함수 또는 클래스
      // ..
    },
    {
      type: Footer,
      // ..
    },
  ],
  // ..
};
```

</details>

가상 DOM 트리가 만들어지면 리액트는 이 가상 DOM을 사용해 모든 컴포넌트와 데이터가 반영된 실제 DOM을 생성하고 사용자는 초기 화면을 볼 수 있습니다.

앱이 실행된 후 사용자와 상호작용 등으로 상태 업데이트가 감지되면 리액트는 변화가 일어난 컴포넌트를 기준으로 재조정을 시작하고 새로운 가상 DOM을 생성합니다.

<div style="max-width:600px; margin: auto">

![가상돔](/assets/markdown-image/React-렌더링-재조정/변경된-가상DOM.png)

</div>

<span>1.3 새로운 가상 DOM</span>

<br>

리액트는 이전의 가상 DOM과 새로 생성된 가상 DOM을 비교하며 어떤 요소가 추가되었는지, 제거되었는지 그리고 변경되었는지를 판단합니다. 비교 과정을 통해 실제 DOM에 반영할 필요가 있는 최소한의 변경사항만 파악하는데요, 여러 상태 변경이 한 번에 발생하면 리액트는 일괄적으로 처리해서 실제 DOM에 반영합니다. 업데이트가 완료되면 사용자에게 최신의 화면이 그려지겠죠.

> 부모 컴포넌트가 렌더링되면 모든 자식 노드들을 재귀적으로 처리합니다. 이 문맥에서 "처리"라고 하는 것은 비교 과정에서 변경 사항들을 찾고 업데이트하는 것을 의미합니다.

앞서 리액트는 이전의 가상 DOM과 현재의 가상 DOM을 비교한다고 했는데 그 비교 과정은 어떻게 이루어질까요?

리액트가 재조정 과정에서 수행하는 비교 알고리즘은 두 가지의 가정하에 연산을 수행하는데요.

1. 서로 다른 타입의 두 요소는 서로 다른 트리 가져요.
2. Key를 사용해서 렌더 간 어떤 자식 요소들이 "안정적"일지를 알 수 있어요.

> 리액트 팀에 따르면 실제로 거의 모든 사용 사례에서 이 <a href="https://legacy.reactjs.org/docs/reconciliation.html#motivation" target="_blank" rel="noopener">가정</a>들은 들어맞습니다.

<br>

## DOM 요소의 타입이 다른 경우

&emsp;재조정 과정 중에 두 DOM 트리 요소의 타입이 다르면 리액트는 이전의 DOM 트리를 버리고 새로운 트리를 생성합니다.

상태에 따라 다른 요소를 출력하는 컴포넌트가 있다고 가정해 보겠습니다.

```jsx
Component.js
function Component() {
  const [isLarge, setIsLarge] = useState(false);
  return (
    <>
      {isLarge ? (
        <h1 className="largeTitle">Welcome</h1>
      ) : (
        <h3 className="smallTitle">Welcome</h3>
      )}
    </>
  );
}
```

상태에 따라 이전의 DOM 트리와 새로운 DOM 트리에서 각각 다른 가상 DOM 노드로 만들어지는데요.

<br>

<div style="max-width:500px; margin: auto">

![가상돔](/assets/markdown-image/React-렌더링-재조정/VDOM-다른타입요소.png)

</div>

<span>1.4 가상 DOM - 요소의 타입이 다른 경우</span>

<br>

두 가상 DOM 트리 비교 과정 중에 요소의 타입이 바뀌게 되면 이전 DOM 노드(h1 타입의 요소)는 모두 파괴되고 새로운 트리의 DOM 노드(h3 타입의 요소)로 업데이트됩니다.

만약 요소 아래 컴포넌트가 있다면 해당 컴포넌트는 언마운트됨과 동시에 가지고 있는 상태는 초기화되고 다시 마운트됩니다.

<br>

<div style="max-width:500px; margin: auto">

![가상돔](/assets/markdown-image/React-렌더링-재조정/가상DOM-다른타입-자식-컴포넌트.png)

</div>

<span>1.5 가상 DOM - 요소의 타입이 다른 경우</span>

<br>

<iframe height="300" style="width: 100%;" scrolling="no" title="reconciliation - different type" src="https://codepen.io/moonkorea00/embed/yLGBwdM?default-tab=result&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

<br>

## DOM 요소의 타입이 같은 경우

&emsp;앞서 리액트에서 재조정 과정은 최소한의 변경 사항만 실제 DOM에 반영한다고 했는데요, 재조정 과정 중에 두 DOM 트리 요소의 타입이 같으면 리액트는 두 요소의 속성을 비교하고 변경된 속성이 있으면 해당 속성들만 업데이트합니다.

요소의 타입이 다른 경우에는 DOM 노드를 파괴하고 새로 그렸었는데 타입이 같으면 동일한 내역은 유지한 채 변경된 값만 갱신합니다.

```javascript
전/후
// 상태 변경 전 가상 DOM 노드
{
  type: 'div',
  props: {
    className: 'container-large',
    style: {padding: '20px', border: '1px solid black'},
  }
}
// 상태 변경 후 가상 DOM 노드
{
  type: 'div',
  props: {
    className: 'container-small',
    style: {padding: '20px', border: '1px solid green'},
  }
}
```

위 예제에서는 요소의 타입이 둘 다 'div'로 동일하기 때문에 className과 style의 border 속성만 업데이트합니다.

<br>

## 같은 타입의 컴포넌트일 경우

&emsp;재조정 과정 중에 두 DOM 트리 컴포넌트의 타입이 같을 경우 최소한의 변경 사항만 실제 DOM에 반영하기 위해 컴포넌트의 props만 새로 업데이트합니다.

상태에 따라 props가 다른 컴포넌트가 있다고 가정해 보겠습니다.

```jsx
index.js
function Input({ placeholder }) {
  const [value, setValue] = React.useState('');
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={e => setValue(e.target.value)}
    />
  );
}

function Component() {
  const [isLarge, setIsLarge] = useState(false);
  return (
    <>
      {isLarge ? (
        <Input placeholder="안녕하세요" />
      ) : (
        <Input placeholder="hello" />
      )}
    </>
  );
}
```

리액트는 위 컴포넌트 트리를 읽고 DOM 노드를 다음과 같은 형태로 생성하는데요.

```javascript
전/후
// 상태 변경 전 가상 DOM 노드
{
  type: Input,
  props: {
    placeholder: '안녕하세요',
    // ..
  },
  // ..
}
// 상태 변경 후 가상 DOM 노드
{
  type: Input,
  props: {
    placeholder: 'hello',
    // ..
  },
  // ..
}
```

상태가 업데이트된 후에 생성된 DOM 노드의 타입은 그전과 동일한 참조 값인 Input 컴포넌트를 가리키기 때문에 동일한 내역은 유지한 채 props만 업데이트합니다. 앞서 다룬 "DOM 요소의 타입이 다른 경우"에서는 루트 요소의 타입이 바뀌면 컴포넌트가 언마운트되면서 상태값도 같이 파괴됐는데 "같은 타입의 컴포넌트의 경우"에는 컴포넌트가 언마운트되지 않고 렌더 간 상태가 유지됩니다.

<br>

<iframe height="300" style="width: 100%;" scrolling="no" title="reconciliation - same component type" src="https://codepen.io/moonkorea00/embed/BavBeRY?default-tab=result&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

DOM 요소의 타입이 다른 경우, DOM 요소의 타입이 같은 경우 그리고 컴포넌트의 타입이 같은 경우에 재조정이 어떻게 이루어지는지 알아봤는데요, <a href="https://www.moonkorea.dev/React-렌더링-재조정과-key" target="_blank" rel="noopener">이어지는 글</a>에서는 "key"를 사용했을 때 재조정이 어떻게 동작하는지 살펴보겠습니다.

> 출처 : <a href="https://legacy.reactjs.org/docs/reconciliation.html" target="_blank" rel="noopener">React Docs - Reconciliation</a>
