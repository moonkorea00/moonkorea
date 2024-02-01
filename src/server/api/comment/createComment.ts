import type { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';

import prisma from '@server/db/client';
import { authOptions } from '@pages/api/auth/[...nextauth]';

const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const { postId, body, userId, parentId } = req.body;

  if (!session) return res.status(401).json({ message: 'Unauthorized' });
  if (!postId || !body || !userId)
    return res.status(400).json({ message: 'Missing required parameter(s)' });

  try {
    await prisma.comment.create({
      data: {
        body,
        Post: {
          connect: {
            id: postId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        ...(parentId && {
          parent: {
            connect: {
              id: parentId,
            },
          },
        }),
      },
    });
    return res.status(201).json({ message: 'success' });
  } catch (err) {
    return res.status(400).json({ message: 'something went wrong' });
  }
};

export default createComment;
