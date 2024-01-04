---
title: '블로그 댓글 컴포넌트 리팩토링'
category: '리액트'
description: '오픈소스 댓글 시스템에서 자체 댓글 시스템으로 전환하면서 블로그의 댓글 컴포넌트를 만들었는데요, 이번 글에서는 재사용이 어려운 코드를 재사용 가능한 컴포넌트 단위로 나누고 좀 더 읽기 편하게 코드를 정리 한 과정에 대해 공유합니다.'
excerpt: '재사용 불가능한 코드를 리팩토링해보자'
tags: 'React.js, Next.js, 블로그, 리팩토링, 개발 경험'
date: '2023-10-19'
---

&emsp;오픈소스 댓글 시스템에서 자체 댓글 시스템으로 전환하면서 댓글 컴포넌트를 만들었는데요, 어떤 기준으로 컴포넌트를 나눌 것인가에 대한 고민보다는 구현에만 집중하다 보니 재사용성을 고민한 흔적을 코드에서 찾아볼 수 없었습니다. 이번 글에서는 재사용 불가능한 코드를 재사용 가능한 컴포넌트 단위로 나누고 좀 더 읽기 편한 게 코드를 정리 한 과정에 대해 공유합니다.

<br>

## 최초 구현

&emsp;컴포넌트 트리는 중첩 댓글의 구조 때문에 <a href="https://github.com/moonkorea00/moonkorea/blob/main/src/components/Comments/CommentList/CommentList.tsx" target="_blank" rel="noopener">list 컴포넌트</a>를 <a href="https://github.com/moonkorea00/moonkorea/blob/main/src/components/Comments/Comment/Comment.tsx#L103-L105" target="_blank" rel="noopener">item 컴포넌트</a>에서 다시 순회하는 트리를 갖는데요, 우선 개별 댓글 컴포넌트 &lt;Comment /&gt;와 댓글 작성을 담당하는 &lt;CommentForm /&gt;부터 살펴보겠습니다.

<details><summary><i>컴포넌트 트리 보기</i></summary>

> 댓글의 댓글 같은 중첩 댓글이 있을 경우 list 컴포넌트를 다시 순회하는 구조

<div style="max-width:600px; margin: auto">

![댓글 컴포넌트 트리](/assets/markdown-image/React-댓글-컴포넌트-리팩토링/댓글-컴포넌트-트리.png)

</div>

<span>1.2 댓글 컴포넌트 트리</span>

</details>

아래 UI를 바탕으로 작성한 최초 코드는 다음과 같습니다.

<br>

<div style="max-width:700px; margin: auto">

![댓글 컴포넌트](/assets/markdown-image/React-댓글-컴포넌트-리팩토링/댓글-컴포넌트.png)

</div>

<span>1.1 블로그 댓글란</span>

<br>

먼저 댓글 컴포넌트인데요, 다소 길어 읽기 불편하더라도 개선이 필요한 부분들을 공유하고자 코드 간소화는 최소한으로 했습니다.

<details><summary><i>댓글 인터페이스 보기</i></summary>

```ts
types.ts
interface Comment {
  id: string;
  body: string | null;
  userId: string;
  postId: string;
  user: User;
  parentId: string | null;
  children: Comment[];
  depth: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
}
```

</details>

```tsx
Comment.tsx
const Comment = ({ comments }: { comments: CommentProps }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isReplyMode, setIsReplyMode] = useState(false);
  const [isCommentOptionsVisible, setIsCommentOptionsVisible] = useState(false);

  const { onDeleteComment, isDeleting } = useDeleteComment(comments);

  return (
    <S.Container parentId={comments?.parentId} depth={comments.depth}>
      <div>
        <S.Avatar src={assets.avatar} />
        <div>
          <div>
            <div>
              <S.User>{comments.user.name}</S.User>
              <S.PublishDate>{comments.createdAt}</S.PublishDate>
            </div>
            <S.OptionsButton onClick={}>
              <img src={assets.options} />
            </S.OptionsButton>
            {isCommentOptionsVisible && <CommentOptions {...optionProps} />}
          </div>
          {isEditMode ? ( // 편집 모드 일때
            <CommentForm
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              comments={comments}
              type="edit"
            />
          ) : (
            <S.Body isDeleted={comments.isDeleted}>
              {comments.isDeleted ? '삭제된 댓글입니다.' : comments.body}
            </S.Body>
          )}
          {isReplyMode && ( // 답글 모드 일때
            <CommentForm
              isReplyMode={isReplyMode}
              setIsReplyMode={setIsReplyMode}
              comments={comments}
              type="new_comment"
            />
          )}
        </div>
      </div>
      {comments.children.length > 0 && (
        <CommentList comments={comments.children} />
      )}
    </S.Container>
  );
};
```

