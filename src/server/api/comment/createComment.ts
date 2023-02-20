import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@server/db/client';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import sendNotification from '@lib/comment/notification/notification';

const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: Session | null = await getSession({ req });
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
    res.status(201).json({ message: 'success' });
    return await sendNotification(postId, body);
  } catch (err) {
    return res.status(400).json({ message: 'something went wrong' });
  }
};

export default createComment;
