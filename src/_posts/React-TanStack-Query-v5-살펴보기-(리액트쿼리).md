---
title: 'TanStack Query v5 정식 버전 살펴보기 (리액트 쿼리)'
category: '리액트'
excerpt: '리액트 쿼리 v5가 정식 출시됐는데요, 이번 글에서는 마이그레이션 가이드를 참고해서 주요 변경 사항들을 살펴봅니다.'
description: '주요 변경 및 개선 사항들은?'
tags: 'React.js'
date: '2023-11-06'
---

> v5부터는 React 18과 TypeScript 4.7 이상의 버전에서만 사용이 가능합니다.

TanStack Query팀이 작년에 <a href="https://github.com/TanStack/query/discussions/4252" target="_blank" rel="noopener">v5 로드맵</a>을 발표하고 최근 v5 버전을 정식 출시했는데요, v4에 비해 번들 크기를 20% 줄이고 제공하는 API를 간소화하는데 중점을 두었다고 하네요. 최근 실험적으로 블로그에 변경 사항들을 적용해 봤는데요, 이번 글에서는 v5의 주요 변경 및 개선 사항들에 대해 살펴봅니다.

<br>

## 주요 변경 사항

### 하나의 객체로 쿼리 옵션 관리

v5에서 useQuery를 비롯한 함수들은 옵션들이 정의된 **단일 객체**를 전달받아 실행합니다.

```diff
diff
- useQuery(key, fn, options)
+ useQuery({ queryKey, queryFn, ...options })
- useInfiniteQuery(key, fn, options)
+ useInfiniteQuery({ queryKey, queryFn, ...options })
- useMutation(fn, options)
+ useMutation({ mutationFn, ...options })
- queryClient.invalidateQueries(key, filters, options)
+ queryClient.invalidateQueries({ queryKey, ...filters }, options)
```

이전 버전에서는 useQuery를 호출할 때 세 가지 방법이 있었는데요,

```ts
index.ts
useQuery(queryKey, queryFn, options);
useQuery(queryKey, options); // default query function 사용할 경우 query function 생략 가능
useQuery(options);
// v5 이전에는 queryKey만 필수 옵션
```

일관성이 떨어지는 점, 사용될 옵션을 생성할 때 첫 번째와 두 번째 매개변수의 타입이 무엇인지 확인하기 위해 런타임 체크가 필요한 점 등을 이유로 v5에서는 단일 객체를 전달받아 처리하는 방식으로 변경됐습니다.

v4에서는 useQuery.ts 파일의 143줄 중 3줄만 자바스크립트로 구성돼있다고 하니 타입 관련해서 유지 관리에 어려움이 있었다고 하네요.
<!-- 설명 : query function인지 option인지 런타임 체크 필요 -->

> 더 자세한 내용은 <a href="https://github.com/TanStack/query/discussions/4252" target="_blank" rel="noopener">Discussion</a>의 **remove overloads**를 참고해 주세요.

<br>

### useQuery에서 onSuccess, onError, onSettled 콜백(deprecated)

useQuery에서 **onSuccess, onError, onSettled** 콜백들은 이제 사용되지 않습니다.

콜백들을 제거한 가장 큰 이유들은 다음과 같은데요 :

  1. 예측 가능하고 일관성있는 useQuery
  2. 상태 동기화를 목적으로 사용했을 때 발생하는 추가 렌더 사이클. 예) onSuccess 콜백에 로컬 또는 전역 상태 업데이트 <a href="https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose#state-syncing" target="_blank" rel="noopener">(참고)</a>
  3. 콜백이 호출되지 않을 여지 예) staleTime 설정으로 query function이 호출되지 않아 의도한 콜백이 실행하지 않을 경우<a href="https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose#the-callbacks-might-not-run" target="_blank" rel="noopener">(참고)</a>

