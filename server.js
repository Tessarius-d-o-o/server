const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files like your form's HTML, CSS, and JS (optional)
app.use(express.static('public'));

// Handle form submission (POST request from the form)
// Handle POST request for form submission (newsletter subscription)
app.post('/newsletter', (req, res) => {
  console.log(req.body)
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Create a transporter for Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use another email service
    auth: {
      user: 'almirnekic@gmail.com', // Replace with your email
      pass: 'payj nrzh gale vmld',  // Replace with your email password or app password
    },
  });

  // Set up email data
  const mailOptions = {
    from: email, // Sender's email address
    to: 'almirnekic@gmail.com', // The recipient email address
    subject: 'New Newsletter Subscription', // Email subject
    text: `New subscription request from: ${email}`, // Plain text body
    html: `<p>New subscription request from: <strong>${email}</strong></p>`, // HTML body content
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    console.log('Email sent: ' + info.response);
    return res.status(200).json({ message: 'Subscription successful' });
  });
});

// Handle POST request for form submission
app.post('/submit', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate the form data (check if required fields are provided)
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'almirnekic@gmail.com', // Replace with your email
        pass: 'payj nrzh gale vmld',  // Replace with your email password or app password
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: 'almirnekic@gmail.com', // Replace with the recipient's email
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

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Your message has been sent. Thank you!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }

});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});