import { nestComments } from './comment.utils';

const rawComments = [
  {
    id: 'aswo229399dnjasdjk2ndj1',
    body: '첫 댓글',
    userId: 'odiwjd2ndn2jd9283nqwb28',
    postId: '테스트',
    parentId: null,
    isDeleted: false,
    createdAt: new Date('2023-11-12T11:35:05.016Z'),
    updatedAt: new Date('2023-11-12T11:35:05.016Z'),
    deletedAt: null,
    user: {
      id: 'odiwjd2ndn2jd9283nqwb28',
      name: '문지원',
      email: 'moonkorea00@gmail.com',
      emailVerified: null,
      image:
        'https://lh3.googleusercontent.com/a/AEdFTp4jiCBxBGtYmuKXBQqi58sGZZcC66NUyTa63fsI=s96-c',
    },
  },
  {
    id: 'cloveffzk0001qf7afmysnyi8',
    body: '댓글 2',
    userId: 'odiwjd2ndn2jd9283nqwb28',
    postId: '테스트',
    parentId: null,
    isDeleted: false,
    createdAt: new Date('2023-11-12T11:35:08.720Z'),
    updatedAt: new Date('2023-11-12T11:35:08.720Z'),
    deletedAt: null,
    user: {
      id: 'odiwjd2ndn2jd9283nqwb28',
      name: '문지원',
      email: 'moonkorea00@gmail.com',
      emailVerified: null,
      image:
        'https://lh3.googleusercontent.com/a/AEdFTp4jiCBxBGtYmuKXBQqi58sGZZcC66NUyTa63fsI=s96-c',
    },
  },
  {
    id: 'wei20as0x9jskmdno2k',
    body: '답글 1',
    userId: 'odiwjd2ndn2jd9283nqwb28',
    postId: '테스트',
    parentId: 'aswo229399dnjasdjk2ndj1',
    isDeleted: false,
    createdAt: new Date('2023-11-12T11:35:17.612Z'),
    updatedAt: new Date('2023-11-12T11:35:17.612Z'),
    deletedAt: null,
    user: {
      id: 'odiwjd2ndn2jd9283nqwb28',
      name: '문지원',
      email: 'moonkorea00@gmail.com',
      emailVerified: null,
      image:
        'https://lh3.googleusercontent.com/a/AEdFTp4jiCBxBGtYmuKXBQqi58sGZZcC66NUyTa63fsI=s96-c',
    },
  },
  {
    id: 'clovefqdy0003qf7a4xjkb8ci',
    body: '답글 2',
    userId: 'odiwjd2ndn2jd9283nqwb28',
    postId: '테스트',
    parentId: 'wei20as0x9jskmdno2k',
    isDeleted: false,
    createdAt: new Date('2023-11-12T11:35:22.199Z'),
    updatedAt: new Date('2023-11-12T11:35:22.199Z'),
    deletedAt: null,
    user: {
      id: 'odiwjd2ndn2jd9283nqwb28',
      name: '문지원',
      email: 'moonkorea00@gmail.com',
      emailVerified: null,
      image:
        'https://lh3.googleusercontent.com/a/AEdFTp4jiCBxBGtYmuKXBQqi58sGZZcC66NUyTa63fsI=s96-c',
    },
  },
  {
    id: 'clovefwr60004qf7ayfewy0n8',
    body: '답글 3',
    userId: 'odiwjd2ndn2jd9283nqwb28',
    postId: '테스트',
    parentId: 'clovefqdy0003qf7a4xjkb8ci',
    isDeleted: false,
    createdAt: new Date('2023-11-12T11:35:30.451Z'),
    updatedAt: new Date('2023-11-12T11:35:30.451Z'),
    deletedAt: null,
    user: {
      id: 'odiwjd2ndn2jd9283nqwb28',
      name: '문지원',
      email: 'moonkorea00@gmail.com',
      emailVerified: null,
      image:
        'https://lh3.googleusercontent.com/a/AEdFTp4jiCBxBGtYmuKXBQqi58sGZZcC66NUyTa63fsI=s96-c',
    },
  },
  {
    id: 'cloveg0n30005qf7a7fljg3h1',
    body: '답글',
    userId: 'odiwjd2ndn2jd9283nqwb28',
    postId: '테스트',
    parentId: 'wei20as0x9jskmdno2k',
    isDeleted: false,
    createdAt: new Date('2023-11-12T11:35:35.471Z'),
    updatedAt: new Date('2023-11-12T11:35:35.471Z'),
    deletedAt: null,
    user: {
      id: 'odiwjd2ndn2jd9283nqwb28',
      name: '문지원',
      email: 'moonkorea00@gmail.com',
      emailVerified: null,
      image:
        'https://lh3.googleusercontent.com/a/AEdFTp4jiCBxBGtYmuKXBQqi58sGZZcC66NUyTa63fsI=s96-c',
    },
  },
];

