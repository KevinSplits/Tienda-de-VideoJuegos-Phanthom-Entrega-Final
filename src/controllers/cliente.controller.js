import Cliente from "../models/clientes.model.js";

export const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find({ user: req.user.id }).populate("user");
        res.json(clientes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createCliente = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const newCliente = new Cliente({
            name,
            email,
            phone,
            address,
            user: req.user.id,
        });
        await newCliente.save();
        res.json(newCliente);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteCliente = async (req, res) => {
    try {
        const deleteCliente = await Cliente.findByIdAndDelete(req.params.id);
        if (!deleteCliente)
            return res.status(404).json({ message: "cliente not found" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateCliente = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const clienteUpdated = await Cliente.findOneAndUpdate(
            { _id: req.params.id },
            { name, email, phone, address },
            { new: true }
        );
        return res.json(clienteUpdated);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) return res.status(404).json({ message: "cliente not found" });
        return res.json(cliente);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};