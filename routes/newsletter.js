const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'almirnekic@gmail.com',
      pass: 'payj nrzh gale vmld',
    },
  });

  const mailOptions = {
    from: email,
    to: 'almirnekic@gmail.com',
    subject: 'New Newsletter Subscription',
    html: `<p>New subscription request from: <strong>${email}</strong></p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    console.log('Email sent: ' + info.response);
    return res.status(200).json({ message: 'Subscription successful' });
  });
});

module.exports = router;
