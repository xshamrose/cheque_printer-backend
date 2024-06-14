import db from "../config/database.js";

const ChequeTemplate = {
  create: (
    name,
    details,
    active,
    createdAt,
    modifiedAt,
    createdBy,
    modifiedBy
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO cheque_template (name, details, active, created_at, modified_at, created_by, modified_by) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, details, active, createdAt, modifiedAt, createdBy, modifiedBy],
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
          resolve(results);
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
            resolve(results[0]);
          }
        }
      );
    });
  },

  update: (
    id,
    name,
    details,
    active,
    createdAt,
    modifiedAt,
    createdBy,
    modifiedBy
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE cheque_template SET name = ?, details = ?, active = ?, created_at = ?, modified_at = ?, created_by = ?, modified_by = ? WHERE id = ?",
        [
          name,
          details,
          active,
          createdAt,
          modifiedAt,
          createdBy,
          modifiedBy,
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
