/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */

function loadTowns() {
  let promise = new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();
    req.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json++', true);
    req.responseType = "json";
    req.onload = function() {
        if (req.status > 400) {
            reject(new Error("Server Error"));
        } 
        filterBlock.removeAttribute('style');
        loadingBlock.remove();
        let myJson  = req.response;
        myJson.sort(function(a, b){
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });
        resolve(myJson);
    };
    req.abort
    req.onerror = function() {
        reject(new Error("Server Error"));
    };
    req.onabort = function() {
        reject(new Error("Server Error"));
    };
    req.send();
});

return promise;
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    if (full.indexOf(chunk) > -1) {
       return true;
    }
    return false;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
/* Блок с ошибкой */
const errorBlock = homeworkContainer.querySelector('#errow-block');
/* Кнопка перезагрузки */
const reload = homeworkContainer.querySelector('#reload');


let towns;
function processLoadTowns() {
    loadTowns().then(myJson => {towns = myJson;})
    .catch(error => {
        errorBlock.removeAttribute('style');
        filterInput.setAttribute('style', 'display:none;')
    });  
}
processLoadTowns();

reload.addEventListener('click',() => processLoadTowns());

filterInput.addEventListener('keyup', function() {
    // это обработчик нажатия кливиш в текстовом поле
    let filter = filterInput.value.toLowerCase();
    let townEl = document.querySelectorAll('h3');
    for (const town of towns) {
        let lowertowns = town.name.toLowerCase();
        if(filter == ''){
            for (let i of townEl) {
                i.remove();
            }
        } else if (isMatching(lowertowns,filter)) {
            for (let i of townEl) {
                i.remove();
            }
            filterResult.insertAdjacentHTML(
                "beforeEnd",
                `<h3>${town.name}</h3>`
            );
        } else{
            for (let i of townEl) {
                i.remove();
            }
        }
    } 
    
});

export {
    loadTowns,
    isMatching
};
