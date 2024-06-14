import CustomerMaster from "../models/customerMasterModel.js";

export const createCustomerMaster = async (req, res) => {
  try {
    const {
      customerType,
      firstName,
      lastName,
      email,
      phoneDialCode,
      phone,
      active,
      createdAt,
      createdBy,
      countryId,
    } = req.body;
    const id = await CustomerMaster.create(
      customerType,
      firstName,
      lastName,
      email,
      phoneDialCode,
      phone,
      active,
      createdAt,
      createdBy,
      countryId
    );
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCustomerMasters = async (req, res) => {
  try {
    const customers = await CustomerMaster.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCustomerMasterById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await CustomerMaster.findById(id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCustomerMaster = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      customerType,
      firstName,
      lastName,
      email,
      phoneDialCode,
      phone,
      active,
      modifiedAt,
      modifiedBy,
      countryId,
    } = req.body;
    const updated = await CustomerMaster.update(
      id,
      customerType,
      firstName,
      lastName,
      email,
      phoneDialCode,
      phone,
      active,
      modifiedAt,
      modifiedBy,
      countryId
    );
    if (!updated) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCustomerMaster = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CustomerMaster.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