v5가 정식으로 출시되고 나서부터는 콜백을 다음과 같은 방법으로 다룰 것을 제시합니다 :

  1. 전역 콜백으로 처리<a href="https://tkdodo.eu/blog/react-query-error-handling#the-global-callbacks" target="_blank" rel="noopener">(참고)</a>
  2. Error Boundary로 에러 처리<a href="https://tkdodo.eu/blog/react-query-error-handling#error-boundaries" target="_blank" rel="noopener">(참고)</a>
  3. status enum, isError 등으로 컴포넌트 내에서 처리<a href="https://tkdodo.eu/blog/react-query-error-handling#the-standard-example" target="_blank" rel="noopener">(참고)</a>

Mutation에서의 콜백들은 그대로 유지됩니다.

> 더 자세한 내용은 <a href="https://github.com/TanStack/query/discussions/5279" target="_blank" rel="noopener">Discussion</a>을 참고해 주세요.

<br>

### suspense를 지원하는 useSuspenseQuery, useSuspenseInfiniteQuery, useSuspenseQueries

v5부터는 안정적으로 suspense를 사용해 데이터 패칭을 할 수 있습니다. useQuery에서 사용하던 suspense: boolean 옵션은 제거되고 **useSuspenseQuery, useSuspenseInfiniteQuery**와 **useSuspenseQueries**를 사용합니다.

```ts
index.ts
const { data: post } = useSuspenseQuery({
  // const post: Post
  queryKey: ['post', postId],
  queryFn: () => fetchPost(postId),
})
```

새로 추가된 suspense hook은 로딩과 에러 상태를 Suspense와 ErrorBoudnary가 처리하기 때문에 status가 언제나 success인 data 값을 반환합니다.

> suspense와 관련된 더 자세한 내용은 이 <a href="https://tanstack.com/query/v5/docs/react/guides/suspense" target="_blank" rel="noopener">문서</a>를 참고해 주세요.

<br>

### 낙관적 업데이트 간소화

useMutation의 **variables**를 활용해서 낙관적 업데이트를 간소화할 수 있습니다.

```tsx
index.ts
const queryInfo = useTodos()
const addTodoMutation = useMutation({
  mutationFn: (newTodo: string) => axios.post('/api/data', { text: newTodo }),
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
})

if (queryInfo.data) {
  return (
    <ul>
      {queryInfo.data.items.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
      {addTodoMutation.isPending && (
        <li key={String(addTodoMutation.submittedAt)} style={{ opacity: 0.5 }}>
          {addTodoMutation.variables}
        </li>
      )}
    </ul>
  )
}
```

낙관적 결과를 보여줄 곳이 한 곳에만 있으면 variables를 사용하는 방법이 간단하지만 다른 곳에서도 낙관적 업데이트에 대한 결과를 알아야하는 경우 캐시를 직접 다루는 방법이 적합합니다.

> 낙관적 업데이트와 관련된 더 자세한 내용은 이 <a href="https://tanstack.com/query/v5/docs/react/guides/optimistic-updates" target="_blank" rel="noopener">문서</a>를 참고해 주세요.

<br>

### useMutationState로 mutation 상태 공유

**useMutationState**로 MutationCache에 있는 mutation의 상태를 공유하고 다른 컴포넌트에서도 접근이 가능합니다. **filter**옵션을 사용해 mutation을 필터링하고 **select**옵션으로 상태 값을 가공하거나 선택할 수 있습니다. useMutationState이 호출됐을 때 실행되고 있는 mutation이 한 개 이상일 수 있기 때문에 반환되는 값은 배열입니다.

```tsx
index.ts
// 모든 variables 
const variables = useMutationState({
  filters: { status: 'pending' },
  select: (mutation) => mutation.state.variables,
})
```

```tsx
index.ts
// mutationKey로 mutation 식별
const mutationKey = ['posts']
const mutation = useMutation({
  mutationKey,
  mutationFn: (newPost) => {
    return axios.post('/posts', newPost)
  },
})
const data = useMutationState({
  filters: { mutationKey },
  select: (mutation) => mutation.state.data,
})
```

mutation을 고유한 키로 식별하거나 접근하고자 할 때 mutation.state.**submittedAt**도 사용할 수 있습니다.

<br>

### Infinite Query에서 initialPageParam(required)

