export const handleTextColor = (number) => {
  if (number == "0.0000000000") return "";

  let result = null;
  number > 0 ? (result = "has-text-success") : (result = "has-text-danger");
  return result;
};
export const handleBackgroundColor = (number) => {
  let result = null;
  number > 0
    ? (result = "has-background-success ")
    : (result = "has-background-danger ");

  return result;
};
