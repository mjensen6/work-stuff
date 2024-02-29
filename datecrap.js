function excelSerialDateToISO(serial) {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);

  const year = date_info.getUTCFullYear();
  const month = date_info.getUTCMonth() + 1; // Months are zero-indexed
  const day = date_info.getUTCDate();

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}function isValidDate(dateString) {
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  return regex.test(dateString);
}

console.log(isValidDate("2024-02-29")); // true
console.log(isValidDate("2024-13-01")); // false, because month is invalid
console.log(isValidDate("2024-02-31")); // false, because day is invalid
console.log(isValidDate("20240229⬤
