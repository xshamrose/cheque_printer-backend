import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      rememberToken,
      rememberTokenCreatedAt,
      emailVerifiedAt,
      phone,
      phoneDialCode,
      active,
      createdAt,
      modifiedAt,
      createdBy,
      modifiedBy,
      roleId,
    } = req.body;
    const id = await User.create(
      name,
      email,
      password,
      rememberToken,
      rememberTokenCreatedAt,
      emailVerifiedAt,
      phone,
      phoneDialCode,
      active,
      createdAt,
      modifiedAt,
      createdBy,
      modifiedBy,
      roleId
    );
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      rememberToken,
      rememberTokenCreatedAt,
      emailVerifiedAt,
      phone,
      phoneDialCode,
      active,
      createdAt,
      modifiedAt,
      createdBy,
      modifiedBy,
      roleId,
    } = req.body;
    const updated = await User.update(
      id,
      name,
      email,
      password,
      rememberToken,
      rememberTokenCreatedAt,
      emailVerifiedAt,
      phone,
      phoneDialCode,
      active,
      createdAt,
      modifiedAt,
      createdBy,
      modifiedBy,
      roleId
    );
    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
