import { instance } from '@api';

interface sendNotificationEmailProps {
  postId: string;
  body?: string;
}

export const sendNotificationEmail = async (
  params: sendNotificationEmailProps
) => {
  return await instance.post('/api/notificationMail', params);
};