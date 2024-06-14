import db from "../config/database.js";

const EmailTemplate = {
  create: (slug, subject, message, modifiedBy) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO email_templates (slug, subject, message, modified_at, modified_by) VALUES (?, ?, ?, NOW(), ?)",
        [slug, subject, message, modifiedBy],
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
      db.query("SELECT * FROM email_templates", (error, results) => {
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
        "SELECT * FROM email_templates WHERE id = ?",
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

  update: (id, slug, subject, message, modifiedBy) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE email_templates SET slug = ?, subject = ?, message = ?, modified_at = NOW(), modified_by = ? WHERE id = ?",
        [slug, subject, message, modifiedBy, id],
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
        "DELETE FROM email_templates WHERE id = ?",
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

export default EmailTemplate;