Infinite query를 사용할 때 pageParam의 초기 값으로 사용될 initialPageParam 옵션을 전달해야 합니다. 이전 버전에서는 queryFn의 pageParam이 undefined 값을 가져서 0 또는 초기 값을 정의했었는데 undefined는 직렬화되지 않아 initialPageParam 옵션이 추가됐습니다.

```diff
diff
useInfiniteQuery({
   queryKey,
-  queryFn: ({ pageParam = 0 }) => fetchSomething(pageParam),
+  queryFn: ({ pageParam }) => fetchSomething(pageParam),
+  initialPageParam: 0,
   getNextPageParam: (lastPage) => lastPage.next,
})
```

<br>

### Infinite Query에서 maxPages 옵션

**maxPages** 옵션으로 무한 스크롤이 요청하는 최대 페이지에 제한을 설정할 수 있습니다. 페이지를 요청할수록 쿼리 데이터가 축적되면 메모리를 더 많이 사용하고 해당 쿼리에 대한 데이터를 추후에 요청할 때도 더 많은 시간이 소요되는데요, maxPages 옵션으로 데이터에 대한 최대 페이지 제한을 둘 수 있습니다.

<br>

### Infinite Query에서도 prefetch

Infinite query의 경우에도 쿼리를 prefetch 할 수 있습니다. 기본으로 한 개 페이지에 대한 쿼리를 prefetch 하지만 **pages** 옵션과 **getNextPageParam**옵션으로 한 개 이상의 페이지를 prefetch 할 수 있습니다.

```tsx
index.ts
const prefetchTodos = async () => {
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    pages: 3, // 세 개 페이지
  })
}
```

> prefetch와 관련된 더 자세한 내용은 이 <a href="https://tanstack.com/query/v5/docs/react/guides/prefetching" target="_blank" rel="noopener">문서</a>를 참고해 주세요.

<br>

### Hydration API

Hydrate 컴포넌트는 **HydrationBoundary**로 변경되고 useHydrate 훅은 이제 사용되지 않습니다.

```diff
index.ts
- import { Hydrate } from '@tanstack/react-query'
+ import { HydrationBoundary } from '@tanstack/react-query'

- <Hydrate state={dehydratedState}>
+ <HydrationBoundary state={dehydratedState}>
  <App />
- </Hydrate>
+ </HydrationBoundary>
```

<!-- 동시성 기능을 원활하게 지원하고자 v5부터는 쿼리의 hydration 시점이 변경됩니다. 새로운 쿼리같은 경우 SSR를 지원하고자 이전과 동일하게 <a href="https://www.moonkorea.dev/React-%EB%A0%8C%EB%8D%94%EB%8B%A8%EA%B3%84-%EC%BB%A4%EB%B0%8B%EB%8B%A8%EA%B3%84" target="_blank" rel="noopener">렌더 단계</a>에서 hydration이 이루어지지만 캐시가 존재하는 쿼리의 경우 effect 단계에서 hydration이 이루어집니다(캐시보다 신선한 데이터일 경우). 다만 hydration이 필요한 페이지 이동 간 또는 서버 컴포넌트를 사용할 경우에만 직전 캐시가 잠시 보이고 앱 실행 초기에 hydration이 한 번만 이루어지는 일반적인 경우에는 해당 사항이 없습니다. -->

<br>

### cacheTime => gcTime

cacheTime 옵션은 **gcTime**으로 이름이 변경됩니다. "gc"는 garbage collecting의 약어로 기술적인 의미에서 gcTime으로 변경됩니다.

> cacheTime은 쿼리를 사용하는 컴포넌트가 언마운트 되면서 쿼리 인스턴스가 비활성화됐을 때 부터 유효한 시간입니다. 따라서 데이터가 캐싱돼있는 시간보다는 가비지 컬렉팅 대상이 되기까지의 시간이 더 적합한 설명입니다.
<!-- 설명 : cacheTime은 데이터가 캐싱되는 시간이 아니라 쿼리 인스턴스가 사용되지 않는 시점으로부터의 시간 -->

<br>

