import db from "../config/database.js";

const ChequeTemplate = {
  create: (name, details, active, createdAt, createdBy) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO cheque_template (name, details, active, created_at, modified_at, created_by, modified_by) VALUES (?, ?, ?, ?, NULL, ?, NULL)",
        [name, JSON.stringify(details), active, createdAt, createdBy],
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
      db.query("SELECT * FROM cheque_template", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(
            results.map((template) => {
              try {
                template.details = JSON.parse(template.details);
              } catch (e) {
                template.details = null;
              }
              return template;
            })
          );
        }
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM cheque_template WHERE id = ?",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            const template = results[0];
            try {
              template.details = JSON.parse(template.details);
            } catch (e) {
              template.details = null;
            }
            resolve(template);
          }
        }
      );
    });
  },

  update: (id, name, details, active, modifiedAt, modifiedBy) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE cheque_template SET name = ?, details = ?, active = ?, modified_at = ?, modified_by = ? WHERE id = ?",
        [name, JSON.stringify(details), active, modifiedAt, modifiedBy, id],
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
        "DELETE FROM cheque_template WHERE id = ?",
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

export default ChequeTemplate;
