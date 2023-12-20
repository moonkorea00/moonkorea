import { instance } from "@api/axios/instance";

interface NotificationEmailParams {
  postId: string;
  body?: string;
}

export const sendNotificationEmail = async (
  params: NotificationEmailParams
) => {
  return await instance.post('/api/notificationMail', params);
};
