import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@server/db/client';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import sendNotification from '@lib/comment/notification/notification';

const updateComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: Session | null = await getSession({ req });
  const { id, body, postId } = req.body;

  if (!session) return res.status(401).json({ message: 'Unauthorized' });
  if (!id || !body)
    return res.status(400).json({ message: 'Missing required parameter(s)' });

  try {
    await prisma.comment.update({
      where: {
        id,
      },
      data: {
        body,
      },
    });
    res.status(200).json({ message: 'success' });
    return await sendNotification(postId, body);
  } catch (err) {
    return res.status(400).json({ message: 'something went wrong' });
  }
};

export default updateComment;
