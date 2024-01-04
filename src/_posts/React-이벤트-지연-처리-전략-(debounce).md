---
title: 'debounce 동작 탐구와 적용기'
category: '리액트'
description: '이번 글에서는 UI의 반응성과 성능을 개선할 수 있는 전략인 debounce의 동작 원리와 실용적인 사용 예시에 대해 알아보겠습니다.'
excerpt: '디바운스 동작 탐구'
tags: 'JavaScript, React.js, Next.js, 렌더링, 성능, 개발 경험'
date: '2023-04-16'
---

> debounce는 일정 시간 동안 연속된 이벤트를 하나의 이벤트로 그룹화하여 처리하는 기술입니다.

&emsp;이번 글에서는 UI의 반응성과 성능을 개선할 수 있는 전략인 debounce의 동작 원리와 실용적인 사용 예시에 대해 알아보겠습니다.

debounce는 사용자 입력에 반응하는 이벤트에 따라 UI 업데이트나 서버에서 데이터를 가져오는 시점을 제어할 수 있습니다.

debounce 적용 전 고려 사항 :

1. 컴포넌트 특성
2. 리렌더링 비용

지연 처리는 렌더링이나 서버 호출 등의 작업을 조절하는 데 사용되지만, 항상 필요한 것은 아닙니다. 입력값의 상태 변화에 따라 컴포넌트 외부에서 다른 작업을 수행하거나 상태 변화를 감지해야 하는 상황이 아니라면 비제어 컴포넌트로 관리하는 것이 더 적합할 수 있습니다. 다만 상태 업데이트가 잦고 그에 따라 매번 리렌더에 필요한 비용이 성능에 영향을 준다고 판단된다면 debounce를 적용하는 것이 더 적합한 접근이 될 수 있습니다.

</br>

## 서버 요청 빈도 개선

&emsp;npm 패키지를 검색할 수 있는 검색 컴포넌트를 예제로 debounce가 동작하는 원리를 알아보겠습니다.

검색창에 사용자가 입력을 할 때마다 클라이언트에서는 서버에 요청을 보내 검색어와 일치하는 결과를 출력합니다 :

<iframe height="300" style="width: 100%;" scrolling="no" title="before-debounce" src="https://codepen.io/moonkorea00/embed/MWPjYXY?default-tab=result&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

<span>1.1 검색 컴포넌트</span>

<br>

```typescript
SearchInput.tsx
// ..
const [searchInput, setSearchInput] = useState('');
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setSearchInput(e.target.value)
}
function api() {
  fetch(`url?search=${searchInput}`)
}
useEffect(api, [searchInput])
// ..
<input type="text" value={searchInput} onChange={handleChange}>
<Package>{renderSearchResult()}</Package>
```

api() 함수는 상태 변화의 부수효과로 입력값이 바뀔 때마다 호출됩니다. 응답인 검색 결과를 렌더링하는데 큰 비용이 들지 않을 수 있더라도 입력마다 검색 요청을 보내면 서버에 부담이 가고 불필요한 검색 요청이 발생할 수 있습니다.

따라서 setTimeout을 사용해서 연속적으로 발생하는 이벤트 중 일정 시간이 지나고 난 뒤의 마지막 입력 이벤트만 실행되게 해보겠습니다.

```javascript
ts
const [searchInput, setSearchInput] = useState('');
const [debounceInput, setDebounceInput] = useState('');
const delay = 400;

useEffect(() => {
  const timeout = setTimeout(() => {
    setDebounceValue(searchInput);
  }, delay);
  return () => {
    clearTimeout(timeout);
  };
}, [searchInput]);

function api() {
  fetch(`url?search=${debounceInput}`);
}

useEffect(api, [debounceInput]);
```

setTimeout을 사용하면 지정된 시간이 경과한 후 debounce처리될 검색어 상태를 업데이트할 콜백 함수를 예약합니다. 검색 컴포넌트는 입력을 받는 동안 추가 입력 같은 다른 작업을 계속 실행할 수 있고 setTimeout은 이벤트 루프에서 지연 시간이 경과한 후에 콜백을 실행합니다. 만약 입력이 계속되면 이전에 예약된 setTimeout은 취소되고 새로운 또는 마지막 setTimeout이 예약됩니다. 사용자는 최종적으로 입력된 검색어를 기반으로 검색 결과를 받게 됩니다. 지연 시간은 목적에 따라 다르게 설정합니다.

