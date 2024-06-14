import VoucherMaster from "../models/voucherMasterModel.js";

export const createVoucherMaster = async (req, res) => {
  try {
    const {
      amount,
      description,
      active,
      createdAt,
      modifiedAt,
      createdBy,
      modifiedBy,
      customerMasterId,
    } = req.body;
    const id = await VoucherMaster.create(
      amount,
      description,
      active,
      createdAt,
      modifiedAt,
      createdBy,
      modifiedBy,
      customerMasterId
    );
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVoucherMasters = async (req, res) => {
  try {
    const vouchers = await VoucherMaster.findAll();
    res.status(200).json(vouchers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVoucherMasterById = async (req, res) => {
  try {
    const { id } = req.params;
    const voucher = await VoucherMaster.findById(id);
    if (!voucher) {
      return res.status(404).json({ error: "Voucher not found" });
    }
    res.status(200).json(voucher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateVoucherMaster = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      amount,
      description,
      active,
      createdAt,
      modifiedAt,
      createdBy,
      modifiedBy,
      customerMasterId,
    } = req.body;
    const updated = await VoucherMaster.update(
      id,
      amount,
      description,
      active,
      createdAt,
      modifiedAt,
      createdBy,
      modifiedBy,
      customerMasterId
    );
    if (!updated) {
      return res.status(404).json({ error: "Voucher not found" });
    }
    res.status(200).json({ message: "Voucher updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteVoucherMaster = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await VoucherMaster.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Voucher not found" });
    }
    res.status(200).json({ message: "Voucher deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
