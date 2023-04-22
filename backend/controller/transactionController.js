const TransactionModel = require("../models/transactions");
const userModel = require("../models/userModel");
const transactionService = require("../services/transactionServices");


exports.getAllTransactions = async (req, res) => {
    // const { user } = req;
    const { startDate, endDate } = req.query;
    try {
      const transaction = await transactionService.getAllTransactions({user:req.user.id},{query:{ startDate, endDate }});
      res.json({ data: transaction, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.getParticularTransactions = async (req, res) => {
    const category = req.query.category;
    try {
      const id = req.user.id;
      const transaction = await transactionService.getTransactionbyCategory(id, category);
      res.json({ data: transaction, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
   
  exports.createTransaction = async (req, res) => {
    try {
      const transaction = await transactionService.createTransaction(req.body,req.user.id);
      res.json({ data: transaction, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
   
  exports.searchTransactionsByCategory = async (id, category) => {
    let filter = { user: id, category: category };
    return await TransactionModel.find(filter);
  };

  exports.getTransactionByCategory = async (req,res) => {
    try {
      console.log(req.body)
      const transaction = await transactionService.getTransactionbyCategory(req.user.id, req.body);
      res.json({ data: transaction, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
   
  exports.updateTransaction = async (req, res) => {
    try {
      console.log('id ey recognize aagale',req.params.id)
      console.log('user check',req.user)
      const transUpdate = await TransactionModel.findById(req.params.id)
      console.log('update transaction',transUpdate)
      
      const user = await userModel.findById(req.user.id)
      console.log('update user',user)
      
      if(!req.user){
        console.log('problem?')
        res.status(401)
        throw new Error('User not found')
      }
      if(transUpdate.user.toString() !== req.user.id){
        console.log('comparing ids')
        res.status(401)
        throw new Error('User not authorized')
      }

      const transaction = await transactionService.updateTransaction(req.params.id, req.body);
      res.json({ data: transaction, status: "success" });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
   
  exports.deleteTransaction = async (req, res) => {
    try {
      const transDelete = await TransactionModel.findById(req.params.id)
      console.log('delete',transDelete)
      const user = await userModel.findById(req.user.id)
      if(!user){
        res.status(401)
        throw new Error('User not found')
      }
      if(transDelete.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
      }
      const transaction = await TransactionModel.findByIdAndRemove(req.params.id);
      res.json({ data: transaction, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.deleteAllTransactions = async (req, res) => {
    try {
      const transaction = await transactionService.deleteAll();
      res.json({ data: transaction, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };