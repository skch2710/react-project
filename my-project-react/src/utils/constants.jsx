export const REGEX = {
  email: /\S+@\S+\.[A-Za-z]{1}\S+/,
  onlyNumbers: /^[0-9]+$/,
  alphabetsAndHypen: /^[a-zA-Z-]+(\s+[a-zA-Z-]+)*\s?$/,
  excludeLeadingAndTrailingSpaces: /^\S+(\s+\S+)*\s?$/,
  onlyFiveDigits: /^\d{5}$/,
  alphabetsWithDotHyphenExcludeLeadingAndTrailingSpaces:
    /^[\w.-]+(\s+[\w.-]+)*\s?$/,
  tenDigitNumberWithMaxTwoDecimals: /^(\d{0,10}(\.\d{0,2})?)$/,
  twoDecimalNumbers: /^(\d{0,2}(\.\d{0,2})?|100(\.00?)?)$/g,
  alphaNumericals: /^[a-zA-Z0-9]*$/,
  zipCode: /^[0-9]{1,5}$/g,
  numericWithNegativeValuesAndUptoTwoDecimal: /^(-?\d*(\.\d{0,2})?)$/g,
  shouldNotStartwithSpace: /^(?!\s).*$/,
  exceptThisSymbols: ["e", "E", "+", "-", "."],
  onlyAlphabets: /^[a-zA-Z]+(\s+[a-zA-Z]+)*\s?$/,
  numbersWithOnlyTwoDecimals: /^-?\d*\.?\d{0,2}$/,
  numericTwoDecimals: /^-?(\d{0,10}(\.\d{0,2})?)$/,
  varcharWithSpacesInBetweenWords: /^[A-Za-z0-9]+(?: ?[A-Za-z0-9]*)*$/,
};

export const DATE_FORMAT = "MM/DD/YYYY";