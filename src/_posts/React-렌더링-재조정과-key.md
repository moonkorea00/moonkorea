---
title: 'React가 고유한 key를 권장하는 이유'
category: '리액트'
excerpt: '리액트는 렌더링 간 효율적으로 DOM을 업데이트하고자 재조정 과정을 거치게 되는데요, 재조정에서 key의 역할과 key 값으로 인덱스의 사용을 지야하는 이유에 대해 알아봅니다.'
description: '재조정에서 key의 역할과 key 값으로 인덱스의 사용을 지양하는 이유'
tags: 'React.js, 렌더링'
date: '2023-08-25'
---

> 본 글은 <a href="https://www.moonkorea.dev/React-렌더링-재조정" target="_blank" rel="noopener">재조정 글</a>에서 이어는 글 입니다.

<b>TL;DR</b>

- 자식 요소에 고유한 key를 부여하면 재조정 과정을 효율적으로 수행할 수 있다.
- 상태를 갖는 컴포넌트가 인덱스를 key 값으로 사용할 경우 의도치 않은 결과로 이어질 수 있다.

<br>

## 자식 요소에 대한 재귀적 처리

&emsp;재조정 과정은 이전 가상 DOM과 새로운 가상돔을 비교해서 변경된 부분을 실제 DOM에 업데이트하는 과정이라고 헀는데요, 이는 최소한의 변경 사항만 파악하고 실제 DOM에 반영하기 위함입니다. DOM 노드의 자식 요소들을 재귀적으로 처리할 때에도 마찬가지로 리액트는 이전 DOM 트리와 새로운 DOM 트리를 비교합니다.

아래 코드를 가상 DOM 트리로 변환하면 다음 그림과 같은데요.

```jsx
전/후
// 전
<ul>
  <li>첫째</li>
  <li>둘째</li>
</ul>
// 후
<ul>
  <li>첫째</li>
  <li>둘째</li>
  <li>셋째</li> // 추가
</ul>
```

<br>

<div style="max-width:500px; margin: auto">

![DOM의 재귀척 처리](/assets/markdown-image/React-재조정과-key/정상-재조정.png)

</div>

<span>1.1 자식 요소에 대한 재귀적 처리</span>

<br>

리액트는 두 리스트의 가상 DOM 트리를 다음과 같은 순서로 비교하고 재조정 과정을 거치게 됩니다.

1. 첫 번째 &lt;li&gt; 요소 "첫째"를 비교하고 동일하다고 판단합니다. 변경사항이 없습니다
2. 두 번째 &lt;li&gt; 요소 "둘째"도 이전 DOM 노드와 동일하므로 역시 변경사항이 없습니다
3. 새로운 &lt;li&gt; 요소 "셋째"를 발견합니다. 리액트는 이를 새로운 요소로 판단하고 실제 DOM에 이 요소를 추가합니다

위 재조정 과정에서는 &lt;li&gt;첫째&lt;/li&gt;와 &lt;li&gt;둘째&lt;/li&gt;가 두 트리에서 일치하고 새로운 요소만 추가되기 때문에 성능상 효율적으로 DOM이 업데이트됩니다.

리스트의 첫 번째 children 요소로 &lt;li&gt;셋째&lt;/li&gt;를 추가하는 경우의 재조정 과정은 어떨까요?

```jsx
전/후
// 전
<ul>
  <li>첫째</li>
  <li>둘째</li>
</ul>
// 후
<ul>
  <li>셋째</li> // 추가
  <li>첫째</li>
  <li>둘째</li>
</ul>
```

<br>

<div style="max-width:500px; margin: auto">

![DOM의 재귀척 처리](/assets/markdown-image/React-재조정과-key/비효율적-재조정.png)

</div>

<span>1.2 비효율적인 재조정 과정</span>

<br>

1. 첫 번째 &lt;li&gt; 요소를 비교하고 "첫째"와 "셋째"가 다르므로 리액트는 첫 번째 요소를 업데이트합니다
2. 두 번째 &lt;li&gt; 요소를 비교하고 "둘째"와 "첫째"가 다르므로 두 번째 요소를 업데이트합니다
3. 새로운 &lt;li&gt; 요소 "둘째"를 발견하고 DOM에 새 요소를 추가합니다