### status: loading => status: pending, isLoading => isPending, isInitialLoading => isLoading

status의 **loading**은 **pending**으로 변경됩니다.

**isLoading**은 **isPending**으로 변경됩니다.

isPending && isFetching의 기능인 **isInitialLoading**은 **isLoading**으로 변경됩니다.

> 더 자세한 내용은 <a href="https://github.com/TanStack/query/discussions/4252" target="_blank" rel="noopener">Discussion</a>의 **status: pending**을 참고해 주세요.

<br>

### useErrorBoundary => throwOnError

useErrorBoundary 옵션은 **throwOnError**로 이름이 변경됩니다. 리액트 훅의 접두사인 "use"와 특정 컴포넌트명인 "ErrorBoundary"의 사용보다는 옵션이 제공하는 기능에 맞게 다음 렌더 사이클에 에러를 다시 던지는 throwOnError로 변경됩니다.
 <!-- 설명 : errorboundary(componentDidCatch, static getDerivedStateFromError)는 비동기 코드에서 반환된 에러를 잡지 못하지만 리액트 쿼리는 다음 런데 사이클에 에러를 다시 던져 ErrorBoundary 스코프 내(컴포넌트)에서 던져진 에러를 잡음  -->
<!-- getDerivedStateFromError 동작 방식
1. 자식 컴포넌트에서 렌더링 중에 에러가 발생하면 getDerivedStateFromError가 호출
2. 발생한 에러를 인자로 받음
3. 새로운 state 값을 반환하여 컴포넌트의 state를 업데이트할 수 있음. 이렇게 업데이트된 state는 그 후 컴포넌트의 렌더링에 사용.
4. 반환한 state는 componentDidCatch 메서드에서도 사용할 수 음 -->
<!-- function FetchData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => setError(error));  // This error will not be caught by an error boundary.
  }, []);

  if (error) {
    throw error;  // This error will be caught by an error boundary.
  }

  return <div>{data}</div>;
} -->

<br>

### keepPreviousData와 isPreviousData(deprecated)

keepPreviousData 옵션과 isPreviousData는 **placeholderData** 옵션과 **isPlaceholderData**로 변경됩니다. v5에서 keepPreviousData는 리액트 쿼리에서 제공하는 함수(identity function)로 변경되는데요, 모듈에 불러와 placeholderData의 값으로 사용합니다.

> placeholderData: (previousData, previousQuery) => previousData,

```diff
diff
import {
   useQuery,
+  keepPreviousData
} from "@tanstack/react-query";

const {
   data,
-  isPreviousData,
+  isPlaceholderData,
} = useQuery({
  queryKey,
  queryFn,
- keepPreviousData: true,
+ placeholderData: keepPreviousData
});
```

> 리액트 쿼리에서 identity function이란 동일한 값의 매개변수를 반환 값으로 반환하는 함수입니다.

<br>

### useQuery에서 remove 메소드(deprecated)

캐시에서 쿼리를 제거하는 remove 메소드는 이제 사용하지 않습니다. remove 메소드는 관찰자에게 알리지 않고 쿼리를 제거하는 기능을 했었는데요, 쿼리를 제거한 다음 렌더에는 새로운 로딩 상태로 이어지기 때문에 활성화돼있는 쿼리를 제거하는 것은 맞지 않다고 하네요.

쿼리를 제거해야하는 경우 v5에서는 <b>queryClient.removeQueries({queryKey: key})</b>를 사용합니다.

```diff
diff
const queryClient = useQueryClient();
 const query = useQuery({ queryKey, queryFn });
- query.remove()
+ queryClient.removeQueries({ queryKey })
```

<br>

### 서버에서 retry는 0

서버에서의 **retry** 기본 값은 3에서 0으로 변경됩니다.

<br>

### combine

useQueries의 **combine**으로 응답(쿼리에 대한 정보 등)을 하나의 값으로 사용할 수 있습니다.

```tsx
index.ts
const ids = [1,2,3]
const combinedQueries = useQueries({
  queries: ids.map(id => (
    { queryKey: ['post', id], queryFn: () => fetchPost(id) },
  )),
  combine: (results) => {
    return ({
      data: results.map(result => result.data),
      pending: results.some(result => result.isPending),
    })
  }
})
```

