const { sql, poolPromise } = require("../config/db");

const getAllClients = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM Client_Master");
  return result.recordset;
};

const addClient = async (client) => {
  const { Client_Code, Client_Name, Client_Group, IsActive } = client;
  const pool = await poolPromise;
  await pool
    .request()
    .input("Client_Code", sql.NVarChar, Client_Code)
    .input("Client_Name", sql.NVarChar, Client_Name)
    .input("Client_Group", sql.NVarChar, Client_Group)
    .input("IsActive", sql.Bit, IsActive)
    .query("INSERT INTO Client_Master (Client_Code, Client_Name, Client_Group, IsActive) VALUES (@Client_Code, @Client_Name, @Client_Group, @IsActive)");
};

const updateClient = async (id, client) => {
  const { Client_Code, Client_Name, Client_Group, IsActive } = client;
  const pool = await poolPromise;
  await pool
    .request()
    .input("Id", sql.Int, id)
    .input("Client_Code", sql.NVarChar, Client_Code)
    .input("Client_Name", sql.NVarChar, Client_Name)
    .input("Client_Group", sql.NVarChar, Client_Group)
    .input("IsActive", sql.Bit, IsActive)
    .query("UPDATE Client_Master SET Client_Code = @Client_Code, Client_Name = @Client_Name, Client_Group = @Client_Group, IsActive = @IsActive WHERE Id = @Id");
};

const deleteClient = async (id) => {
  const pool = await poolPromise;
  await pool.request().input("Id", sql.Int, id).query("DELETE FROM Client_Master WHERE Id = @Id");
};

module.exports = { getAllClients, addClient, updateClient, deleteClient };
