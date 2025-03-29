const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
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
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Your message has been sent. Thank you!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;