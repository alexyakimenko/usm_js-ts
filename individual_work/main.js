const transactions = require("./transaction.json");

class TransactionAnalyzer {
  #transactions = [];

  constructor(transactions) {
    this.#transactions = transactions;
  }

  addTransaction() {
    transactions.push({}); // todo: add transaction fields
  }

  getAllTransactions() {
    return transactions;
  }

  getUniqueTransactionType() {
    const transactionTypes = new Set();
    for (let transaction of transactions) {
      transactionTypes.add(transaction.transaction_type);
    }
    return Array.from(transactionTypes);
  }

  calculateTotalAmount() {
    return transactions.reduce(
      (sum, transaction) => sum + transaction.transaction_amount,
      0
    );
  }

  calculateTotalAmountByDate() {} // to be clarified!

  getTransactionsByType(type) {
    return transactions.filter(
      (transaction) => transaction.transaction_type === type
    );
  }

  getTransactionsInDateRange(startDate, endDate) {} // todo:

  getTransactionsByMerchant(merchantName) {
    return transactions.filter(
      (transaction) => transaction.merchant_name === merchantName
    );
  }

  calculateAverageTransactionAmount() {
    return this.calculateTotalAmount() / transactions.length;
  }

  getTransactionsByAmountRange(minAmount, maxAmount) {
    return transactions.filter(
      (transaction) =>
        transaction.transaction_amount >= minAmount &&
        transaction.transaction_amount <= maxAmount
    );
  }

  calculateTotalDebitAmount() {
    return transactions.reduce(
      (sum, transaction) =>
        transaction.transaction_type === "debit"
          ? sum + transaction.transaction_amount
          : sum,
      0
    );
  }

  findMostTransactionsMonth() {} // to be clarified!

  findMostDebitTransactionsMonth() {} // to be clarified!

  mostTransactionTypes() {} // to be clarified!

  getTransactionsBeforeDate(date) {} // todo:

  findTransactionById(id) {
    return transactions.find(
      (transaction) => transaction.transaction_id === id
    );
  }

  mapTransactionDescriptions() {
    return transactions.map(
      (transaction) => transaction.transaction_description
    );
  }
}

const analyzer = new TransactionAnalyzer(transactions);
console.log(analyzer.mapTransactionDescriptions());
