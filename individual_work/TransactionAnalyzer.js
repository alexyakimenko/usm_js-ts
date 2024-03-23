const { Month } = require("./Month")

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
    this.#transactions.push(transaction);
  }

  getAllTransactions() {
    return this.#transactions;
  }

  getUniqueTransactionType() {
    const transactionTypes = new Set();
    for (let transaction of this.#transactions) {
      transactionTypes.add(transaction.transaction_type);
    }
    return Array.from(transactionTypes);
  }

  calculateTotalAmount() {
    return this.#transactions.reduce(
      (sum, transaction) => sum + transaction.transaction_amount,
      0
    );
  }

  calculateTotalAmountByDate(year, month, day) {
    return this.#transactions.reduce((sum, transaction) => {
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
    return this.#transactions.filter(
      (transaction) => transaction.transaction_type === type
    );
  }

  getTransactionsInDateRange(startDate, endDate) {
    return this.#transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.transaction_date);
      return (
        transactionDate.getTime() >= startDate.getTime() &&
        transactionDate.getTime() <= endDate.getTime()
      );
    });
  }

  getTransactionsByMerchant(merchantName) {
    return this.#transactions.filter(
      (transaction) => transaction.merchant_name.toLowerCase() === merchantName.toLowerCase()
    );
  }

  calculateAverageTransactionAmount(precision = 2) {
    return (
      this.calculateTotalAmount() / this.#transactions.length
    ).toFixed(precision);
  }

  getTransactionsByAmountRange(minAmount, maxAmount) {
    return this.#transactions.filter(
      (transaction) =>
        transaction.transaction_amount >= minAmount &&
        transaction.transaction_amount <= maxAmount
    );
  }

  calculateTotalDebitAmount() {
    return this.#transactions.reduce(
      (sum, transaction) =>
        transaction.transaction_type === "debit"
          ? sum + transaction.transaction_amount
          : sum,
      0
    );
  }

  findMostTransactionsMonth(type) {
    const map = new Map();

    for (let transaction of this.#transactions) {
      if (type && transaction.transaction_type !== type) continue;

      const transactionMonth = Month.parse(
        new Date(transaction.transaction_date).getMonth()
      );

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

  mostTransactionsType() {
    const map = new Map();
    this.getUniqueTransactionType().forEach(type => {
      map.set(type, 0)
    });

    this.#transactions.forEach(({transaction_type: type}) => {
      let count = map.get(type);
      map.set(type, count + 1);
    })

    if (map.get("debit") === map.get("credit")) return "Equal";
    return map.get("debit") > map.get("credit") ? "debit" : "credit";
  }

  getTransactionsBeforeDate(date) {
    return this.#transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.transaction_date);
      return transactionDate.getTime() < date.getTime();
    });
  }

  findTransactionById(id) {
    return this.#transactions.find(
      (transaction) => transaction.transaction_id === id.toString()
    );
  }

  mapTransactionDescriptions() {
    return this.#transactions.map(
      (transaction) => transaction.transaction_description
    );
  }
}

module.exports = {
  TransactionAnalyzer
}