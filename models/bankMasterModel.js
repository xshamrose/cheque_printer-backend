import db from "../config/database.js";

const BankMaster = {
  create: (
    accountNumber,
    ifscCode,
    branchName,
    subCurrency,
    active,
    createdAt,
    modifiedAt,
    createdBy,
    modifiedBy,
    chequeTemplateId,
    countryId
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO bank_master (account_number, ifsc_code, branch_name, sub_currency, active, created_at, modified_at, created_by, modified_by, cheque_template_id, country_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          accountNumber,
          ifscCode,
          branchName,
          subCurrency,
          active,
          createdAt,
          modifiedAt,
          createdBy,
          modifiedBy,
          chequeTemplateId,
          countryId,
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
      db.query("SELECT * FROM bank_master", (error, results) => {
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
        "SELECT * FROM bank_master WHERE id = ?",
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
    accountNumber,
    ifscCode,
    branchName,
    subCurrency,
    active,
    createdAt,
    modifiedAt,
    createdBy,
    modifiedBy,
    chequeTemplateId,
    countryId
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE bank_master SET account_number = ?, ifsc_code = ?, branch_name = ?, sub_currency = ?, active = ?, created_at = ?, modified_at = ?, created_by = ?, modified_by = ?, cheque_template_id = ?, country_id = ? WHERE id = ?",
        [
          accountNumber,
          ifscCode,
          branchName,
          subCurrency,
          active,
          createdAt,
          modifiedAt,
          createdBy,
          modifiedBy,
          chequeTemplateId,
          countryId,
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
        "DELETE FROM bank_master WHERE id = ?",
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

export default BankMaster;
