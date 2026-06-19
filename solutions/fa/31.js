/*
Задача 2: Debounce

Реализуйте функцию debounce(fn, delay).

Обычное поведение:
- fn должна вызываться только после того, как с момента последнего вызова
  прошло delay миллисекунд;
- при новом вызове предыдущий таймер сбрасывается;
- fn получает последние переданные аргументы;
- контекст this должен сохраняться.
*/

// Андрей

function debounce(fn, delay) {
  let timeoutId = null;
  let res;
  
  return function(...args) {
      clearTimeout(timeoutId);
        //   fn.apply(this, args);
        // Отлично!!! Теперь обработать ошибку, если resolve - это успешно вернувшися результат промиса
        // Молодец!!!
        // <3
    return new Promise((resolve, reject) => {
        timeoutId = setTimeout(() => {
            try {
                resolve(fn.apply(this, args))
            } catch (e) {
                reject(e)
            }
        }, delay);
    })
        
  }
}

const debouncedSearch = debounce((query) => {
  console.log("Search:", query);
  return query.toUpperCase();
}, 300);

debouncedSearch("j");
debouncedSearch("ja");
debouncedSearch("javascript").then((result) => {
  console.log(result);
});

//Нужно, чтобы debounce умел работать с результатом fn.


// Через 300 мс:
// Search: javascript
