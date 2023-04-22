const express = require("express");

const {
    getAllTransactions,
    getTransactionByCategory,
    createTransaction,
    updateTransaction,
    deleteAllTransactions,
    deleteTransaction,
    getParticularTransactions
} = require("../controller/transactionController");

const {protect} = require("../services/authService")
const router = express.Router();

router.route("/getTransaction").get(protect,getAllTransactions);
router.route("/getTransactionByCategory").get(protect,getParticularTransactions);
router.route("/addTransaction").post(protect,createTransaction);
router.route("/editTransaction/:id").put(protect,updateTransaction);
router.route("/deleteTransaction/:id").delete(protect,deleteTransaction);
router.route("/deleteAll").delete(deleteAllTransactions);
module.exports = router;