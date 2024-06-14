import UserRole from "../models/userRoleModel.js";

export const createUserRole = async (req, res) => {
  try {
    const { roleName, permissions, createdBy } = req.body;
    const id = await UserRole.create(roleName, permissions, createdBy);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserRoles = async (req, res) => {
  try {
    const roles = await UserRole.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await UserRole.findById(id);
    if (!role) {
      return res.status(404).json({ error: "User role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleName, permissions, modifiedBy } = req.body;
    const updated = await UserRole.update(
      id,
      roleName,
      permissions,
      modifiedBy
    );
    if (!updated) {
      return res.status(404).json({ error: "User role not found" });
    }
    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserRole.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: "User role not found" });
    }
    res.status(200).json({ message: "User role deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
