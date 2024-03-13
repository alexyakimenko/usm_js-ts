const transactions = require("./transaction.json");

const Stringify = {
  string: function () {
    return JSON.stringify(this);
  },
};

class TransactionAnalyzer {
  #transactions = [];

  constructor(transactions) {
    this.#transactions = transactions;

    for (let transaction of this.#transactions) {
      Object.setPrototypeOf(transaction, Stringify);
    }
  }

  addTransaction(transaction) {
    transactions.push(transaction);
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

  calculateTotalAmountByDate(year, month, day) {
    return transactions.reduce((sum, transaction) => {
      const transactionDate = new Date(transaction.transaction_date)

      if (
        (year && year !== transactionDate.getFullYear()) ||
        (month && month !== transactionDate.getMonth() + 1) ||
        (day && day !== transactionDate.getDate())
      ) {
        return sum;
      }

      return sum + transaction.transaction_amount;

    }, 0)
  } 

  getTransactionsByType(type) {
    return transactions.filter(
      (transaction) => transaction.transaction_type === type
    );
  }

  getTransactionsInDateRange(startDate, endDate) {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.transaction_date);
      return (
        transactionDate.getTime() > startDate.getTime() &&
        transactionDate.getTime() < endDate.getTime()
      );
    });
  }

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


  findMostTransactionsMonth(type) {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const map = new Map();

    for (let transaction of transactions) {
      if (type && transaction.transaction_type !== type) continue;
      const transactionMonth =
        this.month[new Date(transaction.transaction_date).getMonth()];

      if (map.has(transactionMonth)) {
        let count = map.get(transactionMonth);
        map.set(transactionMonth, count + 1);
        continue;
      }
      map.set(transactionMonth, 1);
    }

    const sorted = Array.from(map).sort((a, b) => b[1] - a[1]);

    return sorted[0][0];
  }

  findMostDebitTransactionsMonth() {
    return this.findMostTransactionsMonth("debit");
  }

  mostTransactionTypes() {
    const map = new Map();

    for (let transaction of transactions) {
      const type = transaction.transaction_type;
      if (map.has(type)) {
        let count = map.get(type);
        map.set(type, count + 1);
        continue;
      }
      map.set(type, 1);
    }

    const sorted = Array.from(map).sort((a, b) => b[1] - a[1]);

    return sorted[0][0];
  }

  getTransactionsBeforeDate(date) {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.transaction_date);
      return transactionDate.getTime() < date.getTime();
    });
  }

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