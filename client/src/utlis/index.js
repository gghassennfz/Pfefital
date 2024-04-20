const getDate = (dateStr) => {
  if (!dateStr) return "";
  var date = new Date(dateStr);
  const year = date.getFullYear().toString();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}/${month}/${year}`;
};

export { getDate };
