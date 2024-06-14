import EmailTemplate from "../models/emailTemplateModel.js";

export const createEmailTemplate = async (req, res) => {
  try {
    const { slug, subject, message, modifiedBy } = req.body;
    const id = await EmailTemplate.create(slug, subject, message, modifiedBy);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmailTemplates = async (req, res) => {
  try {
    const templates = await EmailTemplate.findAll();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmailTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await EmailTemplate.findById(id);
    if (!template) {
      return res.status(404).json({ error: "Email template not found" });
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmailTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, subject, message, modifiedBy } = req.body;
    const updated = await EmailTemplate.update(
      id,
      slug,
      subject,
      message,
      modifiedBy
    );
    if (!updated) {
      return res.status(404).json({ error: "Email template not found" });
    }
    res.status(200).json({ message: "Email template updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEmailTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await EmailTemplate.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Email template not found" });
    }
    res.status(200).json({ message: "Email template deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
