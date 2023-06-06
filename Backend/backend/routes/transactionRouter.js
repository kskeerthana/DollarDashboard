const express = require("express");

const {
    getAllTransactions,
    getTransactionByCategory,
    createTransaction,
    updateTransaction,
    deleteAllTransactions,
    deleteTransaction,
    getParticularTransactions,
    getAll,
    adminUpdateTransaction,
    adminDeleteTransaction
} = require("../controllers/transactionController");

const {protect} = require('../middleware/authMiddleware')
const router = express.Router();
router.route("/getAll").get(getAll);
router.route("/admin/:id").put(adminUpdateTransaction).delete(adminDeleteTransaction);
router.route("/getTransaction").get(protect,getAllTransactions);
router.route("/getTransactionByCategory").get(protect,getParticularTransactions);
router.route("/addTransaction").post(protect,createTransaction);
router.route("/editTransaction/:id").put(protect,updateTransaction);
router.route("/deleteTransaction/:id").delete(protect,deleteTransaction);
router.route("/deleteAll").delete(deleteAllTransactions);
module.exports = router;