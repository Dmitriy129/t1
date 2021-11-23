const toolbar = [
  // обновляет данные в таблице
  {
    operationOrd: 2,
    operationName: "refreshPage",
    operationCaption: "Обновить",
    operationDescription: "Обновление страницы",
    operationMethod: "refreshPage",
    id: 164,
  },
  // выгружает данные таблицы в эксель (просто вывод данных таблицы через console.log)
  {
    operationOrd: 3,
    operationName: "exportData",
    operationCaption: "В Excel",
    operationDescription: "В Excel",
    operationMethod: "exportData",
    id: 165,
  },
];

const contextOperations = [
  //открывает текущую строку в форме
  {
    ord: 1,
    name: "open",
    caption: "Открыть",
    method: "editObject",
  },
  // выгружает данные таблицы в эксель (просто вывод данных таблицы через console.log)
  {
    ord: 2,
    name: "exportData",
    caption: "В Excel",
    method: "exportData",
  },
];

const columns = [
  {
    title: "First name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Sex",
    dataIndex: "sex",
    key: "sex",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    sex: "male",
    address: "New York No. 1 Lake Park",
    age: 32,
  },
  {
    key: "2",
    firstName: "Joan",
    lastName: "Green",
    sex: "female",
    address: "London No. 1 Lake Park",
    age: 42,
  },
  {
    key: "3",
    firstName: "Bob",
    lastName: "Yellow",
    sex: "male",
    address: "Sidney No. 1 Lake Park",
    age: 36,
  },
];

const dblClickOperation = {
  name: "open",
  method: "editObject",
};

const gridData = {
  columns,
  contextOperations,
  toolbar,
  dblClickOperation,
};

/**
 * Функция получения описания таблицы
 */
export function fetchGrid() {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(gridData);
    }, 1000);
  });
  return promise;
}

/**
 * Функция получения данных для таблицы
 */
export function fetchData() {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
  return promise;
}
