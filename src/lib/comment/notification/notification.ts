import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465, // SSL은 465 TLS는 587
  secure: true, // TLS는 false
  auth: {
    user: process.env.NEXT_PUBLIC_NODEMAILER_USER,
    pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS,
  },
});

const sendNotification = async (postId: string, body?: string) => {
  const mailOptions = {
    from: `"moonkorea" <${process.env.NEXT_PUBLIC_NODEMAILER_USER}>`,
    to: process.env.NEXT_PUBLIC_NODEMAILER_RECIPIENT,
    subject: `moonkorea(comment) : ${postId}`,
    text: postId,
    html: `<a href=https://moonkorea.dev/${postId} target=”_blank”>https://moonkorea.dev/${postId}</a><p>content : ${
      body || 'none'
    }</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log('error occured sending email : ', err);
  }
};
export default sendNotification;
