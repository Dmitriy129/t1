/*
Описание:
С сервера приходит описание грида fetchGrid(тулбар, колонки, контекст). Данные для вывода в таблицу (fetchData).
Все данные в файле data.js

Необходимо:
1. Реализовать вывод тулбара, таблицы с данными.
2. Реализовать работу кнопок тулбара (обновление данных, выгрузку)
3. Реализовать вывод контекстного меню у таблицы по нажатию правой кнопки по таблице.
4. Создать модальное окно для просмотра данных записи в 2 колонки, порядок соответствует описанию колонок.
   
  формат формы:
      Лейбл: Значение | Лейбл: Значение
      ..............  | ..............

   На основе данных из примера(см. ниже):
      First name: John                   | Last name:  Brown
      Sex: male                          | Age: 32
      Address: New York No. 1 Lake Park  |
5. Реализовать работу кнопок контекста (открытие записи в форме п.4, выгрузку).
6. Реализовать открытие записи(п.4) по двойному клику по строке таблицы.

Форматы данных:

формат описания таблицы:
{
  columns, - формат тут https://ant.design/components/table/#Column  
  contextOperations: [{
    contextOperation
  }],
  toolbar: [{
    button
  }]
  dblClickOperation - параметры действия двойного клика по строке таблицы
}

формат описания кнопки(button):
{
  operationOrd, - порядок
  operationName, - имя
  operationCaption, - текст кнопки
  operationDescription, - описание
  operationMethod, - наименование действия, которое вызывается по нажатию
  id, - ид
}

формат описания контекста (contextOperation):
{
  ord, - порядок 
  name, - имя
  caption, - текст кнопки    
  method, - наименование действия, которое вызывается по нажатию
},

формат описания dblClickOperation: 
{
  name, - имя  
  method, - наименование действия, которое вызывается по нажатию
},

Обязательно:
 1. Использовать React.
 2. Запрещено использовать сторонние state менеджеры Redux, Mobx, ...

 
Рекомендации:
  1. Использовать функциональные компоненты.
  2. Использовать библиотеку https://ant.design/
  3. Для реализации п.1 использовать https://ant.design/components/button/, https://ant.design/components/table/
  4. Для кнопок внутри контекста п.3 https://ant.design/components/button/
  5. Для окна записи п.4 можно использовать https://ant.design/components/modal/, https://ant.design/components/form/  
 
Примечание:
  Все решения не подпадающие под "Обязательно" остаются за вами (верстка, структура проекта, ...).
  
Цель тестового задания:
  1. Увидеть навыки работы с современным React (хуки, контекст).
  2. Увидеть умение создавать приложение с возможностью дальнейшего масштабирования 
  (добавления новых методов взаимодействия с таблицей, увеличение вложенности компонент, переиспользования созданных компонент)
  

Если есть вопросы по ТЗ пишите на  vsemenov@mvs.group

*/

const toolbar = [
  // обновляет данные в таблице
  {
    operationOrd: 2,
    operationName: "refreshPage",
    operationCaption: "Обновить",
    operationDescription: "Обновление страницы",
    operationMethod: "refreshPage",
    id: 164
  },
  // выгружает данные таблицы в эксель (просто вывод данных таблицы через console.log)
  {
    operationOrd: 3,
    operationName: "exportData",
    operationCaption: "В Excel",
    operationDescription: "В Excel",
    operationMethod: "exportData",
    id: 165
  }
];

const contextOperations = [
  //открывает текущую строку в форме
  {
    ord: 1,
    name: "open",
    caption: "Открыть",
    method: "editObject"
  },
  // выгружает данные таблицы в эксель (просто вывод данных таблицы через console.log)
  {
    ord: 2,
    name: "exportData",
    caption: "В Excel",
    method: "exportData"
  }
];

const columns = [
  {
    title: "First name",
    dataIndex: "firstName",
    key: "firstName"
  },
  {
    title: "Last name",
    dataIndex: "lastName",
    key: "lastName"
  },
  {
    title: "Sex",
    dataIndex: "sex",
    key: "sex"
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  }
];

const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    sex: "male",
    address: "New York No. 1 Lake Park",
    age: 32
  },
  {
    key: "2",
    firstName: "Joan",
    lastName: "Green",
    sex: "female",
    address: "London No. 1 Lake Park",
    age: 42
  },
  {
    key: "3",
    firstName: "Bob",
    lastName: "Yellow",
    sex: "male",
    address: "Sidney No. 1 Lake Park",
    age: 36
  }
];

const dblClickOperation = {
  name: "open",
  method: "editObject"
};

const gridData = {
  columns,
  contextOperations,
  toolbar,
  dblClickOperation
};

// обновлять только данные
// добавить контекст