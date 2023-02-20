import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // smtp server host for gmail
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendNotification = async (postId: string, body?: string) => {
  const mailOptions = {
    from: `"moonkorea" <${process.env.NODEMAILER_USER}>`,
    to: process.env.NODEMAILER_RECIPIENT,
    subject: `moonkorea(comment) : ${postId}`,
    text: postId,
    html: `<a href=https://moonkorea.dev/${postId} target=”_blank”>https://moonkorea.dev/${postId}</a><p>content : ${
      body || 'none'
    }</p>`,
  };

  await transporter.sendMail(mailOptions);
};
export default sendNotification;
