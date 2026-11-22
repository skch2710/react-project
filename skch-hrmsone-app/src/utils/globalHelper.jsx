export const formatValueFromString = (value, isCurrency = true) => {
  if (value === null || value === undefined || value === "") {
    return "";
  }
  if (isCurrency) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  }
  return value.toString();
};
