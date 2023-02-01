import type { NextApiRequest, NextApiResponse } from 'next';
import fetchComments from '@server/api/fetchComments';
import createComment from '@server/api/createComment';
import updateComment from '@server/api/updateComment';
import deleteComment from '@server/api/deleteComment';

const commentApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return fetchComments(req, res);
    case 'POST':
      return createComment(req, res);
    case 'PATCH':
      return updateComment(req, res);
    case 'DELETE':
      return deleteComment(req, res);
  }
};

export default commentApiHandler;
