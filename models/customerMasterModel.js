import db from "../config/database.js";

const CustomerMaster = {
  create: (
    customerType,
    firstName,
    lastName,
    email,
    phoneDialCode,
    phone,
    active,
    createdAt,
    modifiedAt,
    createdBy,
    modifiedBy,
    countryId
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO customer_master (customer_type, first_name, last_name, email, phone_dial_code, phone, active, created_at, modified_at, created_by, modified_by, country_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          customerType,
          firstName,
          lastName,
          email,
          phoneDialCode,
          phone,
          active,
          createdAt,
          modifiedAt,
          createdBy,
          modifiedBy,
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
      db.query("SELECT * FROM customer_master", (error, results) => {
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
        "SELECT * FROM customer_master WHERE id = ?",
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
    customerType,
    firstName,
    lastName,
    email,
    phoneDialCode,
    phone,
    active,
    createdAt,
    modifiedAt,
    createdBy,
    modifiedBy,
    countryId
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE customer_master SET customer_type = ?, first_name = ?, last_name = ?, email = ?, phone_dial_code = ?, phone = ?, active = ?, created_at = ?, modified_at = ?, created_by = ?, modified_by = ?, country_id = ? WHERE id = ?",
        [
          customerType,
          firstName,
          lastName,
          email,
          phoneDialCode,
          phone,
          active,
          createdAt,
          modifiedAt,
          createdBy,
          modifiedBy,
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
        "DELETE FROM customer_master WHERE id = ?",
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

export default CustomerMaster;
