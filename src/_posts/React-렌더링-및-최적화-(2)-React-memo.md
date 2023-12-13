---
title: 'React.memo'
category: '리액트'
excerpt: '컴포넌트의 상태가 업데이트될 경우 해당 컴포넌트와 하위에 있는 모든 컴포넌트들은 모두 리렌더링됩니다. 해당 컴포넌트의 상태가 변했을 때는 변경된 상태에 맞게 UI가 다시 그려지는 것이 당연한 것인데 하위 컴포넌트의 props가 변하지 않았을 경우 불필요하게 새로운 함수를 호출하기 보다 초기 렌더링에서 저장한 값을 재사용하는 것이 효율적입니다.'
description: '컴포넌트 캐싱'
tags: 'React.js, 렌더링'
date: '2022-11-23'
---

&emsp;앞서 <a href="https://www.moonkorea.dev/React-%EB%A0%8C%EB%8D%94%EB%A7%81-%EB%B0%8F-%EC%B5%9C%EC%A0%81%ED%99%94-(1)" target=”_blank”>React 렌더링</a>에서 설명했듯 상태가 업데이트될 경우 해당 컴포넌트와 하위에 있는 모든 컴포넌트들은 모두 리렌더링됩니다. 해당 컴포넌트의 상태가 변했을 때는 변경된 상태에 맞게 UI가 다시 그려지는 것이 당연한 것인데 하위 컴포넌트의 props가 변하지 않았을 경우 불필요하게 새로운 함수를 호출하기 보다 초기 렌더에 저장한 값을 재사용하는 것이 효율적입니다.

```js
const Component = () => {
  const [message, setMessage] = React.useState('');
  return (
    <>
      <ChildOne message={message} />
      <ChildTwo /> // message 상태가 업데이트될 때마다 ChildTwo 컴포넌트도 리렌더링
      됩니다.
    </>
  );
};
```

<br>

## memo

React.memo는 컴포넌트를 인자로 받아서 컴포넌트를 리턴하는 컴포넌트(HOC)입니다. 함수 컴포넌트를 React.memo로 감싼 후 이전 props와 다음 렌더링에 사용될 props의 변화가 없을 경우 캐싱된 컴포넌트의 결과값을 반환합니다.

```js
const Component = () => {
  const [message, setMessage] = useState('');
  return (
    <>
      <ChildOne message={message} />
      <ChildTwo /> // props가 message 상태에 의존하지 않고 변화 또한 없기 때문에
      리렌더링이 발생하지 않습니다.
    </>
  );
};

const ChildTwo = React.memo(() => {
  return <div>ChildTwo</div>;
});
```

React.memo는 어떻게 이전 props와 다음 props를 비교할까요? React.memo는 두 props를 <b>얕은 비교</b>를 해서 동일한지 아닌지를 판단합니다. 만약 이 비교 로직을 사용하지 않고 비교 로직을 변경하거나 조건을 추가하고자 할 때는 React.memo의 두 번째 인자로 변화 여부를 판단하는 함수를 받을 수 있습니다.

```js
const ChildTwo = React.memo((props) => {
  return (
    <div>ChildTwo</div>
  );
},{ (prevProps, nextProps) => {
  if (prevProps.data === nextProps.data) {
    return true; // true일 경우 리렌더링이 발생하지 않습니다.
  }
  return false; //  false일 경우 리렌더링이 발생합니다.
});
```

</br>

## Memoization의 주의사항과 잘못된 사용

&emsp;React.memo의 기능을 처음 접할 때 memo의 사용만으로 렌더링 최적화를 할 수 있으면 "memoization이 필요한 모든 컴포넌트를 memo로 감싸도 되지 않을까?" 더 나아가 "리액트 내부적으로 모든 컴포넌트를 memoize하지 왜 개발자로 하여금 memoize하게 했을까?" 라고 생각할 수 있겠으나 Dan Abramov에 따르면,

> "Shallow comparisons aren't free. They're O(prop count). And they only buy something if it bails out.
> All comparisons where we end up re-rendering are wasted. Why would you expect always comparing to be faster? Considering many components always get different props."

간단히 말해 React.memo는 이전 props와 새로운 props를 얕은 비교하기 때문에 비용이 아예 들지 않는 작업이 아닙니다. 더 나아가 많은 컴포넌트들이 대부분의 경우 매번 다른 prop을 전달받기 때문에 <b>렌더링에 소요되는 시간 + 비교에 소요되는 시간</b>이 오히려 리렌더링의 소요시간을 늘리는 격이 되기 때문에 memo의 사용에 있어 충분히 이해하고 신중히 사용해야 합니다.

```js
// 전달받는 prop이 바뀌게 될 경우 오히려 렌더링 소요시간이 늘어 퍼포먼스가 저하됩니다
초기 렌더링 - 20ms 소요
최적화된 렌더링 - 5ms 소요
리렌더링 - 25ms 소요
리렌더링 - 25ms 소요
리렌더링 - 25ms 소요
```

모든 최적화 기술에는 그만큼의 비용이 따르곤 하는데요, React.memo도 예외는 아닙니다. 얕은 비교를 통해 이전과 현재의 props를 비교하고 캐싱하기 때문에 리소스가 안 드는 것은 아닙니다.

### children

자식 컴포넌트에서 children을 사용하는 경우, children의 변경은 항상 해당 컴포넌트의 렌더링을 발생시킵니다.

```jsx
const ParentComponent = () => {
  return <MemoizedChildComponent>Hello, World!</MemoizedChildComponent>;
};

const MemoizedChildComponent = React.memo(({ children }) => {
  console.log('Child rendered');
  return <div>{children}</div>;
});
```

위의 예제에서, ParentComponent가 렌더링될 때마다 MemoizedChildComponent도 렌더링됩니다, children이 바뀌었기 때문이죠.

### 비순수 함수

비순수 함수, 예를 들어 Math.random()이나 new Date()와 같이 호출될 때마다 다른 값을 반환하는 함수는 컴포넌트의 안정적인 렌더링을 방해합니다.

```jsx
const DateComponent = () => {
  return <MemoizedDisplay time={new Date()} />;
};

const MemoizedChildComponent = React.memo(({ time }) => {
  console.log('Child rendered');
  return <div>{time.toString()}</div>;
});
```

위의 예제에서, DateComponent가 렌더링될 때마다 new Date()의 값이 바뀌므로, MemoizedChildComponent 계속해서 렌더링됩니다.

### 참조 값

부모 컴포넌트로부터 참조 타입의 값들을 props로 전달받을 경우, 부모 컴포넌트의 렌더링 때마다 이 값이 바뀝니다.

```jsx
const ParentComponent = () => {
  const handleClick = () => {
    console.log('Button clicked');
  };
  const data = {
    label: 'click me',
  };
  return <MemoizedButton clickHandler={handleClick} data={data} />;
};

const MemoizedButton = React.memo(({ clickHandler, data }) => {
  console.log('Button component rendered');
  return <button onClick={clickHandler}>{data.label}</button>;
});
```

ParentComponent가 렌더링될 때마다 함수와 객체의 참조가 바뀌므로, MemoizedButton 컴포넌트도 계속해서 렌더링됩니다. useCallback이나 useMemo를 사용하여 함수와 객체의 동일한 참조 값으로 memo를 사용할 수 있습니다.
