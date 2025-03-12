const { getAllClients, addClient, updateClient, deleteClient } = require("../models/clientModel");

const fetchClients = async (req, res) => {
  try {
    const clients = await getAllClients();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createClient = async (req, res) => {
  try {
    await addClient(req.body);
    res.json({ message: "Client added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const modifyClient = async (req, res) => {
  try {
    await updateClient(req.params.id, req.body);
    res.json({ message: "Client updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeClient = async (req, res) => {
  try {
    await deleteClient(req.params.id);
    res.json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { fetchClients, createClient, modifyClient, removeClient };
