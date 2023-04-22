const { request } = require("express");
const TransactionModel = require("../models/transactions");
const User = require("../models/userModel")
 
exports.getAllTransactions = async (id,{query}) => {
  let filter = id ;

  if (query.startDate && query.endDate) {
    const start = new Date(query.startDate);
    const end = new Date(query.endDate);

    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      filter.date = {
        $gte: start,
        $lte: end
      };
    }
  }
  console.log(filter)
  return await TransactionModel.find(filter);
  // console.log({query})
  // return await TransactionModel.find(id,query);
};
 
exports.createTransaction = async (transaction,id) => {
  // console.log({date:transaction.date,user:id})
  return await TransactionModel.create({
    user:id,
    category :transaction.category,
    amount : transaction.amount,
    date:transaction.date
    });
};

exports.getTransactionbyCategory = async (id, category) => {
  let filter = { category };
  if (id) {
    filter.user = id;
  }
  return await TransactionModel.find(filter);
};
 
exports.updateTransaction = async (userid, transaction) => {
  console.log('inside services', userid,transaction)
  return await TransactionModel.findByIdAndUpdate({_id:userid}, transaction);
};
 
exports.deleteTransaction = async (userid) => {
  console.log('user id and inside delete transaction', userid)
  return await TransactionModel.findByIdAndRemove({_id:userid});
};

exports.deleteAll = async () => {
    return await TransactionModel.deleteMany();
};