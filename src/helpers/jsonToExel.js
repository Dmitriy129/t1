export const jsonToExel = (data, columns) => {
  if (!columns || !data) return "";
  const arrHeader = columns.map(({ title }) => title);
  const arrData = data.map((row) => Object.values(row));
  const strTable = [arrHeader, ...arrData].join("\r\n");
  return strTable;
};
