import Supplier from "../models/supplier.model.js";

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ user : req.user.id }).populate("user");
    res.json(suppliers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createSupplier = async (req, res) => {
  try {
    const { companyName, contactName, phoneNumber, email, country, date } = req.body;
    const newSupplier = new Supplier({
      companyName,
      contactName,
      phoneNumber,
      email,
      country,
      date,
      user: req.user.id,
    });
    await newSupplier.save();
    res.json(newSupplier);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier)
      return res.status(404).json({ message: "Supplier not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const { companyName, contactName, phoneNumber, email, country, date } = req.body;
    const supplierUpdated = await Supplier.findOneAndUpdate(
      { _id: req.params.id },
      { companyName, contactName, phoneNumber, email, country, date },
      { new: true }
    );
    return res.json(supplierUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    return res.json(supplier);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};