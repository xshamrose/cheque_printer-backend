import db from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const User = {
  create: async (
    name,
    email,
    password,
    phone,
    phoneDialCode,
    active,
    createdAt,
    createdBy,
    roleId
  ) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users (name, email, password, remember_token, remember_token_created_at, email_verified_at, phone, phone_dial_code, active, created_at, created_by, role_id) VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?)",
        [
          name,
          email,
          hashedPassword,
          token,
          new Date(),
          phone,
          phoneDialCode,
          active,
          createdAt,
          createdBy,
          roleId,
        ],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve({ id: results.insertId, token });
          }
        }
      );
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  },

  updatePassword: async (id, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET password = ?, remember_token = NULL, remember_token_created_at = NULL, email_verified_at =  1 WHERE id = ?",
        [hashedPassword, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.affectedRows > 0);
          }
        }
      );
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE id = ?", [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  update: async (id, name, email, phone, phoneDialCode, active, roleId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET name = ?, email = ?, phone = ?, phone_dial_code = ?, active = ?, role_id = ? WHERE id = ?",
        [name, email, phone, phoneDialCode, active, roleId, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.affectedRows > 0);
          }
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM users WHERE id = ?", [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },
};

export default User;
