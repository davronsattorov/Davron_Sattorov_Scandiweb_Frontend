import getCurrencySymbol from "./getCurrencySymbol";

const showPrice = (prices = [], selectedCurrency) => {
  const newCurrency = prices?.filter(
    ({ currency }) => currency === selectedCurrency
  )[0];

  const { currency, amount } = newCurrency;

  return (
    <>
      {getCurrencySymbol(currency)} {amount}
    </>
  );
};

export default showPrice;
