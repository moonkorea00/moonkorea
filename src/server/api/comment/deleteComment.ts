import type { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';

import prisma from '@server/db/client';
import { authOptions } from '@pages/api/auth/[...nextauth]';

const deleteComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const { id } = req.body;

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
    return res.status(204).json({ message: 'success' });
  } catch (err) {
    return res.status(400).json({ message: 'something went wrong' });
  }
};

export default deleteComment;