첫 예제에서 리액트는 &lt;li&gt;첫째&lt;/li&gt;와 &lt;li&gt;둘째&lt;/li&gt; 두 노드를 유지(가상 DOM 트리 간 변경 사항이 없다고 판단) 하고 하나의 자식 &lt;li&gt;셋째&lt;/li&gt;을 마지막에 추가했는데요, 두 번째 예제에서 리액트는 두 DOM 트리를 비교할 때 모든 자식이 다른다고 판단하기 때문에 전부 실제 DOM에 업데이트합니다.

위와 같이 종속 트리를 유지하지 않고 변경 사항이라고 판단되는 패턴이 앱 전반적으로 반복되면 성능상 비효율적입니다. 우리는 리액트에게 새로운 가상 DOM 트리에서 DOM 노드가 변하지 않았다는 것을 알려 줄 수 있습니다.

<br>

## 재조정과 key

반복되는 자식 요소들이 있을 때 리스트를 순회하면서 자식 요소를 동적으로 생성하는데요.

```jsx
List.js
const data = [1, 2, 3];

function List() {
  return (
    <>
      {data.map(data => (
        <Item data={data} />
      ))}
    </>
  );
}
```

린터를 사용하거나 브라우저의 개발자 도구를 보면 각 자식 요소에 "key" prop이 필요하다고 알려줍니다. 리액트는 배열을 순회하며 동적으로 리스트의 요소들을 생성하면 다음 렌더에서 이전 리스트가 어떻게 바뀔지 알지 못합니다. 요소의 순서가 바뀔 여지도 존재하고, 리스트에서 추가 또는 제거될 수도 있죠. 우리는 자식 요소에 key라는 고유한 값을 제공함으로써 리액트에게 재조정 과정에서 효율적으로 요소들을 비교하고 정말 변한 부분만 실제 DOM에 반영할 수 있습니다.

```jsx
List.js
// ..
{
  data.map(data => <Item key={data.uniqueKey} data={data} />);
}
// ..
```

<br>

<div style="max-width:500px; margin: auto">

![재조정 key](/assets/markdown-image/React-재조정과-key/리스트-key.png)

</div>

<span>1.3 순서가 바뀌더라도 타입과 key가 동일하기 때문에 렌더 간 요소를 재사용</span>

<br>

이제 자식 요소의 순서가 바뀌더라도 렌더 간 요소를 재사용합니다. 이전 렌더에서 특정 타입과 key 값을 갖는 요소의 경우 다음 렌더에서도 동일한 타입과 key를 갖는다면 재조정 과정에서 리액트는 비교 작업을 수행할 때 동일한 요소가 사용된다는 것을 알 수 있기 때문에 더 적은 비용으로 최소한의 변경만 실제 DOM에 반영하고 연산 작업을 수행하는 것이죠. 우리는 key를 통해 리액트에게 각 요소가 변할 때 어떻게 처리해야 할지에 대한 정보를 제공할 수 있는 것이죠.

<br>

## 인덱스를 key로 사용하게 될 경우

흔히 코드를 짜면서 리스트의 인덱스를 key 값으로 사용하는 경우가 있는데요, 린터나 공식 문서에서 key 값으로 인덱스를 사용하는 것을 최후의 수단으로 여기라는 말이 있습니다. 요소의 key라는 것은 고유한 값이라는 특성이 있는데 인덱스도 중복되는 값이 아닌 고유한 값인데 왜 이러한 패턴을 지양할까요?

인덱스를 key로 사용하게 될 경우 배열의 내용이 변경될 때 우리 의도와 다르게 재조정이 이루어지게 됩니다.

다음과 같은 배열이 있다고 가정하겠습니다.

```javascript
items.js
const items = ['apple', 'banana', 'orange'];
```

이 배열을 사용해서 리스트를 렌더링 하고

```jsx
items.js
items.map((fruit, index) => <li key={index}>{fruit}</li>);
```

배열의 첫 번째 요소에 'mango'를 추가해 보겠습니다.