&lt;Comment /&gt; 컴포넌트에서는 댓글의 본문과 작성자 정보를 보여주고 mode 상태에(답글 또는 편집) 따라 다른 상태값을 &lt;CommentForm /&gt;에 내려주고 있어요. 부모에서 전달되는 댓글의 mode 상태에 따라 버튼의 텍스트, 이벤트 처리 로직 등을 처리하고요. 리팩토링하기 전 기존 코드의 개선점을 정리해 보면,

- 중복돼서 사용되는 상태가 있어 보여요. 상태의 교집합을 찾아서 간소화가 필요해요.
- form 컴포넌트에 전달되는 상태와 상태 업데이트 함수가 컴포넌트와 결합돼 있어요. 불필요하게 내려져서 어떤 로직을 수행하는 걸로 보여요.
- 조건부 렌더링이 많고 이해하기 쉽지 않아요.

다음은 댓글을 작성하고 편집하는 form 컴포넌트입니다.

```tsx
CommentForm.tsx
interface CommentFormProps {
  isReplyMode?: boolean;
  isEditMode?: boolean;
  setIsEditMode?: Dispatch<SetStateAction<boolean>>;
  setIsReplyMode?: Dispatch<SetStateAction<boolean>>;
  comments?: Comment;
  type: 'new_comment' | 'edit';
}

const CommentForm = ({
  isReplyMode,
  isEditMode,
  setIsEditMode = () => {},
  setIsReplyMode = () => {},
  comments,
  type,
}: CommentFormProps) => {
  const { modalConfig: login, showModal } = useModal();
  const { data: session } = useSession();

  // 댓글 작성 로직
  const { comment, handleComment, onCreateComment, isSubmitting } =
    useCreateComment(comments, setIsReplyMode, type, isReplyMode);
  // 댓글 편집 로직
  const { edittedComment, handleEditComment, onEditComment, isSubmittingEdit } =
    useEditComment(comments, setIsEditMode);

  return (
    <div>
      <form
        // 이벤트 처리 로직
        onSubmit={e => {
          e.preventDefault();
          session
            ? type === 'new_comment'
              ? onCreateComment()
              : onEditComment()
            : showModal('login');
        }}
      >
        {type === 'new_comment' && ( // 댓글 작성 또는 답글 작성일 때
          <S.Input
            // ..
            placeholder={
              session
                ? isReplyMode
                  ? '답글 작성하기 ..'
                  : '댓글 작성하기 ..'
                : '로그인하고 댓글 작성하기'
            }
            disabled={!session}
            autoFocus={isReplyMode}
          />
        )}
        {type === 'edit' && ( // 댓글 편집일 때
          <S.EditInput
            // ..
            autoFocus={isEditMode}
          />
        )}
        <div>
          {(isEditMode || isReplyMode) && <button onClick={}>취소</button>}
          <button type="submit" disabled={isSubmitting || isSubmittingEdit}>
            {session
              ? isReplyMode
                ? '답글 작성'
                : isEditMode
                ? '수정'
                : '댓글 작성'
              : '간편 로그인'}
          </button>
        </div>
      </form>
    </div>
  );
};
```

코드를 살펴보니 상위 컴포너트에서 form의 타입과 상태, 상태 업데이트 함수 등을 내려주고 form 컴포넌트에서 수행하는 것들이 많은데요, 리팩토링하기 전 기존 코드의 개선점을 정리해 보면,

- 컴포넌트가 책임지는 일이 많아요. 컴포넌트 내부에서 새 댓글 작성과 댓글 편집을 모두 처리하고 있어서 조건부로 수행하고 있어요.
- 컴포넌트뿐만 아니라 댓글 작성과 편집 로직이 상태와 setState 함수랑 결합돼있어요.
- 로그인 여부와 기타 상태에 따라 중첩 삼항연산자가 코드를 읽기 어렵고 유지 관리하기 힘들게 하고 있어요.

<br>

## 리팩토링

### 1. 상태 관리 간소화

&emsp;복잡하진 않지만 기존 코드는 form의 모드를 나타내는 isEditMode와 isReplyMode 그리고 form의 타입을 나태는 "type" prop을 가지고 버튼의 텍스트를 표현하고 이벤트 처리 로직을 수행하고 있어요. mode 상태가 항상 한 가지 상태로만 활성화된다는 점(보기, 답글 또는 편집), 모드를 변경할 때마다 다른 상태값을 기본값으로 변경해야 하는 점, 조건부 렌더링을 직관적으로 작성할 수 있는 점 그리고 하나의 상태로 관리할 수 있는 점 등을 이유로 enum을 사용해서 리팩토링했는데요,

