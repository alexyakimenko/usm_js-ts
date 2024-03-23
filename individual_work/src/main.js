const transactions = require("./transaction.json");
const {TransactionAnalyzer} = require("./TransactionAnalyzer");

const analyzer = new TransactionAnalyzer(transactions);

const transaction = {
  transaction_id: "121",
  transaction_date: "2023-04-30",
  transaction_amount: 250.0,
  transaction_type: "debit",
  transaction_description: "Home office supplies and ...",
  merchant_name: "OfficeSupplyStoreABCDEFG",
  card_type: "Apex"
}

analyzer.addTransaction(transaction)
// console.log(analyzer.getAllTransactions())

console.log("Unique Types:", analyzer.getUniqueTransactionType());
console.log("Total Amount:", analyzer.calculateTotalAmount())
console.log("Total Amount By Date (April 2019):", analyzer.calculateTotalAmountByDate(2019, 4))

// console.log("Transactions By Type:")
// console.log(analyzer.getTransactionsByType("credit"))

// console.log("Transactions in Date Range:")
// console.log(
//   analyzer.getTransactionsInDateRange(
//     new Date("2019-03-01"),
//     new Date("2019-05-01")
//   )
// )

console.log("Transactions By Merchant:")
console.log(analyzer.getTransactionsByMerchant("officesupplystoreabcdefg"))

console.log("Average Transaction Amount:", analyzer.calculateAverageTransactionAmount(3))

// console.log(("Transactions By Amount Range:"));
// console.log(analyzer.getTransactionsByAmountRange(50, 500))

console.log("Total Debit Amount:", analyzer.calculateTotalDebitAmount())
console.log("Most Transactions Month:", analyzer.findMostTransactionsMonth())
console.log("Most Debit Transactions Month:", analyzer.findMostDebitTransactionsMonth())

console.log("Most Transactions Type:", analyzer.mostTransactionsType())
// console.log("Transactions Before Date:")
// console.log(analyzer.getTransactionsBeforeDate(
//   new Date("2019-02-01")
// ))

console.log("Transaction By Id:")
console.log(analyzer.findTransactionById(121))
/** hello */
console.log("Transaction Descriptions:")
console.log(analyzer.mapTransactionDescriptions().slice(0, 10))