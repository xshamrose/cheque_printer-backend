import ChequeTemplate from "../models/chequeTemplateModel.js";

export const createChequeTemplate = async (req, res) => {
  try {
    const {
      name,
      details,
      active,
      createdAt,
      modifiedAt,
      createdBy,
      modifiedBy,
    } = req.body;
    const id = await ChequeTemplate.create(
      name,
      details,
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

export const getChequeTemplates = async (req, res) => {
  try {
    const templates = await ChequeTemplate.findAll();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getChequeTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await ChequeTemplate.findById(id);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateChequeTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      details,
      active,
      createdAt,
      modifiedAt,
      createdBy,
      modifiedBy,
    } = req.body;
    const updated = await ChequeTemplate.update(
      id,
      name,
      details,
      active,
      createdAt,
      modifiedAt,
      createdBy,
      modifiedBy
    );
    if (!updated) {
      return res.status(404).json({ error: "Template not found" });
    }
    res.status(200).json({ message: "Template updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteChequeTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ChequeTemplate.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Template not found" });
    }
    res.status(200).json({ message: "Template deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
