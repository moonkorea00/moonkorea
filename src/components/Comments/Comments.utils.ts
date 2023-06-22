import { CommentProps } from '@@types/comments';

export const getPostId = () => {
  const postId =
    typeof window !== 'undefined' &&
    decodeURI(window.location.pathname).slice(1);

  return postId as string;
};

export const dateToKor = (date: Date) => {
  const newDate =
    new Date(date).getFullYear() +
    '년 ' +
    (new Date(date).getMonth() + 1) +
    '월 ' +
    new Date(date).getDate() +
    '일';

  return newDate;
};

export const formatDateToElapsedTime = (date: Date) => {
  const now = new Date();
  const postedDate = new Date(date);

  const secondsElapsed = Math.floor(
    (now.getTime() - postedDate.getTime()) / 1000 / 60
  );
  const hoursElapsed = Math.floor(secondsElapsed / 60);
  const daysElapsed = Math.floor(secondsElapsed / 60 / 24);

  switch (true) {
    case secondsElapsed < 1:
      return `방금 전`;
    case secondsElapsed < 60:
      return `${secondsElapsed}분 전`;
    case hoursElapsed < 24:
      return `${hoursElapsed}시간 전`;
    case daysElapsed < 6:
      return `${daysElapsed}일 전`;
    default:
      return dateToKor(date);
  }
};

export const checkIfIsEdittedComment = (comments: CommentProps) => {
  const isEditted =
    new Date(comments?.updatedAt).getTime() -
      new Date(comments?.createdAt).getTime() >
    1000;
  return isEditted;
};
