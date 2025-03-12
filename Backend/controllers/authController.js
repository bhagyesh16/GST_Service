const jwt = require("jsonwebtoken");
const { sql, poolPromise } = require("../config/db");
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

const loginUser = async (req, res) => {
  const { LoginName, Password } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("LoginName", sql.NVarChar, LoginName)
      .input("Password", sql.NVarChar, Password)
      .query("SELECT * FROM User_Master WHERE LoginName = @LoginName AND Password = @Password");

    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      const token = jwt.sign({ id: user.Id, name: user.LoginName }, SECRET_KEY, { expiresIn: "1h" });

      res.json({ token, user: { id: user.Id, name: user.LoginName } });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { loginUser };