다만 위의 경우 쿼리의 data와 pending 값만 반환되고 쿼리에 대한 나머지 정보는 유실됩니다.

<br>

### DevTools

새로운 UI, light mode, 인라인으로 캐시를 수정할 수 있는 기능 등을 제공합니다.

<br>

## 타입 관련 변경 사항

### queryOptions으로 안전하게 타입 추론

useQuery에 인라인으로 쿼리 옵션들을 정의하지 않고 함수로 옵션들을 관리하는 경우 등에 queryOptions는 옵션 객체의 타입 추론을 도와줍니다.

```ts
index.ts
import { queryOptions } from '@tanstack/react-query';

function groupOptions() {
  return queryOptions({
    queryKey: ['groups'],
    queryFn: fetchGroups,
  });
}
useQuery(groupOptions());
queryClient.prefetchQuery(groupOptions());
```

<!-- 제네릭을 사용하지 않는 이상 반환되는 값은 unknown 타입을 갖게 됩니다.

```ts
const data = queryClient.getQueryData(['groups']);
// const data: unknown
const data = queryClient.getQueryData<Group[]>(['groups']);
// const data: Group[] | undefined
``` -->
<br>

### TError의 기본 타입 unknown => Error

useQuery의 두 번째 제네릭인 TError는 Error를 기본 타입으로 갖습니다.

이전 버전에서는 TError가 unknown 타입을 기본적으로 가졌는데요, 거의 모든 경우에 Error 타입을 갖기 때문에 v5부터 error 필드는 Error 타입으로 추론됩니다. 다만 의도적으로 Error 인스턴스가 아닌 커스텀 에러를 반환할 때는 따로 정의할 수 있습니다.

```ts
index.ts
// v4
const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups });
// const error: unknown
const { error } = useQuery<Group[], Error>(['groups'], fetchGroups);
// const error: Error | null
```

```ts
index.ts
// v5
const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups });
// const error: Error | null

// 커스텀 에러
const { error } = useQuery<Group[], string>(['groups'], fetchGroups)
// const error: string | null
```

<br>

### Register로 전역 에러 타입 설정

useQuery마다 에러 타입을 제네릭으로 알려주지 않고 Register 인터페이스로 기본 에러 타입을 정의할 수 있습니다.

```ts
index.d.ts
declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError;
  }
}
```

```ts
index.ts
const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups });
// const error: AxiosError | null
```

앞서 TError의 기본 타입을 Error로 정의한 것도 Register 인터페이스를 사용한 것으로 보이네요.

```ts
useQuery.d.ts
declare function useQuery<TQueryFnData = unknown, TError = DefaultError, ..>(options: .. ,)
```

```ts
queryClient.d.ts
interface Register {
}
type DefaultError = Register extends {
    defaultError: infer TError;
} ? TError : Error;
```

<br>

## 호환 버전

### 리액트 버전 호환

v5에서는 useSyncExternalStore를 사용하고 있어서 React 18 또는 이후 버전에서만 사용이 가능합니다.

<br>

### 타입스크립트 버전 호환

TypeScript 4.7 또는 이후 버전에서만 사용이 가능합니다.

<br>

### 지원 브라우저

리액트 쿼리는 최신 브라우저에 최적화되어 있습니다.

```bash
bash
Chrome >= 91
Firefox >= 90
Edge >= 91
Safari >= 15
iOS >= 15
opera >= 77
```

> 출처
>
> - <a href="https://tanstack.com/query/v5/docs/react/guides/migrating-to-v5" target="_blank" rel="noopener">Migrating to TanStack Query v5</a>
>
> - <a href="https://tanstack.com/blog/announcing-tanstack-query-v5" target="_blank" rel="noopener">Announcing TanStack Query v5</a>
>
> - <a href="https://tanstack.com/query/v5/docs/react/typescript#typing-query-options" target="_blank" rel="noopener">TypeScript | TanStack Query Docs</a>