```javascript
items.js
const items = ['mango', 'apple', 'banana', 'orange'];
```

최초 items 배열이 렌더링 될 때 'apple'의 key는 0, 'banana'는 1, 'orange'는 2의 key 값을 가지게 됩니다. 하지만 'mango'를 첫 요소로 추가하면 key 값은 0부터 'mango'에 할당되고 전부 바뀌겠죠. 

key가 바뀌게 되면 <a href="https://www.moonkorea.dev/React-렌더링-재조정" target="_blank" rel="noopener">이전 글</a>에서 다룬 재조정에서 "요소의 타입이 다른 경우"와 동일하게 리액트는 해당 요소를 새로운 요소로 간주하고 실제 DOM에 업데이트를 진행합니다.

따라서 리액트에게 요소의 key를 제공할 때는 언제나 고유하고 안정적인, 그리고 예상 가능한 값으로 사용해야 합니다.

다만 특정 상황에서 인덱스를 key로 사용하는 것은 안전합니다.

1. 리스트의 요소가 정적이고 변하지 않을 때
2. 리스트 순서가 바뀌지 않을 때
3. 리스트의 요소가 상태를 가지고 있지 않을 때

> Math.random()을 키로 사용하면 매 렌더마다 새로운 key가 생성되기 때문에 렌더 간 고유한 값이 공유되지도 않을뿐더러 예측이 가능하지도 않기 때문에 리액트는 매번 해당 자식 요소들을 새로운 요소 간주합니다.

앞서 "리스트의 요소가 상태를 가지고 있지 않을 때" 인덱스를 key로 사용해도 안전하다고 말했는데요, 반대로 상태를 갖는 경우 인덱스를 key 값으로 사용하면 어떻게 될까요?

다음은 4개의 카테고리를 선택할 수 있는 리스트입니다.

버튼을 클릭하면 배열의 순서를 바꾸게 되는데요, 인덱스를 key 값으로 사용하는 리스트와 고유한 id 값을 key로 사용하는 리스트의 차이점을 확인해 보겠습니다.

<video url="/assets/markdown-image/React-재조정과-key/id-index-사용차이.webm" width="100%" height="auto"></video>

<span>1.4 상태 초기화</span>

<br>

"순서 변경하기" 버튼을 클릭하면 상태가 변경되면서 배열의 순서가 바뀝니다. 상태가 바뀌면 리액트는 새로운 가상 DOM 트리를 만들어 변경된 부분을 파악하고, 그 후 실제 DOM에 업데이트를 합니다.

고유한 "id"를 key로 사용한 경우, 리액트는 해당 key가 같은 요소를 가리킨다고 판단합니다. 즉, key 값이 고유하기 때문에 배열의 순서와 무관하게 같은 DOM 요소라고 판단합니다. 따라서 요소가 갖는 체크박스 상태가 유지됩니다.

반면, 인덱스를 key로 사용할 때, 배열의 순서가 변경되면 기존 key 값들은 새로운 인덱스 값을 갖게 되겠죠. 렌더 간 key 값들은 모두 변경되기 때문에 리액트는 자식 요소들을 새로운 요소로 판단합니다. 따라서 체크박스의 상태는 유지되지 않고 초기화됩니다.

인덱스를 key로 사용할 경우 성능 차이도 존재하지만 그 요소와 관련된 모든 상태가 초기화되고 유실됩니다.

정리하자면 재조정 과정에서 요소의 타입과 key가 같을 경우 기타 속성이 변하지 않는 이상 리액트는 변경 사항이 없다고 판단을 하는데 만약 배열의 인덱스 값을 key로 사용하면 다음 렌더에는 요소가 갖는 상태가 유지되지 않고 의도치 않은 결과로 이어질 수 있습니다.

<iframe height="400" style="width: 100%;" scrolling="no" title="reconciliation - with key / index" src="https://codepen.io/moonkorea00/embed/YzdzoPx?default-tab=result&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>

> 출처 : <a href="https://legacy.reactjs.org/docs/reconciliation.html" target="_blank" rel="noopener">React Docs - Reconciliation</a>