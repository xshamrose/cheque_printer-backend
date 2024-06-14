import db from "../config/database.js";

const ChequeWriter = {
  create: (
    amount,
    chequeDate,
    chequeNumber,
    status,
    active,
    createdAt,
    modifiedAt,
    createdBy,
    modifiedBy,
    customerMasterId,
    bankMasterId
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO cheque_writer (amount, cheque_date, cheque_number, status, active, created_at, modified_at, created_by, modified_by, customer_master_id, bank_master_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          amount,
          chequeDate,
          chequeNumber,
          status,
          active,
          createdAt,
          modifiedAt,
          createdBy,
          modifiedBy,
          customerMasterId,
          bankMasterId,
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
      db.query("SELECT * FROM cheque_writer", (error, results) => {
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
        "SELECT * FROM cheque_writer WHERE id = ?",
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
    amount,
    chequeDate,
    chequeNumber,
    status,
    active,
    createdAt,
    modifiedAt,
    createdBy,
    modifiedBy,
    customerMasterId,
    bankMasterId
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE cheque_writer SET amount = ?, cheque_date = ?, cheque_number = ?, status = ?, active = ?, created_at = ?, modified_at = ?, created_by = ?, modified_by = ?, customer_master_id = ?, bank_master_id = ? WHERE id = ?",
        [
          amount,
          chequeDate,
          chequeNumber,
          status,
          active,
          createdAt,
          modifiedAt,
          createdBy,
          modifiedBy,
          customerMasterId,
          bankMasterId,
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
        "DELETE FROM cheque_writer WHERE id = ?",
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

export default ChequeWriter;
