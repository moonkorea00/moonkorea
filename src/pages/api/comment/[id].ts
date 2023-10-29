import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@server/db/client';
import {
  pipe,
  nestCommentsWithChildren,
  getActiveComments,
  addDepthKeyToElement,
} from '@server/api/comment/comment.utils';

const fetchComments = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Missing required parameter' });
  }

  const post = await prisma.post.findUnique({
    where: { id: id as string },
  });

  if (!post) {
    return res.status(404).json({ message: 'comment not found' });
  }

  try {
    const rawComments = await prisma.comment.findMany({
      where: {
        postId: id as string,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        user: true,
      },
    });

    const comments = pipe(
      getActiveComments,
      nestCommentsWithChildren,
      addDepthKeyToElement
    )(rawComments);

    return res
      .status(200)
      .json({ total_comments: rawComments.length, comments });
  } catch (err) {
    if (err instanceof Error && err.message === 'Infinite loop found') {
      return res.status(500).json({ message: 'something went wrong' });
    }
    return res.status(500).json({ message: 'something went wrong' });
  }
};

export default fetchComments;
