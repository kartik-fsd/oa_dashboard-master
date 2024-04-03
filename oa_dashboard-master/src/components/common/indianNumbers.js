const indianNumbers = (num, len) => {
  return Number(num).toLocaleString("en-IN", {
    maximumFractionDigits: len,
  });
};

export { indianNumbers };