```tsx
Comment.tsx
enum CommentMode {
  View = 'VIEW',
  Edit = 'EDIT',
  Reply = 'REPLY',
}
const Comment = ({ comments }: { comments: CommentProps }) => {
  const [mode, setMode] = useState(CommentMode.View); // 기본값은 보기 모드인 'View'
  const [isCommentOptionsVisible, setIsCommentOptionsVisible] = useState(false);

  const onResetMode = () => setMode(CommentMode.View); // 상태 초기화
  return (
    <S.Container parentId={comments?.parentId} depth={comments.depth}>
      // ..
      <div>
        {mode === CommentMode.Edit && ( // 편집 모드
          <CommentForm
            comments={comments}
            isEditMode={mode === CommentMode.Edit}
            setFormToDefaultMode={onResetMode}
          />
        )}
        {mode === CommentMode.Reply && ( // 답글 모드
          <CommentForm
            comments={comments}
            isReplyMode={mode === CommentMode.Reply}
            setFormToDefaultMode={onResetMode}
          />
        )}
      </div>
      // ..
    </S.Container>
  );
};
```

모드같은 경우 하나의 상태만 가질 수 있기 때문에 enum으로 간소화하면 상태가 충돌할 일이 없고 기존에 내려지던 "type" prop을 제거할 수 있어요. 하나의 상태만 활성화되기 때문에 mode 상태를 평가하는 조건문도 기존 코드보다 직관적으로 표현할 수 있어요.

<br>

### 2. 공통 form 컴포넌트 사용하기

&emsp;기존 form 컴포넌트는 댓글 작성과 편집을 모두 처리하고 있어서 관심사에 맞게 독립적으로 분리해 봤는데요, 우선 공통으로 사용할 form 컴포넌트를 정의했어요.

```tsx
BaseCommentForm.tsx
interface BaseCommentFormProps {
  onSubmit: () => void; // submit 시 호출될 콜백 함수
  isFormModeCancellable?: boolean; // form mode 취소 가능 여부
  setFormToDefaultMode: () => void; // form mode 초기화 함수
  isSubmitButtonDisabled?: boolean; // submit 버튼의 활성화/비활성화 상태
  submitButtonLabel: string; // submit 버튼의 텍스트
}

const BaseCommentForm = ({
  children,
  onSubmit,
  isFormModeCancellable,
  setFormToDefaultMode,
  isSubmitButtonDisabled,
  submitButtonLabel,
}: PropsWithChildren<BaseCommentFormProps>) => {
  // 이벤트 처리 함수
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {children} // 댓글 input
        <div>
          {isFormModeCancellable && (
            <button onClick={setFormToDefaultMode}>취소</button>
          )}
          <button type="submit" disabled={isSubmitButtonDisabled}>
            {submitButtonLabel}
          </button>
        </div>
      </form>
    </div>
  );
};
```

BaseCommentForm 컴포넌트는 기본적인 form의 기능과 구조에 집중하고 상위 컴포넌트에서 이벤트 처리 로직 등을 받아와 재사용할 수 있는 베이스 컴포넌트의 역할을 하고 있어요. 댓글 작성을 위한 input 요소도 상위 컴포넌트의 children prop으로 받아와 보여주게 했어요.

따라서 모드에 따라 댓글을 편집하고 작성하는 상위 form 컴포넌트에서는 공통 form 컴포넌트를 가져와 아래와 같이 사용하게 했는데요, 역할에 맞게 EditCommentForm과 NewCommentForm으로 나눴어요.

```tsx
EditCommentForm.tsx
interface EditCommentFormProps {
  isEditMode: boolean;
  setFormToDefaultMode: () => void;
  comments: Comment;
}

const EditCommentForm = ({
  isEditMode,
  setFormToDefaultMode,
  comments,
}: EditCommentFormProps) => {
  const [edittedComment, handleCommentChange] = useInput<HTMLTextAreaElement>(
    comments?.body
  );
  const { mutate, isLoading } = useEditComment();

  const onEditComment = () => mutate();

  // BaseCommentForm에 전달될 prop 객체
  const editCommentFormConfig = {
    onSubmit: onEditComment,
    isFormModeCancellable: isEditMode,
    setFormToDefaultMode,
    isSubmitButtonDisabled: isLoading,
    submitButtonLabel: '수정',
  };

  return (
    <BaseCommentForm {...editCommentFormConfig}>
      <S.CommentEditInput // form input 요소
        defaultValue={edittedComment}
        onChange={handleCommentChange}
        autoFocus={isEditMode}
      />
    </BaseCommentForm>
  );
};
```