const nestedComments = [
  {
    id: 'aswo229399dnjasdjk2ndj1',
    body: '첫 댓글',
    userId: 'odiwjd2ndn2jd9283nqwb28',
    postId: '테스트',
    parentId: null,
    isDeleted: false,
    createdAt: new Date('2023-11-12T11:35:05.016Z'),
    updatedAt: new Date('2023-11-12T11:35:05.016Z'),
    deletedAt: null,
    user: {
      id: 'odiwjd2ndn2jd9283nqwb28',
      name: '문지원',
      email: 'moonkorea00@gmail.com',
      emailVerified: null,
      image:
        'https://lh3.googleusercontent.com/a/AEdFTp4jiCBxBGtYmuKXBQqi58sGZZcC66NUyTa63fsI=s96-c',
    },
    children: [
      {
        id: 'wei20as0x9jskmdno2k',
        body: '답글 1',
        userId: 'odiwjd2ndn2jd9283nqwb28',
        postId: '테스트',
        parentId: 'aswo229399dnjasdjk2ndj1',
        isDeleted: false,
        createdAt: new Date('2023-11-12T11:35:17.612Z'),
        updatedAt: new Date('2023-11-12T11:35:17.612Z'),
        deletedAt: null,
        user: {
          id: 'odiwjd2ndn2jd9283nqwb28',
          name: '문지원',
          email: 'moonkorea00@gmail.com',
          emailVerified: null,
          image:
            'https://lh3.googleusercontent.com/a/AEdFTp4jiCBxBGtYmuKXBQqi58sGZZcC66NUyTa63fsI=s96-c',
        },
        children: [
          {
            id: 'clovefqdy0003qf7a4xjkb8ci',
            body: '답글 2',
            userId: 'odiwjd2ndn2jd9283nqwb28',
            postId: '테스트',
            parentId: 'wei20as0x9jskmdno2k',
            isDeleted: false,
            createdAt: new Date('2023-11-12T11:35:22.199Z'),
            updatedAt: new Date('2023-11-12T11:35:22.199Z'),
            deletedAt: null,
            user: {
              id: 'odiwjd2ndn2jd9283nqwb28',
              name: '문지원',
              email: 'moonkorea00@gmail.com',
              emailVerified: null,
              image:
                'https://lh3.googleusercontent.com/a/AEdFTp4jiCBxBGtYmuKXBQqi58sGZZcC66NUyTa63fsI=s96-c',
            },
            children: [
              {
                id: 'clovefwr60004qf7ayfewy0n8',
                body: '답글 3',
                userId: 'odiwjd2ndn2jd9283nqwb28',
                postId: '테스트',
                parentId: 'clovefqdy0003qf7a4xjkb8ci',
                isDeleted: false,
                createdAt: new Date('2023-11-12T11:35:30.451Z'),
                updatedAt: new Date('2023-11-12T11:35:30.451Z'),
                deletedAt: null,
                user: {
                  id: 'odiwjd2ndn2jd9283nqwb28',
                  name: '문지원',
                  email: 'moonkorea00@gmail.com',
                  emailVerified: null,
                  image:
                    'https://lh3.googleusercontent.com/a/AEdFTp4jiCBxBGtYmuKXBQqi58sGZZcC66NUyTa63fsI=s96-c',
                },
                children: [],
                depth: 3,
              },
            ],
            depth: 2,
          },
          {
            id: 'cloveg0n30005qf7a7fljg3h1',
            body: '답글',
            userId: 'odiwjd2ndn2jd9283nqwb28',
            postId: '테스트',
            parentId: 'wei20as0x9jskmdno2k',
            isDeleted: false,
            createdAt: new Date('2023-11-12T11:35:35.471Z'),
            updatedAt: new Date('2023-11-12T11:35:35.471Z'),
            deletedAt: null,
            user: {
              id: 'odiwjd2ndn2jd9283nqwb28',
              name: '문지원',
              email: 'moonkorea00@gmail.com',
              emailVerified: null,
              image:
                'https://lh3.googleusercontent.com/a/AEdFTp4jiCBxBGtYmuKXBQqi58sGZZcC66NUyTa63fsI=s96-c',
            },
            children: [],
            depth: 2,
          },
        ],
        depth: 1,
      },
    ],
    depth: 0,
  },
  {
    id: 'cloveffzk0001qf7afmysnyi8',
    body: '댓글 2',
    userId: 'odiwjd2ndn2jd9283nqwb28',
    postId: '테스트',
    parentId: null,
    isDeleted: false,
    createdAt: new Date('2023-11-12T11:35:08.720Z'),
    updatedAt: new Date('2023-11-12T11:35:08.720Z'),
    deletedAt: null,
    user: {
      id: 'odiwjd2ndn2jd9283nqwb28',
      name: '문지원',
      email: 'moonkorea00@gmail.com',
      emailVerified: null,
      image:
        'https://lh3.googleusercontent.com/a/AEdFTp4jiCBxBGtYmuKXBQqi58sGZZcC66NUyTa63fsI=s96-c',
    },
    children: [],
    depth: 0,
  },
];

