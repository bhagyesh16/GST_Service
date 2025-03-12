const { sql, poolPromise } = require("../config/db");

// Get Active Subscriptions
const getActiveSubscriptions = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "SELECT client_code, subscribe_date, subscription_amount, sbscription_point, consume_point FROM dbo.client_subscription WHERE isExpire = 0"
      );

    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching subscriptions:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getActiveSubscriptions };
