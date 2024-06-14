import ChequeWriter from "../models/chequeWriterModel.js";

export const createChequeWriter = async (req, res) => {
  try {
    const {
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
    } = req.body;
    const id = await ChequeWriter.create(
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
    );
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getChequeWriters = async (req, res) => {
  try {
    const cheques = await ChequeWriter.findAll();
    res.status(200).json(cheques);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getChequeWriterById = async (req, res) => {
  try {
    const { id } = req.params;
    const cheque = await ChequeWriter.findById(id);
    if (!cheque) {
      return res.status(404).json({ error: "Cheque not found" });
    }
    res.status(200).json(cheque);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateChequeWriter = async (req, res) => {
  try {
    const { id } = req.params;
    const {
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
    } = req.body;
    const updated = await ChequeWriter.update(
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
    );
    if (!updated) {
      return res.status(404).json({ error: "Cheque not found" });
    }
    res.status(200).json({ message: "Cheque updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteChequeWriter = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ChequeWriter.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Cheque not found" });
    }
    res.status(200).json({ message: "Cheque deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
