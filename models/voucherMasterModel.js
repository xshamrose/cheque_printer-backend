import db from "../config/database.js";

const VoucherMaster = {
  create: (
    amount,
    description,
    active,
    createdAt,
    modifiedAt,
    createdBy,
    modifiedBy,
    customerMasterId
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO voucher_master (amount, description, active, created_at, modified_at, created_by, modified_by, customer_master_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          amount,
          description,
          active,
          createdAt,
          modifiedAt,
          createdBy,
          modifiedBy,
          customerMasterId,
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
      db.query("SELECT * FROM voucher_master", (error, results) => {
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
        "SELECT * FROM voucher_master WHERE id = ?",
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
    description,
    active,
    createdAt,
    modifiedAt,
    createdBy,
    modifiedBy,
    customerMasterId
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE voucher_master SET amount = ?, description = ?, active = ?, created_at = ?, modified_at = ?, created_by = ?, modified_by = ?, customer_master_id = ? WHERE id = ?",
        [
          amount,
          description,
          active,
          createdAt,
          modifiedAt,
          createdBy,
          modifiedBy,
          customerMasterId,
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
        "DELETE FROM voucher_master WHERE id = ?",
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

export default VoucherMaster;
