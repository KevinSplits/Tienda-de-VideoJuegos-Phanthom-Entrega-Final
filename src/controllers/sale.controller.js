import Sale from "../models/sale.model.js";

export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find({ user : req.user.id }).populate("user");
    res.json(sales);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createSale = async (req, res) => {
  try {
    const { customerName, productName, amount, unitPrice, total } = req.body;
    const newSale = new Sale({
      customerName,
      productName,
      amount,
      unitPrice,
      total,
      user: req.user.id,
    });
    await newSale.save();
    res.json(newSale);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const deletedSale = await Sale.findByIdAndDelete(req.params.id);
    if (!deletedSale)
      return res.status(404).json({ message: "Sale not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSale = async (req, res) => {
  try {
    const { customerName, productName, amount, unitPrice, total } = req.body;
    const saleUpdated = await Sale.findOneAndUpdate(
      { _id: req.params.id },
      { customerName, productName, amount, unitPrice, total },
      { new: true }
    );
    return res.json(saleUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });
    return res.json(sale);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};