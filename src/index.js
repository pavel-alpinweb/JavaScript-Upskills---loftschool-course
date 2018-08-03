/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      fn(item, i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  let newArr = [];
  for (let i = 0; i < array.length; i++) {
      let item = array[i];
      var result = fn(item, i, array);
      newArr.push(result);
  }
  return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  if(initial === undefined){
   let previousValue = array[0];
    for (let i = 1; i < array.length; i++) {  
      previousValue = fn(previousValue,array[i],i,array);
    }
    return previousValue;
  } else {
    let previousValue = initial;
    for (let i = 0; i < array.length; i++) {  
      previousValue = fn(previousValue,array[i],i,array);
    }
    return previousValue;
  }
} 


/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  let newArr = [];
  for (let key in obj) {
    newArr.push(key.toUpperCase());
  }
  return newArr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
  let newArr = [];
  
  if(to === undefined && from === undefined){
    from = 0;
    to = array.length;
  } 
  if(to === undefined){
    to = array.length;
  }  
  if(to < 0){
    to = to + array.length
  }  
  if(to < -array.length){
    to = 0;
  }
  if(from < 0){
    from = from + array.length
  }  
  if(from < -array.length){
    from = 0;
  }
  if(to > array.length){
    to = array.length;
  }

  for (from; from < to; from++) {
    newArr.push(array[from]);
  }
    return newArr;

}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  let proxy = new Proxy(obj,{
    set(target, prop, value){
      target[prop] = value*value;
      return true;
    }
  });

  return proxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
