/**
 * (Static) Класс для работы с месяцами
 * @static
 */
class Month {
    /**
     * Массив имен всех месяцев
     */
    static months = [
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

    /**
     * Преобразует и возвращает номер месяца в строку имени месяца
     * @param {number} number - Номер месяца (0-11)
     * @returns {?string} - Имя месяца
     */
    static parse(number) {
        return this.months[number] || null;
    }
}

module.exports = {
    Month
}