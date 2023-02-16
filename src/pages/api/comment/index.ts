import type { NextApiRequest, NextApiResponse } from 'next';
import createComment from '@server/api/comment/createComment';
import updateComment from '@server/api/comment/updateComment';
import deleteComment from '@server/api/comment/deleteComment';

const commentApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return createComment(req, res);
    case 'PATCH':
      return updateComment(req, res);
    case 'DELETE':
      return deleteComment(req, res);
  }
};

export default commentApiHandler;