<details><summary><i>NewCommentForm 보기</i></summary>

```tsx
NewCommentForm.tsx
interface NewCommentFormProps {
  isReplyMode?: boolean;
  setFormToDefaultMode?: () => void;
  comments?: Comment;
}

const NewCommentForm = ({
  isReplyMode,
  setFormToDefaultMode = () => {},
  comments,
}: NewCommentFormProps) => {
  const [comment, handleCommentChange, resetInput] =
    useInput<HTMLTextAreaElement>('');
  const { data: session } = useSession();
  const { showModal } = useModal();
  const { mutate, isLoading } = useCreateComment();
  const onCreateComment = () => mutate();

  // BaseCommentForm에 전달될 prop 객체
  const newCommentFormConfig = {
    onSubmit: session ? onCreateComment : showModal,
    isFormModeCancellable: isReplyMode,
    setFormToDefaultMode,
    isSubmitButtonDisabled: isLoading,
    submitButtonLabel: session
      ? isReplyMode
        ? '답글 작성'
        : '댓글 작성'
      : '간편 로그인',
  };

  return (
    <BaseCommentForm {...newCommentFormConfig}>
      <S.CommentInput // form input 요소
        value={comment}
        onChange={handleCommentChange}
        placeholder={
          session
            ? isReplyMode
              ? '답글 작성하기 ..'
              : '댓글 작성하기 ..'
            : '로그인하고 댓글 작성하기'
        }
        disabled={!session}
        autoFocus={isReplyMode}
      />
    </BaseCommentForm>
  );
};
```

</details>

각 NewCommentForm과 EditCommentForm은 기본 레이아웃, 버튼, 로직 등을 prop으로 공통 form 컴포넌트에 내려주고 input 요소를 children prop으로 전달하고 있어요.

물론 BaseCommentForm 컴포넌트를 가져와 작은 컴포넌트를 또 만들면 파일과 컴포넌트 수가 많아진다는 점에서 불필요하다고 느꼈는데요, 하나의 컴포넌트 내에서 내려줄 모든 변수와 로직을 정의하면 해당 컴포넌트가 무거워지는 경우가 있어서 공통 prop만 객체로 전달하고 onEditComment과 onCreateComment 같은 이벤트 처리 로직은 개별 컴포넌트 단에서 정의하도록 했어요.

<br>

<div style="max-width:650px; margin: auto">

![댓글 컴포넌트](/assets/markdown-image/React-댓글-컴포넌트-리팩토링/리팩토링-후.png)

</div>

<span>1.3 리팩토링 후</span>

<br>

리팩토링한 form 컴포넌트를 기존 코드에 적용하면 다음과 같은데요,

```tsx
Comment.tsx
enum CommentMode {
  View = 'VIEW',
  Edit = 'EDIT',
  Reply = 'REPLY',
}
const Comment = ({ comments }: { comments: CommentProps }) => {
  const [mode, setMode] = useState(CommentMode.View); // 기본값은 보기 모드인 'View'
  const [isCommentOptionsVisible, setIsCommentOptionsVisible] = useState(false);

  const onResetMode = () => setMode(CommentMode.View); // 상태값 초기화
  return (
    <S.Container parentId={comments?.parentId} depth={comments.depth}>
      // ..
      <div>
        {mode === CommentMode.Edit && ( // 편집 모드
          <EditCommentForm
            comments={comments}
            isEditMode={mode === CommentMode.Edit}
            setFormToDefaultMode={onResetMode}
          />
        )}
        {mode === CommentMode.Reply && ( // 답글 모드
          <NewCommentForm
            comments={comments}
            isReplyMode={mode === CommentMode.Reply}
            setFormToDefaultMode={onResetMode}
          />
        )}
      </div>
      // ..
    </S.Container>
  );
};
```

&emsp;기존 코드에서는 각 mode 별로 상태를 유지하고 내려주는 prop이 많았는데요, enum을 사용해서 하나의 상태로 간소화했어요. 또한 모든 로직이 하나의 컴포넌트 내에 정의되다 보니 조건부로 UI와 이벤트 처리 로직을 처리하는 패턴이 많았는데 공통 컴포넌트를 재사용해 컴포넌트를 역할 단위로 나눠 컴포넌트스럽게 리팩토링했어요.
