export const getReturnPath = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("returnPath") || "/user/dashboard";
  }
  return "/user/dashboard";
};

export function formatNumberWithoutExponential(
  number: number,
  decimalPlaces: number
): string {
  if (typeof number !== "number" || isNaN(number) || !number) {
    return "0.00";
  }

  if (Math.abs(number) >= 1e6) {
    // Use locale formatting for large numbers
    return number.toLocaleString(undefined, {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });
  }

  let formattedNumber: string = number.toString();

  if (Math.abs(number) < 1 && formattedNumber.length > decimalPlaces + 2) {
    formattedNumber = number.toFixed(decimalPlaces + 5).replace(/\.?0*$/, "");
  } else {
    formattedNumber = number.toFixed(decimalPlaces);
  }

  return formattedNumber;
}
