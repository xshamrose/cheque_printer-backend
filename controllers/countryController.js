import Country from "../models/countryModel.js";

export const createCountry = async (req, res) => {
  try {
    const {
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
    } = req.body;
    const id = await Country.create(
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
    );
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCountries = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.findById(id);
    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }
    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const {
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
    } = req.body;
    const updated = await Country.update(
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
    );
    if (!updated) {
      return res.status(404).json({ error: "Country not found" });
    }
    res.status(200).json({ message: "Country updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Country.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Country not found" });
    }
    res.status(200).json({ message: "Country deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
