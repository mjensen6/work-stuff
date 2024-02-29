function excelSerialDateToISO(serial) {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);

  const year = date_info.getUTCFullYear();
  const month = date_info.getUTCMonth() + 1; // Months are zero-indexed
  const day = date_info.getUTCDate();

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}