const numeral = require("numeral");

export const handleBigNum = (number) => {
  return numeral(parseFloat(number)).format("0a.00");
};

export const handleDollar = (number) => {
  let value = 0;
  number >= 1
    ? (value = numeral(parseFloat(number)).format("0,0.00"))
    : (value = numeral(parseFloat(number)).format("0.00000"));
  return value;
};

export const handlePercent = (number) => {
  return numeral(parseFloat(number)).format("0.00");
};

export const handlePercentChange = (number) => {
  console.log(number);
  return numeral(parseFloat(number)).format("0.0[0000]");
};