const rawCommentsWithoutChildrenComments = [
  {
    id: 'aswo229399dnjasdjk2ndj1',
    body: '첫 댓글',
    userId: 'odiwjd2ndn2jd9283nqwb28',
    postId: '테스트',
    parentId: null,
    isDeleted: false,
    createdAt: new Date('2023-11-12T11:35:05.016Z'),
    updatedAt: new Date('2023-11-12T11:35:05.016Z'),
    deletedAt: null,
    user: {
      id: 'odiwjd2ndn2jd9283nqwb28',
      name: '문지원',
      email: 'moonkorea00@gmail.com',
      emailVerified: null,
      image:
        'https://lh3.googleusercontent.com/a/AEdFTp4jiCBxBGtYmuKXBQqi58sGZZcC66NUyTa63fsI=s96-c',
    },
  },
  {
    id: 'cloveffzk0001qf7afmysnyi8',
    body: '댓글 2',
    userId: 'odiwjd2ndn2jd9283nqwb28',
    postId: '테스트',
    parentId: null,
    isDeleted: false,
    createdAt: new Date('2023-11-12T11:35:08.720Z'),
    updatedAt: new Date('2023-11-12T11:35:08.720Z'),
    deletedAt: null,
    user: {
      id: 'odiwjd2ndn2jd9283nqwb28',
      name: '문지원',
      email: 'moonkorea00@gmail.com',
      emailVerified: null,
      image:
        'https://lh3.googleusercontent.com/a/AEdFTp4jiCBxBGtYmuKXBQqi58sGZZcC66NUyTa63fsI=s96-c',
    },
  },
];

const commentsWithoutChilrenComments = [
  {
    id: 'aswo229399dnjasdjk2ndj1',
    body: '첫 댓글',
    userId: 'odiwjd2ndn2jd9283nqwb28',
    postId: '테스트',
    parentId: null,
    isDeleted: false,
    createdAt: new Date('2023-11-12T11:35:05.016Z'),
    updatedAt: new Date('2023-11-12T11:35:05.016Z'),
    deletedAt: null,
    user: {
      id: 'odiwjd2ndn2jd9283nqwb28',
      name: '문지원',
      email: 'moonkorea00@gmail.com',
      emailVerified: null,
      image:
        'https://lh3.googleusercontent.com/a/AEdFTp4jiCBxBGtYmuKXBQqi58sGZZcC66NUyTa63fsI=s96-c',
    },
    children: [],
    depth: 0,
  },
  {
    id: 'cloveffzk0001qf7afmysnyi8',
    body: '댓글 2',
    userId: 'odiwjd2ndn2jd9283nqwb28',
    postId: '테스트',
    parentId: null,
    isDeleted: false,
    createdAt: new Date('2023-11-12T11:35:08.720Z'),
    updatedAt: new Date('2023-11-12T11:35:08.720Z'),
    deletedAt: null,
    user: {
      id: 'odiwjd2ndn2jd9283nqwb28',
      name: '문지원',
      email: 'moonkorea00@gmail.com',
      emailVerified: null,
      image:
        'https://lh3.googleusercontent.com/a/AEdFTp4jiCBxBGtYmuKXBQqi58sGZZcC66NUyTa63fsI=s96-c',
    },
    children: [],
    depth: 0,
  },
];

describe('nest comments', () => {
  it('should nest comments with children and depth properties', () => {
    expect(nestComments(rawComments)).toStrictEqual(nestedComments);
  });

  it('should handle empty input', () => {
    expect(nestComments([])).toEqual([]);
  });

  it('nest comments with no parent and children', () => {
    expect(nestComments(rawCommentsWithoutChildrenComments)).toStrictEqual(
      commentsWithoutChilrenComments
    );
  });
});
