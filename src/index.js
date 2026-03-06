// console.log("Node Mailer Email Configuration");
import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";
import { APP_PASS, FROM_GMAIL, PORT, TO_GMAIL } from "./config/serverConfig.js";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email Sending route
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Setup to NodeMailer
  try {
    // Create Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: FROM_GMAIL,
        pass: APP_PASS,
      },
    });

    // Email Options.....
    const mailOptions = {
      from: FROM_GMAIL,
      to: TO_GMAIL,
      subject: "New message from Harshikesh's Portfolio",
      html: `<h3>New message from Harshikesh's Portfolio</h3>
      <p><strong>Name: </strong>${name}</p>
      <p><strong>Email: </strong>${email}</p>
      <p><strong>Message: </strong> <br/>${message}</p>`,
    };
    // Send Mail
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "Email Send successfully",
    });
  } catch (error) {
    console.log("Email Sending Error: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to send Email",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT: ${process.env.PORT}`);
});
