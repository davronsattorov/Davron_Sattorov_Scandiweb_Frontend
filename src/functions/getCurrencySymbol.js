const currencySymbols = {
  USD: "$",
  GBP: "£",
  AUD: "A$",
  JPY: "¥",
  RUB: "₽",
};

const getCurrencySymbol = (currency) => currencySymbols[currency];

export default getCurrencySymbol;
