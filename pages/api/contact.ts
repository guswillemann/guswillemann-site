import { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASS = process.env.EMAIL_PASS;

export default function ContactEndPoint(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Use method POST' });

  const isValidReq = req.body.name && req.body.email && req.body.message;

  if (!isValidReq) return res.status(400).json({ message: 'The request has missing data' });
  
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
    subject: `Message From ${req.body.name} ${Date()}`,
    text: req.body.message,
    html: `<p>${req.body.email}</p><div>${req.body.message}</div>`
  };
  
  transporter.sendMail(mailData, (err) => {
    if(err) {
      res.status(500).json({ error: 'Failed to send the email.' })
    }
    else {
      res.status(200).json({ message: 'Email successfully sent.' })
    }
  });
}