<iframe height="300" style="width: 100%;" scrolling="no" title="debounce" src="https://codepen.io/moonkorea00/embed/dygXxKZ?default-tab=result&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

<span>1.2 검색 컴포넌트 debounce 적용 후</span>

<br>

위 경우 onChange를 참조하는 함수를 debounce처리할 수도 있지만 검색 컴포넌트의 성격상 상태에 대한 UI 반응이 중요하기 때문에 부수 효과인 api 호출을 지연 처리하는 것이 더 적합합니다.

<details><summary><i>네트워크 탭에서 서버에 호출되는 요청 빈도를 비교해 보기</i></summary>

<video url="/assets/markdown-image/React-이벤트-지연-처리-전략/api-before-debounce.webm" width="100%" height="auto"></video>

<span>1.3 검색창 debounce 적용 전</span>

<video url="/assets/markdown-image/React-이벤트-지연-처리-전략/api-after-debounce.webm" width="100%" height="auto"></video>

<span>1.4 검색창 debounce 적용 후</span>

</details>

</br>

## 렌더링 개선

> 리렌더가 맹목적으로 나쁜건 아닙니다. UI를 그리기 위해서는 렌더가 필요하고 사용자에게 최신의 UI를 제공하기 위해는 리렌더가 필요합니다. 다만 불필요한 렌더링 또는 리렌더에 필요한 리소스가 비쌀 경우 렌더 간의 과정을 개선하는 것이 바람직합니다.

&emsp;api 요청뿐만 아니라 리렌더에 필요한 비용이 많이 든다고 판단될 경우에도 debounce를 적용할 수 있습니다. 검색 컴포넌트의 경우 부수 효과를 제어하는 접근을 택했다면 이번에는 onChange 핸들러에 debounce를 적용한 경우를 살펴보겠습니다.

아래는 range input을 사용해서 이미지의 화질을 자유롭게 조절할 수 있는 <a href="https://www.haduri-zzal.com/" target="_blank">컴포넌트</a>입니다.

<video url="/assets/markdown-image/React-이벤트-지연-처리-전략/haduri-before-debounce.webm" width="100%" height="auto"></video>

<span>1.5 debounce 적용 전</span>

<br>

onChange 이벤트 핸들러는 호출될 때마다 선택된 화질로 새로운 blob 객체를 반환합니다. 상태는 압축된 화질의 blob로 업데이트되고 컴포넌트를 새로 그립니다. 리렌더마다 화질을 압축하는 작업은 적은 비용이 드는 과정이 아니기 때문에 리렌더에 포커스를 맞춰서 onChange를 참조하는 함수에 debounce 적용을 해보겠습니다.

<details><summary><i>소스코드 보기</i></summary>

```typescript
useDebounceChange.ts
function useDebounceChange(
  onChange: (value: number) => void,
  initialValue: number,
  delay: number = 15
) {
  const [debouncedValue, setDebouncedValue] = useState<number>(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(debouncedValue);
    }, delay);
    return () => clearTimeout(timeout);
  }, [debouncedValue]);

  const handleDebounceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDebouncedValue(Number(e.target.value));
  };

  return handleDebounceChange;
}
```

```typescript
Range.tsx
function Range(props) {
  const { ... } = props
  const handleDebounceChange = useDebounceChange(handleChange, value);
    return (
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleDebounceChange}
      />
    );
  }
```

</details>

<video url="/assets/markdown-image/React-이벤트-지연-처리-전략/haduri-after-debounce.webm" width="100%" height="auto"></video>

<span>1.6 debounce 적용 후</span>

<br>

미세하게나마 input이 늦게 반응하지만 전과 후의 렌더링 횟수를 비교했을 때 클라이언트에 부담을 덜어주는 접근이 더 좋아 보입니다. onChange 핸들러 자체에 대한 debounce는 지연 시간에 따라 UI 반응이 느릴 수 있기 때문에 무엇보다도 컴포넌트 성격과 목적에 맞는 접근을 선택하는 것이 적합합니다.