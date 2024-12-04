import Producto from "../models/productos.model.js";

export const getProductos = async (req, res) => {
    try {
        const productos = await Producto.find({ user: req.user.id }).populate("user");
        res.json(productos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createProducto = async (req, res) => {
    try {
        const { title, description, platform, price } = req.body;
        const newProducto = new Producto({
            title,
            description,
            platform,
            price,
            user: req.user.id,
        });
        await newProducto.save();
        res.json(newProducto);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteProducto = async (req, res) => {
    try {
        const deleteProducto = await Producto.findByIdAndDelete(req.params.id);
        if (!deleteProducto)
            return res.status(404).json({ message: "Producto not found" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateProducto = async (req, res) => {
    try {
        const { title, description, platform, price } = req.body;
        const productoUpdated = await Producto.findOneAndUpdate(
            { _id: req.params.id },
            { title, description, platform, price },
            { new: true }
        );
        return res.json(productoUpdated);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ message: "producto not found" });
        return res.json(producto);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};