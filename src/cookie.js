/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector("#homework-container");
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector("#filter-name-input");
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector("#add-name-input");
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector("#add-value-input");
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector("#add-button");
// таблица со списком cookie
const listTable = homeworkContainer.querySelector("#list-table tbody");

filterNameInput.addEventListener("keyup", function() {
  // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
});

// здесь можно обработать нажатие на кнопку "добавить cookie"

// Немножечко схитрим :)
// https://learn.javascript.ru/cookie#%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F-setcookie-name-value-options
function getCookie(name) {
  var matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
// https://learn.javascript.ru/cookie#%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F-deletecookie-name
function deleteCookie(name) {
  let date = new Date(0);
  document.cookie = `${name}=; path=/; expires=${date.toUTCString()}`;
  let cookieRow = document.querySelector(`.${name}`);
  cookieRow.remove();
}

function addCookie(name,value,date) {
  
}

addButton.addEventListener("click", () => {
  let date = new Date(new Date().getTime() + 60 * 1000);
  let cookieName = addNameInput.value;
  let cookieValue = addValueInput.value;
  if (cookieName == getCookie(cookieName)) {
    deleteCookie(cookieName);
  }
  document.cookie = `${cookieName}=${cookieValue}; path=/; expires=${date.toUTCString()}`;
  listTable.insertAdjacentHTML(
    "beforeEnd",
    `<tr class="${cookieName}"><td>${cookieName}</td><td>${cookieValue}</td><td><button class="deleteCookie">Удалить</button</tr>`
  );

  addNameInput.value = "";
  addValueInput.value = "";
});
