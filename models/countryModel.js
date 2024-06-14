import db from "../config/database.js";

const Country = {
  create: (
    countryName,
    countryCode,
    countryCodeThree,
    currencyName,
    symbol,
    active,
    createdAt,
    modifiedAt,
    createdBy,
    modifiedBy
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO country (country_name, country_code, country_code_three, currency_name, symbol, active, created_at, modified_at, created_by, modified_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          countryName,
          countryCode,
          countryCodeThree,
          currencyName,
          symbol,
          active,
          createdAt,
          modifiedAt,
          createdBy,
          modifiedBy,
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
      db.query("SELECT * FROM country", (error, results) => {
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
      db.query("SELECT * FROM country WHERE id = ?", [id], (error, results) => {
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
    countryName,
    countryCode,
    countryCodeThree,
    currencyName,
    symbol,
    active,
    createdAt,
    modifiedAt,
    createdBy,
    modifiedBy
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE country SET country_name = ?, country_code = ?, country_code_three = ?, currency_name = ?, symbol = ?, active = ?, created_at = ?, modified_at = ?, created_by = ?, modified_by = ? WHERE id = ?",
        [
          countryName,
          countryCode,
          countryCodeThree,
          currencyName,
          symbol,
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
      db.query("DELETE FROM country WHERE id = ?", [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },
};

export default Country;
