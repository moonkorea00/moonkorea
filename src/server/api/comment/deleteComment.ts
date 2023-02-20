import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@server/db/client';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import sendNotification from '@lib/comment/notification/notification';

const deleteComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: Session | null = await getSession({ req });
  const { id, postId } = req.body;

  if (!session) return res.status(401).json({ message: 'Unauthorized' });
  if (!id)
    return res.status(400).json({ message: 'Missing required parameter(s)' });

  try {
    await prisma.comment.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
    res.status(204).json({ message: 'success' });
    return await sendNotification(postId);
  } catch (err) {
    return res.status(400).json({ message: 'something went wrong' });
  }
};

export default deleteComment;
