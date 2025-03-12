const { sql, poolPromise } = require("../config/db");

class Payment {
  static async getAllPayments() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT TOP (1000) * FROM Payment");
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }

  static async getPaymentById(paymentId) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input("PaymentId", sql.Int, paymentId)
        .query("SELECT * FROM Payment WHERE PaymentId = @PaymentId");
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  static async addPayment(payment) {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input("Client_Code", sql.NVarChar, payment.Client_Code)
        .input("Payment_Date", sql.Date, payment.Payment_Date)
        .input("Payment_Amount", sql.Decimal, payment.Payment_Amount)
        .input("Payment_Status", sql.NVarChar, payment.Payment_Status)
        .input("Transaction_Id", sql.NVarChar, payment.Transaction_Id)
        .query(`
          INSERT INTO Payment (Client_Code, Payment_Date, Payment_Amount, Payment_Status, Transaction_Id)
          VALUES (@Client_Code, @Payment_Date, @Payment_Amount, @Payment_Status, @Transaction_Id)
        `);
      return { message: "Payment added successfully" };
    } catch (error) {
      throw error;
    }
  }

  static async updatePayment(paymentId, payment) {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input("PaymentId", sql.Int, paymentId)
        .input("Payment_Status", sql.NVarChar, payment.Payment_Status)
        .query(`
          UPDATE Payment 
          SET Payment_Status = @Payment_Status 
          WHERE PaymentId = @PaymentId
        `);
      return { message: "Payment updated successfully" };
    } catch (error) {
      throw error;
    }
  }

  static async deletePayment(paymentId) {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input("PaymentId", sql.Int, paymentId)
        .query("DELETE FROM Payment WHERE PaymentId = @PaymentId");
      return { message: "Payment deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Payment;
