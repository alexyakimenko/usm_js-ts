const { Month } = require("./Month")

/**
 * Интерфейс для преобразования объекта в строку
 * @interface
 */
const Stringify = {
  /**
   * Преобразует объект в его строковое представление
   * @function
   * @name Stringify#string
   * @returns {string} - Строковое представление объекта
   */
  string: function () {
    return JSON.stringify(this);
  },
};


/** 
 * Класс для обработки и анализа транзакций
 * @author Alex Yakimenko <alexyakimenkojr@gmail.com>
*/
class TransactionAnalyzer {
  #transactions = [];

  /**
   * Создает новый экземпляр класса
   * @param {Array.<Object>} transactions - Объекты транзакций в массиве
   */
  constructor(transactions) {
    this.#transactions = transactions;

    for (let transaction of this.#transactions) {
      Object.setPrototypeOf(transaction, Stringify);
    }
  }

  /**
   * Добавляет объект транзакции в общий массив транзакций 
   * @param {Object} transaction - Объект транзакции 
   */
  addTransaction(transaction) {
    this.#transactions.push(transaction);
  }

  /**
   * Возвращает массив объектов транзакций
   * @returns {Array.<Object>} - Массив объектов транзакций
   */
  getAllTransactions() {
    return this.#transactions;
  }

  /**
   * Возвращает массив типов транзакции
   * @returns {Array.<string>} Массив типов транзакций
   */
  getUniqueTransactionType() {
    const transactionTypes = new Set();
    for (let transaction of this.#transactions) {
      transactionTypes.add(transaction.transaction_type);
    }
    return Array.from(transactionTypes);
  }

  /**
   * Высчитывает и возвращает общее количество транзакций
   * @returns {number} - Общее количество транзакций
   */
  calculateTotalAmount() {
    return this.#transactions.reduce(
      (sum, transaction) => sum + transaction.transaction_amount,
      0
    );
  }
  
  /**
   * Высчиывает и возвращает общее количество транзакций на основе даты
   * @param {number} [year] - Год транзакции
   * @param {number} [month] - Месяц транзакции
   * @param {number} [day] - День транзакции
   * @returns {number} - Общее количество транзакций
   */
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

  /**
   * Возвращает массив объектов транзакции на основе типа транзакции
   * @param {string} type - Тип транзакции
   * @returns {Array.<Object>} - Массив объектов транзакций
   */
  getTransactionsByType(type) {
    return this.#transactions.filter(
      (transaction) => transaction.transaction_type === type
    );
  }

  /**
   * Возвращает массив объектов транзакций между стартовой и конечной датой
   * @param {Date} startDate - Стартовая дата
   * @param {Date} endDate - Конечная дата
   * @returns {Array.<Object>} - Массив объектов транзакций
   */
  getTransactionsInDateRange(startDate, endDate) {
    return this.#transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.transaction_date);
      return (
        transactionDate.getTime() >= startDate.getTime() &&
        transactionDate.getTime() <= endDate.getTime()
      );
    });
  }
  /**
   * Возвращает массив объектов транзакций на основе торговца
   * @param {string} merchantName - Имя торговца
   * @returns {Array.<Object>} - Массив объектов транзакций
   */
  getTransactionsByMerchant(merchantName) {
    return this.#transactions.filter(
      (transaction) => transaction.merchant_name.toLowerCase() === merchantName.toLowerCase()
    );
  }

  /**
   * Вычисляет и возвращает среднее количество транзакций 
   * @param {number} [precision] - Количество дробных чисел
   * @returns {number} - Среднее количество транзакций
   */
  calculateAverageTransactionAmount(precision = 2) {
    return (
      this.calculateTotalAmount() / this.#transactions.length
    ).toFixed(precision);
  }

  /**
   * Возвращает массив объектов транзакций на основе количества транзакций 
   * @param {number} minAmount - Минимальное количество транзакций
   * @param {number} maxAmount - Максимальное количество транзакций
   * @returns {Array.<Object>} - Массив объектов транзакций
   */
  getTransactionsByAmountRange(minAmount, maxAmount) {
    return this.#transactions.filter(
      (transaction) =>
        transaction.transaction_amount >= minAmount &&
        transaction.transaction_amount <= maxAmount
    );
  }

  /**
   * Вычисляет и возвращает общее количество debit транзакций
   * @returns {number} - Общее количество debit транзакций
   */
  calculateTotalDebitAmount() {
    return this.#transactions.reduce(
      (sum, transaction) =>
        transaction.transaction_type === "debit"
          ? sum + transaction.transaction_amount
          : sum,
      0
    );
  }

  /**
   * Вычисляет и возвращает месяц с найбольшим количеством транзакций
   * @param {string} [type] - Тип транзакции
   * @returns {string} - Месяц
   */
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

  /**
   * Вычисляет и возвращает месяц с найбольшим количеством debit транзакций
   * @returns {string} - Месяц
   */
  findMostDebitTransactionsMonth() {
    return this.findMostTransactionsMonth("debit");
  }

  /**
   * Возвращает каких транзакций было больше всего
   * @returns {string} - Тип транзакции
   */
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

  /**
   * Возвращает массив объектов транзакций до указанной даты
   * @param {Date} date - Дата
   * @returns {Array.<Object>} - Массив объектов транзакций
   */
  getTransactionsBeforeDate(date) {
    return this.#transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.transaction_date);
      return transactionDate.getTime() < date.getTime();
    });
  }

  /**
   * Возвращает объект транзакции по ИД
   * @param {(number|string)} id - Идентификационный номер транзакции
   * @returns {Object} - Объект транзакции
   */
  findTransactionById(id) {
    return this.#transactions.find(
      (transaction) => transaction.transaction_id === id.toString()
    );
  }

  /**
   * Возвращает массив описаний транзакций
   * @returns {Array.<string>} - Массив описаний
   */
  mapTransactionDescriptions() {
    return this.#transactions.map(
      (transaction) => transaction.transaction_description
    );
  }
}

module.exports = {
  TransactionAnalyzer
}