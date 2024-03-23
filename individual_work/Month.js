class Month {
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
    static parse(number) {
        return this.months[number] || null;
    }
}

module.exports = {
    Month
}