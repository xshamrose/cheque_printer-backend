import db from "../config/database.js";

const UserRole = {
  create: (roleName, permissions, createdBy) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO user_roles (role_name, permissions, active, created_at, created_by) VALUES (?, ?, 1, NOW(), ?)",
        [roleName, permissions, createdBy],
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
      db.query("SELECT * FROM user_roles", (error, results) => {
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
      db.query(
        "SELECT * FROM user_roles WHERE id = ?",
        [id],
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

  update: (id, roleName, permissions, modifiedBy) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE user_roles SET role_name = ?, permissions = ?, modified_at = NOW(), modified_by = ? WHERE id = ?",
        [roleName, permissions, modifiedBy, id],
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
      db.query(
        "DELETE FROM user_roles WHERE id = ?",
        [id],
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
};

export default UserRole;
