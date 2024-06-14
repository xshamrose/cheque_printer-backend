import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import db from "../config/database.js";

dotenv.config();

const generateDummyPassword = () => {
  return Math.random().toString(36).slice(-8);
};

const getEmailTemplate = (slug) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM email_templates WHERE slug = ?",
      [slug],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

const sendEmail = async (email, templateSlug, replacements) => {
  try {
    const template = await getEmailTemplate(templateSlug);
    if (!template) {
      throw new Error("Email template not found");
    }

    let { subject, message } = template;

    for (const key in replacements) {
      const regex = new RegExp(`{{${key}}}`, "g");
      message = message.replace(regex, replacements[key]);
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      phoneDialCode,
      active,
      createdAt,
      createdBy,
      roleId,
    } = req.body;

    const dummyPassword = generateDummyPassword();
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const user = await User.create(
      name,
      email,
      dummyPassword,
      phone,
      phoneDialCode,
      active,
      createdAt,
      createdBy,
      roleId
    );

    const replacements = {
      password: dummyPassword,
      verify_link: `http://localhost:4000/api/verify/${token}`,
    };

    await sendEmail(email, "account_creation", replacements);

    res.status(201).json({ message: "User created successfully", id: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).json({ email: decoded.email });
  } catch (error) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updated = await User.updatePassword(user.id, hashedPassword);

    if (!updated) {
      return res.status(500).json({ error: "Failed to update password" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, phoneDialCode, active, roleId } = req.body;

    const updated = await User.update(
      id,
      name,
      email,
      phone,
      phoneDialCode,
      active,
      roleId
    );

    if (!updated) {
      return res.status(404).json({ error: "User not found or update failed" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.delete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ error: "User not found or deletion failed" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const resetLink = `http://localhost:4000/api/reset-password/${token}`;
    const replacements = {
      reset_link: resetLink,
    };

    await sendEmail(email, "forgot_password", replacements);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByEmail(decoded.email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updated = await User.updatePassword(user.id, hashedPassword);

    if (!updated) {
      return res.status(500).json({ error: "Failed to update password" });
    }

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};
