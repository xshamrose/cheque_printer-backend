import BankMaster from "../models/bankMasterModel.js";

export const createBankMaster = async (req, res) => {
  try {
    const {
      accountNumber,
      ifscCode,
      branchName,
      subCurrency,
      active,
      createdAt,
      createdBy,
      chequeTemplateId,
      countryId,
    } = req.body;
    const id = await BankMaster.create(
      accountNumber,
      ifscCode,
      branchName,
      subCurrency,
      active,
      createdAt,
      createdBy,
      chequeTemplateId,
      countryId
    );
    res.status(200).json({ message: "Bank master created successfully", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBankMasters = async (req, res) => {
  try {
    const banks = await BankMaster.findAll();
    res.status(200).json(banks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBankMasterById = async (req, res) => {
  try {
    const { id } = req.params;
    const bank = await BankMaster.findById(id);
    if (!bank) {
      return res.status(404).json({ error: "Bank master not found" });
    }
    res.status(200).json(bank);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBankMaster = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      accountNumber,
      ifscCode,
      branchName,
      subCurrency,
      active,
      modifiedAt,
      modifiedBy,
      chequeTemplateId,
      countryId,
    } = req.body;
    const updated = await BankMaster.update(
      id,
      accountNumber,
      ifscCode,
      branchName,
      subCurrency,
      active,
      modifiedAt,
      modifiedBy,
      chequeTemplateId,
      countryId
    );
    if (!updated) {
      return res.status(404).json({ error: "Bank master not found" });
    }
    res.status(200).json({ message: "Bank master updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBankMaster = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await BankMaster.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Bank master not found" });
    }
    res.status(200).json({ message: "Bank master deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
