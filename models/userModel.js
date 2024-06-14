import db from "../config/database.js";

const User = {
  create: (
    name,
    email,
    password,
    rememberToken,
    rememberTokenCreatedAt,
    emailVerifiedAt,
    phone,
    phoneDialCode,
    active,
    createdAt,
    modifiedAt,
    createdBy,
    modifiedBy,
    roleId
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users (name, email, password, remember_token, remember_token_created_at, email_verified_at, phone, phone_dial_code, active, created_at, modified_at, created_by, modified_by, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          name,
          email,
          password,
          rememberToken,
          rememberTokenCreatedAt,
          emailVerifiedAt,
          phone,
          phoneDialCode,
          active,
          createdAt,
          modifiedAt,
          createdBy,
          modifiedBy,
          roleId,
        ],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.insertId);
          }
        }
      );
    });
  },

  findAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
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

  update: (
    id,
    name,
    email,
    password,
    rememberToken,
    rememberTokenCreatedAt,
    emailVerifiedAt,
    phone,
    phoneDialCode,
    active,
    createdAt,
    modifiedAt,
    createdBy,
    modifiedBy,
    roleId
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET name = ?, email = ?, password = ?, remember_token = ?, remember_token_created_at = ?, email_verified_at = ?, phone = ?, phone_dial_code = ?, active = ?, created_at = ?, modified_at = ?, created_by = ?, modified_by = ?, role_id = ? WHERE id = ?",
        [
          name,
          email,
          password,
          rememberToken,
          rememberTokenCreatedAt,
          emailVerifiedAt,
          phone,
          phoneDialCode,
          active,
          createdAt,
          modifiedAt,
          createdBy,
          modifiedBy,
          roleId,
          id,
        ],
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
