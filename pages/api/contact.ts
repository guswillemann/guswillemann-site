import { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASS = process.env.EMAIL_PASS;

export default function ContactEndPoint(req: NextApiRequest, res: NextApiResponse) {
  const transporter = createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASS,
    },
    secure: true,
  });

  const mailData = {
    from: EMAIL_ADDRESS,
    to: 'guswillemann@gmail.com',
    subject: `Message From ${req.body.name}`,
    text: req.body.message,
    html: `<p>${req.body.email}</p><div>${req.body.message}</div>`
  };
  
  transporter.sendMail(mailData, (err) => {
    if(err) {
      res.status(500).json({ error: 'failed to send the email.' })
    }
    else {
      res.status(200).json({ message: 'email sended with success.' })
    }
  });
}