import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@server/db/client';

const fetchComments = async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = req.headers.referer?.split('/').pop() as string;

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: decodeURI(postId),
      },
      orderBy: {
          createdAt: 'asc',
      },
      include: {
        user: true,
      },
    });
    return res.status(200).json(comments);
  } catch (err) {
    return res.status(400).json({ message: 'something went wrong' });
  }
};

export default fetchComments;
