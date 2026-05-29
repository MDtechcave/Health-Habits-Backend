import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderEmail = async (to, order) => {
  await transporter.sendMail({
    from: `"Healthy Habits" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🍽️ Order Confirmation",
    html: `
      <h2>Order Confirmed ✅</h2>
      <p><strong>Order Code:</strong> ${order.orderCode}</p>
      <p><strong>Amount:</strong> R${order.amount}</p>
      <p><strong>Status:</strong> ${order.status}</p>

      <hr/>
      <p>Please show this code to your driver:</p>
      <h3>${order.orderCode}</h3>
    `,
  });
};