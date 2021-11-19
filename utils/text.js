const letterLimit = 28;
export const minifyWords = (words) => {
  const length = words.length;
  if (length < letterLimit) return words;
  let minifiedWords = "";
  minifiedWords = words.substring(0, letterLimit) + "...";
  return minifiedWords;
};

export const formatPrice = (price) => {
  var formatted = Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(price);
  return formatted;
};
