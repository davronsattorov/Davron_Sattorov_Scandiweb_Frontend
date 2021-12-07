import getCurrencySymbol from "./getCurrencySymbol";

const showPrice = (prices, selectedCurrency) => {
  let newCurrency = prices?.filter(
    ({ currency }) => currency === selectedCurrency
  )[0];

  let { currency, amount } = newCurrency;

  return (
    <>
      {getCurrencySymbol(currency)} {amount}
    </>
  );
};

export default showPrice;
